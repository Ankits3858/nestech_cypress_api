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
/*let token = "";
const user = require("../../fixtures/user")
Cypress.Commands.add("Login_api",()=>{
cy.request({
    method: "POST",
    url:"https://nest-gateway-develop.volary.io/apiprocess/verifyOTP",
    body:{
        "to": user.to,
        "code": user.code
    }

}).then((res)=>{
    expect(res.status).to.eq(200)
//token =res.body.result["status"].session["JWT"];
Cypress.env("token",res.body.result["status"].session["JWT"])
})
}) */