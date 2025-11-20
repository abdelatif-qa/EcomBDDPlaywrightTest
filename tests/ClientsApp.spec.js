const {test, expect } = require('@playwright/test');
const { urlToHttpOptions } = require('url');

test('second Playwright Test', async ({page}) =>
    {
        
        const productName = "ZARA COAT 3";
        const countryName = "Algeria";
        const emailUser = "test@example.co";
        const password = "Test1234?"
        const comfMsg = " Thankyou for the order. "
    
        await page.goto("https://rahulshettyacademy.com/client/");
        console.log(await page.title());
        await page.locator("#userEmail").fill(emailUser);
        await page.locator("#userPassword").fill(password);
        await page.locator("[name='login']").click();

        // wait until all call are done in API
        //await page.waitForLoadState('networkidle');
        //wai until the first card is loaded
        await page.locator(".card-body b").first().waitFor();
        const allTitles = await page.locator(".card-body b").allTextContents();
        console.log(allTitles);

        const count = await page.locator(".card-body").count();
        for(let i = 0; i < count; ++i) {

            if(await page.locator(".card-body").nth(i).locator("b").textContent() === productName) {
                await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
                break;
            }

        }

        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
        expect(bool).toBeTruthy;

        await page.locator("text='Checkout'").click();
        await page.locator("[placeholder*='Country']").pressSequentially("al");
        await page.locator(".ta-results").first().waitFor();

        const optionsCount = await page.locator(".ta-results").locator("button").count();

        for(let i = 0; i < optionsCount; ++i) {
            const txt = await page.locator(".ta-results").locator("button").nth(i).textContent();
            if (txt.trim() === countryName) {
                page.locator(".ta-results").locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".mt-5 [type='text']").first()).toHaveText(emailUser);
        await page.locator(".action__submit").click();

        await expect(page.locator(".hero-primary")).toHaveText(comfMsg)

        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("tbody tr").first().waitFor();
        const rowsCount = await page.locator("tbody tr").count();
        for(let i = 0; i < rowsCount; ++i) {
            const IdText = await page.locator("tbody tr").nth(i).locator("th").textContent();
            if (orderId.includes(IdText)) {
                await page.locator("tbody tr").nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIddetails = await page.locator(".col-text").textContent();
        await expect(orderId.includes(orderIddetails)).toBeTruthy();

        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("tbody tr").first().waitFor();
        await page.locator("tbody tr").last().locator("button").first().click();
    
    });