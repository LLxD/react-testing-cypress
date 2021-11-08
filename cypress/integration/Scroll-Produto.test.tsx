import { mount } from "@cypress/react";
import Chance from "chance";

const chance = new Chance();

let randomBrand = chance.natural({ min: 1, max: 5 });
let randomBrandColumn = chance.natural({ min: 1, max: 5 });
const sizes = [
  "iphone-6",
  "iphone-8",
  "samsung-note9",
  "macbook-11",
  "macbook-16",
];

sizes.forEach((size) => {
  describe(`Testando o fluxo de scrollar e carregar novos produtos para ${size}`, () => {
    if (size != "macbook-11" && size != "macbook-16") {
      it(
        `Tenta scrollar e verifica se os produtos carregaram -  ${size} `,
        { retries: 3 },
        () => {
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
          //@ts-ignore
          cy.testLoading(3000, 10000, 5000, true);
        }
      );
    } else {
      it(
        `Tenta scrollar e verifica se os produtos carregaram -  ${size} `,
        { retries: 3 },
        () => {
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
          //@ts-ignore
          cy.testLoading(3000, 10000, 5000, false);
        }
      );
    }
  });
});
