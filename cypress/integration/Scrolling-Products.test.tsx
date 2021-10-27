import { mount } from "@cypress/react";
import lodash from "lodash";
import Chance from "chance";

const chance = new Chance();

let produtosIniciais = 0;
let produtosFinais = 0;
let randomBrand = chance.natural({ min: 1, max: 5 });
let randomBrandColumn = chance.natural({ min: 1, max: 5 });
const sizes = [
  "iphone-8",
  "iphone-6",
  "samsung-note9",
  "macbook-11",
  "macbook-16",
];

sizes.forEach((size) => {
  describe(`Testando o fluxo de scrollar e carregar novos produtos para ${size}`, () => {
    if (size != "macbook-11" && size != "macbook-16") {
      it(`Tries to scroll and load more products -  ${size} `, () => {
        //@ts-ignore
        cy.viewport(size);
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit("https://www.offpremium.com.br/?uam=true&mobile=2");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        cy.get(
          ".newsletter__popup > .sc-jrsJWt > .sc-crzoAE > .sc-dIsUp"
        ).click();
        cy.get(".modal-lgpd--btn").click();
        cy.get(".menu-v2-m__button").click();
        cy.get(
          `:nth-child(3) > :nth-child(${randomBrand}) > a > .lazy--load`
        ).click();
        cy.get(".prateleira > ul > li").then((li) => {
          produtosIniciais = li.length;
        });
        cy.scrollTo(0, 3000, { duration: 5000 });
        cy.get(".prateleira > ul > li").then((li) => {
          produtosFinais = li.length;
          expect(produtosIniciais).to.be.lessThan(produtosFinais);
        });
      });
    } else {
      it(`Tries to scroll and load more products -  ${size} `, () => {
        cy.viewport(size);
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit("https://www.offpremium.com.br/?uam=false");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        cy.get(
          ".newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc"
        ).click();
        cy.get(".unordered-list > :nth-child(1) > a").trigger("mouseover");
        cy.get(
          `.sc-bUQyIj > :nth-child(${randomBrandColumn}) > :nth-child(${randomBrand})`
        ).click();
        cy.get(".prateleira > ul > li").then((li) => {
          produtosIniciais = li.length;
        });
        cy.scrollTo(0, 6000, { duration: 5000 });
        cy.get(".prateleira > ul > li").then((li) => {
          produtosFinais = li.length;
          expect(produtosIniciais).to.be.lessThan(produtosFinais);
        });
      });
    }
  });
});
