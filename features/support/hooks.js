const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { PagesManager } = require("../../pages/PagesManager");
const playwright  = require("@playwright/test");


Before (async function() {

    const browser = await playwright.chromium.launch({ 
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pagesManager = new PagesManager(this.page);

});

After ( async function() {

});

BeforeStep(function({ result }) {

});

AfterStep(async function({ result }) {
    
    if(result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot.png'}) 
    };

});