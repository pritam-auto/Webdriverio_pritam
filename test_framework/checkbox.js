const { expect } = require("chai");
const InternetPage = require("../pages/internetpage");

describe("to handle various checkboxes", function () {


//check browser url using chai assert
   it("check browser url", async function () {
  await browser.url("https://the-internet.herokuapp.com/"); 
  const currentUrl = await browser.getUrl();
  expect(currentUrl).to.equal("https://the-internet.herokuapp.com/"); 
});

//check heading using chai assert
   it("check if checkbox heading appears", async function () {
  await browser.url("https://the-internet.herokuapp.com/"); 
  await InternetPage.clickonLink(6); // 

  const text = await InternetPage.geth3header().getText(); 
  expect(text).to.equal("Checkboxes"); 
});


  it("should click on the Checkboxes link ", async function () {
    // Navigate to homepage
    await browser.url("https://the-internet.herokuapp.com/");

    // Click 6th link → "Checkboxes"
    await InternetPage.clickonLink(6);


    //check if the heading exists or not
    await InternetPage.geth3header().waitForDisplayed();

    //click on a particular checkbox
    await InternetPage.clickCheckBox(1);

    //using assertion
    const isChecked = await InternetPage.getCheckbox(1).isSelected();
expect(isChecked).to.equal(true);

    await browser.pause(3000);

    
    
  });
});