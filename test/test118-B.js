if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 118 - Implicit JOIN optimization', function () {
	const test = '118';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);

		// Create test tables
		alasql('CREATE TABLE t1 (a INT, b INT, x STRING)');
		alasql('CREATE TABLE t2 (a INT, b INT, x STRING)');
		alasql('CREATE TABLE t3 (a INT, b INT, x STRING)');
		alasql('CREATE TABLE t4 (a INT, b INT, x STRING)');

		// Insert test data
		// Pattern: a is row number, b is next row's a (for chain joins)
		for (var r = 1; r <= 10; r++) {
			var a = r;
			var b = (r % 10) + 1; // 1->2, 2->3, ..., 10->1
			alasql('INSERT INTO t1 VALUES (?, ?, ?)', [a, b, 't1-' + r]);
			alasql('INSERT INTO t2 VALUES (?, ?, ?)', [a, b, 't2-' + r]);
			alasql('INSERT INTO t3 VALUES (?, ?, ?)', [a, b, 't3-' + r]);
			alasql('INSERT INTO t4 VALUES (?, ?, ?)', [a, b, 't4-' + r]);
		}
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) Implicit 2-table join returns correct results', function () {
		var result = alasql(
			'SELECT t1.x as x1, t2.x as x2 FROM t1, t2 WHERE t1.b = t2.a ORDER BY t1.a'
		);
		assert.equal(result.length, 10);
		// t1 row 1 has b=2, so should join with t2 row where a=2
		assert.equal(result[0].x1, 't1-1');
		assert.equal(result[0].x2, 't2-2');
	});

	it('B) Implicit 3-table join returns correct results', function () {
		var result = alasql(
			'SELECT t1.x as x1, t2.x as x2, t3.x as x3 FROM t1, t2, t3 ' +
				'WHERE t1.b = t2.a AND t2.b = t3.a ORDER BY t1.a'
		);
		assert.equal(result.length, 10);
		// Chain: t1(a=1,b=2) -> t2(a=2,b=3) -> t3(a=3)
		assert.equal(result[0].x1, 't1-1');
		assert.equal(result[0].x2, 't2-2');
		assert.equal(result[0].x3, 't3-3');
	});

	it('C) Implicit 4-table join returns correct results', function () {
		var result = alasql(
			'SELECT t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4 FROM t1, t2, t3, t4 ' +
				'WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a ORDER BY t1.a'
		);
		assert.equal(result.length, 10);
		// Chain: t1(a=1,b=2) -> t2(a=2,b=3) -> t3(a=3,b=4) -> t4(a=4)
		assert.equal(result[0].x1, 't1-1');
		assert.equal(result[0].x2, 't2-2');
		assert.equal(result[0].x3, 't3-3');
		assert.equal(result[0].x4, 't4-4');
	});

	it('D) Implicit join matches explicit JOIN results', function () {
		var implicit = alasql(
			'SELECT t1.x as x1, t2.x as x2, t3.x as x3 FROM t1, t2, t3 ' +
				'WHERE t1.b = t2.a AND t2.b = t3.a ORDER BY t1.a'
		);

		var explicit = alasql(
			'SELECT t1.x as x1, t2.x as x2, t3.x as x3 FROM t1 ' +
				'INNER JOIN t2 ON t1.b = t2.a ' +
				'INNER JOIN t3 ON t2.b = t3.a ORDER BY t1.a'
		);

		assert.deepEqual(implicit, explicit);
	});

	it('E) Optimization is applied to implicit joins', function () {
		// Compile a query and check that optimization flags are set
		var compiled = alasql.compile('SELECT * FROM t1, t2, t3 WHERE t1.b = t2.a AND t2.b = t3.a');

		// Source 0 (t1) should not have optimization (it's the base)
		assert.equal(compiled.query.sources[0].optimization, undefined);

		// Source 1 (t2) should have optimization set
		assert.equal(compiled.query.sources[1].optimization, 'ix');
		assert.ok(compiled.query.sources[1].onleftfn, 'onleftfn should be defined');
		assert.ok(compiled.query.sources[1].onrightfn, 'onrightfn should be defined');

		// Source 2 (t3) should have optimization set
		assert.equal(compiled.query.sources[2].optimization, 'ix');
		assert.ok(compiled.query.sources[2].onleftfn, 'onleftfn should be defined');
		assert.ok(compiled.query.sources[2].onrightfn, 'onrightfn should be defined');
	});

	it('F) Mixed implicit and single-table conditions', function () {
		// Test that single-table conditions work alongside join conditions
		var result = alasql(
			'SELECT t1.x as x1, t2.x as x2 FROM t1, t2 WHERE t1.b = t2.a AND t1.a > 5 ORDER BY t1.a'
		);

		// Should only have rows where t1.a > 5
		assert.equal(result.length, 5);
		assert.equal(result[0].x1, 't1-6');
	});

	it('G) Handles reversed join condition order', function () {
		// Test that t2.a = t1.b works the same as t1.b = t2.a
		var result1 = alasql(
			'SELECT t1.x as x1, t2.x as x2 FROM t1, t2 WHERE t1.b = t2.a ORDER BY t1.a'
		);
		var result2 = alasql(
			'SELECT t1.x as x1, t2.x as x2 FROM t1, t2 WHERE t2.a = t1.b ORDER BY t1.a'
		);

		assert.deepEqual(result1, result2);
	});
});
