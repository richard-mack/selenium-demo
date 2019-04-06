"use strict";
// Using XPath selectors for this one
const Page = require("../base.page");


// This page has a couple of oddities
// Activating and deactivating the checkbox creates a new line with "A Checkbox", but only one interactable control
// Activating and deactivating the text entry leaves an extra "Wait for it..." if you've done the checkboxes before
class DynamicControls extends Page {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000,
        targetUrl = 'http://the-internet.herokuapp.com/dynamic_controls',
        expectedTitle = 'The Internet',
    ) {
        super(webdriver, driver, waitTimeout, targetUrl, expectedTitle);
    }

    get headerText() { return this.getElementByXPath("//div[@class='example']/h4[1]"); }
    get checkbox() { return this.getElementByXPath("//input[@type='checkbox']"); }
    get checkboxToggle() { return this.getElementByXPath("//form[@id='checkbox-example']/button"); }
    get textbox() { return this.getElementByXPath("//input[@type='text']"); }
    get textboxToggle() { return this.getElementByXPath("//form[@id='input-example']/button"); }

    async toggleCheckbox() {
        
    }
}

module.exports = DynamicControls;