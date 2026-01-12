import { assert } from "chai";

describe("handling waits in web driver io", () => {


     it("wait operation for the button to become disabled", async () => {
      
         await browser.url("https://classic.freecrm.com/register/");
        const checkbox = await $('//input[@type="checkbox"]');
        const submitbtn = await $('//button[@type="submit"]');
        
       
        await browser.pause(3000);
        
        await submitbtn.waitForEnabled({ timeout: 4000, reverse: true });

        assert.equal(await submitbtn.isEnabled(), false);
    });


    it(" wait operation for the button to become enabled", async () => {
       
        
        const checkbox = await $('//input[@type="checkbox"]');
        const submitbtn = await $('//button[@type="submit"]');
        
        await checkbox.click();
        await browser.pause(3000);
        //  Wait for button to become enabled
        await submitbtn.waitForEnabled({ timeout: 4000 });

        //  Assert it's enabled
        assert.equal(await submitbtn.isEnabled(), true);
    });


   
});
