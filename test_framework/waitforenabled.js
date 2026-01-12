import { expect } from "chai";

describe("waiting for the button to be enabled",async () => {
    it("should wait for the button to be enabled",async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_controls");
        const btn=await $('//form[@id="input-example"]//button');
        await btn.click();
        const placeholder=await $('//input[@type="text"]');
        await placeholder.waitForEnabled({
            timeout:10000
        });
        await placeholder.setValue('abc')
        expect(await placeholder.getValue()).to.equal('abc');
    })
})