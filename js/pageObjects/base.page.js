class Page {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000,
        targetUrl,
        expectedTitle,
    ) {
        this.webdriver = webdriver;
        this.driver = driver;
        this.waitTimeout = waitTimeout;
        this.targetUrl = targetUrl;
        this.expectedTitle = expectedTitle;
        this.log = msg => console.log(msg);
    }

    async navigate() {
        await this.driver.navigate().to(this.targetUrl);
        let actualTitle = await this.driver.getTitle()
        if (actualTitle !== this.expectedTitle) {
            throw new Error(`Expected/Actual title mismatch. Expected was "${this.expectedTitle}", actual was "${actualTitle}"`)
        }
    }

    getElementByCSS(cssSelector) {
        return this.driver.findElement(this.webdriver.By.css(cssSelector));
    }

    getElementByXPath(xpathSelector) {
        return this.driver.findElement(this.webdriver.By.xpath(xpathSelector));
    }
}

module.exports = Page;