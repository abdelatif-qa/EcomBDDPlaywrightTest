const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.emailLabel = page.locator(".mt-5 [type='text']");
        this.placeOrderBtn = page.locator(".action__submit");
    }

    async searchCountryAndSelect(countryName) {
        await this.countryInput.pressSequentially("al");
        await this.countryDropdown.first().waitFor();
    
        const optionsCount = await this.countryDropdown.locator("button").count();
    
        for(let i = 0; i < optionsCount; ++i) {
            const txt = await this.countryDropdown.locator("button").nth(i).textContent();
            if (txt.trim() === countryName) {
                this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }   
        
    }

    async verifyEmailId(emailUser) {
        await expect(this.emailLabel.first()).toHaveText(emailUser);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

}
module.exports = { CheckoutPage }