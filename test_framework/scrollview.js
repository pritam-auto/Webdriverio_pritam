// //scroll view

// import crmpage from "../pages/crmpage.js";

// describe("scroll into element", function () {
//     it("performing scroll into view action", async function () {
//         await browser.url("https://classic.freecrm.com/");

//         const forgotLink = await crmpage.forgotLink;
//         await forgotLink.waitForDisplayed();

//         // Scroll into view
//         await forgotLink.scrollIntoView();

//         // WebdriverIO v9 → Use isDisplayedInViewport() safely
//         const inViewPort = await forgotLink.isDisplayedInViewport();
//         console.log("Is 'Forgot Password?' link in viewport:", inViewPort);

//         await browser.pause(3000);
//     });
// });



import crmpage from "../pages/crmpage.js";

describe("scroll into element", function () {
    it("performing scroll into view action", async function () {
        await browser.url("https://classic.freecrm.com/");
        const forgotLink = await crmpage.forgotLink;

        // Wait for it to load
        await forgotLink.waitForExist({ timeout: 5000 });

        // Scroll into view
        await forgotLink.scrollIntoView();

        // Check if it's visible in viewport (manual method)
        const inViewPort = await browser.execute((el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }, await forgotLink);

        console.log("Is 'Forgot Password?' link in viewport:", inViewPort);

        await browser.pause(3000);
    });
});
