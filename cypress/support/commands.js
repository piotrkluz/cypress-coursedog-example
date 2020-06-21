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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("_given", (text) => { cy.log('--- GIVEN ' + text) })
Cypress.Commands.add("_when", (text) => { cy.log('--- WHEN ' + text) })
Cypress.Commands.add("_then", (text) => { cy.log('--- THEN ' + text) })
Cypress.Commands.add("_and", (text) => { cy.log('--- AND ' + text) })
Cypress.Commands.add("_but", (text) => { cy.log('--- BUT ' + text) })