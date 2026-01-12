

//const blazemeter = require('../pages/blazemeter');
import blazemeter from '../pages/blazemeter.js';

describe("Verify the home page elements of blazemeter", function () {

    it("should print all titles of nav bar", async function () {
        await browser.url("https://www.blazemeter.com/customers");

        await blazemeter.getTextForLi();

        // Optional pause to observe the browser
        await browser.pause(3000);

        console.log(blazemeter.specificChildElement(3).getText());
    });

    it("should verify that the main header is displayed", async function () {
        const headerElement = await blazemeter.mainHeader;
        const isVisible = await headerElement.isDisplayed();

        console.log("Is main header displayed?", isVisible);

        // Assert using WebdriverIO expect--chai assert
        expect(isVisible).toBe(true);
    });

    //to check if the image appears or not
    it("should verify that the image is displayed", async function () {
        const imageElement = await blazemeter.mainImage;
        const isVisible2 = await imageElement.isDisplayed();

        console.log("Is main image displayed?", isVisible2);

        // Assert using WebdriverIO expect
        expect(isVisible2).toBe(true);
    });


    it("should verify that the button is enabled", async function () {
        const buttonElement = await blazemeter.button;
        const isVisible3 = await buttonElement.isDisplayed();

        console.log("Is main button enabled?", isVisible3);

        // Assert using WebdriverIO expect
        expect(isVisible3).toBe(true);
    });


     it("should verify that the button is existing", async function () {
        const buttonElement = await blazemeter.button;
        const isVisible4 = await buttonElement.isDisplayed();

        console.log("Is main button existing?", isVisible4);

        // Assert using WebdriverIO expect
        expect(isVisible4).toBe(true);
    });



    // it("should verify that the button is displayed in viewport or not", async function () {
    //     const buttonElement = await blazemeter.button;
    //     const isVisible5 = await buttonElement.isDisplayedInViewport();

    //     console.log("Is main button displayed in view port or not?", isVisible5);

    //     // Assert using WebdriverIO expect
    //     expect(isVisible5).toBe(true);
    // });


   it("if partners link is enabled we simply click on it", async function () {
  await blazemeter.clickonProductLink(); 
  await browser.pause(5000); 
});
    

});
