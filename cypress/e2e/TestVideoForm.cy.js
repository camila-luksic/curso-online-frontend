describe('Agregar video a un curso', () => {
  beforeEach(() => {
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
            'cursos:listar',
            'videos:agregar'
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

    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          titulo: 'Python',
          descripcion: 'Programacion en Python para principiantes',
          categoria: { id: 1, nombre: 'Programacion' },
          profesor: { id: 1, nombre: 'camila', apellido: 'luksic' }
        }
      ]
    }).as('getCursos');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('camila@gmail.com');
    cy.get('input[name="password"]').type('camila123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/profesor/dashboard');
  });

  it('Agrega un video a un curso con orden', () => {
    cy.visit('http://localhost:5173/teachers/materials');
    cy.wait('@getCursos');

    cy.contains('Python').click();

    cy.intercept('GET', '/api/cursos/1/videos', {
      statusCode: 200,
      body: []
    }).as('getVideos');

    cy.wait('@getVideos');

    cy.intercept('POST', '/api/cursos/1/videos', {
      statusCode: 201,
      body: {
        id: 1,
        titulo: 'Video de prueba',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        orden: 1
      }
    }).as('addVideo');

    cy.intercept('GET', '/api/cursos/1/videos', {
  statusCode: 200,
  body: [
    {
      id: 1,
      titulo: 'Video de prueba',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      orden: 1
    }
  ]
}).as('getVideosAfter');

    cy.get('button').contains('Nuevo Video').click();

    cy.get('input[name="titulo"]').type('Video de prueba');
    cy.get('input[name="url"]').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    cy.get('input[name="orden"]').clear().type('1'); // <=== AQUÍ agregamos el orden

    cy.get('button').contains('Guardar').click();

    cy.wait('@addVideo');
    
// espera que la lista se vuelva a cargar
cy.wait('@getVideosAfter');

    cy.contains('Video de prueba').should('exist');
  });
});
