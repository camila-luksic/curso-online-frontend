describe('Editar y eliminar usuario', () => {
  beforeEach(() => {
    // Login intercept
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

    // Intercept inicial para usuarios
    cy.intercept('GET', '/api/usuarios*', {
      statusCode: 200,
      body: [{
        id: 10,
        username: 'test_user',
        nombre: 'Test',
        apellido: 'User',
        email: 'test@correo.com',
        rol: { codigo: 'USER', nombre: 'Usuario' }
      }]
    }).as('getUsuarios');

    // Login UI
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/admin/dashboard');
  });

  it('Edita un usuario existente', () => {
    cy.visit('http://localhost:5173/admin/usuarios');
    cy.wait('@getUsuarios');

    // intercept GET de roles antes de abrir modal
    cy.intercept('GET', '/api/roles', {
      statusCode: 200,
      body: [
        { id: 1, codigo: 'ADMIN', nombre: 'Administrador' },
        { id: 2, codigo: 'USER', nombre: 'Usuario' }
      ]
    }).as('getRoles');

    cy.get('button[aria-label="Editar usuario"]').click();

    cy.wait('@getRoles'); // asegurarse que se carguen roles en el modal

    cy.intercept('PATCH', '/api/usuarios/10', {
      statusCode: 200
    }).as('updateUser');

    cy.get('input[name="nombre"]').clear().type('TestEditado');
    cy.get('select[name="rolId"]').select('Usuario'); // seleccionar rol válido

    cy.get('button').contains('Guardar').click();

    cy.wait('@updateUser');

    cy.contains('Test User').should('exist');
  });

  it('Elimina un usuario existente', () => {
    cy.visit('http://localhost:5173/admin/usuarios');
    cy.wait('@getUsuarios');

    cy.intercept('DELETE', '/api/usuarios/10', { statusCode: 200 }).as('deleteUser');

    cy.get('button[aria-label="Eliminar usuario"]').click(); // sin espacio al final
   
    cy.wait('@deleteUser');

    cy.contains('test_user').should('not.exist');
  });
});
