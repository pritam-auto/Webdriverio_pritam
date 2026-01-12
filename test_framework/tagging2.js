import { expect } from 'chai';
import { addStep } from '@wdio/allure-reporter';

describe('Dropdown Tests @regression @dropdown', () => {
  it('should select an option from dropdown @positive', async () => {
    addStep('Navigate to dropdown page');
    await browser.url('https://the-internet.herokuapp.com/dropdown');

    addStep('Select Option 2');
    const dropdown = await $('#dropdown');
    await dropdown.selectByVisibleText('Option 2');
    await browser.pause(3000);

    addStep('Verify selection');
    expect(await dropdown.getValue()).to.equal('2');
    await browser.pause(3000);
  });

  //test1
  
});