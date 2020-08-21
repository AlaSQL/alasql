//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Create database', function () {
	it('Create new database', function (done) {
		var db = new alasql.Database();
		assert.deepEqual(db.tables, {});
		done();
	});
});
