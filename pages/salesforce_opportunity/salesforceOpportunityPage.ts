import Page from '../../test/pageobjects/page';

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

    selectValueFromDropdown(value:string) {
       return $(`//div[starts-with(@class,"slds-listbox")]//lightning-base-combobox-item[@data-value="${value}"]`);
    }

    getClosedOptions() {
        return $('//option[@label="Closed Won"]');
    }

    getSaveButton() {
        return $('//button[text()="Save"]');
    }
    getDetailsTab() {
        return $('//a[@class="slds-tabs_default__link" and @data-label="Details"]');
    }
    verifyFieldValues(fieldLabel: string,fieldValue: string) {
        return $(`//slot[@name="outputField"]//parent::span//parent::div//parent::div//div[1]//span[text()="${fieldLabel}"]//parent::div//parent::div//slot[@name="outputField"]//lightning-formatted-text[text()="${fieldValue}"]`);
    }
    getCloseThisOpportunity() {
        return $('//select[@class="stepAction required-field select"]');
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
    async fillOpportunity(opportunityValue: string,amountValue:string,nextStepValue: string,closeDateValue: string,stageValue: string,typeValue: string) {
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
        await this.getDropdown('Type').click();
        await browser.pause(3000);
        await this.selectValueFromDropdown(typeValue).click();
    }

    async clickSaveButton() {
        await this.getSaveButton().click();
    }

    async clickDetailsTab(){
        await this.getDetailsTab().click();
    }

    async validateOpportunityCreated(opportunityValue:string,stageValue:string,amountValue:string,closeDateValue:string,typeValue:string,nextStepValue:string) {
        const opportunity = this.verifyFieldValues('Opportunity Name', opportunityValue);
        await expect(opportunity).toBeDisplayed();

        const stage = this.verifyFieldValues('Stage', stageValue);
        await expect(stage).toBeDisplayed();

        const amount = this.verifyFieldValues('Amount', amountValue);
        await expect(amount).toBeDisplayed();

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
     async verifySuccessMessage(message: string){
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


   
}

export default SalesforceOpportunityPage;
