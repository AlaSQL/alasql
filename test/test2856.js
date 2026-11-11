if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2856'; // A correlated subquery that is a UNION

describe(`Test ${testId} - correlated subquery with UNION, EXCEPT or INTERSECT`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1), (2), (3)');
		alasql('CREATE TABLE t2 (a INT, c INT)');
		alasql('INSERT INTO t2 VALUES (1, 5), (2, 6)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) A scalar subquery with UNION in both branches', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT a, (SELECT c FROM t2 WHERE t2.a = t1.a UNION SELECT c FROM t2 WHERE t2.a = t1.a) AS x FROM t1'
			),
			[
				{a: 1, x: 5},
				{a: 2, x: 6},
				{a: 3, x: undefined},
			]
		);
	});

	it('B) EXISTS where only the second branch reads the outer row', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT a FROM t1 WHERE EXISTS (SELECT c FROM t2 WHERE c = 1 UNION SELECT c FROM t2 WHERE t2.a = t1.a)'
			),
			[{a: 1}, {a: 2}]
		);
	});

	it('C) UNION ALL, EXCEPT and INTERSECT', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT a, (SELECT c FROM t2 WHERE c = 0 UNION ALL SELECT c FROM t2 WHERE t2.a = t1.a) AS x FROM t1'
			),
			[
				{a: 1, x: 5},
				{a: 2, x: 6},
				{a: 3, x: undefined},
			]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT a, (SELECT c FROM t2 EXCEPT SELECT c FROM t2 WHERE t2.a = t1.a) AS x FROM t1 WHERE a < 3'
			),
			[
				{a: 1, x: 6},
				{a: 2, x: 5},
			]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT a, (SELECT c FROM t2 INTERSECT SELECT c FROM t2 WHERE t2.a = t1.a) AS x FROM t1'
			),
			[
				{a: 1, x: 5},
				{a: 2, x: 6},
				{a: 3, x: undefined},
			]
		);
	});
	it('D) IN where only the second branch reads the outer row', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT a FROM t1 WHERE 6 IN (SELECT c FROM t2 WHERE c = 0 UNION SELECT c FROM t2 WHERE t2.a = t1.a)'
			),
			[{a: 2}]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT a FROM t1 WHERE 6 NOT IN (SELECT c FROM t2 WHERE c = 0 UNION SELECT c FROM t2 WHERE t2.a = t1.a)'
			),
			[{a: 1}, {a: 3}]
		);
	});
});
