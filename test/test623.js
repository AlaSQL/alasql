if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '623'; // insert test file number

describe('Test ' + test + ' - group concat', function () {
	var data;
	var res;

	it('A) int concat', function () {
		data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 1, b: 30},
		];
		res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, '10,30');
		assert.equal(res[1].b, '20');
	});

	it('B) string values', function () {
		data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 1, b: 'z'},
		];
		res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, 'x,z');
		assert.equal(res[1].b, 'y');
	});
});
