const { HomePage } = require("./HomePage");
const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { CheckoutPage } = require("./CheckoutPage");
const { ConfirmationPage } = require("./ConfirmationPage");
const { OrdersPage } = require("./OrdersPage");
const { OrderDetailsPage } = require("./OrderDetailsPage");

class PagesManager {

    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.confirmationPage = new ConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutpage() {
        return this.checkoutPage;
    }

    getConfirmationPage() {
        return this.confirmationPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }
    
}
module.exports = { PagesManager }