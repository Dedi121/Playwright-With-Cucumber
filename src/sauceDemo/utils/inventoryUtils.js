const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const { pageUtils } = require('../hooks/pageUtils')

class inventoryUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryPage = inventoryPage
        this.cartPage = cartPage
        this.productPrice = new Map()
    }

    async validateInventoryTitle() {
        let title = await this.pageUtils.textContent(inventoryPage.inventoryTitle);
        expect(title).toBe('Products');
    }

    async addProductsToCart(userType, selectedProducts, selectedPrices) {

        for (const productName of selectedProducts) {
            for (const productPrice of selectedPrices) {
                var elements = await this.pageUtils.$$(`${inventoryPage.inventoryInventory}`);

                for (const [productElement, priceElement] of elements.map(item => [item, item])) {
                    var addToCartButton = await (await productElement.$(`#add-to-cart-${productName.toLowerCase().replace(/\s/g, '-')}`));
                    var pricesOfProducts = await (await priceElement.$(inventoryPage.inventoryItemPrice)).textContent()

                    if (addToCartButton) {
                        await addToCartButton.click();
                        this.productPrice.set(productName, pricesOfProducts)
                        break;
                    }
                }
            }
        }
    }

    async iterateProductNameAndPrice() {
        let itemName = []
        let itemPrice = []
        for (var [productName, pricesOfProducts] of this.productPrice.entries()) {
            itemName.push(productName)
            itemPrice.push(pricesOfProducts)
            console.log(`Product: ${productName}, Price: ${pricesOfProducts}`)

        }
        return { itemName, itemPrice }
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