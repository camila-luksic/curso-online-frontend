describe('Inicio de sesión', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('mostrar las validaciones al dejar los campos vacíos', () => {
    cy.get('[data-cy="login-button"]').click();
    cy.contains('El email es requerido').should('be.visible');
    cy.contains('El passord es requerida').should('be.visible');
  });


  it('mostrar error si el correo es válido pero la contraseña está vacía', () => {
    cy.get('[data-cy="email-input"]').type('mateo.valera.asp@gmail.com');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('El passord es requerida').should('be.visible');
  });

  it('mostrar un error al ingresar una contraseña incorrecta', () => {
    const email = 'mateo.valera.asp@gmail.com';
    const passwordIncorrecta = 'claveincorrecta789';

    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(passwordIncorrecta);
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="error-message"]').should('contain', 'Contraseña incorrecta');
  });

  it('iniciar sesión con un usuario existente', () => {
    const email = 'mateo.valera.asp@gmail.com';
    const password = '123';

    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/estudiantes/dashboard');
  });
}); 