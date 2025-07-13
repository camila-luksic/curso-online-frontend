describe('Test de Login - Integración Real', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('debe hacer login real con credenciales válidas', () => {

    cy.get('[data-cy="email-input"]').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').type('123');
    cy.get('[data-cy="login-button"]').click();

    cy.wait(2000);

    cy.url().should('include', '/admin/dashboard');
    cy.get('h1').should('contain', '¡Hola,');
  });

  it('debe mostrar error real con credenciales inválidas', () => {
    cy.get('[data-cy="email-input"]').type('usuario@inexistente.com');
    cy.get('[data-cy="password-input"]').type('passwordincorrecto');
    cy.get('[data-cy="login-button"]').click();

    cy.wait(2000);

    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('debe manejar timeout real de la API', () => {
    
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('test123');
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="error-message"]', { timeout: 10000 }).should('be.visible');
  });
}); 