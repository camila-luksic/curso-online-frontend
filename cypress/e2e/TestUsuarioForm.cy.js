describe('Formulario de usuarios', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/login', {
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

    cy.intercept('GET', '/api/usuarios/me', {
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

    // intercept inicial para usuarios vacío
    cy.intercept('GET', '/api/usuarios*', {
      statusCode: 200,
      body: []
    }).as('getUsuarios');

    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('luciana@gmail.com');
    cy.get('input[name="password"]').type('luciana123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');
    cy.url().should('include', '/admin/dashboard');
  });

  it('Crea un nuevo usuario', () => {
    // intercept POST de creación
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        message: 'Usuario registrado exitosamente'
      }
    }).as('createUser');

    // intercept roles
    cy.intercept('GET', '/api/roles', {
      statusCode: 200,
      body: [
        { id: 1, codigo: 'ADMIN', nombre: 'Administrador' },
        { id: 2, codigo: 'USER', nombre: 'Usuario' }
      ]
    }).as('getRoles');

    cy.visit('http://localhost:5173/admin/usuarios');

    cy.wait('@getUsuarios');

    cy.get('button').contains('Nuevo Usuario').click();

    cy.wait('@getRoles');

    cy.get('input[name="username"]').type('nuevo_usuario');
    cy.get('input[name="nombre"]').type('Nuevo');
    cy.get('input[name="apellido"]').type('Usuario');
    cy.get('input[name="email"]').type('nuevo@correo.com');
    cy.get('input[name="password"]').type('Password123*');
    cy.get('select[name="rolId"]').select('Usuario');

    cy.get('button').contains('Guardar').click();

    // intercept usuarios después de crear
    cy.intercept('GET', '/api/usuarios*', {
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
    }).as('getUsuariosAfterCreate');

    // esperar creación y recarga
    cy.wait('@createUser');
    cy.reload();
    cy.wait('@getUsuariosAfterCreate');
cy.contains('Nuevo Usuario', { timeout: 5000 }).should('exist');

  });
});
