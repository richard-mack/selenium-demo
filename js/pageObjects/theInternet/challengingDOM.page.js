"use strict";
// Using CSS selectors for this page. No real reason to choose CSS over XPath, simply starting somewhere
const Page = require("../base.page");

class ChallengingDom extends Page {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000,
        targetUrl = 'http://the-internet.herokuapp.com/challenging_dom',
        expectedTitle = 'The Internet',
    ) {
        super(webdriver, driver, waitTimeout, targetUrl, expectedTitle);
    }

    get headerText()    { return this.getElementByCSS('h3'); }
    get simpleButton()  { return this.getElementByCSS('.button:not(.alert):not(.success)'); } 
    // The above two are hacks. Of course, if this page was getting a rework that would break the above two, I'd advocate for adding better identifiers
    get alertButton()   { return this.getElementByCSS('.alert'); }
    get successButton() { return this.getElementByCSS('.success'); }
    get canvas()        { return this.getElementByCSS('#canvas'); }

    getTableElementByCoordinates(row, column) {
        return this.getElementByCSS(`tbody>tr:nth-child(${row})>td:nth-child(${column})`);
    }

    getTableHeaderByColumn(column) {
        return this.getElementByCSS(`thead>tr>th:nth-child(${column})`);
    }

    getEditButtonNthRow(row) {
        return this.getElementByCSS(`tbody>tr:nth-child(${row})>td:last-child>a[href$="edit"]`);
    }

    getDeleteButtonNthRow(row) {
        return this.getElementByCSS(`tbody>tr:nth-child(${row})>td:last-child>a[href$="delete"]`);
    }
}

module.exports = ChallengingDom;