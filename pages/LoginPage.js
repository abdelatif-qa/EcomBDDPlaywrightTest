class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginBtn = page.locator("[name='login']");
        this.cardTitles = page.locator(".card-body b");
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }


    async validLogin(emailUser, password) {
        await this.emailInput.fill(emailUser);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.cardTitles.first().waitFor();
    }
        

}

module.exports = { LoginPage }