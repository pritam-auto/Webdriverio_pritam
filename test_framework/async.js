describe("executeAsync example", () => {
    it("runs async code inside the browser", async () => {
        await browser.url("https://example.com");

        const result = await browser.executeAsync(function (done) {
            setTimeout(() => {
                done("Async result from browser!");
            }, 2000);
        });

        console.log("Result:", result);
    });
});
