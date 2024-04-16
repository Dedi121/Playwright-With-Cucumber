const { When } = require('@cucumber/cucumber')
const loginUtils = require('../utils/loginUtils')
const inventoryUtils = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

When(/^User "([^"]*)" enters his credentials$/, { timeout: 40000 }, async (userType) => {
    await loginUtils.validLogin(userType)
})

When(/^"([^"]*)" adds "([^"]*)" to cart$/, { timeout: 400000 }, async function (userType, selectedProducts, addProductsTable) {
    selectedProducts = addProductsTable.raw().map(row => row[0])
    await inventoryUtils.addProductsToCart(userType, selectedProducts)
})