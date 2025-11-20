const { expect } = require('@playwright/test');

class ConfirmationPage {

    constructor(page) {
        this.page = page;
        this.confirmationTxt = page.locator(".hero-primary");
        this.orderNumber = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async verifyConfirmationMsg(confMsg) {
        await expect(this.confirmationTxt).toHaveText(confMsg)
    }

    async getOrderId() {
        return await this.orderNumber.textContent();
    } 

    

}

module.exports = { ConfirmationPage }