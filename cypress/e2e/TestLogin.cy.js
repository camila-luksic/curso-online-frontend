describe('Formulario de Login', () => {
  const baseUrl = 'http://localhost:5173';
  const apiUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('Realiza login exitoso y redirige al dashboard correcto', () => {
    cy.intercept('POST', `${apiUrl}/api/auth/login`, {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          username: 'luciana_valeras',
          rol: {
            codigo: 'ADMIN',
            nombre: 'Administrador',
          },
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', `${apiUrl}/api/usuarios/me`, {
      statusCode: 200,
      body: {
        username: 'luciana_valeras',
        rol: {
          codigo: 'ADMIN',
          nombre: 'Administrador',
        },
      },
    }).as('getMe');

    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/admin/dashboard');
  });

  it('Muestra error con credenciales incorrectas', () => {
    cy.intercept('POST', `${apiUrl}/api/auth/login`, {
      statusCode: 401,
      body: { error: 'Error al iniciar sesión' }, // Cambiado a "error"
    }).as('loginFail');

    cy.intercept('GET', `${apiUrl}/api/usuarios/me`, {
      statusCode: 401,
    }).as('getMeFail');

    cy.get('input[name="email"]').type('usuarioX@gmail.com');
    cy.get('input[name="password"]').type('claveX');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.wait('@getMeFail');

    cy.get('.text-red-600').should('contain', 'Error al iniciar sesión');
  });
});
