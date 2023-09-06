if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '1776'; // insert test file number

describe('Test ' + test + ' - case-insensitive distinct keyword within aggregations', function () {
	var data;
	var res;

	it('a) GROUP_CONCAT aggregation', function () {
		data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 1, b: 'z'},
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
		];
		res = alasql('SELECT a, GROUP_CONCAT(Distinct b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, 'x,z');
		assert.equal(res[1].b, 'y');
	});

});
