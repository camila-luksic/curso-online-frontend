/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

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