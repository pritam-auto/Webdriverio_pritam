class AlertPage {
    // Get alert button by index
    async getAlertButton(index) {
        return await $(`ul li:nth-child(${index}) button`);
    }

    get result() {
        return $('#result');
    }

    async getResultText() {
        return await this.result.getText();
    }

    // Click on a specific alert button
    async clickOnAlertButton(index) {
        const button = await this.getAlertButton(index);
        await button.waitForDisplayed();
        await button.click();
    }
}

export default new AlertPage();
