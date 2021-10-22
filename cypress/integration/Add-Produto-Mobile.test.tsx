import { mount } from '@cypress/react';
import Chance from 'chance';

const chance = new Chance();


let randomBrand = chance.natural({min:1, max:5});
let randomProduct = chance.natural({min:1, max:6});
let randomSize = chance.natural({min:1, max:3});
const sizes = ['iphone-8','iphone-6','samsung-note9']


sizes.forEach((size)=>{
  describe(`Testando o fluxo de adicionar produtos no carrinho para ${size}`,
  ()=>{  
    it(`Tries to add a product to the cart in ${size} `, () => {
      cy.viewport(size)
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2')
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test in case JS loading fails
        return false
      })
      cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
      cy.get('.modal-lgpd--btn').click()
      cy.get('.menu-v2-m__button').click()
      cy.get(`:nth-child(3) > :nth-child(${randomBrand}) > a > .lazy--load`).click()
      cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click()
      cy.get('a').contains("Adicionar à sacola").click()
      cy.get(`[data-slick-index="${randomSize}"] > .interactive-modal__sizes--size`).click()
      cy.get('.interactive-modal__bottom--cart-btn').click()
      cy.get('.sc-efHYUO').click()
    });
  })
})

 
