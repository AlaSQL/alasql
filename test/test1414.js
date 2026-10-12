if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1414'; // NOT IN with NULL in the subquery or list

describe(`Test ${testId} - NOT IN with NULL values follows SQL semantics`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Example from the issue', function () {
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: 1}, {a: null}];
		alasql.tables.S.data = [{b: null}];
		const res = alasql('select a from R where a not in (select b from S)');
		assert.deepStrictEqual(res, []);
	});

	const R = [{a: 1}, {a: 2}, {a: null}];

	it('B) NOT IN subquery containing NULL and a value', function () {
		const res = alasql('SELECT a FROM ? WHERE a NOT IN (SELECT b FROM ?)', [
			R,
			[{b: null}, {b: 2}],
		]);
		assert.deepStrictEqual(res, []);
	});

	it('C) Correlated NOT IN subquery containing NULL', function () {
		alasql('CREATE TABLE R2 (id INT, a INT)');
		alasql('CREATE TABLE S2 (id INT, b INT)');
		alasql('INSERT INTO R2 VALUES (1, 1), (2, 1)');
		alasql('INSERT INTO S2 VALUES (1, NULL), (2, 5)');
		const res = alasql('SELECT id FROM R2 WHERE a NOT IN (SELECT b FROM S2 WHERE S2.id = R2.id)');
		assert.deepStrictEqual(res, [{id: 2}]);
	});

	it('D) NOT IN list containing NULL', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a NOT IN (2, NULL)', [R]), []);
	});

	it('E) The value of NOT IN is NULL (undefined) when nothing matches and the set has NULL', function () {
		assert.deepStrictEqual(alasql('SELECT 1 NOT IN (SELECT b FROM ?) AS x', [[{b: null}]]), [
			{x: undefined},
		]);
		assert.deepStrictEqual(
			alasql('SELECT 2 NOT IN (SELECT b FROM ?) AS x', [[{b: null}, {b: 2}]]),
			[{x: false}]
		);
		assert.deepStrictEqual(alasql('SELECT 1 NOT IN (2, NULL) AS x'), [{x: undefined}]);
	});

	it('F) Without NULL in the set NOT IN and IN are unchanged', function () {
		const S = [{b: 2}, {b: 3}];
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a NOT IN (SELECT b FROM ?)', [R, S]), [
			{a: 1},
		]);
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a NOT IN (2, 3)', [R]), [{a: 1}]);
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (SELECT b FROM ?)', [R, S]), [
			{a: 2},
		]);
		assert.deepStrictEqual(
			alasql('SELECT a FROM ? WHERE a IN (SELECT b FROM ?)', [R, [{b: null}, {b: 2}]]),
			[{a: 2}]
		);
	});

	it('G) Cached value lists that only differ by NULL, empty string or type are kept apart', function () {
		const rows = [{a: 1}, {a: 2}, {a: ''}, {a: '1'}];
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (2, NULL)', [rows]), [{a: 2}]);
		assert.deepStrictEqual(alasql("SELECT a FROM ? WHERE a NOT IN (2, '')", [rows]), [
			{a: 1},
			{a: '1'},
		]);
		assert.deepStrictEqual(alasql("SELECT a FROM ? WHERE a IN (2, '')", [rows]), [{a: 2}, {a: ''}]);
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (1, 3)', [rows]), [{a: 1}]);
		assert.deepStrictEqual(alasql("SELECT a FROM ? WHERE a IN ('1', 3)", [rows]), [{a: '1'}]);
	});
});
