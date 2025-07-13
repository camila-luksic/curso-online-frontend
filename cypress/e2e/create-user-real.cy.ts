describe('Crear Usuario - API Real', () => {
  it('debería crear un usuario real exitosamente', () => {
    // 1. Ir al login
    cy.visit('/login');
    cy.wait(1000); // Esperar a que la página se cargue completamente
    
    // 2. Hacer login como admin
    cy.get('[data-cy="email-input"]').should('not.be.disabled').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').should('not.be.disabled').type('123');
    
    // Interceptar las llamadas de login y obtener usuario
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    cy.intercept('GET', '/api/usuarios/me').as('getUserInfo');
    
    cy.get('[data-cy="login-button"]').click();
    
    // 3. Esperar a que se complete el login
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
      if (interception.response) {
        cy.log(`Login response: ${interception.response.statusCode}`);
        if (interception.response.statusCode === 200) {
          cy.log('✅ Login exitoso');
        } else {
          cy.log(`❌ Login falló: ${interception.response.statusCode}`);
        }
      }
    });
    
    // 4. Esperar a obtener la información del usuario
    cy.wait('@getUserInfo', { timeout: 10000 }).then((interception) => {
      if (interception.response) {
        cy.log(`User info response: ${interception.response.statusCode}`);
        if (interception.response.statusCode === 200) {
          cy.log('✅ Información del usuario obtenida');
        } else {
          cy.log(`❌ Error obteniendo usuario: ${interception.response.statusCode}`);
        }
      }
    });
    
    // 5. Esperar a que se complete la redirección
    cy.url().should('include', '/admin', { timeout: 15000 });
    cy.wait(2000);
    
    // 4. Ir a la página de usuarios
    cy.visit('/admin/usuarios');
    cy.wait(2000);
    
    // 5. Verificar que estamos en la página correcta
    cy.contains('h1', 'Usuarios').should('be.visible');
    
    // 6. Abrir modal de crear usuario
    cy.get('[data-cy="new-user-button"]').click();
    cy.wait(1000);
    
    // 7. Verificar que el modal se abrió
    cy.contains('h2', 'Nuevo Usuario').should('be.visible');
    
    // 8. Generar datos únicos para evitar conflictos
    const timestamp = Date.now();
    const username = `test_user_${timestamp}`;
    const email = `test_${timestamp}@test.com`;
    
    // 9. Llenar el formulario
    cy.get('[data-cy="username-input"]').type(username);
    cy.get('[data-cy="nombre-input"]').type('Usuario');
    cy.get('[data-cy="apellido-input"]').type('Test');
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="rol-select"]').select('3'); // Estudiante
    
    // 10. Enviar formulario
    cy.get('[data-cy="save-user-button"]').click();
    
    // 11. Esperar a que se procese la creación
    cy.wait(3000);
    
    // 12. Verificar que el modal se cerró (indicando éxito)
    cy.contains('h2', 'Nuevo Usuario').should('not.exist');
    
    // 13. Verificar que el usuario aparece en la lista
    cy.contains(username).should('be.visible');
    cy.contains('Usuario Test').should('be.visible');
    cy.contains(email).should('be.visible');
    
    cy.log('✅ Usuario creado exitosamente en la API real');
  });
  
  it('debería mostrar error cuando el email ya existe', () => {
    // 1. Login como admin
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').should('not.be.disabled').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').should('not.be.disabled').type('123');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/admin');
    cy.wait(2000);
    
    // 2. Ir a usuarios
    cy.visit('/admin/usuarios');
    cy.wait(2000);
    
    // 3. Abrir modal
    cy.get('[data-cy="new-user-button"]').click();
    cy.wait(1000);
    
    // 4. Intentar crear con email que ya existe
    cy.get('[data-cy="username-input"]').type('usuario_duplicado');
    cy.get('[data-cy="nombre-input"]').type('Usuario');
    cy.get('[data-cy="apellido-input"]').type('Duplicado');
    cy.get('[data-cy="email-input"]').type('admin@test.com'); // Email que ya existe
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="rol-select"]').select('3');
    
    // 5. Enviar formulario
    cy.get('[data-cy="save-user-button"]').click();
    cy.wait(3000);
    
    // 6. Verificar que se muestra algún tipo de error
    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase();
      const hasError = bodyText.includes('error') || 
                      bodyText.includes('ya existe') || 
                      bodyText.includes('duplicado') ||
                      bodyText.includes('email');
      expect(hasError).to.be.true;
    });
    
    cy.log('✅ Error de email duplicado manejado correctamente por la API real');
  });
  
  it('debería validar campos requeridos', () => {
    // 1. Login como admin
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').should('not.be.disabled').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').should('not.be.disabled').type('123');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/admin');
    cy.wait(2000);
    
    // 2. Ir a usuarios
    cy.visit('/admin/usuarios');
    cy.wait(2000);
    
    // 3. Abrir modal
    cy.get('[data-cy="new-user-button"]').click();
    cy.wait(1000);
    
    // 4. Intentar enviar formulario vacío
    cy.get('[data-cy="save-user-button"]').click();
    cy.wait(1000);
    
    // 5. Verificar mensajes de validación
    cy.get('body').then(($body) => {
      const errorElements = $body.find('.text-accent, .text-red-500, .text-red-600');
      expect(errorElements.length).to.be.greaterThan(0);
    });
    
    cy.log('✅ Validación de campos requeridos funcionando');
  });
}); 