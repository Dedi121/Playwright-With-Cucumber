const { expect } = require('@playwright/test')
const { pageUtils } = require('../hooks/pageUtils')
const lastCheckoutPage = require('../pages/lastCheckoutPage')
const finishPage = require('../pages/finishPage')
// npm install date-fns
const { format } = require("date-fns")

class lastCheckoutUtils {
    constructor(pageUtils, inventoryUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryUtils = inventoryUtils
        this.lastCheckoutPage = lastCheckoutPage
    }

    async verifyPrices() {
        // Get the product names and prices from the inventoryUtils
        var { itemName, itemPrice } = await this.inventoryUtils.iterateProductNameAndPrice();

        // Get the count of elements with the locator cartPage.cartInventoryItemName
        var count = await this.pageUtils.$$eval(this.lastCheckoutPage.lastCheckoutItem, elements => elements.length);

        var elements = await this.pageUtils.$$(this.lastCheckoutPage.lastCheckoutItem);

        var dataMap = new Map()

        for (let i = 0; i < count; ++i) {
            try {
                var element = elements[i]
                var elementProduct = await (await element.$(this.lastCheckoutPage.lastCheckoutItemName)).textContent()
                var elementPrice = await (await element.$(this.lastCheckoutPage.lastCheckoutItemPrice)).textContent()

                dataMap.set(elementProduct, elementPrice)

                var lastCheckoutItemName = itemName[i]
                var lastCheckoutItemPrice = itemPrice[i]

                if (lastCheckoutItemName === elementProduct && lastCheckoutItemPrice === elementPrice) {
                    //console.log("\nThe product Name and Price are the same for LastCheckout:")
                    //console.log(`\n${lastCheckoutItemName} \n${elementProduct}`);
                    //console.log(`\n${lastCheckoutItemPrice} \n${elementPrice}`);
                } else {
                    //console.log("\nSeems that the products Name and Price are not the same!")
                    break;
                }
            } catch (error) {
                console.error("Error occurred while processing element:", error.message);
            }
        }
    }

    async checkSubTotalPrice() {
        var { itemPrice } = await this.inventoryUtils.iterateProductNameAndPrice();

        var count = await this.pageUtils.$$eval(this.lastCheckoutPage.lastCheckoutItem, elements => elements.length);

        var elements = await this.pageUtils.$$(this.lastCheckoutPage.lastCheckoutItem);

        var priceList = []

        var subTotalPrice = (await (await this.pageUtils.$(lastCheckoutPage.lastCheckoutSubTotal)).textContent()).split("$")[1]

        for (let i = 0; i < count; ++i) {
            var element = elements[i]
            var elementPrice = await (await element.$(this.lastCheckoutPage.lastCheckoutItemPrice)).textContent()
            var price = elementPrice.split("$")[1]

            var lastCheckoutItemPrice = itemPrice[i]

            if (lastCheckoutItemPrice === elementPrice) {

                priceList.push(parseFloat(price))

                var sumOfPrices = priceList.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }
        }
        if (Number(subTotalPrice) === sumOfPrices)
            return sumOfPrices
    }

    async checkTotalPrice() {

        var sumOfPrices = await this.checkSubTotalPrice()

        //Getting Tax
        var tax = (await (await this.pageUtils.$(lastCheckoutPage.lastCheckoutTax)).textContent()).split("$")[1]
        var priceWithTax = (sumOfPrices + Number(tax)).toFixed(2)
        var total = (await (await this.pageUtils.$(lastCheckoutPage.lastCheckoutTotal)).textContent()).split("$")[1]
        if (priceWithTax === total)
            console.log(`${total} = ${priceWithTax}`)
        else
            console.log(`${total} != ${priceWithTax}`)
    }

    async goToFinish() {
        await this.pageUtils.click(lastCheckoutPage.lastCheckoutFinish)
    }

    async takeScreenshot(userType) {

        let title = await this.pageUtils.textContent(finishPage.finishTitle);
        expect(title).toBe('Checkout: Complete!');
        const currentDate = format(new Date(), "yyyy-MM-dd'_'HH-mm-ss");
        const screenshotPath = `src/sauceDemo/screenshots/${userType}_${currentDate}.png`;
        await this.pageUtils.screenshot({ path: screenshotPath, fullPage: true });
    }
}

module.exports = { lastCheckoutUtils }