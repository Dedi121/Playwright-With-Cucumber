const { Given, When, Then } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')
const { loginUtils } = require('../utils/loginUtils')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../../hooks/pageUtils')

Given(/^User navigates to the application$/, { timeout: 40000 }, async () => {

    this.loginUtils = new loginUtils(pageUtils)
    await this.loginUtils.goSite()

});

When(/^User "([^"]*)" enters his credentials$/, { timeout: 40000 }, async (userType) => {
    await this.loginUtils.validLogin(userType)
});

Then(/^"([^"]*)" clicks the login button$/, { timeout: 40000 }, async (userType) => {
    await this.loginUtils.clickLoginBtn(userType)
});

Then(/^"([^"]*)" has logged in successfully$/, { timeout: 40000 }, async (userType) => {
    this.inventoryUtils = new inventoryUtils(pageUtils)
    await this.inventoryUtils.validateTitle()
});