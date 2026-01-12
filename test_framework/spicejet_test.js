import spicejet from "../pages/spicejet.js";

describe("Verify the keyboard actions", function () {

    it("should move to required position", async function () {
        await browser.url("https://www.spicejet.com/");
        await spicejet.moveToElement(spicejet.parent);
        await spicejet.clickElement(spicejet.child);
        await browser.pause(5000);
    });

    it("should press Enter key from keyboard", async function () {
        await browser.url("https://the-internet.herokuapp.com/key_presses?");
        await spicejet.focusOnSearch();       // click to focus the input
        await browser.keys("Enter");          // press Enter key
        const text = await spicejet.getResultLabelText();
        console.log("Result after pressing Enter:", text);
        await browser.pause(3000);
    });

});
