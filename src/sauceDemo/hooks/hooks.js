const { BeforeAll, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')
const { pageUtils } = require('./pageUtils')

let browser
let page

setDefaultTimeout(60000)

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false, })
    page = await browser.newPage()
    pageUtils.page = page
})

AfterAll(async function () {
    // Close the page with a timeout
    await pageUtils.page.close();
    // Close the browser with a timeout
    await browser.close();
})
