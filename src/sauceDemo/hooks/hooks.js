const { BeforeAll, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')
const { pageUtils } = require('./pageUtils')

let browser
let context
let page

setDefaultTimeout(60000000)

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false,
        slowMo: 100,
        args: ['--start-maximized'],
    })
    context = await browser.newContext({
        viewport: null
    })
    page = await context.newPage()
    pageUtils.page = page
})

AfterAll(async function () {
    // Close the page with a timeout
    await pageUtils.page.close();
    // Close the browser with a timeout
    await browser.close();
})
