if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 804 - alasql.use on non-existant DB', function () {
	it("Don't set alasql.useid to non-existant DB", function () {
		try {
			alasql.use('NotRealDatabase');
		} catch (error) {}
		assert.notEqual(alasql.useid, 'NotRealDatabase');
	});
});
