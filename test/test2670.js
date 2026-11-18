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

	it('E) [value]->a and `value`->a read the column', function () {
		alasql('CREATE TABLE j (id INT, [value] JSON)');
		alasql('INSERT INTO j VALUES (1, @{a:5}), (2, @{a:6})');
		assert.deepEqual(alasql('SELECT id, [value]->a AS a FROM j'), [
			{id: 1, a: 5},
			{id: 2, a: 6},
		]);
		assert.deepEqual(alasql('SELECT id, `value`->a AS a FROM j'), [
			{id: 1, a: 5},
			{id: 2, a: 6},
		]);
		assert.deepEqual(alasql('SELECT id FROM j WHERE [value]->a = 5'), [{id: 1}]);
	});

	it('F) VALUE in SEARCH is the current value', function () {
		assert.deepEqual(alasql('SEARCH / WHERE(VALUE > 1) FROM ?', [[1, 2, 3]]), [2, 3]);
		assert.deepEqual(alasql('SEARCH / WHERE(VALUE->a > 1) FROM ?', [[{a: 1}, {a: 2}]]), [{a: 2}]);
	});

	it('G) value in JOIN ON, UPDATE and the INSERT column list', function () {
		alasql('CREATE TABLE u (value INT, c STRING)');
		alasql("INSERT INTO u (value, c) VALUES (1, 'x'), (3, 'y')");
		assert.deepEqual(alasql('SELECT t.b, u.c FROM t JOIN u ON t.value = u.value'), [
			{b: 2, c: 'x'},
			{b: 4, c: 'y'},
		]);
		alasql('CREATE TABLE w (id INT, d STRING)');
		alasql("INSERT INTO w VALUES (3, 'z')");
		assert.deepEqual(alasql('SELECT u.c, w.d FROM u JOIN w ON value = id'), [{c: 'y', d: 'z'}]);
		alasql('UPDATE u SET value = value + 1 WHERE value = 3');
		assert.deepEqual(alasql('SELECT * FROM u'), [
			{value: 1, c: 'x'},
			{value: 4, c: 'y'},
		]);
	});

	it('H) VALUE->x in a CHECK reads the checked row', function () {
		alasql('CREATE TABLE k (x INT CHECK (VALUE->x > 0))');
		alasql('INSERT INTO k VALUES (1)');
		assert.throws(() => alasql('INSERT INTO k VALUES (0)'));
		assert.deepEqual(alasql('SELECT * FROM k'), [{x: 1}]);
	});
});
