describe('Estudiante visualiza notas del curso', () => {
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

  it('Visualiza las notas del curso', () => {
    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [
        { id: 1, titulo: 'Python', descripcion: 'Curso', categoria: { nombre: 'Programación' } }
      ]
    }).as('getCursos');

    cy.intercept('GET', '/api/cursos/1/notas', {
      statusCode: 200,
      body: [
        { evaluacion: 'Examen Parcial', nota: 85 },
        { evaluacion: 'Proyecto Final', nota: 90 }
      ]
    }).as('getNotas');

    cy.visit('http://localhost:5173/estudiantes/cursos');
    cy.wait('@getCursos');

    // Clic en el link del curso
    cy.contains('a', 'Python').click();

    cy.url().should('include', '/cursos/1');
    cy.wait('@getNotas');

    // Verifica que las notas aparecen
    cy.contains('Examen Parcial').should('exist');
    cy.contains('85').should('exist');
    cy.contains('Proyecto Final').should('exist');
    cy.contains('90').should('exist');
  });
});
