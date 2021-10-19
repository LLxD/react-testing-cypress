import { mount } from '@cypress/react';


let randomBrand = Math.floor(Math.random() * 4)+1;
let randomProduct = Math.floor(Math.random() * 5)+1;
let randomSize = Math.floor(Math.random() * 2)+1;

it('Goes to offpremium site and tries to login - Mobile', () => {
  cy.log("Iniciando simulação de Login")
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test in case JS loading fails
    return false
  })
  cy.viewport(375,667)
  // cy.clearCookies()
  cy.log("Visitando a Página - Mobile")
  cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2');
  cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
  cy.log("Acessando a página de Login - Mobile")
  // cy.get('.modal-lgpd--btn').click()
  cy.get('.menu-v2-m__button').click()
  cy.get(`:nth-child(3) > :nth-child(${randomBrand}) > a > .lazy--load`).click()
  cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click()
  cy.get('.product__fab--button > .product__add-to-cart').click()
  cy.get(`.interactive-modal__sizes > .slick-list > .slick-track > [data-slick-index="${randomSize}"]`).click()
  cy.get('.interactive-modal__bottom--cart-btn').click()
  cy.get('.sc-efHYUO').click()
});