import { mount } from '@cypress/react';
import Chance from 'chance';

const chance = new Chance();

let randomMail = chance.email()
let randomPass = chance.string({ length: 8 })

const sizes = ['iphone-8','iphone-6','samsung-note9']


sizes.forEach((size)=>{
  describe(`Testando o fluxo de login e acesso negado para ${size}`,
  ()=>{  
    it('Goes to offpremium site and tries to login - Mobile', () => {
      cy.log("Iniciando simulação de Login")
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test in case JS loading fails
        return false
      })
      cy.viewport(size)
      cy.log("Visitando a Página - Mobile")
      cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2');
      cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
      cy.log("Acessando a página de Login - Mobile")
      cy.get('.menu__user').click()
      cy.get('#loginWithUserAndPasswordBtn').click()
      cy.scrollTo(0,-500)
      cy.get('#inputEmail').type(randomMail)
      cy.get('#inputPassword').type(randomPass)
      cy.get('#vtexIdUI-form-classic-login > .modal-footer > #classicLoginBtn').click()
      expect(cy.get('[ng-show="classicAuthError"]')).to.exist
    });
  })
})

 


