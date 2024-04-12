const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const { pageUtils } = require('../../hooks/pageUtils')

class cartUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryPage = inventoryPage
        this.cartPage = cartPage
    }

    async checkPrices() {

    }

}