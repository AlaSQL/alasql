if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// A column whose name is also a property of every JavaScript object (constructor, toString,
// valueOf, hasOwnProperty) can be queried (#3125). In 4.23.2 these statements failed with a
// TypeError or with "exists in two source tables".
describe('Test 3125 - a column named like a built-in property', function () {
	const test = '3125';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		alasql(
			'CREATE TABLE pr (k INT, constructor INT, toString STRING, valueOf INT, hasOwnProperty INT)'
		);
		alasql('CREATE TABLE t0 (k INT, x INT)');
		alasql('CREATE TABLE p2 (k INT, constructor INT)');
		alasql('INSERT INTO pr VALUES (1, 2, "a", 4, 5), (2, 3, "b", 6, 7)');
		alasql('INSERT INTO t0 VALUES (1, 5), (2, 6)');
		alasql('INSERT INTO p2 VALUES (1, 20), (2, 30)');
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) In the select list', function () {
		assert.deepStrictEqual(
			alasql('SELECT constructor, toString, valueOf, hasOwnProperty FROM pr'),
			[
				{constructor: 2, toString: 'a', valueOf: 4, hasOwnProperty: 5},
				{constructor: 3, toString: 'b', valueOf: 6, hasOwnProperty: 7},
			]
		);
		assert.deepStrictEqual(alasql('SELECT constructor + 1 AS c, k FROM pr ORDER BY k DESC'), [
			{c: 4, k: 2},
			{c: 3, k: 1},
		]);
		// in ORDER BY when the column is in the select list too
		assert.deepStrictEqual(alasql('SELECT k, valueOf FROM pr ORDER BY valueOf DESC'), [
			{k: 2, valueOf: 6},
			{k: 1, valueOf: 4},
		]);
	});

	it('B) In WHERE', function () {
		assert.deepStrictEqual(alasql('SELECT k FROM pr WHERE constructor = 2'), [{k: 1}]);
		assert.deepStrictEqual(alasql('SELECT k FROM pr WHERE toString = "b" AND hasOwnProperty > 0'), [
			{k: 2},
		]);
	});

	it('C) In a function, which worked before too', function () {
		assert.deepStrictEqual(alasql('SELECT ABS(valueOf) AS v, UPPER(toString) AS u FROM pr'), [
			{v: 4, u: 'A'},
			{v: 6, u: 'B'},
		]);
	});

	it('D) In GROUP BY, an aggregate and HAVING', function () {
		assert.deepStrictEqual(
			alasql('SELECT constructor, COUNT(*) AS n FROM pr GROUP BY constructor'),
			[
				{constructor: 2, n: 1},
				{constructor: 3, n: 1},
			]
		);
		assert.deepStrictEqual(alasql('SELECT SUM(valueOf) AS s, MAX(constructor) AS m FROM pr'), [
			{s: 10, m: 3},
		]);
		assert.deepStrictEqual(
			alasql(
				'SELECT toString, SUM(valueOf) AS s FROM pr GROUP BY toString HAVING SUM(valueOf) > 4'
			),
			[{toString: 'b', s: 6}]
		);
	});

	it('E) In a join with a table that does not have the name', function () {
		assert.deepStrictEqual(
			alasql('SELECT x, constructor, toString FROM t0 JOIN pr ON t0.k = pr.k'),
			[
				{x: 5, constructor: 2, toString: 'a'},
				{x: 6, constructor: 3, toString: 'b'},
			]
		);
		assert.deepStrictEqual(alasql('SELECT x FROM t0 JOIN pr ON t0.k = pr.k WHERE valueOf = 4'), [
			{x: 5},
		]);
		assert.deepStrictEqual(alasql('SELECT x FROM t0, pr WHERE t0.k = pr.k AND constructor = 3'), [
			{x: 6},
		]);
	});

	it('F) In a subquery', function () {
		assert.deepStrictEqual(
			alasql('SELECT k FROM pr WHERE k IN (SELECT k FROM p2 WHERE constructor > 20)'),
			[{k: 2}]
		);
	});

	it('G) A name that two tables define is ambiguous as any other name', function () {
		assert.throws(
			() => alasql('SELECT pr.k FROM pr JOIN p2 ON pr.k = p2.k WHERE constructor = 2'),
			/Cannot resolve column "constructor" because it exists in two source tables/
		);
		assert.deepStrictEqual(
			alasql('SELECT pr.constructor AS a, p2.constructor AS b FROM pr JOIN p2 ON pr.k = p2.k'),
			[
				{a: 2, b: 20},
				{a: 3, b: 30},
			]
		);
	});

	it('H) A row of a parameter with such a key', function () {
		const rows = [{k: 1, toString: 'q', constructor: 9}];
		assert.deepStrictEqual(alasql('SELECT toString, constructor FROM ?', [rows]), [
			{toString: 'q', constructor: 9},
		]);
		assert.deepStrictEqual(alasql('SELECT k FROM ? WHERE toString = "q"', [rows]), [{k: 1}]);
	});
});
