const sinon = require('sinon');
const expect = require('chai').expect;
const _ = require('lodash');

require('dotenv').config({
    path: "env/.env.test"
});

global.sinon = sinon;
global.expect = expect;
global._ = _;
// Restores test doubles to default in sandbox after every test
exports.mochaHooks = {
    afterEach() {
        sinon.restore();
    }
};