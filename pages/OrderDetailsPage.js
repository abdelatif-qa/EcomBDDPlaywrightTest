const { expect } = require('@playwright/test');

class OrderDetailsPage {

    constructor(page) {
        this.page = page;
    }

    async verifyOrderId(orderId) {
        const orderIddetails = await this.page.locator(".col-text").textContent();
        await expect(orderId.includes(orderIddetails)).toBeTruthy();
    }

}
module.exports = { OrderDetailsPage}