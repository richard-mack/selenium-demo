"use strict";

// Load the test harness
const webdriver = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

// Page Objects
const ChallengingDOM = require('../pageObjects/theInternet/challengingDOM.page');
const DynamicControls = require('../pageObjects/theInternet/dynamicControls.page');

const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

describe.skip('Challenging DOM Page', () => {
    before(async () => {
        this.ChallengingDOM = new ChallengingDOM(webdriver, driver)
        await this.ChallengingDOM.navigate();
    });

    it('should have the correct content', async () => {
        // Check the title at the top of the page
        await expect(this.ChallengingDOM.headerText.getText()).to.eventually.equal('Challenging DOM');

        // Check non-dynamic content of buttons
        for (let button of [ this.ChallengingDOM.simpleButton, this.ChallengingDOM.alertButton, this.ChallengingDOM.successButton ] ) {
            await expect(button.getTagName()).to.eventually.equal('a');
            await expect(button.getAttribute('id')).to.eventually.have.lengthOf(36); // All we know is that this is a random string of length 36
        }

        // Check that canvas has the right type and dimensions
        await expect(this.ChallengingDOM.canvas.getTagName()).to.eventually.equal('canvas');
        await expect(this.ChallengingDOM.canvas.getCssValue('width')).to.eventually.equal('601px')
        await expect(this.ChallengingDOM.canvas.getCssValue('height')).to.eventually.equal('202px')
        
        // Check a few table pieces. COULD DO: Expand this or make it choose random pieces for better coverage
        // COULD DO: check at least one from each row and column, substitute for being exhaustive
        await expect(this.ChallengingDOM.getTableHeaderByColumn(2).getText()).to.eventually.equal('Ipsum');
        await expect(this.ChallengingDOM.getTableElementByCoordinates(3,2).getText()).to.eventually.equal('Apeirian2');
        await expect(this.ChallengingDOM.getTableElementByCoordinates(6,4).getText()).to.eventually.equal('Definiebas5')
    })

    //COULD DO: Do something with the links? It doesn't seem worth checking that clicking on links does the right thing

    //SHOULD DO: When I find out more, take another stab at reading the canvas
    it.skip('should display a number in the canvas', ( done ) => {
        done();
    })

    after(async () => driver.quit())
});

describe('Dynamic Controls', () => {
    before(async () => {
        this.DynamicControls = new DynamicControls(webdriver, driver)
        await this.DynamicControls.navigate();
    });

    it('should be on the correct page', async () => {
        await expect(this.DynamicControls.checkbox.getTagName()).to.eventually.equal('input');
    })

    after(async () => driver.quit())
});