describe('Formulario de categoría', () => {
  beforeEach(() => {
    // Interceptamos el login
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

    // Interceptamos la validación del usuario
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

    // Visitar login
    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/admin/dashboard');
  });

  it('Crea una nueva categoría', () => {
    // Interceptamos la primera carga vacía
    cy.intercept('GET', 'http://localhost:3000/api/categorias', {
      statusCode: 200,
      body: []
    }).as('getCategoriasEmpty');

    cy.visit('http://localhost:5173/admin/categorias');

    cy.wait('@getCategoriasEmpty');

    // Abrir el modal
    cy.get('button').contains('Nueva Categoría').click();

    // Interceptamos la creación de la categoría
    cy.intercept('POST', 'http://localhost:3000/api/categorias', {
      statusCode: 201,
      body: {
        id: 99,
        nombre: 'Nueva Categoría',
        descripcion: 'Descripción de la nueva categoría'
      }
    }).as('createCategoria');

    // Interceptamos la carga de categorías ya con la nueva incluida
    cy.intercept('GET', 'http://localhost:3000/api/categorias', {
      statusCode: 200,
      body: [
        {
          id: 99,
          nombre: 'Nueva Categoría',
          descripcion: 'Descripción de la nueva categoría'
        }
      ]
    }).as('getCategoriasAfter');

    cy.get('input').filter('[name="nombre"]').type('Nueva Categoría');
    cy.get('textarea').filter('[name="descripcion"]').type('Descripción de la nueva categoría');

    cy.get('button').contains('Guardar').click();

    // Esperar creación
    cy.wait('@createCategoria');

    // Esperar que vuelva a cargar la lista
    cy.wait('@getCategoriasAfter');

    cy.url().should('include', '/admin/categorias');

    cy.contains('Nueva Categoría').should('exist');
  });
});
