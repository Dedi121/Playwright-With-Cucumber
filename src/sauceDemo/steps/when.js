const { When } = require('@cucumber/cucumber')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../../hooks/pageUtils')

When(/^User "([^"]*)" enters his credentials$/, { timeout: 40000 }, async (userType) => {
    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.validLogin(userType)
})

When(/^"([^"]*)" adds "([^"]*)" to cart$/, { timeout: 40000 }, async function (userType, selectedProducts, addProductsTable) {
    selectedProducts = addProductsTable.raw().map(row => row[0])
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.addProductsToCart(userType, selectedProducts)
})