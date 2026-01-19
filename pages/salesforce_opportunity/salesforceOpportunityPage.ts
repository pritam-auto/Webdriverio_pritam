import Page from '../../test/pageobjects/page';
import { ErrorCode } from '../../enums/error';
class SalesforceOpportunityPage extends Page {
    // Add your Opportunity page selectors and methods here
    // Example:
    getNewButton() {
        return $('//div[@title="New"]');
    }
    getInputBox(label: string) {
        return $(`//label[@part="label" and text()="${label}"]//parent::div//div//input`);
    }

    getCloseDate(label: string) {
        return $(`//label[@class="slds-form-element__label" and text()="${label}"]//parent::div//div//input`);
    }

    getDropdown(label: string) {
        return $(`//label[@class="slds-form-element__label" and text()="${label}"]//parent::span//following-sibling::div[1]`);
    }

    selectValueFromDropdown(value: string) {
        return $(`//div[starts-with(@class,"slds-listbox")]//lightning-base-combobox-item[@data-value="${value}"]`);
    }

    getClosedOptions() {
        return $('//option[@label="Closed Lost"]');
    }

    getSaveButton() {
        return $('//button[text()="Save"]');
    }
    getDetailsTab() {
        return $('//a[@class="slds-tabs_default__link" and @data-label="Details"]');
    }
    verifyFieldValues(fieldLabel: string, fieldValue: string) {
        return $(`//slot[@name="outputField"]//parent::span//parent::div//parent::div//div[1]//span[text()="${fieldLabel}"]//parent::div//parent::div//slot[@name="outputField"]//lightning-formatted-text[text()="${fieldValue}"]`);
    }
    getCloseThisOpportunity() {
        return $('//select[@class="stepAction required-field select"]');
    }
    getCloseDateErrorMessage() {
        return $('//div[@aria-live="polite"]//span[text()="Close Date"]//parent::div');
    }
    


    getOpportunityErrorMessage() {
        return $('//span[text()="Opportunity Name"]//parent::div');
    }
    getCloseErrorMessage() {
        return $('//button[@title="Close error dialog"]');
    }

    getStageErrorMessage() {
        return $('//span[text()="Stage"]//parent::div');

    }

    getSnagErrorMessage() {
        return $('//header[@class="pageErrorHeader slds-popover__header"]//div[@class="slds-media slds-media_center slds-has-flexi-truncate"]//div[@class="slds-media__body"]//h2');

    }

    getOpportunityLink(opportunityLink: string) {
        return $(`(//div[@class="slds-truncate"]//div[@class="slds-grid"]//span[text()="${opportunityLink}"]//..//parent::a)[1]`);
    }

    getContactRoles() {
        return $('//span[@title="Contact Roles"]//parent::a');
    }
    getAddContactRolesButton() {
        return $('//a[@title="Add Contact Roles"]');
    }
    getContactRolesPlaceholder() {
        return $('//input[@title="Search Contacts"]');
    }

    getContactRolesLink(contactLink: string) {
        return $(`//a[@title="${contactLink}"]`);
    }

    async getMarkStageAsComplete() {
        return await $(
            'button.slds-path__mark-complete'
        );
    }


    // Add more selectors and methods as needed for your Opportunity page
    async clickNewButton() {
        await this.getNewButton().click();

    }
    async fillOpportunity(opportunityValue: string, amountValue: string, nextStepValue: string, closeDateValue: string, stageValue: string, typeValue?: string) {
        //fill opportunity name'
        await this.getInputBox('Opportunity Name').setValue(opportunityValue);
        //fill amount
        await this.getInputBox('Amount').setValue(amountValue);
        //fill next step
        await this.getInputBox('Next Step').setValue(nextStepValue);
        //fill close date
        await this.getCloseDate('Close Date').setValue(closeDateValue);
        //fill stage dropdown
        await this.getDropdown('Stage').click();
        await browser.pause(3000);
        await this.selectValueFromDropdown(stageValue).click();

        //fill type
        if (typeValue) {
            await this.getDropdown('Type').click();
            await browser.pause(3000);
            await this.selectValueFromDropdown(typeValue).click();
        }
    }

    async clickSaveButton() {
        await this.getSaveButton().click();
    }

   async clickDetailsTab() {
        const detailsTab = await this.getDetailsTab();
        await detailsTab.waitForExist({ timeout: 15000 });
        await detailsTab.waitForDisplayed({ timeout: 15000 });

        // JavaScript executor click to avoid overlay/LWC issues
        await browser.execute((el: HTMLElement) => {
            el.scrollIntoView({ block: 'center', inline: 'center' });
            el.click();
        }, detailsTab);

        await browser.pause(500);
    }

    async validateOpportunityCreated(opportunityValue?: string, stageValue?: string, amountValue?: string, closeDateValue?: string, typeValue?: string, nextStepValue?: string) {
        if (opportunityValue) {
            const opportunity = this.verifyFieldValues('Opportunity Name', opportunityValue);
            await expect(opportunity).toBeDisplayed();
        }
        if (stageValue) {

            const stage = this.verifyFieldValues('Stage', stageValue);
            await expect(stage).toBeDisplayed();
        }
        if (amountValue) {
            const amount = this.verifyFieldValues('Amount', amountValue);
            await expect(amount).toBeDisplayed();
        }

        // Make close date validation optional
        if (closeDateValue) {
            const closeDate = this.verifyFieldValues('Close Date', closeDateValue);
            await expect(closeDate).toBeDisplayed();
        }

        // Make type validation optional
        if (typeValue) {
            const type = this.verifyFieldValues('Type', typeValue);
            await expect(type).toBeDisplayed();
        }

        // Make next step validation optional
        if (nextStepValue) {
            const nextStep = this.verifyFieldValues('Next Step', nextStepValue);
            await expect(nextStep).toBeDisplayed();
        }

    }
    async verifySuccessMessage(message: string) {
        const successMessage = $(`//span[@class="toastMessage slds-text-heading--small forceActionsText" and text()="${message}"]`);
        await expect(successMessage).toBeDisplayed();
    }

    //click on mark stage as complete 7 times
    async clickMarkStageAsComplete() {
        const button = await this.getMarkStageAsComplete();


        // Wait until button exists & is visible
        await button.waitForExist({ timeout: 15000 });
        await button.waitForDisplayed({ timeout: 15000 });

        // JavaScript click (bypasses Salesforce overlay issues)
        await browser.execute((el) => {
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, button);

        await browser.pause(1000);

        // await this.verifySuccessMessage('Stage changed successfully.');

    }

    async fillCloseThisOpportunity() {
        await this.getCloseThisOpportunity().click();
        await browser.pause(1000);
        await this.getClosedOptions().click();
    }


    async clickSave() {
        await $('//span[text()="Save"]').click();
    }
    //validate error messages
    async validateErrorMessages(expectedCloseDateError: ErrorCode, expectedOpportunityError: ErrorCode, expectedStageError: ErrorCode, expectedSnagError: ErrorCode) {
        const closeDateError = await this.getCloseDateErrorMessage().getText();
        const opportunityError = await this.getOpportunityErrorMessage().getText();
        const stageError = await this.getStageErrorMessage().getText();
        const snagError = await this.getSnagErrorMessage().getText();
        console.log('Close Date Error:', closeDateError);
        console.log('Opportunity Error:', opportunityError);
        console.log('Stage Error:', stageError);
        console.log('Snag Error:', snagError);

        if (expectedCloseDateError) {
            await expect(closeDateError).toContain(expectedCloseDateError);
        }
        if (expectedOpportunityError) {
            await expect(opportunityError).toContain(expectedOpportunityError);
        }
        if (expectedStageError) {
            await expect(stageError).toContain(expectedStageError);
        }
        if (expectedSnagError) {
            await expect(snagError).toContain(expectedSnagError);
        }
    }
    async clickCloseErrorDialog() {
        await this.getCloseErrorMessage().click();
    }
    
    async createContactRole(contactName: string) {
        const contactRolesEl = await this.getContactRoles();
        await contactRolesEl.waitForExist({ timeout: 15000 });
        await contactRolesEl.waitForDisplayed({ timeout: 15000 });

        // JS executor click (scrolls then clicks)
        await browser.execute((el: HTMLElement) => {
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, contactRolesEl);

        await browser.pause(1000);

        const addBtn = await this.getAddContactRolesButton();
        await addBtn.waitForExist({ timeout: 10000 });
        await addBtn.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el: HTMLElement) => {
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, addBtn);

        await browser.pause(1000);
        await this.getContactRolesPlaceholder().setValue(contactName);
        await browser.pause(1000);
        await browser.keys('Enter');
        await browser.pause(2000);

        const contactLink = await this.getContactRolesLink(contactName);
        await contactLink.waitForExist({ timeout: 10000 });
        await contactLink.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el: HTMLElement) => {
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, contactLink);

        await browser.pause(1000);
    }

    async clickOnOpportunityLink(opportunityName: string) {
        const opportunityLink = await this.getOpportunityLink(opportunityName);
        await opportunityLink.waitForExist({ timeout: 15000 });
        await opportunityLink.waitForDisplayed({ timeout: 15000 });

        // JS executor click (scrolls then clicks)
        await browser.execute((el: HTMLElement) => {
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, opportunityLink);

        await browser.pause(1000);
    }




}

export default SalesforceOpportunityPage;
