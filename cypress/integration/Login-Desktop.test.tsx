import { mount } from '@cypress/react';

it('Goes to offpremium site and tries to login - Desktop', () => {
  cy.log("Iniciando simulação de Login")
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test in case JS loading fails
    return false
  })
  cy.viewport(1280,720)
  cy.log("Visitando a Página - Desktop")
  cy.visit('/');
  cy.get('.newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc').click()
  cy.log("Acessando a página de Login - Desktop")
  cy.get('.sc-dlMDgC').click()
});