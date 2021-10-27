import { mount } from '@cypress/react';
import lodash from "lodash"
import Chance from 'chance';

const chance = new Chance();

let produtosIniciais = 0
let produtosFinais = 0


let randomBrand = chance.natural({min:1, max:5});
let randomProduct = chance.natural({min:1, max:6});
let randomSize = chance.natural({min:1, max:3});
const sizes = ['iphone-8','iphone-6','samsung-note9']


sizes.forEach((size)=>{
  describe(`Testando o fluxo de scrollar e carregar novos produtos para ${size}`,
  ()=>{  
    it(`Tries to scroll and load more products -  ${size} `, () => {
      //@ts-ignore
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
      cy.get('.prateleira > ul > li').then((li)=>{
        produtosIniciais = li.length 
      })
      cy.scrollTo(0, 2000,  { duration: 3000 })
      cy.get('.prateleira > ul > li').then((li)=>{
        produtosFinais = li.length
        expect(produtosIniciais).to.be.lessThan(produtosFinais)
      })
    });
  })
})