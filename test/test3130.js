if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Names that would reach a prototype are refused, and data keys never become one
describe('Test 3130 - name handling', function () {
	const own = () => Object.getOwnPropertyNames(Object.prototype).sort().join();
	let start;
	before(function () {
		start = own();
		alasql('CREATE DATABASE nh; USE nh');
		alasql('CREATE TABLE t (a INT, b STRING)');
		alasql('INSERT INTO t VALUES (1, "x"), (2, "y")');
	});
	after(function () {
		alasql('USE alasql; DROP DATABASE nh');
		assert.strictEqual(own(), start);
	});

	it('A. __proto__ is refused as a name in every spelling', function () {
		for (const sql of [
			'CREATE TABLE __proto__ (a INT)',
			'INSERT INTO __proto__ VALUES (1)',
			'CREATE TABLE u (__proto__ INT)',
			'CREATE TABLE u ([__proto__] INT)',
			'CREATE TABLE u (`__proto__` INT)',
			'CREATE TABLE u (__PROTO__ INT)',
			'SELECT a AS __proto__ FROM t',
			"SELECT '__proto__' AS k FROM t",
			'SET @__proto__->x = 5',
			'USE __proto__',
		]) {
			assert.throws(() => alasql(sql), /__proto__ is not allowed/, sql);
		}
	});

	it('B. Names that only contain the text are allowed', function () {
		assert.deepStrictEqual(alasql("SELECT 'a__proto__b' AS s FROM t WHERE a = 1"), [
			{s: 'a__proto__b'},
		]);
	});

	it('C. A GROUP BY key from data is a group like any other', function () {
		const res = alasql('SELECT a, COUNT(*) AS c FROM ? GROUP BY a', [
			[{a: '__proto__'}, {a: 'constructor'}, {a: '__proto__'}],
		]);
		assert.deepStrictEqual(res, [
			{a: '__proto__', c: 2},
			{a: 'constructor', c: 1},
		]);
	});

	it('D. A key of a SET path cannot reach a prototype', function () {
		alasql('SET @v = @{a: 1}');
		for (const key of ['__proto__', 'constructor', 'prototype']) {
			assert.throws(() => alasql('SET @v->(?)->x = 5', [key]), /is not allowed/, key);
		}
		assert.throws(() => alasql('SET @constructor->prototype->x = 5'), /is not allowed/);
		alasql('SET @v->(?) = 7', ['b']);
		assert.strictEqual(alasql('SELECT VALUE @v->b'), 7);
	});

	it('E. SELECT INTO keeps a __proto__ key of a row as data', function () {
		alasql('CREATE TABLE s (b INT)');
		alasql('SELECT * INTO s FROM ?', [[JSON.parse('{"b":1,"__proto__":{"isAdmin":true}}')]]);
		const row = alasql.databases.nh.tables.s.data[0];
		assert.strictEqual(row.isAdmin, undefined);
		assert.ok(Object.prototype.hasOwnProperty.call(row, '__proto__'));
	});
});
