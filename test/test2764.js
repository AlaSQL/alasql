if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2764 - aggregate inside CAST and CONVERT', function () {
	before(function () {
		alasql('CREATE DATABASE test2764; USE test2764');
		alasql('CREATE TABLE t (x INT)');
		alasql('INSERT INTO t VALUES (1), (2)');
	});

	after(function () {
		alasql('DROP DATABASE test2764');
	});

	function n(sql) {
		return alasql(sql)[0].n;
	}

	it('A) CAST and CONVERT around an aggregate', function () {
		assert.strictEqual(n('SELECT CAST(COUNT(*) AS INTEGER) AS n'), 1);
		assert.strictEqual(n('SELECT CAST(COUNT(*) AS INTEGER) AS n FROM t'), 2);
		assert.strictEqual(n('SELECT CAST(SUM(x) AS FLOAT) AS n FROM t'), 3);
		assert.strictEqual(n('SELECT CAST(COUNT(*) AS STRING) AS n FROM t'), '2');
		assert.strictEqual(n('SELECT CONVERT(INT, COUNT(*)) AS n FROM t'), 2);
	});

	it('B) aggregate inside CAST next to another aggregate', function () {
		assert.strictEqual(n('SELECT COUNT(*) * CAST(COUNT(*) AS INTEGER) AS n'), 1);
		assert.strictEqual(n('SELECT COUNT(*) * COALESCE(CAST(COUNT(*) AS INTEGER), 5) AS n'), 1);
		assert.strictEqual(n('SELECT 2 * COALESCE(CAST(COUNT(*) AS INTEGER), 5) AS n'), 2);
	});

	it('C) with GROUP BY', function () {
		assert.deepEqual(alasql('SELECT x, CAST(COUNT(*) AS STRING) AS n FROM t GROUP BY x'), [
			{x: 1, n: '1'},
			{x: 2, n: '1'},
		]);
	});

	it('D) CAST of a column still works', function () {
		assert.deepEqual(alasql('SELECT CAST(x AS STRING) AS s FROM t'), [{s: '1'}, {s: '2'}]);
	});
});
