if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2770 - GROUP BY with a column selected twice', function () {
	before(function () {
		alasql('CREATE DATABASE test2770; USE test2770');
		alasql('CREATE TABLE t (c0 INT)');
		alasql('INSERT INTO t VALUES (15), (91)');
	});

	after(function () {
		alasql('DROP DATABASE test2770');
	});

	it('A) rows have one key per name', function () {
		assert.deepEqual(alasql('SELECT c0, c0 FROM t GROUP BY c0'), [{c0: 15}, {c0: 91}]);
		assert.deepEqual(alasql('SELECT c0, c0, c0 FROM t GROUP BY c0'), [{c0: 15}, {c0: 91}]);
		assert.deepEqual(alasql('SELECT c0, COUNT(*), c0 FROM t GROUP BY c0'), [
			{c0: 15, 'COUNT(*)': 1},
			{c0: 91, 'COUNT(*)': 1},
		]);
		assert.deepEqual(alasql('SELECT c0 AS a, c0 FROM t GROUP BY c0'), [
			{a: 15, c0: 15},
			{a: 91, c0: 91},
		]);
	});

	it('B) MATRIX has one value per selected column', function () {
		assert.deepEqual(alasql('MATRIX OF SELECT c0 AS a, c0 FROM t GROUP BY c0'), [
			[15, 15],
			[91, 91],
		]);
		assert.deepEqual(alasql('MATRIX OF SELECT c0, c0 FROM t GROUP BY c0'), [
			[15, 15],
			[91, 91],
		]);
	});

	it('C) RECORDSET columns match the select list', function () {
		var res = alasql('RECORDSET OF SELECT c0, c0 FROM t GROUP BY c0');
		assert.deepEqual(
			res.columns.map(function (c) {
				return c.columnid;
			}),
			['c0', 'c0']
		);
	});

	it('D) distinct aliases still work', function () {
		assert.deepEqual(alasql('SELECT c0 AS a, c0 AS b FROM t GROUP BY c0'), [
			{a: 15, b: 15},
			{a: 91, b: 91},
		]);
	});
	it('E) MATRIX keeps the select order for a column named by a number (#2766)', function () {
		alasql('CREATE TABLE u (x INT)');
		alasql('INSERT INTO u VALUES (1), (2), (3)');
		assert.deepEqual(alasql('MATRIX OF SELECT COUNT(*), 17'), [[1, 17]]);
		assert.deepEqual(alasql('MATRIX OF SELECT COUNT(*) AS n, 17 FROM u'), [[3, 17]]);
		assert.deepEqual(alasql('MATRIX OF SELECT x, COUNT(*) AS n, 17 FROM u GROUP BY x'), [
			[1, 1, 17],
			[2, 1, 17],
			[3, 1, 17],
		]);
		assert.deepEqual(alasql('MATRIX OF SELECT COUNT(*) AS n, x AS [5] FROM u GROUP BY x'), [
			[1, 1],
			[1, 2],
			[1, 3],
		]);
		var res = alasql('RECORDSET OF SELECT COUNT(*) AS n, 17 FROM u');
		assert.deepEqual(
			res.columns.map(function (c) {
				return c.columnid;
			}),
			['n', '17']
		);
	});
});
