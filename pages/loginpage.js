class LoginPage
{
    get username()
    {
        return $('#username');
    }

    get password()
    {
        return $('#password');
    }

    get loginButton()
    {
        return $('button');

        //test1
        //test2
    }

   async enterusername(text)
    {
        await this.username.waitForDisplayed();
        await this.username.setValue(text);
    }

    async enterpassword(text)
    {
        await this.password.waitForDisplayed();
        await this.password.setValue(text);
    }
    async clickonLoginButton()
    {
        await this.loginButton.waitForDisplayed();
        await this.loginButton.click();
    }
}
export default new LoginPage();