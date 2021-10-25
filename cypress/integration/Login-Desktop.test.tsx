import { mount } from '@cypress/react';
import Chance from 'chance';

const chance = new Chance();

let randomMail = chance.email()
let randomPass = chance.string({ length: 8 })

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
  cy.get('#loginWithUserAndPasswordBtn').click()
  cy.get('#inputEmail').type(randomMail)
  cy.get('#inputPassword').type(randomPass)
  cy.get('#vtexIdUI-form-classic-login > .modal-footer > #classicLoginBtn').click()
  expect(cy.get('[ng-show="classicAuthError"]')).to.exist
});