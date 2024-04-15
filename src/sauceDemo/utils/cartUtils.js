const { expect } = require('@playwright/test')
const cartPage = require('../pages/cartPage')
const checkoutPage = require('../pages/checkoutPage')
const { inventoryUtils } = require('../utils/inventoryUtils')
const { pageUtils } = require('../hooks/pageUtils')

class cartUtils {
    constructor(pageUtils, inventoryUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryUtils = inventoryUtils
        this.cartPage = cartPage
    }

    async checkPrices() {
        // Get the product names and prices from the inventoryUtils
        var { itemName, itemPrice } = await this.inventoryUtils.iterateProductNameAndPrice();

        // Get the count of elements with the locator cartPage.cartInventoryItemName
        var count = await this.pageUtils.$$eval(this.cartPage.cartItem, elements => elements.length);

        // Get all elements with the locator cartPage.cartCart
        var elements = await this.pageUtils.$$(this.cartPage.cartItem);

        // Create a map to store the data
        var dataMap = new Map();

        // Iterate over each element
        for (let i = 0; i < count; ++i) {
            try {
                // Get the product name and price for the current element
                var element = elements[i];
                var elementProducts = await (await element.$(this.cartPage.cartInventoryItemName)).textContent();
                var elementPrices = await (await element.$(this.cartPage.cartInventoryItemPrice)).textContent();

                // Add the product name and price to the data map
                dataMap.set(elementProducts, elementPrices);

                // Compare with the data from inventoryUtils
                var cartItemName = itemName[i];
                var cartItemPrice = itemPrice[i];

                if (cartItemName === elementProducts && cartItemPrice === elementPrices) {
                    //console.log("\nThe product Name and Price are the same for Cart:")
                    //console.log(`\n${cartItemName} \n${elementProducts}`);
                    //console.log(`\n${cartItemPrice} \n${elementPrices}`);
                } else {
                    //console.log("\nSeems that the products Name and Price are not the same!")
                    break;
                }
            } catch (error) {
                console.error("Error occurred while processing element:", error.message);
            }
        }
    }

    async goToCheckout() {
        await this.pageUtils.click(cartPage.cartCheckoutBtn)
    }

    async validateCheckoutTitle() {
        let title = await this.pageUtils.textContent(checkoutPage.checkoutTitle);
        expect(title).toBe('Checkout: Your Information');
    }

}

module.exports = { cartUtils }