import {assert} from "chai";

describe("wait for del button",async () => {
    it("should wait for delete button",async () => {
        await browser.url("https://the-internet.herokuapp.com/add_remove_elements/");
        const addbutton=await $('//div[@class="example"]//button[text()="Add Element"]');

        const delbutton=await $('//div[@class="example"]//button[text()="Delete"]');

        await addbutton.waitForDisplayed();
        await addbutton.click();

         await browser.pause(3000);

        await delbutton.waitForExist(4000);

        assert.equal(true,await delbutton.isExisting());

        await delbutton.click();
        assert.equal(false,await delbutton.isExisting());

        await browser.pause(3000);

    })
    
})