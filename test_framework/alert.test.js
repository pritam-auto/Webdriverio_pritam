
import { assert } from "chai";
import alertpage from "../pages/alertpage.js";

describe("handling alert options in web driver io", function () {
    it("performing alert operations", async function () {
        await browser.url("https://the-internet.herokuapp.com/javascript_alerts");

        // Click on the alert-triggering button
        await alertpage.clickOnAlertButton(2);

       

        // Now safely handle the alert
        const alertText = await browser.getAlertText();
        console.log("Alert text:", alertText);
        assert.equal(alertText, "I am a JS Confirm");
        assert.include(resultText, "You clicked: Ok");


        await browser.acceptAlert();

        // Validate result text after accepting alert
        const resultText = await alertpage.getResultText();
        assert.include(resultText, "You successfully clicked an alert");
    });
});
