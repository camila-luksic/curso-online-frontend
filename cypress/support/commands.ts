/// <reference types="cypress" />

// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

declare namespace Cypress {
  interface Chainable {
    /**
     * Hace login por API y mantiene la sesión para los siguientes tests
     * @param email Email del usuario
     * @param password Contraseña del usuario
     */
    loginByApi(email?: string, password?: string): Chainable<void>;

  }
}

const apiUrl = Cypress.env('VITE_API_BASE_URL');

Cypress.Commands.add('loginByApi', (email = 'mateo.valera.asp@gmail.com', password = '123') => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/auth/login`,
    body: { email, password },
  }).then(() => {
    cy.request(`${apiUrl}/usuarios/me`);
  });
});