if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2760 - INSERT INTO t SELECT with no matching column name', function () {
	before(function () {
		alasql('CREATE DATABASE test2760; USE test2760');
		alasql('CREATE TABLE s (a INT, b INT)');
		alasql('INSERT INTO s VALUES (1, 2), (3, 4)');
	});

	after(function () {
		alasql('DROP DATABASE test2760');
	});

	var byPosition = [
		{x: 1, y: 2},
		{x: 3, y: 4},
	];

	it('A) SELECT * into a table with other column names', function () {
		alasql('CREATE TABLE e (x INT, y INT)');
		assert.strictEqual(alasql('INSERT INTO e SELECT * FROM s'), 2);
		assert.deepEqual(alasql('SELECT * FROM e'), byPosition);
	});

	it('B) a column list on the target', function () {
		alasql('CREATE TABLE f (x INT, y INT)');
		alasql('INSERT INTO f (x, y) SELECT a, b FROM s');
		assert.deepEqual(alasql('SELECT * FROM f'), byPosition);
		alasql('CREATE TABLE f2 (x INT, y INT)');
		alasql('INSERT INTO f2 (y, x) SELECT a, b FROM s');
		assert.deepEqual(alasql('SELECT * FROM f2'), [
			{x: 2, y: 1},
			{x: 4, y: 3},
		]);
	});

	it('C) computed columns', function () {
		alasql('CREATE TABLE g (a INT, b INT)');
		alasql('INSERT INTO g SELECT a + 0, b + 0 FROM s');
		assert.deepEqual(alasql('SELECT * FROM g'), [
			{a: 1, b: 2},
			{a: 3, b: 4},
		]);
	});

	it('D) a primary key column with another name', function () {
		alasql('CREATE TABLE t4 (a INTEGER UNIQUE)');
		alasql('CREATE TABLE t5 (b INTEGER PRIMARY KEY)');
		alasql('INSERT INTO t4 VALUES (2), (3), (4)');
		alasql('INSERT INTO t5 SELECT * FROM t4');
		assert.deepEqual(alasql('SELECT * FROM t5'), [{b: 2}, {b: 3}, {b: 4}]);
	});

	it('E) matching by name is kept when a name matches', function () {
		alasql('CREATE TABLE d (b INT, a INT)');
		alasql('INSERT INTO d SELECT * FROM s');
		assert.deepEqual(alasql('SELECT * FROM d'), [
			{b: 2, a: 1},
			{b: 4, a: 3},
		]);
		alasql('CREATE TABLE h (a INT, z INT)');
		alasql('INSERT INTO h SELECT a, b FROM s');
		assert.deepEqual(alasql('SELECT * FROM h'), [{a: 1}, {a: 3}]);
	});
});
