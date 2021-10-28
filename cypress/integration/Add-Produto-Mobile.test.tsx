import { mount } from "@cypress/react";
import Chance from "chance";

const chance = new Chance();

let randomBrand = chance.natural({ min: 1, max: 5 });
let randomProduct = chance.natural({ min: 1, max: 6 });
const sizes = ["iphone-8", "iphone-6", "samsung-note9"];
let clothSize;

sizes.forEach((size) => {
  describe(`Testando o fluxo de adicionar produtos no carrinho para ${size}`, () => {
    it(`Tries to add a product to the cart in ${size} `, () => {
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
      cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).first().click();
      cy.window().then((item) => {
        //@ts-ignore
        let data = item.skuJson_0;
        data.skus.forEach((produto) => {
          produto.available ? (clothSize = produto.dimensions.Tamanho) : "";
        });
        cy.wrap(clothSize).as("clothSize");
      });
      cy.get("@clothSize").then((clothSize) => {
        cy.get("span").contains(`${clothSize}`).click();
      });
      cy.get("a").contains("Adicionar à sacola").click();
      cy.get(".minicart__handle").click();
    });
  });
});
