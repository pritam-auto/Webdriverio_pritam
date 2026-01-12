//useractions
//movetoelement and keys

class Spicejet {
    // Hover + Click demo
    get parent() {
        return $('//div[text()="Travel Policies"]');
    }

    get child() {
        return $('//div[text()="Tariffs"]');
    }

    async moveToElement(element) {
        await element.waitForDisplayed();
        await element.moveTo();
    }

    async clickElement(element) {
        await element.waitForDisplayed();
        await element.click();
    }

    // Keyboard actions from Heroku app
    get search() {
        return $('#target');
    }

    get resultLabel() {
        return $('#result');
    }

    async focusOnSearch() {
        await this.search.waitForDisplayed();
        await this.search.click(); // give it focus
    }

    async getResultLabelText() {
        await this.resultLabel.waitForDisplayed();
        return await this.resultLabel.getText();
    }
}

export default new Spicejet();
