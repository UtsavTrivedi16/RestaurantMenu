const sinon = require('sinon');

// Restores test doubles to default in sandbox after every test
exports.mochaHooks = {
    afterEach() {
        sinon.restore();
    },
};