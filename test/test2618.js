if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2618 - double-quoted names in the INSERT column list', function () {
	before(function () {
		alasql('CREATE DATABASE test2618; USE test2618');
	});

	after(function () {
		alasql('DROP DATABASE test2618');
	});

	beforeEach(function () {
		alasql('DROP TABLE IF EXISTS t; CREATE TABLE t (a INT, b INT)');
	});

	it('A) VALUES', function () {
		alasql('INSERT INTO t ("a", "b") VALUES (1, 2)');
		assert.deepEqual(alasql('SELECT * FROM t'), [{a: 1, b: 2}]);
	});

	it('B) mixed with plain names and in another order', function () {
		alasql('INSERT INTO t ("b", a) VALUES (2, 1)');
		assert.deepEqual(alasql('SELECT * FROM t'), [{a: 1, b: 2}]);
	});

	it('C) SELECT', function () {
		alasql('INSERT INTO t ("a") SELECT 5 AS a');
		assert.deepEqual(alasql('SELECT a FROM t'), [{a: 5}]);
	});

	it('D) INSERT IGNORE', function () {
		alasql('INSERT IGNORE INTO t ("a") VALUES (3)');
		assert.deepEqual(alasql('SELECT a FROM t'), [{a: 3}]);
	});

	it('E) a row without VALUES still inserts the string', function () {
		alasql('CREATE TABLE s (x STRING)');
		alasql('INSERT INTO s ("x")');
		assert.deepEqual(alasql('SELECT * FROM s'), [{x: 'x'}]);
	});

	it('F) a value that is not a name is an error', function () {
		assert.throws(function () {
			alasql('INSERT INTO t (1) VALUES (2)');
		});
	});
});
