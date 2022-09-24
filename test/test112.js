//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('SELECT #01', function () {
	it('Select *', function (done) {
		var db = new alasql.Database();
		db.tables.one = {};
		db.tables.one.data = [
			{two: 1, three: 2},
			{two: 4, three: 5},
		];
		var res = db.exec('SELECT * FROM one');
		assert.deepEqual(db.tables.one.data, res);
		done();
	});
});
