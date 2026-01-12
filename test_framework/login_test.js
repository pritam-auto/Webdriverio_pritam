//const { assert } = require("chai");
//const LoginPage = require("../pages/loginpage");
//const loginpage = require("../pages/loginpage");

import { assert } from "chai";
import LoginPage from "../pages/loginpage"

describe("handling login page", function () {
this.retries(2);
    it("enter username", async function () {
        await browser.url("https://the-internet.herokuapp.com/login");
        await LoginPage.enterusername("tomsmith");
        const value = await LoginPage.username.getValue();
        assert.equal(value, "tomsmith");
    });
//clear
    // it("clears username",async function () {
    //     await LoginPage.username.click();
    //     await LoginPage.username.clearValue();
    //     const value3=LoginPage.username.getValue();
    //     assert.equal('',value3);
    // })
    it("enter password", async function () {
        
        await LoginPage.enterpassword("SuperSecretPassword!");
        const value2 = await LoginPage.password.getValue();
        assert.equal(value2, "SuperSecretPassword!");
    });
    it("click on login button",async function(){
         await LoginPage.clickonLoginButton();
         await browser.pause(3000);
    });

    
    

});
