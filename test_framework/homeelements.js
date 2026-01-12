const homepage = require('../pages/homepage');

describe("Verify the home page elements", function() {

    it("should verify the title, subtitle, and subheading", async function() {
        await browser.url("https://www.freshworks.com/products/");

        const titleText = await homepage.title.getText();
        console.log("The title of the page is: " + titleText);

        const subtitleText = await homepage.subtitle.getText();
        console.log("The subtitle of the page is: " + subtitleText);

        const subheadingText = await homepage.subheading.getText();
        console.log("The subheading of the page is: " + subheadingText);
    });

    it("should click on crm", async function() {
      
        

        const crmText = await $('//a[text()="CRM"]');
        crmText.click();

        await browser.pause(30000);

    });

});
