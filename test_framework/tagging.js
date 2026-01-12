import { expect } from 'chai';
import { addStep } from '@wdio/allure-reporter';
 
describe('Login Tests @smoke @login', () => {
    it('should login with valid credentials @positive', async () => {
        addStep('Navigate to login page');
        await browser.url('https://the-internet.herokuapp.com/login');
 
        addStep('Enter credentials');
        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();
 
        addStep('Verify success message');
        expect(await $('.flash.success').getText()).to.include('You logged into a secure area!');
    });
 
    it('should fail with invalid credentials @negative', async () => {
        addStep('Navigate to login page');
        await browser.url('https://the-internet.herokuapp.com/login');
 
        addStep('Enter invalid credentials');
        await $('#username').setValue('wrong');
        await $('#password').setValue('wrong');
        await $('button[type="submit"]').click();
 
        addStep('Verify error message');
        expect(await $('.flash.error').getText()).to.include('Your username is invalid!');
    });
});