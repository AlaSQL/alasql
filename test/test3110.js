if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// A bare column in the select list of a grouped query is read from the source that has it,
// not only from the first table of FROM (#3110)
describe('Test 3110 - bare column of a later source in a grouped select list', function () {
	const test = '3110';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		alasql('CREATE TABLE test (a INT, b INT)');
		alasql('CREATE TABLE test1 (a INT, c INT)');
		alasql('CREATE TABLE test2 (a INT, b INT)');
		alasql('INSERT INTO test VALUES (1,10), (2,20), (3,30)');
		alasql('INSERT INTO test1 VALUES (1,7), (2,8), (3,7)');
		alasql('INSERT INTO test2 VALUES (1,100), (2,200), (3,300)');
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) GROUP BY on another column', function () {
		// c was missing from every row
		assert.deepStrictEqual(
			alasql('SELECT c, SUM(b) AS s FROM test JOIN test1 ON test.a = test1.a GROUP BY test1.a'),
			[
				{c: 7, s: 10},
				{c: 8, s: 20},
				{c: 7, s: 30},
			]
		);
	});

	it('B) an aggregate without GROUP BY', function () {
		assert.deepStrictEqual(
			alasql('SELECT c, COUNT(*) AS n FROM test JOIN test1 ON test.a = test1.a'),
			[{c: 7, n: 3}]
		);
	});

	it('C) the other order of FROM gives the same as before', function () {
		assert.deepStrictEqual(
			alasql('SELECT c, SUM(b) AS s FROM test1 JOIN test ON test.a = test1.a GROUP BY test1.a'),
			[
				{c: 7, s: 10},
				{c: 8, s: 20},
				{c: 7, s: 30},
			]
		);
	});

	it('D) a subquery as the later source', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT c, SUM(b) AS s FROM test JOIN (SELECT a, c FROM test1) t1 ON test.a = t1.a GROUP BY t1.a'
			),
			[
				{c: 7, s: 10},
				{c: 8, s: 20},
				{c: 7, s: 30},
			]
		);
	});

	it('E) GROUP BY on an expression of the column', function () {
		assert.deepStrictEqual(
			alasql('SELECT c, SUM(b) AS s FROM test JOIN test1 ON test.a = test1.a GROUP BY c+0'),
			[
				{c: 7, s: 40},
				{c: 8, s: 20},
			]
		);
	});

	it('F) a column of the first table and a GROUP BY key are as before', function () {
		assert.deepStrictEqual(
			alasql('SELECT b, SUM(c) AS s FROM test JOIN test1 ON test.a = test1.a GROUP BY test1.a'),
			[
				{b: 10, s: 7},
				{b: 20, s: 8},
				{b: 30, s: 7},
			]
		);
		assert.deepStrictEqual(
			alasql('SELECT c, SUM(b) AS s FROM test JOIN test1 ON test.a = test1.a GROUP BY c'),
			[
				{c: 7, s: 40},
				{c: 8, s: 20},
			]
		);
	});

	it('G) a name two tables define still reads the first table, with no error (#2928)', function () {
		assert.deepStrictEqual(
			alasql('SELECT b, COUNT(*) AS n FROM test JOIN test2 ON test.a = test2.a GROUP BY test.a'),
			[
				{b: 10, n: 1},
				{b: 20, n: 1},
				{b: 30, n: 1},
			]
		);
		assert.deepStrictEqual(
			alasql('SELECT b, COUNT(*) AS n FROM test2 JOIN test ON test.a = test2.a GROUP BY test.a'),
			[
				{b: 100, n: 1},
				{b: 200, n: 1},
				{b: 300, n: 1},
			]
		);
	});
});
