const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.cartList = page.locator("div li").first();
        this.ordersBtn = page.locator("button[routerlink='/dashboard/myorders']")
        this.checkoutBtn = page.locator("text='Checkout'");
    }

    getProductLocator(productName) {
        return this.productAddTocart = this.page.locator("h3:has-text('" + productName + "')");
    }

    async verifyProductIsDisplayed(productName) {
        await this.cartList.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

}
module.exports = { CartPage }