import { verifyContactDetails } from "../../enums/verifyContactDetails";

class SalesforceContactPage {

   getDetailsTab() {
       return $('(//a[@class="slds-tabs_default__link" and @data-label="Details"])[2]');
   }

   getNameFieldValue()
   {
    return $('//span[text()="Name"]//..//..//span//slot//lightning-formatted-name');
   }

   getAccountNameFieldValue()
   {
    return $('(//span[text()="Account Name"])[3]//..//..//..//a//span//slot//span//slot//span');
   }

   async clickOnDetailsTab() {
    const detailsTab = await this.getDetailsTab();

    // Ensure element exists & is displayed
    await detailsTab.waitForExist({ timeout: 15000 });
    await detailsTab.waitForDisplayed({ timeout: 15000 });

    // JavaScript click (bypasses overlay & LWC issues)
    await browser.execute((el) => {
        el.scrollIntoView({ block: 'center', inline: 'center' });
        el.click();
    }, detailsTab); 
}


async verifyContactCreated(contactNameValue?: verifyContactDetails, accountNameValue?: verifyContactDetails) {
    if (contactNameValue) {
        const nameEl = await this.getNameFieldValue();
        await nameEl.waitForExist({ timeout: 10000 });
        await nameEl.waitForDisplayed({ timeout: 10000 });
        const contactName = await nameEl.getText();
        await expect(contactName).toContain(String(contactNameValue));
    }
    if (accountNameValue) {
        const accEl = await this.getAccountNameFieldValue();
        await accEl.waitForExist({ timeout: 10000 });
        await accEl.waitForDisplayed({ timeout: 10000 });
        const accountName = await accEl.getText();
        await expect(accountName).toContain(String(accountNameValue));
    }       
}




}

export default SalesforceContactPage;
