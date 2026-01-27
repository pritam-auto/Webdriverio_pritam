import { TOTP } from "totp-generator";
import SalesforceLoginPage from '../pages/salesforce_login/loginPage';
import SalesforceOpportunityPage from '../pages/salesforce_opportunity/salesforceOpportunityPage';
import { CREDENTIAL_MANAGER, Environment } from '../resources/config/salesforce.config';
import SalesforceHomePage from '../pages/salesforce_home/salesforceHomePage';
const env = (process.env.ENV as Environment) || 'SALESFORCE';
import { formatDate } from './utils/test-utils';
import { TestData } from './utils/testData';
import { ErrorCode } from "../enums/error";
import SalesforceContactPage from "../pages/salesforce_contact/salesforceContactPage";
import { verifyContactDetails } from "../enums/verifyContactDetails";
describe('Salesforce Tests- Error tests', () => {
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
        //await browser.url('https://ck-qe-dev-ed.develop.lightning.force.com/lightning/page/home');
        expect(homePage.getSalesforceLogo());
    });


    it("go to app launcher and switch to sales app", async () => {
        const homePage = new SalesforceHomePage();
        await homePage.clickAppLauncher();
        await homePage.searchAndSelectApp("Sales");
        await browser.pause(5000);
    });

    it("fill opportunity without mandatory fields", async () => {
        //click on new button
        const homePage = new SalesforceHomePage();
        await homePage.clickOnTab("Opportunities");
        const opportunityPage = new SalesforceOpportunityPage();
        await opportunityPage.clickNewButton();
        //click save button
        await opportunityPage.clickSaveButton();
        await browser.pause(5000);
    });

    it("validate error fields", async () => {
    

        const opportunityPage = new SalesforceOpportunityPage();
        //validate error message
        await opportunityPage.validateErrorMessages(
            ErrorCode.CLOSE_DATE,
            ErrorCode.OPPORTUNITY_NAME,
            ErrorCode.STAGE,
            ErrorCode.HIT_SNAG
        );
        


    });
    it("fill mandatory fields and save opportunity", async () => {

        const opportunityPage = new SalesforceOpportunityPage();
        await opportunityPage.clickCloseErrorDialog();
        //fill mandatory fields
        const formattedDate = formatDate();
        const testData = TestData.getOpportunityData('testOpportunity');
        //fill opportunity
        await opportunityPage.fillOpportunity(
            testData.opportunityName,
            testData.amount,
            testData.nextStep,
            '01/02/2026',
            testData.stage
        );
        //save opportunity
        await opportunityPage.clickSaveButton();
        await browser.pause(5000);
    });   

    it("Create Contact Roles AND Validate contact roles created", async () => {

        const contactPage=new SalesforceContactPage();
        const opportunityPage = new SalesforceOpportunityPage();
        await opportunityPage.createContactRole('Test1 User');
        await browser.pause(5000);
        //validate contact created
        await contactPage.clickOnDetailsTab();
        await browser.pause(5000);
        await contactPage.verifyContactCreated(verifyContactDetails.CONTACT_OWNER,verifyContactDetails.ACCOUNT_NAME);

    });


    it("Click on existing opportunity and validate the details", async () => {
           const opportunityPage = new SalesforceOpportunityPage();
           //click on opportunities tab
           const homePage = new SalesforceHomePage();
           await homePage.clickOnTab("Opportunities");
           await browser.pause(5000);
           //scroll until 
           await homePage.scrollUntilOpportunityFound('ABC');
           await browser.pause(5000);

           //click on opportunity
           await opportunityPage.clickOnOpportunityLink('ABC');
           await browser.pause(10000);
           //validate opportunity details
        //    await opportunityPage.clickDetailsTab();
        //    await browser.pause(5000);
        //    await opportunityPage.validateOpportunityCreated(
        //        'ABC',
        //        'CLosed Won',
        //        '13/01/2026'
        //    );
           

    });
   
    

});