/// <reference types = "Cypress"/>
const user = require("../../fixtures/user")
describe("verifyEmailVerificationOTP",()=>{
    let jwt= " "
    let token =" "
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
            
        jwt = resp.body.result["status"].session["JWT"];
        cy.request({
            method:"POST",
            url:user.url+"sendEmailVerificationOTP",
            headers:{ "Authorization" : "Bearer " + jwt},
            body:{
                
                    "to": user.to
                 }
                 
                 
        }).then(res1=>{
             expect(res1.status).to.eq(200)
            cy.log(JSON.stringify(res1))
            expect(res1.body.result["status"].result).has.property("message","Verification code sent")
            token = res1.body.token;
            cy.log(JSON.stringify(token))

           
        })
            })
            

    })
    it("validate sendEmailVerificationOTP with valid token and valid mobile number",()=>{
        cy.request({
            method:"POST",
            url:user.url+"verifyEmailVerificationOTP",
            headers:{
                "Authorization" : "Bearer " + token
            },
            body:{
                "to":user.to
            }
        }).then(res=>{
            expect(res.status).to.eq(200)
            if(expect(res.body.result["status"].result).has.property("message", "Verification code sent")&&
            expect(res.body.result["status"].result).has.property("success", true))
            {
                cy.log("By passing valid token and valid phone number response body is showing-----http status code as 200 ok")
                cy.log("By passing valid token and valid phone number response body is showing-----verification code sent")
                cy.log("By passing valid token and valid phone number response body is showing-----success as true")
                cy.log("testcase got passed")
            }
            else
            {
                cy.log("By passing valid token and valid phone number response body is not showing-----http status code as 200 ok")
                cy.log("By passing valid token and valid phone number response body is not showing-----verification code sent")
                cy.log("By passing valid token and valid phone number response body is not showing-----success as true")
                cy.log("testcase got failed")
            }

        })
    })






it("validate verifyEmailVerificationOTP with valid token and invalid phonenumber",()=>{
cy.request({
    method:"POST",
    url:user.url+"verifyEmailVerificationOTP",
    headers:{
        "Authorization" : "Bearer " + token
    },
    body:{
        "to": "+91787878787"
    }
}).then(res1=>{
    expect(res1.status).to.eq(200)
    cy.log(JSON.stringify(res1))
    if(expect(res1.body.result["status"].error).has.property("level", "error"))
    {
       
        cy.log("By passing valid token and invalid phone number response body is showing-----level error")
        cy.log("testcase got passed")
    }
    else
    {
        cy.log("By passing valid token and invalid phone number response body is not showing-----level error")
        cy.log("testcase got failed")

    }
})


})



it("valid verifyEmailVerificationOTP with valid token and phone number field as blank",()=>{
    cy.request({
        method:"POST",
        url:user.url+"verifyEmailVerificationOTP",
        headers:{
            "Authorization" : "Bearer " + token
        },
        body:{
            "to": " "
        }
    }).then(res2=>{
        expect(res2.status).to.eq(200)
        cy.log(JSON.stringify(res2))
        if(expect(res2.body.result["status"].error).has.property("level", "error"))
        {
           
            cy.log("By passing valid token and empty phone number response body is showing-----level error")
            cy.log("testcase got passed")
        }
        else
        {
            cy.log("By passing valid token and empty phone number response body is not showing-----level error")
            cy.log("testcase got failed")
    
        }
    })

})










})