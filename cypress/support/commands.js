// ***********************************************
// This example commands.js shows you how to
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


Cypress.Commands.add('login', (username, password, mobile) => {
    if(mobile){
        cy.log("Visitando a Página - Mobile")
        cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2');
        cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
        cy.log("Acessando a página de Login - Mobile")
        cy.get('.menu__user').click()
        cy.get('#loginWithUserAndPasswordBtn').click()
        cy.scrollTo(0,-500)
        cy.get('#inputEmail').type(username)
        cy.get('#inputPassword').type(password)
        cy.get(
            "#vtexIdUI-form-classic-login > .modal-footer > #classicLoginBtn"
          ).click();
    }
    else{
        cy.log("Visitando a Página - Desktop")
        cy.visit('/');
        cy.get('.newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc').click()
        cy.log("Acessando a página de Login - Desktop")
        cy.get('.sc-dlMDgC').click()
        cy.get('#loginWithUserAndPasswordBtn').click()
        cy.get('#inputEmail').type(username)
        cy.get('#inputPassword').type(password)
        cy.get('#vtexIdUI-form-classic-login > .modal-footer > #classicLoginBtn').click()
    }
  })