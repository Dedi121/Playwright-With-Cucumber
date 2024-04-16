const { Given } = require('@cucumber/cucumber')
const loginUtils = require('../utils/loginUtils')
const inventoryUtils = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

Given(/^User navigates to the application$/, { timeout: 40000 }, async () => {
    await loginUtils.goSite()
})

Given(/^"([^"]*)" is on Inventory page$/, async function (string) {
    await inventoryUtils.validateInventoryTitle()
});