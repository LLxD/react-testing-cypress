import React from 'react';
import { mount } from '@cypress/react';
import App from './App';

it('Checks if theres a button with Click ME :D', () => {
  mount(<App />);
  cy.contains('Click ME :D').click();
});