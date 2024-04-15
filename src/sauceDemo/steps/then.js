const { Then } = require('@cucumber/cucumber')
const { pageUtils } = require('../hooks/pageUtils')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { cartUtils } = require('../utils/cartUtils')
const { checkoutUtils } = require('../utils/checkoutUtils')
const { lastCheckoutUtils } = require('../utils/lastCheckoutUtils')

Then(/^"([^"]*)" clicks the login button$/, { timeout: 40000 }, async (userType) => {
    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.clickLoginBtn(userType)
})

Then(/^"([^"]*)" has logged in successfully$/, { timeout: 40000 }, async (userType) => {
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.validateInventoryTitle()
})

Then(/^"([^"]*)" clicks on the cart icon$/, { timeout: 40000 }, async function (userType) {
    await this.inventoryUtils.clickCartButton()
    await this.inventoryUtils.validateCartTitle()
})

Then(/^"([^"]*)" checks the prices of the products$/, { timeout: 40000 }, async function (userType) {
    this.cartUtils = new cartUtils(pageUtils, this.inventoryUtils)
    await this.cartUtils.checkPrices()

})

Then(/^"([^"]*)" goes to the checkout$/, async function (userType) {
    await this.cartUtils.goToCheckout()
    await this.cartUtils.validateCheckoutTitle()

})

Then(/^"([^"]*)" inserts his "([^"]*)"$/, async function (userType, credentials, datatable) {
    credentials = datatable.raw().map(row => row)
    this.checkoutUtils = new checkoutUtils(pageUtils, this.inventoryUtils)
    await this.checkoutUtils.insertCredentials(userType, credentials)

})

Then(/^"([^"]*)" clicks continue$/, async function (userType) {
    await this.checkoutUtils.goToLastCheckout()
    await this.checkoutUtils.validateLastCheckoutTitle()
})

Then(/^"([^"]*)" check the amount he needs to pay it is correct$/, async function (userType) {
    this.lastCheckoutUtils = new lastCheckoutUtils(pageUtils, this.inventoryUtils)
    await this.lastCheckoutUtils.verifyPrices()
    await this.lastCheckoutUtils.checkSubTotalPrice()
    await this.lastCheckoutUtils.checkTotalPrice()
    await this.lastCheckoutUtils.goToFinish()

})

Then(/^"([^"]*)" finish his checkout$/, async function (userType) {
    await this.lastCheckoutUtils.takeScreenshot(userType)
})