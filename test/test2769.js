if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2769 - HAVING with an alias for an expression', function () {
	before(function () {
		alasql('CREATE DATABASE test2769; USE test2769');
		alasql('CREATE TABLE t (c0 INT, g INT)');
		alasql('INSERT INTO t VALUES (15, 1), (91, 2), (92, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2769');
	});

	it('A) alias for arithmetic on the group key', function () {
		assert.deepEqual(alasql('SELECT c0 + 0 AS z FROM t GROUP BY c0 HAVING z > 23'), [
			{z: 91},
			{z: 92},
		]);
		assert.deepEqual(alasql('SELECT g * 10 AS z FROM t GROUP BY g HAVING z > 15'), [{z: 20}]);
		assert.deepEqual(alasql('SELECT g * 10 AS z FROM t GROUP BY g HAVING NOT (z) <= 15'), [
			{z: 20},
		]);
	});

	it('B) alias for a function of the group key', function () {
		assert.deepEqual(alasql('SELECT ABS(c0) AS z FROM t GROUP BY c0 HAVING z > 23'), [
			{z: 91},
			{z: 92},
		]);
	});

	it('C) alias for an expression with an aggregate', function () {
		assert.deepEqual(alasql('SELECT g, SUM(c0) + 0 AS s FROM t GROUP BY g HAVING s > 100'), [
			{g: 2, s: 183},
		]);
		assert.deepEqual(alasql('SELECT g, COUNT(*) * 2 AS n FROM t GROUP BY g HAVING n > 2'), [
			{g: 2, n: 4},
		]);
	});

	it('E) alias that is also the GROUP BY key', function () {
		assert.deepEqual(alasql('SELECT g*10 AS z FROM t GROUP BY z HAVING z > 15'), [{z: 20}]);
		assert.deepEqual(alasql('SELECT g*10 AS z FROM t GROUP BY g*10 HAVING z > 15'), [{z: 20}]);
		assert.deepEqual(alasql('SELECT ABS(g) AS z FROM t GROUP BY z HAVING z > 1'), [{z: 2}]);
	});

	it('F) HAVING reads the value the SELECT list computed', function () {
		for (var i = 0; i < 20; i++) {
			alasql('SELECT g, RANDOM() AS x FROM t GROUP BY g HAVING x < 0.5').forEach(function (row) {
				assert.ok(row.x < 0.5, 'x is ' + row.x);
			});
		}
	});

	it('G) a compiled statement still works after the schema changes', function () {
		var f = alasql.compile('SELECT g*10 AS z FROM t GROUP BY g HAVING z > 15');
		assert.deepEqual(f(), [{z: 20}]);
		alasql('CREATE TABLE t2769 (a INT)');
		assert.deepEqual(f(), [{z: 20}]);
	});

	it('D) bare aggregate and bare column aliases still work', function () {
		assert.deepEqual(alasql('SELECT g, COUNT(*) AS n FROM t GROUP BY g HAVING n > 1'), [
			{g: 2, n: 2},
		]);
		assert.deepEqual(alasql('SELECT c0 AS z FROM t GROUP BY c0 HAVING z > 23'), [{z: 91}, {z: 92}]);
		assert.deepEqual(alasql('SELECT c0 + 0 AS z FROM t GROUP BY c0 HAVING c0 + 0 > 23'), [
			{z: 91},
			{z: 92},
		]);
	});
});
