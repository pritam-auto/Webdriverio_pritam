class SalesforceHomePage {

    getSalesforceLogo() {
        return $('//div[@class="slds-global-header__item"]//div[@class="slds-global-header__logo"]');
    }
    // Update the getTab method to handle shadow DOM
async getTab(tabName: string) {
    const tab = await $(`//a[@title="${tabName}"]`);
    await tab.waitForExist({ timeout: 15000 });
    console.log("Tab found:", tab);
    return tab;
}

    //validate salesforce logo visible
    async isSalesforceLogoVisible() {
        return await this.getSalesforceLogo().isDisplayed();
    }

   async clickOnTab(tabName: string) {
    const tab = await this.getTab(tabName);

    // Ensure element exists & is displayed
    await tab.waitForExist({ timeout: 15000 });
    await tab.waitForDisplayed({ timeout: 15000 });

    // JavaScript click (bypasses overlay & LWC issues)
    await browser.execute((el) => {
        el.scrollIntoView({ block: 'center', inline: 'center' });
        el.click();
    }, tab);
}

async scrollUntilOpportunityFound(opportunityName: string) {

    const container = await $('//div[contains(@class,"slds-scrollable_y")]');

    const opportunityXpath = `//a[@class="slds-truncate"]//span[text()="${opportunityName}"]`;

    let isFound = false;
    let previousScrollTop = -1;

    while (!isFound) {

        const opportunity = await $(opportunityXpath);
        isFound = await opportunity.isExisting();

        if (isFound) {
            await opportunity.scrollIntoView();
            break;
        }

        // Scroll the container down
        await browser.execute((el) => {
            el.scrollTop += 300;
        }, container);

        await browser.pause(1000);

        // Stop if no more scrolling possible
        const currentScrollTop = await browser.execute(
            el => el.scrollTop,
            container
        );

        if (currentScrollTop === previousScrollTop) {
            throw new Error(`Opportunity "${opportunityName}" not found in scroll container`);
        }

        previousScrollTop = currentScrollTop;
    }
}


}

export default SalesforceHomePage;
