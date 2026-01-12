import { expect } from 'chai';
import { addStep } from '@wdio/allure-reporter';

declare global {
    var baseUrl: string;
    var credentials: {
        username: string;
        password: string;
    };
}

global.baseUrl = 'https://the-internet.herokuapp.com';
global.credentials = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
};

describe('Login Tests @login', () => {
    it('should login using global variables @positive', async () => {
        addStep('Navigate to login page');
        await browser.url(`${global.baseUrl}/login`);

        addStep('Enter credentials');
        await $('#username').setValue(global.credentials.username);
        await $('#password').setValue(global.credentials.password);
        await $('button[type="submit"]').click();

        addStep('Verify success');
        const successText = await $('.flash.success').getText();
        expect(successText).to.include('You logged into');
    });
});

export {}; // keeps file a module
