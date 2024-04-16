const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const checkoutPage = require('../pages/checkoutPage')
const lastCheckoutPage = require('../pages/lastCheckoutPage')
const { pageUtils } = require('../hooks/pageUtils')
const inventoryUtils = require('./inventoryUtils')

class checkoutUtils {
    constructor(pageUtils) {
        if (!checkoutUtils.instance) {
            checkoutUtils.instance = this
            this.pageUtils = pageUtils.page
            this.inventoryPage = inventoryPage
            this.cartPage = cartPage
            this.checkoutPage = checkoutPage
        }
        return checkoutUtils.instance
    }

    async insertCredentials(userType, credentials) {

        for (var credential of credentials) {
            const [firstName, lastName, zipCode] = credential;
            await (await pageUtils.page.$(checkoutPage.checkoutFirstname)).fill(firstName)
            await (await pageUtils.page.$(checkoutPage.checkoutLastname)).fill(lastName)
            await (await pageUtils.page.$(checkoutPage.checkoutZipcode)).fill(zipCode)
        }
    }

    async goToLastCheckout() {
        await pageUtils.page.click(checkoutPage.checkoutContinue)
    }

    async validateLastCheckoutTitle() {
        let title = await pageUtils.page.textContent(lastCheckoutPage.lastCheckoutTitle);
        expect(title).toBe('Checkout: Overview');
    }
}

module.exports = new checkoutUtils(pageUtils, inventoryUtils)