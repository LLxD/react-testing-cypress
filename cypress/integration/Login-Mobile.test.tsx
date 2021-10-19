import { mount } from '@cypress/react';


it('Goes to offpremium site and tries to login - Mobile', () => {
  cy.log("Iniciando simulação de Login")
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test in case JS loading fails
    return false
  })
  cy.viewport(375,667)
  cy.log("Visitando a Página - Mobile")
  cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2');
  cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
  cy.log("Acessando a página de Login - Mobile")
  cy.get('.menu__user').click()
});