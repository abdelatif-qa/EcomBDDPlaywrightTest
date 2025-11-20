const { Given, When, Then } = require('@cucumber/cucumber');
const { PagesManager } = require("../../pages/PagesManager");
const {expect, playwright } = require("@playwright/test");

const dataSet = JSON.parse(
    JSON.stringify(require("../../utils/placeOrderTestData1.json"))
);
let orderId;

Given('login to Ecommerce application with {string} and {string}', { timeout: 50 * 1000 }, async function (userEmail, password) {

    const loginPage = this.pagesManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(userEmail, password)
});


When('Add {string} to the Cart', async function (productName) {

    this.homePage = this.pagesManager.getHomePage();
    const dashboardPage = this.pagesManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productName);
    await this.homePage.NavigatToCart();

});


Then('Verify {string} is displayed in the Cart', async function (productName) {

    const cartPage = this.pagesManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.clickCheckoutBtn();

});


When('Enter valid details and Palace the order', { timeout: 50 * 1000 }, async function () {

    const checkoutPage = this.pagesManager.getCheckoutpage();
    const confirmationPage = this.pagesManager.getConfirmationPage();

    await checkoutPage.searchCountryAndSelect(dataSet.countryName);
    await checkoutPage.verifyEmailId(dataSet.emailUser);
    await checkoutPage.placeOrder();

    await confirmationPage.verifyConfirmationMsg(dataSet.confMsg);

    orderId = await confirmationPage.getOrderId();

});


Then('Verify order is present in OrderHistory', { timeout: 50 * 1000 }, async function () {

    this.homePage = this.pagesManager.getHomePage();
    const ordersPage = this.pagesManager.getOrdersPage();
    const orderDetailsPage = this.pagesManager.getOrderDetailsPage();

    await this.homePage.navigateToOrders();

    await ordersPage.clickViewBtn(orderId);

    await orderDetailsPage.verifyOrderId(orderId);

});

Then('Delete the order', async function () {

    const homePage = this.pagesManager.getHomePage();
    const ordersPage = this.pagesManager.getOrdersPage();

    await homePage.navigateToOrders();

    await ordersPage.deleteOrder(orderId);

});
