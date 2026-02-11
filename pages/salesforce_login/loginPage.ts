import SalesforceHomePage from '../salesforce_home/salesforceHomePage';

class SalesforceLoginPage {
    getUsernameField() {
        return $('//input[@type="email"]');
    }

    getPasswordField() {
        return $('//input[@type="password"]');
    }

    getLoginButton() {
        return $('//input[@name="Login"]');
        
    }
    getOtpField() {
        return $('//input[@id="tc"]');
    }
    getVerifyButton() {
        return $('//input[@value="Verify"]');
    }

    //methods
    async login(username: string, password: string) {
        await this.getUsernameField().setValue(username);
        await this.getPasswordField().setValue(password);
        await this.getLoginButton().click();
    }

    async enterOtp(otp: string): Promise<InstanceType<typeof SalesforceHomePage>> {
        await this.getOtpField().setValue(otp);
        await this.getVerifyButton().click();
        return new SalesforceHomePage();
    }
}
export default SalesforceLoginPage;
