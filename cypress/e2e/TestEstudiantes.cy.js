describe('Estudiante visualiza videos del curso', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          id: 6,
          username: 'helen_baldelon',
          nombre: 'helen',
          apellido: 'baldelon',
          email: 'helen@gmail.com',
          rol: { codigo: 'STUDENT', nombre: 'Estudiante' }
        }
      }
    }).as('loginRequest');

    cy.intercept('GET', '/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 6,
        username: 'helen_baldelon',
        nombre: 'helen',
        apellido: 'baldelon',
        email: 'helen@gmail.com',
        rol: { codigo: 'STUDENT', nombre: 'Estudiante' }
      }
    }).as('getMe');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('helen@gmail.com');
    cy.get('input[name="password"]').type('helen123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/dashboard');
  });

  it('Visualiza los videos del curso', () => {
    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [
        { id: 1, titulo: 'Python', descripcion: 'Curso', categoria: { nombre: 'Programación' } }
      ]
    }).as('getCursos');

    cy.intercept('GET', '/api/cursos/1/videos', {
      statusCode: 200,
      body: [
        { id: 1, titulo: 'Video 1', url: 'https://youtube.com/1', orden: 1 }
      ]
    }).as('getVideos');

    cy.visit('http://localhost:5173/estudiantes/cursos');
    cy.wait('@getCursos');

    // Haz clic directamente en el link del curso
    cy.contains('a', 'Python').click();

    cy.url().should('include', '/cursos/1');
    cy.wait('@getVideos');

    cy.contains('Video 1').should('exist');
  });
});
