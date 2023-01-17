/// <reference types = "Cypress"/>

const user = require("../../fixtures/user")
describe("Login verification with valid otp",()=>{

    it("verify login api with valid phone number an valid otp",()=>
    {
    cy.request({
    method: "POST",
    url : user.url + "verifyOTP",
    body:{
        "to": user.to,
        "code": user.code
    }
    }).then(res=>{
        expect(res.status).to.eq(200)
        cy.log(JSON.stringify(res))
        if(
        
        expect(res.body.result["status"].result).has.property("message","Verification code sent"))
        {
            cy.log("validation of verifyOTP got passed--response body is showing --message:verification code sent")
        }
        else
        {
            cy.log("validation of verifyOTP got failed--response body is not showing --message:verification code sent")
        }
       })
       
    })
    it("verify login api with invalid phone number and valid otp",()=>
       {
        cy.request({
            method:"POST",
            url:user.url+"verifyOTP",
            body:{
                "to":"+91787878787",
                "code":user.code
            }


       }).then(res1=>{
        expect(res1.status).to.eq(200)
        cy.log(JSON.stringify(res1))
        if(expect(res1.body.result["status"].error).has.property("success", false) &&
        expect(res1.body.result["status"].error).has.property("message","Invalid parameter `To`: +91787878787") &&
        expect(res1.body.result["status"].error).has.property("level", "error"))
        {
            cy.log("By passing invalid phone no. response body is showing error message --success:false ")
            cy.log("By passing invalid phone no. response body is showing error message --message:invalid parameter")
            cy.log("By passing invalid phone no. response body is showing error message --level:error")
            cy.log("testcase got passed")

        }
        else
        {
            cy.log("By passing invalid phone no. response body is not showing error message --success:false ")
            cy.log("By passing invalid phone no. response body is not showing error message --message:invalid parameter")
            cy.log("By passing invalid phone no. response body is not showing error message --level:error")
            cy.log("testcase got failed")

        }
       })
       })

       it("validate verifyOTP with empty body",()=>
       {
        cy.request({
            method:"POST",
            url:user.url+"verifyOTP",
            body:{

            }
        }).then(res2=>{
            expect(res2.status).to.eq(200)
            cy.log(JSON.stringify(res2))
            if(expect(res2.body.result["status"].error).has.property("level", "error"))
            {
                cy.log("By passing empty body it is showing error message --level:error ")
                cy.log("testcase got passed")

            }
            else
            {
                cy.log("By passing empty body it is not showing error message --level:error ")
                cy.log("testcase got failed")
            }

        })


       })
       
})