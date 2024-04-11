const users = require('../userData/users')
const loginPage = require('../pages/loginPage')
const { pageUtils } = require('../../hooks/pageUtils')

class loginUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.loginPage = loginPage
    }

    async goSite() {
        await this.pageUtils.goto("https://www.saucedemo.com/")
    }

    async validLogin(userType) {

        const user = users[userType];

        await pageUtils.page.fill(loginPage.username, user.username);
        await pageUtils.page.fill(loginPage.password, user.password);
    }

    async clickLoginBtn(userType) {
        await pageUtils.page.click(loginPage.loginBtn);
    }
}

module.exports = { loginUtils }