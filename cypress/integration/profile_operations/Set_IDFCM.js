///<reference types="Cypress"/>
const user = require("../../fixtures/user")
describe("Set IDFCM",()=>{
    let token ="";






beforeEach(()=>{

    cy.request({
        method :"POST",
        url : user.url + "verifyOTP",
        body:{
            "to": user.to,
            "code": user.code
        }
        
        }).then(resp=>{
            expect(resp.status).to.eq(200)
        
    token = resp.body.result["status"].session["JWT"];
        })
})






it("Set_IDFCM api with valid token",()=>
{
    cy.log("entering valid token")
    cy.request({
        method:"POST",
        url:user.url+"setIDFCM",
        
        headers:{ "Authorization" : "Bearer " + token}
    }).then(res=>
    {
        expect(res.status).to.eq(200)
         cy.log("reponse body is " +JSON.stringify(res))
    })
    cy.log("testcase passed after entering the valid token")
})







it("Set_IDFCM api with invalid token",()=>
{
    cy.log("entering invalid token")
    cy.request({
        method:"POST",
        url:user.url+"setIDFCM",
        headers:{ "Authorization" : "Bearer " +"kansd"} // entering invalid token
    }).then(response=>
    {
        expect(response.status).to.eq(401)
        cy.log("response body is :"+ JSON.stringify(response))
    })
    cy.log("testcases failed after entering the invalid token")
})


})


    

