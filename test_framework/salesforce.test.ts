import { TOTP } from "totp-generator";
import SalesforceLoginPage from '../pages/salesforce_login/loginPage';
import SalesforceOpportunityPage from '../pages/salesforce_opportunity/salesforceOpportunityPage';
import { CREDENTIAL_MANAGER, Environment } from '../resources/config/salesforce.config';
import SalesforceHomePage from '../pages/salesforce_home/salesforceHomePage';
const env = (process.env.ENV as Environment) || 'SALESFORCE';
import { formatDate } from './utils/test-utils';
import { TestData } from './utils/testData';
describe('Salesforce Tests', () => {
    let loginPage: SalesforceLoginPage;
    let otp: string;


    it("Login to salesforce", async () => {
        // Generate OTP dynamically before each test

        loginPage = new SalesforceLoginPage();
        await browser.url(CREDENTIAL_MANAGER[env].URL);

        //  Pass the OTP into login method
        await loginPage.login(
            CREDENTIAL_MANAGER[env].USERNAME,
            CREDENTIAL_MANAGER[env].PASSWORD
        );
        const { otp: generatedOtp } = await TOTP.generate(CREDENTIAL_MANAGER[env].MFA_SECRETKEY);
        otp = generatedOtp;
        const homePage = await loginPage.enterOtp(otp);
        await browser.pause(5000);
        expect(homePage.getSalesforceLogo());
    });

    it("fill opportunity", async () => {
        const testData = TestData.getOpportunityData('testOpportunity');
        const homePage = new SalesforceHomePage();
        await homePage.clickOnTab("Opportunities");
        const opportunityPage = new SalesforceOpportunityPage();
        const formattedDate = formatDate();
        await opportunityPage.clickNewButton();
        //await opportunityPage.fillOpportunity("Test Opportunity", "10", "Test Next Step", formattedDate, "Prospecting", "New Customer");
        await opportunityPage.fillOpportunity(
        testData.opportunityName,
        testData.amount,
        testData.nextStep,
        formattedDate,
        testData.stage,
        testData.type
    );
        await opportunityPage.clickSaveButton();
    });

    it("validate opportunity", async () => {
        const testData=TestData.getOpportunityData('verifyOpportunityValues')
        const opportunityPage = new SalesforceOpportunityPage();
        const formattedDate = formatDate();
        await opportunityPage.clickDetailsTab();
        await browser.pause(5000);
        // await opportunityPage.validateOpportunityCreated(
        //     "Test Opportunity",
        //     "Prospecting",
        //     "₹10.00",
        //     formattedDate,
        //     "New Customer",
        //     "Test Next Step"
        // );
        await opportunityPage.validateOpportunityCreated(
            testData.opportunityName,
            testData.stage,
            testData.amount,
            formattedDate,
            testData.type,
            testData.nextStep
        );
        


    });

    it("opportunity conversion", async () => {
        const testData=TestData.getOpportunityData('verifyOpportunityValuesAfterConversion');
        const formattedDate = formatDate();
        const opportunityPage = new SalesforceOpportunityPage();
        await browser.pause(5000);
        await opportunityPage.clickMarkStageAsComplete();
        await browser.pause(5000);
        await opportunityPage.fillCloseThisOpportunity();
        await browser.pause(5000);
        await opportunityPage.clickSave();
        await browser.pause(2000);
        await opportunityPage.clickDetailsTab();
        await browser.pause(5000);
        // await opportunityPage.validateOpportunityCreated(
        //     "Test Opportunity",
        //     "Closed Won",
        //     "₹10.00",
        //     '',
        //     '',
        //     ''
        // );
       await opportunityPage.validateOpportunityCreated(
            testData.opportunityName,
            testData.stage,
            testData.amount,
            formattedDate,
            testData.type,
            testData.nextStep
        );

    });

});