const base = require('@playwright/test');

exports.costumTest = base.test.extend({
    testDataForOrder: {
        productName: "ZARA COAT 3",
        countryName: "Algeria",
        emailUser: "test@example.co",
        password: "Test1234?",
        confMsg: " Thankyou for the order. "
    }
});