import { expect } from 'chai';
import { addStep } from '@wdio/allure-reporter';
 
describe('Waits - Custom Condition @regression', () => {
    it('should wait for specific text', async () => {
        addStep('Navigate to dynamic loading page');
        await browser.url('https://the-internet.herokuapp.com/dynamic_loading/1');
 
        addStep('Click start button');
        await $('button').click();
 
        addStep('Wait for specific text');
        await browser.waitUntil(
            async () => (await $('#finish').getText()) === 'Hello World!',
            {
                timeout: 10000,
                timeoutMsg: 'Expected text not found',
                interval: 500
            }
        );
 
        addStep('Verify text');
        expect(await $('#finish').getText()).to.equal('Hello World!');
    });
});
 