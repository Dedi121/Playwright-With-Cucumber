const { Then } = require('@cucumber/cucumber')
const { pageUtils } = require('../hooks/pageUtils')
const loginUtils = require('../utils/loginUtils')
const inventoryUtils = require('../utils/inventoryUtils')
const cartUtils = require('../utils/cartUtils')
const checkoutUtils = require('../utils/checkoutUtils')
const lastCheckoutUtils = require('../utils/lastCheckoutUtils')

Then(/^"([^"]*)" clicks the login button$/, { timeout: 40000 }, async (userType) => {
    await loginUtils.clickLoginBtn(userType)
})

Then(/^"([^"]*)" has logged in successfully$/, { timeout: 40000 }, async (userType) => {
    await inventoryUtils.validateInventoryTitle()
})

Then(/^"([^"]*)" clicks on the cart icon$/, { timeout: 40000 }, async function (userType) {
    await inventoryUtils.clickCartButton()
    await inventoryUtils.validateCartTitle()
})

Then(/^"([^"]*)" checks the prices of the products$/, { timeout: 40000 }, async function (userType) {
    await cartUtils.checkPrices()
})

Then(/^"([^"]*)" goes to the checkout$/, async function (userType) {
    await cartUtils.goToCheckout()
    await cartUtils.validateCheckoutTitle()
})

Then(/^"([^"]*)" inserts his "([^"]*)"$/, async function (userType, credentials, datatable) {
    credentials = datatable.raw().map(row => row)
    await checkoutUtils.insertCredentials(userType, credentials)
})

Then(/^"([^"]*)" clicks continue$/, async function (userType) {
    await checkoutUtils.goToLastCheckout()
    await checkoutUtils.validateLastCheckoutTitle()
})

Then(/^"([^"]*)" check the amount he needs to pay it is correct$/, async function (userType) {
    await lastCheckoutUtils.verifyPrices()
    await lastCheckoutUtils.checkSubTotalPrice()
    await lastCheckoutUtils.checkTotalPrice()
    await lastCheckoutUtils.goToFinish()
})

Then(/^"([^"]*)" finish his checkout$/, { timeout: 40000 }, async function (userType) {
    //await lastCheckoutUtils.takeScreenshot(userType)
})

Then(/^"([^"]*)" has logged out successfully$/, { timeout: 40000 }, async function (userType) {
    await inventoryUtils.loggingOut()
})

Then(/^"([^"]*)" removes "([^"]*)" to cart$/, { timeout: 400000 }, async function (userType, selectedProducts, addProductsTable) {
    selectedProducts = addProductsTable.raw().map(row => row[0])
    await inventoryUtils.removeProductsFromCart(userType, selectedProducts)
})

