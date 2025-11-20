class HomePage {

    constructor(page) {
        this.page = page;
        this.ordersBtn = page.locator("button[routerlink='/dashboard/myorders']");
        this.cartBtn = page.locator("[routerlink*='cart']");
    }

    async NavigatToCart() {
        await this.cartBtn.click();
    }

    async navigateToOrders() {
        await this.ordersBtn.click()
    }

}
module.exports = { HomePage }