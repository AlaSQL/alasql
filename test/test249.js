if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 249 - NULL as null', function () {
	// This test should be failed, because AlaSQL supports 'undefined'

	it('1. Simple NULL value', function (done) {
		var res = alasql('SELECT VALUE NULL');
		assert(res === undefined);

		done();
	});
});
