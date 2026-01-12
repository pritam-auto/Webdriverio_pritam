import { expect } from 'chai';
 
describe('Alert Test', () => {
    it('should handle a JavaScript alert 1', async () => {
        await browser.url('https://the-internet.herokuapp.com/javascript_alerts');
        await browser.pause(3000);
        await $('button=Click for JS Alert').click();
        await browser.acceptAlert();
        await browser.pause(3000);
        const result = await $('#result').getText();
        expect(result).to.equal('You successfully clicked an alert');
    });


     it('should handle a JavaScript alert 2', async () => {
        await browser.url('https://the-internet.herokuapp.com/javascript_alerts');
        await browser.pause(3000);
        await $('button=Click for JS Confirm').click();
        await browser.dismissAlert();
        await browser.pause(3000);
        const result = await $('#result').getText();
        expect(result).to.equal('You clicked: Cancel');
    });


    it.skip('should handle a JS prompt and enter text', async () => {
        await browser.url('https://the-internet.herokuapp.com/javascript_alerts');

        // Click on JS Prompt button
        const promptButton = await $('button=Click for JS Prompt');
        await promptButton.waitForDisplayed();
        await promptButton.click();

        // Wait until alert appears
        await browser.waitUntil(
            async () => await browser.isAlertOpen(),
            {
                timeout: 5000,
                timeoutMsg: 'Expected prompt alert to appear but it did not',
            }
        );

        // Enter text and accept alert
        await browser.sendAlertText('abc');
        await browser.acceptAlert();

        // Verify the result text
        const result = await $('#result').getText();
        expect(result).to.equal('You entered: abc');
    });
});