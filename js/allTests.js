"use strict";
/*
    Front matter
*/
const webdriver = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

let browser;

// Eventually these should be split into different files to spread out the testing more nicely
suite(function (env) {
    describe('the-internet test site', function () {
        before( async function() {
            this.timeout(20000);
            browser = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            await browser.get('http://the-internet.herokuapp.com/challenging_dom')
        });
    
        after(() => browser.quit());
    
        it('should load', function (done) {
            expect(browser.getTitle()).to.eventually.equal('The Internet').notify(done);

        });
    }, {browsers : ['chrome']});
});

