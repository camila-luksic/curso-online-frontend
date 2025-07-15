describe('Formulario de cursos', () => {
  beforeEach(() => {
    // Interceptamos login
    cy.intercept('POST', 'http://localhost:3000/api/auth/login', {
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

    // Interceptamos la validación del usuario
    cy.intercept('GET', 'http://localhost:3000/api/usuarios/me', {
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
    // intercepts necesarios
    cy.intercept('GET', 'http://localhost:3000/api/categorias', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Matemáticas' },
        { id: 2, nombre: 'Ciencias' }
      ]
    }).as('getCategorias');

    cy.intercept('GET', 'http://localhost:3000/api/usuarios?rol=PROF', {
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

    cy.intercept('POST', 'http://localhost:3000/api/cursos', {
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

    // esperar carga de selects
    cy.wait('@getCategorias');
    cy.wait('@getProfesores');

    // Abrir modal o usar formulario (en tu captura ya está visible)
    cy.get('input').filter('[name="titulo"]').type('Nuevo Curso');
    cy.get('textarea').filter('[name="descripcion"]').type('Descripción del curso');

    cy.get('select[name="categoria"]').select('Matemáticas');
    cy.get('select[name="profesor"]').select('camila luksic');

    cy.get('button').contains('Guardar').click();

    cy.wait('@createCurso');

    // verificar que se queda en la página y que el curso aparece
    cy.url().should('include', '/profesor/cursos');
    cy.contains('Nuevo Curso').should('exist');
  });
});
