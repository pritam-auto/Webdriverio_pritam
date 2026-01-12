it("should debug browser state", async () => {
    await browser.url("https://example.com");
    await browser.debug(); //  Execution pauses here

    console.log(await browser.getTitle());
});
