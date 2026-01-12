// describe('enter value in a field', function() {
//     it("enter a value in the field", function() {
//         browser.url('/');
//         const search = $('#twotabsearchtextbox');
//         search.setValue('Apple Mac Book');
//         browser.pause(5000);  // Wait 5 seconds so you can see it
//     });
// });


describe('Amazon search test', function() {
  let handles;

  it("should open Amazon and close extra tabs", async function() {
    await browser.url('https://www.amazon.com');
    handles = await browser.getWindowHandles();

    // Close all other tabs
    for (let i = 1; i < handles.length; i++) {
      await browser.switchToWindow(handles[i]);
      await browser.closeWindow();
    }
  });

  it("should enter value in the search field", async function() {
    await browser.switchToWindow(handles[0]);

    const search = await $('#twotabsearchtextbox');
    await search.waitForExist({ timeout: 5000 });
    await search.setValue('Apple Mac Book');
  });


  it("should click on search button", async function() {
    const search = await $('//input[@id="nav-search-submit-button"]');
    search.click();

    await browser.pause(3000); //  pause 
  });
  it("should get text from a label", async function() {
    const label = await $('//span[@class="nav-line-2 nav-progressive-content"]');
    const text = await label.getText();
    console.log("The title of the page is: " + text);

    await browser.pause(3000); //  pause 
  });
});


