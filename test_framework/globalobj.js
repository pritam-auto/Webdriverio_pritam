// test/specs/login.test.js
global.baseUrl = 'https://the-internet.herokuapp.com';
global.credentials = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
};
 
import { expect } from 'chai';
import { addStep } from '@wdio/allure-reporter';
 
describe('Login Tests @login', () => {
    it('should login using global variables @positive', async () => {
        addStep('Navigate to login page');
        await browser.url(`${global.baseUrl}/login`);
 
        addStep('Enter credentials');
        await $('#username').setValue(global.credentials.username);
        await $('#password').setValue(global.credentials.password);
        await $('button[type="submit"]').click();
 
        addStep('Verify success');
        expect(await $('.flash.success').getText()).to.include('You logged into');
    });

    //trst 234556

});