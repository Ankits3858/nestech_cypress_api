/// <reference types = "Cypress"/>
const user = require("../../fixtures/user")
describe("validate sendEmailVerificationOTP",()=>{
    let token ="";
beforeEach(()=>{

    cy.request({
        method :"POST",
        url : user.sand + "verifyOTP",
        body:{
            "to": user.to,
            "code": user.code
        }
        
        }).then(resp=>{
            expect(resp.status).to.eq(200)
        
    token = resp.body.result["status"].session["JWT"];
        })
})


it("validate sendEmailVerificationOTP with valid token and valid mobile number",()=>{
    cy.request({
        method:"POST",
        url:user.sand+"sendEmailVerificationOTP",
        headers:{ "Authorization" : "Bearer " + token},
        body:{
            
                "to": user.to
             }
             
             
    }).then(res1=>{
        expect(res1.status).to.eq(200)
        cy.log(JSON.stringify(res1))
        if(expect(res1.body.result["status"].result).has.property("message","Verification code sent"))
        {
            cy.log("By passing valid token and valid mobile number ----response body shows verification message sent")
            cy.log("By passing valid token and valid mobile number ----response body shows a token")
            cy.log("testcase got passed")

        }
        else
        {
            cy.log("By passing valid token and valid mobile number ----response body not shows verification message sent")
            cy.log("By passing valid token and valid mobile number ----response body not shows a token")
            cy.log("testcase got failed")
        }
    })
})



it("validate sendEmailVerificationOTP with valid token and invalid mobile number",()=>{
cy.request({
    method:"POST",
    url:user.sand+"sendEmailVerificationOTP",
    headers:{ "Authorization" : "Bearer " +token},
        body:{
            
            "to": "+9178787878"
             }


}).then(res2=>{
expect(res2.status).to.eq(200)
cy.log(JSON.stringify(res2))
if(expect(res2.body.result["status"].error["error"]).has.property("status",400))
{
    cy.log("By passing invalid number response body shows---- status as 400")
   
    cy.log("testcase got passed")
}
else{
    cy.log("By passing invalid number response body does not shows---- status as 400")
   
    cy.log("testcase got failed")
}    
})
})




it("validate sendEmailVerificationOTP with valid token and empty phone number",()=>{
cy.request({
    method:"POST",
    url:user.sand+"sendEmailVerificationOTP",
    headers:{ "Authorization" : "Bearer " +token},
        body:{
            
            "to": " "
             }
}).then(res3=>{
    expect(res3.status).to.eq(200)
    cy.log(JSON.stringify(res3))
    if(expect(res3.body.result["status"].error["error"]).has.property("status",400))
    {
        cy.log("By passing invalid number response body shows---- status as 400")
       
        cy.log("testcase got passed")
    }
    else{
        cy.log("By passing invalid number response body does not shows---- status as 400")
       
        cy.log("testcase got failed")
    }  
})
})


})