// Clears previous changes to alasql in tests;
delete require.cache[require.resolve('..')];

var assert = require('assert');
var alasql = require('..');

describe('mysql TIMESTAMPDIFF', function () {
	var res;

	beforeEach(function () {
		alasql.options.mysql = true;
	});

	it('should return the difference in months between 2 dates when called with month as a unit', function () {
		res = alasql("SELECT TIMESTAMPDIFF(MONTH, '2018-04-01', '2018-05-01') as result");

		assert.equal(res[0].result, 1);
	});

	it('should return the difference in days between 2 dates when called with day as a unit', function () {
		res = alasql("SELECT TIMESTAMPDIFF(DAY, '2018-04-01', '2018-05-01') as result");

		assert.equal(res[0].result, 30);
	});

	it('should return the difference in years between 2 dates when called with year as a unit', function () {
		res = alasql("SELECT TIMESTAMPDIFF(YEAR, '2018-04-01', '2018-05-01') as result");

		assert.equal(res[0].result, 0);
	});
});
