describe('Editar y eliminar categoría', () => {
  beforeEach(() => {
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

    cy.intercept('GET', '/api/categorias', {
      statusCode: 200,
      body: [{
        id: 5,
        nombre: 'Categoría Test',
        descripcion: 'Descripción test'
      }]
    }).as('getCategorias');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/admin/dashboard');
  });

 it('Edita una categoría existente', () => {
    cy.visit('http://localhost:5173/admin/categorias');
    cy.wait('@getCategorias');

    cy.get('button.btn.btn-primary').contains('Editar').click();

    cy.intercept('PUT', '/api/categorias/5', {
      statusCode: 200
    }).as('updateCategoria');

    cy.intercept('GET', '/api/categorias', {
      statusCode: 200,
      body: [{
        id: 5,
        nombre: 'Categoría Editada',
        descripcion: 'Descripción editada'
      }]
    }).as('getCategoriasAfterEdit');

    cy.get('input[name="nombre"]').clear().type('Categoría Editada');
    cy.get('textarea[name="descripcion"]').clear().type('Descripción editada');

    cy.get('button').contains('Guardar').click();

    cy.wait('@updateCategoria');
    cy.wait('@getCategoriasAfterEdit');

    cy.contains('Categoría Editada').should('exist');
  });


 it('Elimina una categoría existente', () => {
    cy.visit('http://localhost:5173/admin/categorias');
    cy.wait('@getCategorias');

    cy.intercept('DELETE', '/api/categorias/5', { statusCode: 200 }).as('deleteCategoria');

    cy.get('button.btn.btn-danger').contains('Eliminar').click();

    cy.wait('@deleteCategoria');

    cy.intercept('GET', '/api/categorias', {
      statusCode: 200,
      body: []
    }).as('getCategoriasAfterDelete');

    cy.reload(); // fuerza recarga si tu app no hace GET automático
    cy.wait('@getCategoriasAfterDelete');

    cy.contains('Categoría Test').should('not.exist');
  });
});