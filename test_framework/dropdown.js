//handling drop down

describe("handling drop down options", () => {
    
    // 1. selectByVisibleText()
    it.skip("should select option by visible text", async () => {
        await browser.url("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
        const dropdown = await $('//div[@class="container startNow"]//select');
        await dropdown.waitForDisplayed();
        await dropdown.selectByVisibleText("Algeria");
        await browser.pause(3000);
    });

    // 2. selectByIndex()
    it.skip("should select option by index", async () => {
        await browser.url("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
        const dropdown = await $('//div[@class="container startNow"]//select');
        await dropdown.waitForDisplayed();
        await dropdown.selectByIndex(9); // selects 10th country
        await browser.pause(3000);
    });


    // 3. selectByAttribute()
    //value=AND for Andorra
    it.skip("should select option by index", async () => {
        await browser.url("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
        const dropdown = await $('//div[@class="container startNow"]//select');
        await dropdown.waitForDisplayed();
        await dropdown.selectByAttribute('value','AND'); // selects 10th country
        await browser.pause(3000);
    });


    //PRINT ALL VALUES FROM DROPDOWN
    it("printing all values from dropdown", async () => {
        await browser.url("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
        let list=await $$('//select//option');
        console.log("the length of the dropdown is ",list.length);


        for(let i=0;i<list.length;i++)
        {
            const element=list[i];
            const text=await element.getText()
            console.log(text);
        }
        await browser.pause(3000);
    });



});
