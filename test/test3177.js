if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3177';

describe(`Test ${testId} - a SELECT without FROM that has a subquery runs once`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		delete alasql.fn.cnt3177;
		alasql('drop database test' + testId);
	});

	it('A) INTO inserts one row', function () {
		alasql('CREATE TABLE a (m)');
		alasql('SELECT (SELECT 7) AS m INTO a');
		assert.deepStrictEqual(alasql('SELECT * FROM a'), [{m: 7}]);
	});

	it('B) INTO inserts one row with an EXISTS subquery', function () {
		alasql('CREATE TABLE b (m)');
		alasql('SELECT EXISTS (SELECT 1) AS m INTO b');
		assert.deepStrictEqual(alasql('SELECT * FROM b'), [{m: true}]);
	});

	it('C) INTO inserts one row with an IN subquery', function () {
		alasql('CREATE TABLE c (a)');
		alasql('SELECT 1 AS a INTO c WHERE 2 IN (SELECT 2)');
		assert.deepStrictEqual(alasql('SELECT * FROM c'), [{a: 1}]);
	});

	it('D) The callback is called once', function () {
		let results = [];
		alasql('SELECT (SELECT 7) AS m', [], res => results.push(res));
		assert.deepStrictEqual(results, [[{m: 7}]]);
	});

	it('E) A function in the select list runs once', function () {
		let calls = 0;
		alasql.fn.cnt3177 = () => ++calls;
		let res = alasql('SELECT cnt3177() AS c, (SELECT 1) AS s');
		assert.deepStrictEqual([res, calls], [[{c: 1, s: 1}], 1]);
	});

	it('F) APPLY gives each row once', function () {
		alasql('CREATE TABLE t (k INT); INSERT INTO t VALUES (1), (2)');
		let res = alasql('SELECT t.k, x.m FROM t CROSS APPLY (SELECT (SELECT 7) AS m) x');
		assert.deepStrictEqual(res, [
			{k: 1, m: 7},
			{k: 2, m: 7},
		]);
	});

	it('G) An error reaches the callback once', function () {
		let results = [];
		alasql('SELECT (SELECT 7) AS m INTO nosuchtable', [], (res, err) =>
			results.push([res, err instanceof Error])
		);
		assert.deepStrictEqual(results, [[null, true]]);
	});
});
