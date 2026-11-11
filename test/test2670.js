if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2670 - a column named value in expressions', function () {
	before(function () {
		alasql('CREATE DATABASE test2670; USE test2670');
		alasql('CREATE TABLE t (value INT, b INT)');
		alasql('INSERT INTO t VALUES (1, 2), (3, 4)');
	});

	after(function () {
		alasql('DROP DATABASE test2670');
	});

	it('A) value in the select list after another column', function () {
		assert.deepEqual(alasql('SELECT b, value FROM t'), [
			{b: 2, value: 1},
			{b: 4, value: 3},
		]);
	});

	it('B) value in WHERE, ORDER BY and an aggregate', function () {
		assert.deepEqual(alasql('SELECT b FROM t WHERE value = 3'), [{b: 4}]);
		assert.deepEqual(alasql('SELECT b FROM t ORDER BY value DESC'), [{b: 4}, {b: 2}]);
		assert.deepEqual(alasql('SELECT MAX(value) AS m FROM t'), [{m: 3}]);
	});

	it('C) SELECT VALUE stays the modifier', function () {
		assert.strictEqual(alasql('SELECT VALUE b FROM t WHERE value = 1'), 2);
		assert.strictEqual(alasql('SELECT VALUE COUNT(*) FROM t'), 2);
	});

	it('D) t.value and [value] still work', function () {
		assert.deepEqual(alasql('SELECT t.value FROM t'), [{value: 1}, {value: 3}]);
		assert.deepEqual(alasql('SELECT [value] FROM t'), [{value: 1}, {value: 3}]);
	});
});
