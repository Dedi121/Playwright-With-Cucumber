const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const { pageUtils } = require('../hooks/pageUtils')

class inventoryUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryPage = inventoryPage
        this.cartPage = cartPage
        this.productNames = [] // Array to store product names
        this.productPrices = [] // Array to store product prices
    }

    async validateInventoryTitle() {
        let title = await this.pageUtils.textContent(inventoryPage.inventoryTitle);
        expect(title).toBe('Products');
    }

    async addProductsToCart(userType, selectedProducts) {

        for (var productName of selectedProducts) {
            var elements = await this.pageUtils.$$(`${inventoryPage.inventoryInventory}`);

            for (var [productElement, priceElement] of elements.map(item => [item, item])) {
                var addToCartButton = await (await productElement.$(`#add-to-cart-${productName.toLowerCase().replace(/\s/g, '-')}`));
                var productPrice = await (await priceElement.$(inventoryPage.inventoryItemPrice)).textContent()

                if (addToCartButton) {
                    await addToCartButton.click();
                    this.productNames.push(productName)
                    this.productPrices.push(productPrice)
                    break;
                }
            }
        }
    }

    async iterateProductNameAndPrice() {
        return { itemName: this.productNames, itemPrice: this.productPrices };
    }

    async clickCartButton() {
        await this.pageUtils.click(inventoryPage.inventoryCartContainer)
    }

    async validateCartTitle() {
        let title = await this.pageUtils.textContent(cartPage.cartTitle);
        expect(title).toBe('Your Cart');
    }
}

module.exports = { inventoryUtils }