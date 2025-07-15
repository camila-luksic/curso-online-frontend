describe('Formulario de usuarios', () => {
  beforeEach(() => {
    // Simulamos login POST
    cy.intercept('POST', 'http://localhost:3000/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          id: 2,
          username: 'luciana_valeras',
          nombre: 'luciana',
          apellido: 'valeras',
          email: 'luciana@gmail.com',
          rol: { codigo: 'ADMIN', nombre: 'Administrador' }
        }
      }
    }).as('loginRequest');

    // Simulamos validación GET /me
    cy.intercept('GET', 'http://localhost:3000/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 2,
        username: 'luciana_valeras',
        nombre: 'luciana',
        apellido: 'valeras',
        email: 'luciana@gmail.com',
        rol: { codigo: 'ADMIN', nombre: 'Administrador' }
      }
    }).as('getMe');

    // Simulamos GET de roles para el selector del formulario
    cy.intercept('GET', 'http://localhost:3000/api/roles', {
      statusCode: 200,
      body: [
        { id: 1, codigo: 'ADMIN', nombre: 'Administrador' },
        { id: 2, codigo: 'USER', nombre: 'Usuario' }
      ]
    }).as('getRoles');

    // Visitar login
    cy.visit('http://localhost:5173/login');

    // Rellenar login
    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    // Esperamos a que las peticiones se completen
    cy.wait('@loginRequest');
    cy.wait('@getMe');

    // Verificar que estamos en el dashboard admin
    cy.url().should('include', '/admin/dashboard');
  });

  it('Crea un nuevo usuario', () => {
    // Intercept POST crear usuario
    cy.intercept('POST', 'http://localhost:3000/api/usuarios', {
      statusCode: 201,
      body: {
        id: 10,
        username: 'nuevo_usuario',
        nombre: 'Nuevo',
        apellido: 'Usuario',
        email: 'nuevo@correo.com',
        rol: { codigo: 'USER', nombre: 'Usuario' }
      }
    }).as('createUser');

    // Intercept GET usuarios para recarga
    cy.intercept('GET', 'http://localhost:3000/api/usuarios', {
      statusCode: 200,
      body: [
        {
          id: 10,
          username: 'nuevo_usuario',
          nombre: 'Nuevo',
          apellido: 'Usuario',
          email: 'nuevo@correo.com',
          rol: { codigo: 'USER', nombre: 'Usuario' }
        }
      ]
    }).as('getUsuarios');

    // Ir a usuarios
    cy.visit('http://localhost:5173/admin/usuarios');

    // Esperar a que carguen roles y usuarios
    cy.wait('@getRoles');
    cy.wait('@getUsuarios');

    // Abrir modal
    cy.get('button').contains('Nuevo Usuario').click();

    // Rellenar campos
    cy.get('input').filter('[name="username"]').type('nuevo_usuario');
    cy.get('input').filter('[name="nombre"]').type('Nuevo');
    cy.get('input').filter('[name="apellido"]').type('Usuario');
    cy.get('input').filter('[name="email"]').type('nuevo@correo.com');
    cy.get('input').filter('[name="password"]').type('password123');

    // Seleccionar rol en el dropdown
    cy.get('select[name="rol"]').select('Usuario');

    // Guardar
    cy.get('button').contains('Guardar').click();

    // Esperar a POST y GET de usuarios
    cy.wait('@createUser');
    cy.wait('@getUsuarios');

    // Verificar que aparezca en la lista
    cy.contains('nuevo_usuario').should('exist');
  });
});
