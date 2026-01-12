describe("Login test using .env variables", () => {
    it("should read values from .env", async () => {
        await browser.url(process.env.BASE_URL);
        console.log("Username:", process.env.USERNAME);
        console.log("Password:", process.env.PASSWORD);
    });
});
