class BlazePage {
    get parent() {
        return $('//div[@class="flex items-center gap-6"]//ul[contains(@class,"menu")]');
    }

    async getTextForLi() {
        const items = await this.parent.$$('li');
        
        for (const item of items) {
            const text = await item.getText();
            console.log(text);
        }
    }


    //to showcase isdisplayewd method
    //to check if the specific text of the page is visible or not

    get mainHeader()
    {
        return $('//h1[@class="heading break-words"]');
    }

    get mainImage()
    {
        return $('//div[@class="block basis-[20rem]"]//a[@rel="home"]//img[@alt="Home"]');
    }

    get button()
    {
        return $('//li[@class="menu__item"]//a[text()="Contact Us"]');
    }

    get productLink()
    {
        return $('//div[@class="flex items-center gap-6"]//a[text()="Partners"]');
    }
async clickonProductLink() {
  const isDisplayed = await this.productLink.isDisplayed();
  console.log('Partners link displayed?', isDisplayed);
  if (isDisplayed) {
    await this.productLink.click();
  } else {
    throw new Error('Partners link is not displayed — cannot click!');
  }
}
      specificChildElement (index){
                return this.parent.$("the third child element is ",`li:nth-child(${index})`);
      }


}

//module.exports = new BlazePage();
export default new BlazePage();
