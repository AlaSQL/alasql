if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #917
*/

var test = 619;

describe('Test ' + test + ' calling aggregate functions on empty sets', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Should always return undefined', function() {
		res = alasql('SELECT STDDEV(col) AS Result FROM ? WHERE 1=0', [[{col: 1}, {col: 2}]]);
		assert.equal(res[0]['Result'], undefined);
	});
});
