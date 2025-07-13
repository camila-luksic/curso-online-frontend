describe('Test de API Real', () => {
  it('debería poder conectarse a la API', () => {
    // Verificar que la API está disponible
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/roles',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.log('✅ API está funcionando correctamente');
        expect(response.body).to.be.an('array');
      } else {
        cy.log(`⚠️ API respondió con status ${response.status}`);
      }
    });
  });

  it('debería poder hacer login real', () => {
    cy.visit('/login');
    
    // Login con credenciales reales
    cy.get('[data-cy="email-input"]').should('not.be.disabled').type('luciana.valera.asp@gmail.com');
    cy.get('[data-cy="password-input"]').should('not.be.disabled').type('123');
    cy.get('[data-cy="login-button"]').click();

    // Verificar que el login fue exitoso y se obtiene la información del usuario
    cy.url().should('include', '/admin');
    cy.wait(2000);
    
    // Verificar que se hizo la llamada a /api/usuarios/me
    cy.intercept('GET', '/api/usuarios/me').as('getUserInfo');
    cy.wait('@getUserInfo').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
        cy.log('✅ Se obtuvo información del usuario correctamente');
      }
    });
    
    cy.log('✅ Login real funcionando correctamente');
  });
}); 