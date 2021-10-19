import React from 'react';
import { mount } from '@cypress/react';

it('Goes to offpremium site and tries to login', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
cy.viewport(1280,720)
cy.visit('/');
cy.get('.newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc').click()
cy.get('.sc-dlMDgC').click()

});