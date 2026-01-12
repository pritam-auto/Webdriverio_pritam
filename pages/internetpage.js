//to handle check box
class InternetPage {
  geth3header() {
    return $('h3');
  }

  
  getLinkElement(index) {
    return $(`ul li:nth-child(${index}) a`);
  }

  async clickonLink(index) {
    const link = this.getLinkElement(index);
    await link.waitForDisplayed({ timeout: 10000 });
    await link.click();
  }

  
  getCheckbox(index) {
    
    return $(`form#checkboxes input:nth-child(${index})`);
  }

  async clickCheckBox(index) {
    const cb = this.getCheckbox(index);
    await cb.waitForDisplayed({ timeout: 5000 });
    await cb.click();
  }
}

module.exports = new InternetPage();