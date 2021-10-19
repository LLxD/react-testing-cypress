import React from 'react';
import { mount } from '@cypress/react';
import App from './App';

it('Checks if theres a link with Learn React in it', () => {
  mount(<App />);
  cy.get('a').contains('Learn React');
});