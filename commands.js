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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('payment',() => {
//         cy.get('#sp_payee').select('bofa')
//         cy.get('#sp_account').select("5")
//         cy.get('#sp_amount').type('50')
//         cy.get('#sp_date').type('2023-02-15')
// })

// Cypress.Commands.add('login',(username,password) => {
//     cy.clearCookies()
//     cy.clearLocalStorage()

//             cy.get('#user_login').clear().type(username)
//             cy.get('#user_password').clear().type(password)
//             cy.get('input[name="submit"]').click()
// });

// Cypress.Commands.add('Login',() => {
//         cy.get('#user-name').click();
//         cy.get('#user-name').type('standard_user');
//         cy.get('#password').clear();
//         cy.get('#password').type('secret_sauce');
//         cy.get('#login-button').submit
//         cy.get('#login-button').should('be.visible');
//         cy.get('#login-button').click();
// })

Cypress.Commands.add('loginViaAPI', (
        email = Cypress.env('userEmail'),
        password = Cypress.env('userPassword')
) => {
        cy.request('POST', "${Cypress.env('apiUrl')}/users/login", {
                username: email,
                password,
        }).then((response) => {
                cy.setCookie('sessionId', response.body.sessionId)
                cy.setCookie('userId', response.body.userId)
                cy.setCookie('userName', response.body.userName)
                cy.visit('/#!/main')
        })
})