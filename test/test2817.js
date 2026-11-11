if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2817 - ORDER BY an expression of the GROUP BY key', function () {
	before(function () {
		alasql('CREATE DATABASE test2817; USE test2817');
		alasql('CREATE TABLE th (a INT, c TEXT)');
		alasql("INSERT INTO th VALUES (0, 'XXXX'), (1, 'bbbb'), (2, 'BBBB'), (3, 'cccc')");
	});

	after(function () {
		alasql('DROP DATABASE test2817');
	});

	it('A) ORDER BY LOWER(c) after GROUP BY LOWER(c)', function () {
		var res = alasql(
			'SELECT LOWER(c) AS l, COUNT(*) AS n FROM th GROUP BY LOWER(c) ORDER BY LOWER(c)'
		);
		assert.deepEqual(res, [
			{l: 'bbbb', n: 2},
			{l: 'cccc', n: 1},
			{l: 'xxxx', n: 1},
		]);
	});

	it('B) DESC and no alias', function () {
		var res = alasql(
			'SELECT LOWER(c), COUNT(*) AS n FROM th GROUP BY LOWER(c) ORDER BY LOWER(c) DESC'
		);
		assert.deepEqual(
			res.map(function (r) {
				return r['LOWER(c)'];
			}),
			['xxxx', 'cccc', 'bbbb']
		);
	});

	it('C) with HAVING', function () {
		var res = alasql(
			'SELECT LOWER(c) AS l, COUNT(*) AS n FROM th GROUP BY LOWER(c) HAVING COUNT(*) > 1 OR MIN(a) = MAX(a) ORDER BY LOWER(c)'
		);
		assert.deepEqual(res, [
			{l: 'bbbb', n: 2},
			{l: 'cccc', n: 1},
			{l: 'xxxx', n: 1},
		]);
	});

	it('D) ORDER BY the alias still works', function () {
		var res = alasql('SELECT LOWER(c) AS l, COUNT(*) AS n FROM th GROUP BY LOWER(c) ORDER BY l');
		assert.deepEqual(res, [
			{l: 'bbbb', n: 2},
			{l: 'cccc', n: 1},
			{l: 'xxxx', n: 1},
		]);
	});
});
