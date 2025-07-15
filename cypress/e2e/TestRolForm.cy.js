describe('Formulario de roles', () => {
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

    // Ir al login
    cy.visit('http://localhost:5173/login');

    // Rellenar y enviar login
    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    // Esperar a que el login y /me respondan
    cy.wait('@loginRequest');
    cy.wait('@getMe');

    // Verificar redirección al dashboard admin
    cy.url().should('include', '/admin/dashboard');
  });

  it('Crea un nuevo rol con código y nombre', () => {
    // Intercept POST crear rol
    cy.intercept('POST', 'http://localhost:3000/api/roles', {
      statusCode: 201,
      body: {
        id: 100,
        codigo: 'NEW_ROLE',
        nombre: 'Nuevo Rol'
      }
    }).as('createRole');

    // Intercept GET recarga lista
    cy.intercept('GET', 'http://localhost:3000/api/roles', {
      statusCode: 200,
      body: [
        { id: 100, codigo: 'NEW_ROLE', nombre: 'Nuevo Rol' }
      ]
    }).as('getRolesAfter');

    // Ir a roles
    cy.visit('http://localhost:5173/admin/roles');

    // Abrir modal
    cy.get('button').contains('Nuevo Rol').click();

    // Rellenar
    cy.get('input').filter('[name="codigo"]').type('NEW_ROLE');
    cy.get('input').filter('[name="nombre"]').type('Nuevo Rol');

    // Enviar
    cy.get('button').contains('Guardar').click();

    // Esperar a POST y GET
    cy.wait('@createRole');
    cy.wait('@getRolesAfter');

    // Verificar
    cy.url().should('include', '/admin/roles');
    cy.contains('Nuevo Rol').should('exist');
  });
});
