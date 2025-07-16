describe('Profesor cambia la imagen de un curso', () => {
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
            'cursos:listar',
            'notas:gestionar'
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
          titulo: 'Curso Test',
          descripcion: 'Descripción original',
          categoria: { id: 1, nombre: 'Matemáticas' },
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

  it('Sube una nueva imagen para el curso', () => {
    // Ir a cursos
    cy.visit('http://localhost:5173/profesor/cursos');
    cy.wait('@getCursos');

    // Ver curso
    cy.get('img[alt="Curso Test"]')
      .parents('div.relative')
      .find('button.bg-white')
      .click({ force: true });

    cy.contains('Ver').click({ force: true });
    cy.url().should('include', '/cursos/1');

    // Hacer clic en cambiar imagen
    cy.get('button').contains('Cambiar imagen').click();

    // Adjuntar archivo y enviar
    const filePath = 'descarga (82).jpeg'; // nombre del archivo en cypress/fixtures
    cy.get('input[type="file"]').attachFile(filePath);

    // Interceptar la subida
    cy.intercept('POST', '/api/cursos/1/imagen', {
      statusCode: 200,
      body: {
        message: 'Imagen actualizada correctamente'
      }
    }).as('subirImagen');

    cy.get('button').contains('Subir imagen').click();

   cy.wait('@subirImagen').its('response.statusCode').should('eq', 200);

  });
});
