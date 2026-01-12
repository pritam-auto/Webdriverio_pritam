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

}

export default SalesforceHomePage;
