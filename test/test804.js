if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '804'; // insert test file number

describe('Test ' + test + ' - alasql.use on non-existant DB', function () {
	it("Don't set alasql.useid to non-existant DB", function () {
		try {
			alasql.use('NotRealDatabase');
		} catch (error) {}
		assert.notEqual(alasql.useid, 'NotRealDatabase');
	});
});
