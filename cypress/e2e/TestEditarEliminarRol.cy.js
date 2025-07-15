describe('Editar y eliminar rol', () => {
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

    cy.intercept('GET', '/api/roles', {
      statusCode: 200,
      body: [
        { id: 1, codigo: 'ADMIN', nombre: 'Administrador' }
      ]
    }).as('getRoles');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/admin/dashboard');
  });

  it('Edita un rol existente', () => {
    cy.visit('http://localhost:5173/admin/roles');
    cy.wait('@getRoles');

    cy.intercept('PUT', '/api/roles/1', { statusCode: 200 }).as('updateRole');

    cy.intercept('GET', '/api/roles', {
    statusCode: 200,
    body: [
      { id: 1, codigo: 'ADMIN', nombre: 'Administrador Editado' }
    ]
  }).as('getRolesAfterUpdate');

    cy.get('button.btn.btn-primary').contains('Editar').click();

    cy.get('input[name="nombre"]').clear().type('Administrador Editado');
    cy.get('button').contains('Guardar').click();

    cy.wait('@updateRole');

    cy.contains('Administrador Editado').should('exist');
  });

  it('Elimina un rol existente', () => {
    cy.visit('http://localhost:5173/admin/roles');
    cy.wait('@getRoles');

    cy.intercept('DELETE', '/api/roles/1', { statusCode: 200 }).as('deleteRole');

    cy.intercept('GET', '/api/roles', {
  statusCode: 200,
  body: [] // ya no está el rol
}).as('getRolesAfterDelete');

cy.get('button.btn.btn-danger').contains('Eliminar').click();


    cy.wait('@deleteRole');
    cy.reload()
cy.wait('@getRolesAfterDelete');

    cy.contains('Administrador').should('not.exist');
  });
});
