describe('Formulario de cursos', () => {
  beforeEach(() => {
    // Login
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          id: 1,
          username: 'camila_luksic',
          nombre: 'camila',
          apellido: 'luksic',
          email: 'camila@gmail.com',
          rol: { codigo: 'PROF', nombre: 'Profesor' },
          permisos: [
            'usuarios:listar',
            'categorias:listar',
            'cursos:crear',
            'cursos:listar'
          ]
        }
      }
    }).as('loginRequest');

    cy.intercept('GET', '/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 1,
        username: 'camila_luksic',
        nombre: 'camila',
        apellido: 'luksic',
        email: 'camila@gmail.com',
        rol: { codigo: 'PROF', nombre: 'Profesor' }
      }
    }).as('getMe');

    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('camila@gmail.com');
    cy.get('input[name="password"]').type('camila123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/profesor/dashboard');
  });

  it('Crea un nuevo curso', () => {
    // intercepts
    cy.intercept('GET', '/api/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Matemáticas' },
        { id: 2, nombre: 'Ciencias' }
      ]
    }).as('getCategorias');

   cy.intercept('GET', '/api/usuarios', {
  statusCode: 200,
  body: [
    {
      id: 2,
      username: 'camila_luksic',
      nombre: 'camila',
      apellido: 'luksic',
      email: 'camila@gmail.com',
      rol: { codigo: 'PROF', nombre: 'Profesor' }
    }
  ]
}).as('getProfesores');

   

    cy.intercept('POST', '/api/cursos', {
      statusCode: 201,
      body: {
        id: 10,
        titulo: 'Nuevo Curso',
        descripcion: 'Descripción del curso',
        categoria: { id: 1, nombre: 'Matemáticas' },
        profesor: {
          id: 1,
          nombre: 'camila',
          apellido: 'luksic'
        }
      }
    }).as('createCurso');

    cy.visit('http://localhost:5173/profesor/cursos');

    // Abrir modal o formulario aquí
    cy.get('button').contains('Nuevo Curso').click();

    // Ahora esperar a que realmente se pidan
    cy.wait('@getCategorias');
    cy.wait('@getProfesores');

    cy.get('input[name="titulo"]').type('Nuevo Curso');
    cy.get('textarea[name="descripcion"]').type('Descripción del curso');

    cy.get('select[name="categoriaId"]').select('Matemáticas');
    cy.get('select[name="profesorId"]').select('camila luksic');

    cy.get('button').contains('Guardar').click();

    cy.wait('@createCurso');

    cy.contains('Nuevo Curso').should('exist');
  });
});
