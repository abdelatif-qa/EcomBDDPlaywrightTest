class OrdersPage {

    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
    }

    async clickViewBtn(orderId) {
        await this.rows.first().waitFor();
        const rowsCount = await this.rows.count();
        for(let i = 0; i < rowsCount; ++i) {
            const IdText = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(IdText)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async deleteOrder(orderId) {
        await this.rows.first().waitFor();
        const rowsCount = await this.rows.count();
        for(let i = 0; i < rowsCount; ++i) {
            const IdText = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(IdText)) {
                await this.rows.nth(i).locator("button").last().click();
                break;
            }
        }
    }

    
}
module.exports = { OrdersPage }