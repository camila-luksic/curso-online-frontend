describe('Editar y eliminar curso', () => {
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
            'cursos:editar',
            'cursos:eliminar'
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
          id: 10,
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

  it('Edita un curso existente', () => {
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
          id: 1,
          username: 'camila_luksic',
          nombre: 'camila',
          apellido: 'luksic',
          email: 'camila@gmail.com',
          rol: { codigo: 'PROF', nombre: 'Profesor' }
        }
      ]
    }).as('getProfesores');

    cy.visit('http://localhost:5173/profesor/cursos');
    cy.wait('@getCursos');

    cy.get('img[alt="Curso Test"]')
      .parents('div.relative')
      .find('button.bg-white')
      .click({ force: true });

    cy.contains('Editar').click({ force: true });

    cy.wait('@getCategorias');
    cy.wait('@getProfesores');

    cy.intercept('PATCH', '/api/cursos/10', {
      statusCode: 200
    }).as('updateCurso');

    cy.get('input[name="titulo"]').clear().type('Curso Editado');
    cy.get('textarea[name="descripcion"]').clear().type('Descripción editada');
    cy.get('select[name="categoriaId"]').select('Ciencias');
    cy.get('select[name="profesorId"]').select('camila luksic');


    cy.intercept('GET', '/api/cursos', {
  statusCode: 200,
  body: [
    {
      id: 10,
      titulo: 'Curso Editado',
      descripcion: 'Descripción editada',
      categoria: { id: 2, nombre: 'Ciencias' },
      profesor: { id: 1, nombre: 'camila', apellido: 'luksic' }
    }
  ]
}).as('getCursosAfterEdit');


    cy.get('button').contains('Guardar').click();

    cy.wait('@updateCurso');
    
cy.wait('@getCursosAfterEdit');

    cy.contains('Curso Editado').should('exist');
  });

  it('Elimina un curso existente', () => {
    cy.visit('http://localhost:5173/profesor/cursos');
    cy.wait('@getCursos');

    cy.intercept('DELETE', '/api/cursos/10', { statusCode: 200 }).as('deleteCurso');

    cy.intercept('GET', '/api/cursos', {
      statusCode: 200,
      body: [] // lista vacía después de borrar
    }).as('getCursosAfterDelete');

    cy.get('img[alt="Curso Test"]')
      .parents('div.relative')
      .find('button.bg-white')
      .click({ force: true });

    cy.contains('Eliminar').click({ force: true });

    cy.wait('@deleteCurso');
    cy.wait('@getCursosAfterDelete');

    cy.contains('Curso Test').should('not.exist');
  });
});
