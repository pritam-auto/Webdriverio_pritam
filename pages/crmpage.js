//scroll to elemnent
//scrollintoview
class CRMPage {
    get forgotLink() {
        return $('//a[text()="Forgot Password?"]');
    }

    async moveToElement(element) {
        await element.waitForDisplayed();
        await element.moveTo();
    }
}

export default new CRMPage();
