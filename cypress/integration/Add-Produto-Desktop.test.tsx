import { mount } from '@cypress/react';

let randomBrandColumn = Math.floor(Math.random() * 4)+1;
let randomBrand = Math.floor(Math.random() * 4)+1;
let randomProduct = Math.floor(Math.random() * 8)+1;
it('Get a random product and add it to the cart - Desktop', () => {
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
  cy.get('.unordered-list > :nth-child(1) > a').trigger('mouseover')
  cy.get(`.sc-bUQyIj > :nth-child(${randomBrandColumn}) > :nth-child(${randomBrand})`).click()
  cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click()

//   cy.log("Acessando a página de Login - Desktop")
});