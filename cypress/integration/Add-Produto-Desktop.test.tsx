import { mount } from '@cypress/react';
import Chance from 'chance';

const chance = new Chance();

let randomBrandColumn = chance.natural({min:1, max:5});
let randomBrand = chance.natural({min:1, max:5});
let randomProduct = chance.natural({min:1, max:7});
it('Get a random product and add it to the cart - Desktop', () => {
  cy.log("Iniciando simulação de Adição ao Carrinho")
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test in case JS loading fails
    return false
  })
  cy.viewport(1280,720)
  cy.visit('/');
  cy.get('.newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc').click()
  cy.get('.unordered-list > :nth-child(1) > a').trigger('mouseover')
  cy.get(`.sc-bUQyIj > :nth-child(${randomBrandColumn}) > :nth-child(${randomBrand})`).click()
  cy.log("Visitando a Página de Produto - Desktop")
  cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click()
  cy.scrollTo(0, -500)
  cy.get('.product__add-to-cart').click()

});