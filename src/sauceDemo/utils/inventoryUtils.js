const { expect } = require('@playwright/test')
const loginPage = require('../pages/loginPage')
const inventoryPage = require('../pages/inventoryPage')
const cartPage = require('../pages/cartPage')
const { pageUtils } = require('../hooks/pageUtils')

class inventoryUtils {
    constructor(pageUtils) {
        if (!inventoryUtils.instance) {
            inventoryUtils.instance = this
            this.pageUtils = pageUtils.page
            this.loginPage = loginPage
            this.inventoryPage = inventoryPage
            this.cartPage = cartPage
            this.productNames = [] // Array to store product names
            this.productPrices = [] // Array to store product prices
        }
        return inventoryUtils.instance
    }

    async validateInventoryTitle() {
        let title = await pageUtils.page.textContent(inventoryPage.inventoryTitle);
        expect(title).toBe('Products');
    }

    async addProductsToCart(userType, selectedProducts) {

        this.productNames = []
        this.productPrices = []

        for (var productName of selectedProducts) {
            var elements = await pageUtils.page.$$(`${inventoryPage.inventoryInventory}`);

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

    async removeProductsFromCart(userType, selectedProducts) {
        for (var productName of selectedProducts) {
            var elements = await pageUtils.page.$$(`${inventoryPage.inventoryInventory}`);

            for (var [productElement, priceElement] of elements.map(item => [item, item])) {
                var removeFromCartButton = await (await productElement.$(`#remove-${productName.toLowerCase().replace(/\s/g, '-')}`));
                var productPrice = await (await priceElement.$(inventoryPage.inventoryItemPrice)).textContent()

                if (removeFromCartButton) {
                    await removeFromCartButton.click();
                    var index = this.productNames.indexOf(productName)
                    if (index !== -1) {
                        this.productNames.splice(index, 1)
                        this.productPrices.splice(index, 1)
                    }
                    break;
                }
            }
        }
    }

    async iterateProductNameAndPrice() {
        return { itemName: this.productNames, itemPrice: this.productPrices };
    }

    async clickCartButton() {
        await pageUtils.page.click(inventoryPage.inventoryCartContainer)
    }

    async validateCartTitle() {
        let title = await pageUtils.page.textContent(cartPage.cartTitle);
        expect(title).toBe('Your Cart');
    }

    async loggingOut() {
        await pageUtils.page.click(inventoryPage.inventoryOpenBurgerMenu)
        await pageUtils.page.click(inventoryPage.inventoryCloseBurgerMenu)
        await pageUtils.page.click(inventoryPage.inventoryOpenBurgerMenu)
        await pageUtils.page.click(inventoryPage.inventoryLogOut)

        let title = await pageUtils.page.textContent(loginPage.loginLogo)
        expect(title).toBe('Swag Labs')

    }
}

module.exports = new inventoryUtils(pageUtils)