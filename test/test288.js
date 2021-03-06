if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 288 ROWNUM()', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test288;USE test288');
		done();
	});

	it('2. SET', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT a, ROWNUM() AS b FROM ?', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 1},
			{a: 2, b: 2},
			{a: 3, b: 3},
		]);
		done();
	});

	it('3. Subquery', function (done) {
		alasql('CREATE TABLE one (a INT PRIMARY KEY)');
		for (var i = 1; i < 1000; i++) {
			alasql('INSERT INTO one VALUES (?)', [i]);
		}
		var res = alasql(
			'SELECT * FROM (SELECT a, ROWNUM() AS r FROM one)\
      WHERE r BETWEEN 55 AND 60'
		);
		assert.deepEqual(res, [
			{a: 55, r: 55},
			{a: 56, r: 56},
			{a: 57, r: 57},
			{a: 58, r: 58},
			{a: 59, r: 59},
			{a: 60, r: 60},
		]);
		done();
	});

	// TODO: Add other operators

	it('3. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test288');
		done();
	});
});
