const { test, expect } = require("@playwright/test");
const { PagesManager } = require("../pages/PagesManager");
//Json -> String -> Js Object
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/placeOrderTestData1.json"))
);

test("Client App Implementing Pages Test", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const countryName = "Algeria";
  const emailUser = "test@example.co";
  const password = "Test1234?";
  const confMsg = " Thankyou for the order. ";

  const pagesManager = new PagesManager(page);

  const homePage = pagesManager.getHomePage();
  const loginPage = pagesManager.getLoginPage();
  const dashboardPage = pagesManager.getDashboardPage();
  const cartPage = pagesManager.getCartPage();
  const checkoutPage = pagesManager.getCheckoutpage();
  const confirmationPage = pagesManager.getConfirmationPage();
  const ordersPage = pagesManager.getOrdersPage();
  const orderDetailsPage = pagesManager.getOrderDetailsPage();

  await loginPage.goto();
  await loginPage.validLogin(dataSet.emailUser, dataSet.password);

  await dashboardPage.searchProductAddToCart(dataSet.productName);
  await homePage.NavigatToCart();

  await cartPage.verifyProductIsDisplayed(dataSet.productName);
  await cartPage.clickCheckoutBtn();

  await checkoutPage.searchCountryAndSelect(dataSet.countryName);
  await checkoutPage.verifyEmailId(dataSet.emailUser);
  await checkoutPage.placeOrder();

  await confirmationPage.verifyConfirmationMsg(dataSet.confMsg);

  const orderId = await confirmationPage.getOrderId();

  console.log(orderId);

  await homePage.navigateToOrders();

  await ordersPage.clickViewBtn(orderId);

  await orderDetailsPage.verifyOrderId(orderId);

  await homePage.navigateToOrders();

  await ordersPage.deleteOrder(orderId);
});
