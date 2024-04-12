const { When } = require('@cucumber/cucumber')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

When(/^User "([^"]*)" enters his credentials$/, { timeout: 40000 }, async (userType) => {
    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.validLogin(userType)
})

When(/^"([^"]*)" adds "([^"]*)" with "([^"]*)" to cart$/, { timeout: 400000 }, async function (userType, selectedProducts, selectedPrices, addProductsTable) {
    selectedProducts = addProductsTable.raw().map(row => row[0])
    selectedPrices = addProductsTable.raw().map(column => column[1])
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.addProductsToCart(userType, selectedProducts, selectedPrices)
    await this.inventoryUtils.iterateProductNameAndPrice()
})