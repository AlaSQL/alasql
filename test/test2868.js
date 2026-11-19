if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2868 - CREATE TABLE new LIKE old', function () {
	before(function () {
		alasql('CREATE DATABASE test2868; USE test2868');
		alasql(
			'CREATE TABLE t1 (a INT PRIMARY KEY, b TEXT DEFAULT "d", c INT IDENTITY(5,2), u INT UNIQUE)'
		);
		alasql('INSERT INTO t1 (a, u) VALUES (1, 1), (2, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2868');
	});

	it('A) copies the columns without the rows', function () {
		alasql('CREATE TABLE t9 LIKE t1');
		assert.deepEqual(alasql('SELECT COUNT(*) AS n FROM t9'), [{n: 0}]);
		assert.deepEqual(
			alasql('SHOW COLUMNS FROM t9').map(function (c) {
				return c.columnid;
			}),
			['a', 'b', 'c', 'u']
		);
	});

	it('B) copies the default, the identity and the keys', function () {
		alasql('INSERT INTO t9 (a, u) VALUES (1, 1)');
		assert.deepEqual(alasql('SELECT * FROM t9'), [{a: 1, b: 'd', c: 5, u: 1}]);
		assert.throws(function () {
			alasql('INSERT INTO t9 (a, u) VALUES (1, 2)');
		}, /primary key/);
		assert.throws(function () {
			alasql('INSERT INTO t9 (a, u) VALUES (3, 1)');
		}, /unique/);
		assert.equal(alasql('SELECT COUNT(*) AS n FROM t1')[0].n, 2);
	});

	it('C) the PostgreSQL form', function () {
		alasql('CREATE TABLE t8 (LIKE t1)');
		assert.deepEqual(alasql('SELECT COUNT(*) AS n FROM t8'), [{n: 0}]);
	});

	it('D) an unknown table is an error', function () {
		assert.throws(function () {
			alasql('CREATE TABLE t7 LIKE nope');
		}, /Table does not exist: nope/);
		assert.equal(alasql.databases.test2868.tables.t7, undefined);
	});
});
