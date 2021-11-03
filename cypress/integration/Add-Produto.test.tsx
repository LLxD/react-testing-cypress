import { mount } from "@cypress/react";
import Chance from "chance";

const chance = new Chance();

let randomBrand = chance.natural({ min: 1, max: 5 });
let randomBrandColumn = chance.natural({ min: 1, max: 5 });
let randomProduct = chance.natural({ min: 1, max: 6 });
let randomCoupon = chance.string({ length: 8 });
let randomSeller = chance.string({ length: 4 });
const sizes = [
  "iphone-8",
  "iphone-6",
  "samsung-note9",
  "macbook-11",
  "macbook-16",
];
let clothSize;

describe(`Testando o fluxo de adicionar produtos no carrinho para mobile e desktop`, () => {
  sizes.forEach((size) => {
    if (size != "macbook-11" && size != "macbook-16") {
      it(`Tenta adicionar produtos ao carrinho em: ${size} `, () => {
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
        cy.get(`.prateleira > ul > :nth-child(${randomProduct})`)
          .first()
          .click();
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
        cy.get(".sc-dkuGKe").click();
        cy.get(".sc-laZMeE > .sc-lbVvki > .sc-dPaNzc").type(randomCoupon);
        cy.get(".sc-eJocfa > .sc-lbVvki > .sc-dPaNzc").type(randomSeller);
        cy.get(".sc-laZMeE > .sc-cTJkRt").click();
        cy.get(".sc-eJocfa > .sc-cTJkRt").click();
        expect(cy.get(".sc-laZMeE > .sc-lbVvki > .sc-gGLxEB")).to.exist;
        expect(cy.get(".sc-eJocfa > .sc-lbVvki > .sc-gGLxEB")).to.exist;
      });
    } else {
      it(`Tenta adicionar produtos ao carrinho em: ${size}`, () => {
        cy.log("Iniciando simulação de Adição ao Carrinho");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        cy.viewport(size);
        cy.visit("/");
        cy.get(".modal-lgpd--btn").click({ force: true });
        cy.get(
          ".newsletter__popup > .sc-bdnxRM > .sc-hKFxyN > .sc-eCApnc"
        ).click();
        cy.get(".unordered-list > :nth-child(1) > a").trigger("mouseover");
        cy.get(
          `.sc-bUQyIj > :nth-child(${randomBrandColumn}) > :nth-child(${randomBrand})`
        ).click();
        cy.log("Visitando a Página de Produto - Desktop");
        cy.get(`.prateleira > ul > :nth-child(${randomProduct})`).click();
        // cy.get("a").contains("Adicionar à Sacola").as("addToCart")
        cy.window().then((item) => {
          //@ts-ignore
          let data = item.skuJson_0;
          data.skus.forEach((produto) => {
            produto.available ? (clothSize = produto.dimensions.Tamanho) : "";
          });
          cy.wrap(clothSize).as("clothSize");
        });
        cy.get("@clothSize").then((clothSize) => {
          cy.get(`.skuespec_Tamanho_opcao_${clothSize}`).click({ force: true });
        });
        cy.get("a").contains("Adicionar à Sacola").click({ force: true });
        cy.get(".minicart__content").should("be.visible", { timeout: 10000 });
        cy.get(".minicart-vendor").type(randomSeller + "{enter}");
        cy.get(".minicart-vendor").should("have.class", "js-error");
        cy.get(".minicart-coupon")
          .click()
          .type(randomCoupon + "{enter}");
        cy.get(".minicart-coupon").should("have.class", "js-error");
        cy.get("a").contains("Prosseguir").click();
      });
    }
  });
});
