import { mount } from "@cypress/react";
import Chance from "chance";

const chance = new Chance();

let randomMail = chance.email();
let randomPass = chance.string({ length: 8 });

const successfullAccount = "testesoffpremium@gmail.com";
const successfullPass = "yrb3Lp4v3cvSKH";

const sizes = [
  "iphone-6",
  "iphone-8",
  "samsung-note9",
  "macbook-11",
  "macbook-16",
];

sizes.forEach((size) => {
  describe(`Testando o fluxo de login e acesso negado para ${size}`, () => {
    if (size != "macbook-11" && size != "macbook-16") {
      it("Vai para a página da Off e tenta logar incorretamente - Mobile", () => {
        cy.log("Iniciando simulação de Login");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        //@ts-ignore
        cy.viewport(size);
        //@ts-ignore
        cy.login(randomMail, randomPass, true);
        expect(cy.get('[ng-show="classicAuthError"]')).to.exist;
      });
    } else {
      it("Vai para a página da Off e tenta logar incorretamente- Desktop", () => {
        cy.log("Iniciando simulação de Login");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        cy.viewport(size);
        //@ts-ignore
        cy.login(randomMail, randomPass, false);
        expect(cy.get('[ng-show="classicAuthError"]')).to.exist;
      });
    }
  });
});

sizes.forEach((size) => {
  describe(`Testando o fluxo de login e acesso concedido para ${size}`, () => {
    if (size != "macbook-11" && size != "macbook-16") {
      it("Vai para a página da Off e tenta logar corretamente - Mobile", () => {
        cy.log("Iniciando simulação de Login");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        //@ts-ignore
        cy.viewport(size);
        //@ts-ignore
        cy.login(successfullAccount, successfullPass, true);
        cy.url().should("eq", "https://www.offpremium.com.br/");
      });
    } else {
      it("Vai para a página da Off e tenta logar incorretamente- Desktop", () => {
        cy.log("Iniciando simulação de Login");
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test in case JS loading fails
          return false;
        });
        cy.viewport(size);
        //@ts-ignore
        cy.login(successfullAccount, successfullPass, false);
        cy.url().should("eq", "https://www.offpremium.com.br/");
      });
    }
  });
});
