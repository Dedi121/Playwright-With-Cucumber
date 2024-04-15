const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const checkoutPage = require('../pages/checkoutPage')
const lastCheckout = require('../pages/lastCheckoutPage')
const { pageUtils } = require('../hooks/pageUtils')

class checkoutUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryPage = inventoryPage
        this.cartPage = cartPage
        this.checkoutPage = checkoutPage
    }

    async insertCredentials(userType, credentials) {

        for (var credential of credentials) {
            const [firstName, lastName, zipCode] = credential;
            await (await this.pageUtils.$(checkoutPage.checkoutFirstname)).fill(firstName)
            await (await this.pageUtils.$(checkoutPage.checkoutLastname)).fill(lastName)
            await (await this.pageUtils.$(checkoutPage.checkoutZipcode)).fill(zipCode)
        }
    }

    async goToLastCheckout() {
        await this.pageUtils.click(checkoutPage.checkoutContinue)
    }

    async validateLastCheckoutTitle() {
        let title = await this.pageUtils.textContent(lastCheckout.lastCheckoutTitle);
        expect(title).toBe('Checkout: Overview');
    }
}

module.exports = { checkoutUtils }