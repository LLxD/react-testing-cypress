import { mount } from '@cypress/react';
import Chance from 'chance';

const chance = new Chance();


let randomBrand = chance.natural({min:1, max:5});
let randomProduct = chance.natural({min:1, max:6});
let randomSize = chance.natural({min:1, max:3});

const sizes = [[375, 667], [375, 812], [360, 640]]



sizes.forEach((size) => {



  describe(`Testando o fluxo de adicionar produtos no carrinho para ${size} `,
  {
    "viewportWidth": size[0],
    "viewportHeight": size[1]
  },
  ()=>{
    before(()=> {
      cy.log("Iniciando simulação de Login")
      cy.log("Visitando a Página - Mobile")
      cy.visit('https://www.offpremium.com.br/?uam=true&mobile=2');
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test in case JS loading fails
        return false
      })
      Cypress.config({
        viewportWidth: size[0],
        viewportHeight: size[1],
      })
    })


    it(`Tries to close the modal - ${size}`, () => {
      cy.get('.newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp').click()
      cy.get('.modal-lgpd--btn').click()
    });
    
    it(`Tries to open the menu - ${size}`, () => {
      cy.get('.menu-v2-m__button').click()
    });
    
    it(`Chooses a random brand and navigates to it - ${size}`, () => {
      cy.get(`:nth-child(3) > :nth-child(${randomBrand}) > a > .lazy--load`).click()
    });
    
    it(`Chooses a random product and navigates to it - ${size}`, () => {
      cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click()
    });
    
    it(`Tries to add the product to cart - ${size}`, () => {
      cy.get('.product__fab--button > .product__add-to-cart').click()
      cy.get(`.interactive-modal__sizes > .slick-list > .slick-track > [data-slick-index="${randomSize}"]`).click()
      cy.get('.interactive-modal__bottom--cart-btn').click()
    });
    it(`Opens the cart and verifies the product is there - ${size}`, () => {
      cy.get('.sc-efHYUO').click()
    });

  })

})