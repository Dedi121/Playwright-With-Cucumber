const { Given, When, Then } = require('@cucumber/cucumber')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../../hooks/pageUtils')


Given(/^"([^"]*)" is on Inventory page$/, async function (string) {
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.validateTitle()
});

When(/^"([^"]*)" adds "([^"]*)" to cart$/, async function (string, string2, dataTable) {

});

Then(/^"([^"]*)" verify the number of item on the cart$/, async function (string) {

});

Then(/^"([^"]*)" clicks on the cart icon$/, async function (string) {

});

Then(/^"([^"]*)" checks the prices of the products$/, async function (string) {

});

Then(/^"([^"]*)" goes to the next page$/, async function (string) {

});