//drag and drop


describe("drag and drop actions",async function() {
    it("do drag and drop",async function () {
        await browser.url("https://demo.automationtesting.in/Static.html");
        const source=$('#mongo');
        const target=$('//div[@class="dragged"]');
        source.dragAndDrop(target);
        await browser.pause(3000);
    })
    
})