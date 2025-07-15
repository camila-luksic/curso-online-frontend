describe('Estudiante ve y se inscribe en un curso', () => {
  beforeEach(() => {
    // intercept login
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token-123',
        user: {
          id: 3,
          username: 'helen_baldelomar',
          nombre: 'Helen',
          apellido: 'Baldelomar',
          email: 'helen@gmail.com',
          rol: { codigo: 'EST', nombre: 'Estudiante' }
        }
      }
    }).as('loginRequest');

    // intercept GET /me
    cy.intercept('GET', '/api/usuarios/me', {
      statusCode: 200,
      body: {
        id: 3,
        username: 'helen_baldelomar',
        nombre: 'Helen',
        apellido: 'Baldelomar',
        email: 'helen@gmail.com',
        rol: { codigo: 'EST', nombre: 'Estudiante' }
      }
    }).as('getMe');

    // intercept cursos
    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          titulo: 'Python',
          descripcion: 'Curso básico de Python',
          categoria: { id: 1, nombre: 'Programación' },
          profesor: { id: 1, nombre: 'Camila', apellido: 'Luksic' }
        }
      ]
    }).as('getCursos');

    // login UI
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('helen@gmail.com');
    cy.get('input[name="password"]').type('helen123');
    cy.get('button[type=submit]').click();

    cy.wait('@loginRequest');
    cy.wait('@getMe');

    cy.url().should('include', '/estudiantes/dashboard');
  });

  it('Abre el curso desde el menú contextual', () => {
    cy.visit('http://localhost:5173/estudiantes/cursos');
    cy.wait('@getCursos');

    // abre el menú contextual en la tarjeta del curso "Python"
     cy.get('img[alt="Python"]')
      .parents('div.relative')
      .find('button.bg-white')
      .click({ force: true });

    // hace clic en `Ver`
    cy.contains('button', 'Ver').click({ force: true });

    // verificar que la URL cambió al detalle del curso
    cy.url().should('include', '/cursos/1');

    // intercept POST inscripción si es que el detalle permite inscribirse
    cy.intercept('POST', '/api/cursos/1/inscripcion', {
      statusCode: 200,
      body: { message: 'Inscripción exitosa' }
    }).as('inscribirse');

    // en la vista de detalle, clic en inscribirse
    cy.get('button').contains('Inscribirse').click();

    cy.wait('@inscribirse');

    // verificar que ahora muestra algún estado inscrito
    cy.get('.alert-success').should('contain', 'Inscripción exitosa');
  });
});
