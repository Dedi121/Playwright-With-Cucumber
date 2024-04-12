const { Given } = require('@cucumber/cucumber')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

Given(/^User navigates to the application$/, { timeout: 40000 }, async () => {

    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.goSite()

})

Given(/^"([^"]*)" is on Inventory page$/, async function (string) {
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.validateInventoryTitle()
});