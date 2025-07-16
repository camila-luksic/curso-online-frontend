describe('Profesor asigna nota a un estudiante y agrega tipo de nota', () => {
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

    // Cursos del profesor
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

  it('Asigna una nota a un estudiante y agrega un tipo de nota', () => {
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

    // Interceptar peticiones al abrir gestión de notas
    cy.intercept('GET', '/api/cursos/1/inscripciones', {
      statusCode: 200,
      body: [
        {
          id: 1,
          estudianteId: 4,
          cursoId: 1,
          fechaInscripcion: "2025-07-16T20:21:34.982Z",
          estudiante: {
            id: 4,
            nombre: "Camila",
            apellido: "Aguilera",
            email: "737622@nur.edu.bo"
          }
        }
      ]
    }).as('getInscripciones');

    cy.intercept('GET', '/api/cursos/1/tipos-nota', {
      statusCode: 200,
      body: [
        { id: 1, nombre: 'Examen Parcial', cursoId: 1 },
        { id: 2, nombre: 'Examen Final', cursoId: 1 }
      ]
    }).as('getTiposNota');

    cy.intercept('GET', '/api/inscripciones/1/notas', {
      statusCode: 200,
      body: [
        {
          id: 1,
          valor: 9,
          inscripcionId: 1,
          tipoNotaId: 1,
          createdAt: "2025-07-16T20:41:39.158Z"
        },
        {
          id: 2,
          valor: 8,
          inscripcionId: 1,
          tipoNotaId: 2,
          createdAt: "2025-07-16T20:41:46.378Z"
        }
      ]
    }).as('getNotasInscripcion');

    cy.intercept('POST', '/api/inscripciones/1/notas', {
      statusCode: 201,
      body: {
        message: 'Nota asignada correctamente'
      }
    }).as('asignarNota');

    cy.intercept('POST', '/api/cursos/1/tipos-nota', {
      statusCode: 201,
      body: {
        id: 3,
        nombre: 'Proyecto Final',
        cursoId: 1
      }
    }).as('agregarTipoNota');

    // Abrir gestión de notas
    cy.contains('Gestionar notas').click();
    cy.url().should('include', '/cursos/1/gestion-notas');

    // Esperar todas las peticiones de carga
    cy.wait('@getInscripciones');
    cy.wait('@getTiposNota');
    cy.wait('@getNotasInscripcion');

    // Verificar que ya aparece el estudiante
    cy.contains('Camila Aguilera').should('exist');

    // Clic en celda editable y cambiar nota
    cy.contains('Camila Aguilera')
      .parents('tr')
      .find('td')
      .eq(1) // columna: Examen Parcial
      .find('div.flex.items-center.cursor-pointer')
      .click();

    cy.get('input')
      .clear()
      .type('10{enter}');

    cy.wait('@asignarNota');

    // Verificar actualización en UI
    cy.contains('Camila Aguilera')
      .parents('tr')
      .find('td')
      .eq(1)
      .should('contain', '10');

    // Agregar un nuevo tipo de nota
    cy.get('input[placeholder="Nombre del tipo de nota"]').type('Proyecto Final');
    cy.get('button').contains('Agregar').click();

    cy.wait('@agregarTipoNota');

    // Verificar que aparece en la lista
    cy.contains('Proyecto Final').should('exist');
  });
});
