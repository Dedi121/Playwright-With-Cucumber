const users = require('../userData/users')
const loginPage = require('../pages/loginPage')
const { pageUtils } = require('../hooks/pageUtils')

class loginUtils {
    constructor(pageUtils) {
        if (!loginUtils.instance) {
            loginUtils.instance = this
            this.pageUtils = pageUtils.page
            this.loginPage = loginPage
        }
        return loginUtils.instance
    }

    async goSite() {
        await pageUtils.page.goto("https://www.saucedemo.com/")
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

module.exports = new loginUtils(pageUtils)