describe('Profesor asigna nota a un estudiante', () => {
  beforeEach(() => {
    // Login como profesor
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          id: 5,
          username: 'camila_luksic',
          nombre: 'camila',
          apellido: 'luksic',
          email: 'camila@gmail.com',
          rol: { codigo: 'PROF', nombre: 'Profesor' }
        }
      }
    }).as('loginRequest');

    cy.intercept('GET', '/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 5,
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

  it('Asigna una nota a un estudiante', () => {
    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [
        { id: 1, titulo: 'Python', descripcion: 'Curso' }
      ]
    }).as('getCursos');

    cy.intercept('GET', '/api/cursos/1/notas', {
      statusCode: 200,
      body: [
        { estudiante: 'Helen Baldelon', evaluacion: 'Parcial', nota: null }
      ]
    }).as('getNotas');

    cy.intercept('POST', '/api/cursos/1/notas', {
      statusCode: 201,
      body: {
        message: 'Nota asignada correctamente'
      }
    }).as('asignarNota');

    cy.visit('http://localhost:5173/profesor/cursos');
    cy.wait('@getCursos');

    // Entrar al curso
    cy.contains('a', 'Python').click();

    cy.url().should('include', '/cursos/1');
    cy.wait('@getNotas');

    // Escribir la nota para el estudiante
    cy.get('input[name="nota"]').clear().type('95');

    // Guardar la nota
    cy.get('button').contains('Asignar Nota').click();

    cy.wait('@asignarNota');

    // Verificar confirmación
    cy.get('.alert-success').should('contain', 'Nota asignada correctamente');
  });
});
