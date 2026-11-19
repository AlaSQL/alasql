if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2817 - ORDER BY an expression of the GROUP BY key', function () {
	before(function () {
		alasql('CREATE DATABASE test2817; USE test2817');
		alasql('CREATE TABLE th (a INT, c TEXT)');
		alasql("INSERT INTO th VALUES (0, 'XXXX'), (1, 'bbbb'), (2, 'BBBB'), (3, 'cccc')");
		alasql('CREATE TABLE tb (a INT, b INT)');
		alasql('INSERT INTO tb VALUES (1, 5), (2, 1), (4, 0)');
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

	it('E) ORDER BY an operator expression of the GROUP BY key', function () {
		var res = alasql('SELECT a % 2 AS m, COUNT(*) AS n FROM th GROUP BY a % 2 ORDER BY a % 2 DESC');
		assert.deepEqual(res, [
			{m: 1, n: 2},
			{m: 0, n: 2},
		]);
	});

	it('F) ORDER BY a SELECT expression that is not a GROUP BY key', function () {
		var res = alasql('SELECT a, a*2 FROM th GROUP BY a ORDER BY a*2 DESC');
		assert.deepEqual(
			res.map(function (r) {
				return r.a;
			}),
			[3, 2, 1, 0]
		);
	});

	it('G) ORDER BY a sum of two GROUP BY keys', function () {
		var res = alasql('SELECT a, b, a+b FROM tb GROUP BY a, b ORDER BY a+b');
		assert.deepEqual(
			res.map(function (r) {
				return r.a;
			}),
			[2, 4, 1]
		);
	});

	it('H) ORDER BY a function of a GROUP BY column', function () {
		var res = alasql('SELECT c, UPPER(c) FROM th GROUP BY c ORDER BY UPPER(c) DESC');
		assert.deepEqual(
			res.map(function (r) {
				return r['UPPER(c)'];
			}),
			['XXXX', 'CCCC', 'BBBB', 'BBBB']
		);
	});
});
