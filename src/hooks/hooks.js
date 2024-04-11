const { BeforeAll, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')
const { pageUtils } = require('./pageUtils')

let browser
let page

const LAUNCH_TIMEOUT = 300000; // 300 seconds
const CLOSE_TIMEOUT = 100000; // 100 seconds

setDefaultTimeout(60000)

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false, timeout: LAUNCH_TIMEOUT })
    page = await browser.newPage()
    pageUtils.page = page
})

AfterAll(async function () {
    // Close the page with a timeout
    await pageUtils.page.close({ timeout: CLOSE_TIMEOUT });
    // Close the browser with a timeout
    await browser.close({ timeout: CLOSE_TIMEOUT });
})
