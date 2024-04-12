const { expect } = require('@playwright/test')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const { pageUtils } = require('../hooks/pageUtils')

class inventoryUtils {
    constructor(pageUtils) {
        this.pageUtils = pageUtils.page
        this.inventoryPage = inventoryPage
        this.cartPage = cartPage
    }

    async validateInventoryTitle() {
        let title = await this.pageUtils.textContent(inventoryPage.inventoryTitle);
        expect(title).toBe('Products');
    }

    async addProductsToCart(userType, selectedProducts) {
        for (const productName of selectedProducts) {
            const productElements = await this.pageUtils.$$(`${inventoryPage.inventoryInventory}`);

            for (const productElement of productElements) {
                //const productText = await (await productElement.$(inventoryPage.inventoryProductsName)).textContent();
                //if (productName === productText) {
                //console.log(productName);
                var addToCartButton = await (await productElement.$(`#add-to-cart-${productName.toLowerCase().replace(/\s/g, '-')}`));

                if (addToCartButton) {

                    await addToCartButton.click();
                    //console.log("Added to cart: " + productName);

                    break; // Exit the loop after adding the product to cart
                } //else {
                //console.log("Add to Cart button was not found: " + productName);
                //}
                //}
            }
        }
        await this.pageUtils.pause()
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