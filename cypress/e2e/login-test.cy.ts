describe('Test de Login', () => {
  it('debería poder hacer login con credenciales correctas', () => {
    cy.visit('/login');
    cy.wait(1000);
    
    // Verificar que los campos están disponibles
    cy.get('[data-cy="email-input"]').should('be.visible').should('not.be.disabled');
    cy.get('[data-cy="password-input"]').should('be.visible').should('not.be.disabled');
    cy.get('[data-cy="login-button"]').should('be.visible').should('not.be.disabled');
    
    // Interceptar las llamadas de API
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    cy.intercept('GET', '/api/usuarios/me').as('getUserInfo');
    
    // Llenar el formulario
    cy.get('[data-cy="email-input"]').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').type('123');
    
    // Hacer clic en login
    cy.get('[data-cy="login-button"]').click();
    
    // Verificar la respuesta del login
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
      if (interception.response) {
        cy.log(`Status del login: ${interception.response.statusCode}`);
        cy.log(`Respuesta del login:`, interception.response.body);
        
        if (interception.response.statusCode === 200) {
          cy.log('✅ Login exitoso');
        } else {
          cy.log(`❌ Login falló con status: ${interception.response.statusCode}`);
          cy.log(`Error: ${JSON.stringify(interception.response.body)}`);
        }
      } else {
        cy.log('❌ No se recibió respuesta del login');
      }
    });
    
    // Verificar la llamada a obtener usuario
    cy.wait('@getUserInfo', { timeout: 10000 }).then((interception) => {
      if (interception.response) {
        cy.log(`Status de obtener usuario: ${interception.response.statusCode}`);
        
        if (interception.response.statusCode === 200) {
          cy.log('✅ Usuario obtenido correctamente');
          cy.log('Datos del usuario:', interception.response.body);
        } else {
          cy.log(`❌ Error obteniendo usuario: ${interception.response.statusCode}`);
          cy.log(`Error: ${JSON.stringify(interception.response.body)}`);
        }
      } else {
        cy.log('❌ No se recibió respuesta al obtener usuario');
      }
    });
    
    // Verificar redirección
    cy.url().should('include', '/admin', { timeout: 15000 });
    cy.log('✅ Redirección exitosa a /admin');
  });
  
  it('debería mostrar error con credenciales incorrectas', () => {
    cy.visit('/login');
    cy.wait(1000);
    
    // Interceptar la llamada de login
    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    
    // Llenar con credenciales incorrectas
    cy.get('[data-cy="email-input"]').type('usuario@incorrecto.com');
    cy.get('[data-cy="password-input"]').type('passwordincorrecto');
    
    // Hacer clic en login
    cy.get('[data-cy="login-button"]').click();
    
    // Verificar que se muestra error
    cy.wait('@loginRequest', { timeout: 10000 });
    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.log('✅ Error mostrado correctamente');
  });
}); 