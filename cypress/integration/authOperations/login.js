/// <reference types = "Cypress"/>
const user = require("../../fixtures/user")

describe("login api",()=>{

it("verify login api with valid number",()=>
{
cy.request({
method: "POST",
//url:"https://nest-gateway-develop.volary.io/apiprocess/login",
url : user.url + "login",
body:{
    "to": user.to
}
}).then((res)=>{
    if(
    expect(res.status).to.eq(200) &&
    expect(res.body.result["status"].result).has.property("message","Verification code sent"))
    {
cy.log("verifcation code sent from valid phone number");
cy.log(JSON.stringify(res))
    }
    else
    {
        cy.log("verification code not sent from valid phone number");
    }
   
    })
})
it("verify login with invalid 9 digit phone number",()=>{
cy.request({
    method:"POST",
    url:user.url +"login",
    body:{
        "to":"+91787878787"
    }
}).then(resp=>{
   
    cy.log(JSON.stringify(resp))
    if(expect(resp.status).to.eq(200) &&
    expect(resp.body.result["status"].error["error"]).has.property("status",400))
    {
        cy.log("By passing invalid 9 digit mobile number response body is showing status as 400")
        cy.log("verification code not sent")
        cy.log("testcase got passed")
    }
    else
    {
        cy.log("By passing invalid 9 digit mobile number response body is showing different status")
        cy.log("verification code sent ")
        cy.log("testcase got failed")
    }
   
    
   
})
})
it("verify login with empty body",()=>{
    cy.request(
        {
            method:"POST",
            url:user.url + "login",
            body:{

            }

        }
    ).then(resp2=>{
        
        cy.log(JSON.stringify(resp2))
        expect(resp2.status).to.eq(200)
        if(expect(resp2.body.result["status"].error).has.property("level","error"))
        {
            cy.log("inside the response body error message is seen")
            cy.log("verification code not sent")
        }
        else
        {
            cy.log("inside the response body error message not seen")
            cy.log("testcase got failed")
        }
       })
       it("verify login without phone number in to attribute",()=>{
        cy.request({
            method:"POST",
            url:user.url+"login",
            body:{
                "to":" "
            }
        }).then(resp3=>{
            expect(resp3.status).to.eq(200)
            cy.log(JSON.stringify(resp3))
            if(expect(resp3.body.result["status"].error).has.property("level","error"))
            {
                cy.log("inside the response body error message is seen")
                cy.log("verification code not sent")
            }
            else
            {
                cy.log("inside the response body error message not seen")
                cy.log("testcase got failed")
            }
        })
       })
})

})