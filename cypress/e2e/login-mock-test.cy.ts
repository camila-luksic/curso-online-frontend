describe('Test de Login con Mocks Completos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('debe hacer login exitoso como administrador', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: { message: 'Login exitoso' }
    }).as('loginRequest');

    cy.intercept('GET', '**/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 1,
        username: 'admin',
        nombre: 'Administrador',
        apellido: 'Sistema',
        email: 'admin@test.com',
        rol: {
          id: 1,
          codigo: 'ADMIN',
          nombre: 'Administrador'
        }
      }
    }).as('getCurrentUser');

    cy.get('[data-cy="email-input"]').type('admin@test.com');
    cy.get('[data-cy="password-input"]').type('admin123');
    cy.get('[data-cy="login-button"]').click();

    cy.wait('@loginRequest');
    cy.wait('@getCurrentUser');

    cy.url().should('include', '/admin/dashboard');
    
    cy.get('h1').should('contain', '¡Hola, Administrador!');
  });

  it('debe mostrar error con credenciales incorrectas', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { error: 'Credenciales inválidas' }
    }).as('loginFail');

    cy.get('[data-cy="email-input"]').type('usuario@incorrecto.com');
    cy.get('[data-cy="password-input"]').type('passwordincorrecto');
    cy.get('[data-cy="login-button"]').click();

    cy.wait('@loginFail');

    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain', 'Credenciales inválidas');
    
    cy.url().should('include', '/login');
  });

  it('debe manejar error de servidor', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    }).as('loginServerError');

    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('test123');
    cy.get('[data-cy="login-button"]').click();

    cy.wait('@loginServerError');

    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain', 'Error interno del servidor');
    cy.url().should('include', '/login');
  });
}); 