const { Then } = require('@cucumber/cucumber')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

Then(/^"([^"]*)" clicks the login button$/, { timeout: 40000 }, async (userType) => {
    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.clickLoginBtn(userType)
})

Then(/^"([^"]*)" has logged in successfully$/, { timeout: 40000 }, async (userType) => {
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.validateInventoryTitle()
})

Then(/^"([^"]*)" clicks on the cart icon$/, async function (userType) {
    await this.inventoryUtils.clickCartButton()
    await this.inventoryUtils.validateCartTitle()
})

Then(/^"([^"]*)" checks the prices of the products$/, async function (userType) {

})

Then(/^"([^"]*)" goes to the next page$/, async function (userType) {

})