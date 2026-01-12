// test_framework/screenshot.js
describe("Taking screenshots", () => {
    it("should take screenshots of the page and element", async () => {
        await browser.url("https://example.com");

        // full page screenshot
        await browser.saveScreenshot("./screenshots2/fullpage.png");

        // element screenshot
        

        // base64 screenshot
        const screenshot = await browser.takeScreenshot();
        console.log("Base64 screenshot :", screenshot);
    });
});
