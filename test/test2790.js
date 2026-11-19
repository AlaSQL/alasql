if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2790'; // A missing table or database is named in the error

describe(`Test ${testId} - a missing table or database is named in the error`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (a INT)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	function check(sql, message) {
		assert.throws(
			function () {
				alasql(sql);
			},
			function (err) {
				return err instanceof Error && err.message === message;
			},
			sql
		);
	}

	it('A) A missing table', function () {
		check('SELECT * FROM nosuch', 'Table does not exist: nosuch');
		check('INSERT INTO nosuch VALUES (1)', 'Table does not exist: nosuch');
		check('DELETE FROM nosuch', 'Table does not exist: nosuch');
		check('DELETE FROM nosuch WHERE a = 1', 'Table does not exist: nosuch');
		check('UPDATE nosuch SET a = 1', 'Table does not exist: nosuch');
		check('SELECT * FROM t JOIN nosuch ON t.a = nosuch.a', 'Table does not exist: nosuch');
	});

	it('B) A missing database', function () {
		check('SELECT * FROM nodb.t', 'Database does not exist: nodb');
		check('INSERT INTO nodb.t VALUES (1)', 'Database does not exist: nodb');
		check('DELETE FROM nodb.t', 'Database does not exist: nodb');
		check('UPDATE nodb.t SET a = 1', 'Database does not exist: nodb');
		check('SELECT * FROM t JOIN nodb.t2 ON t.a = t2.a', 'Database does not exist: nodb');
	});

	it('C) A column without FROM', function () {
		check('SELECT foo', 'Column does not exist: foo');
	});

	it('D) Existing tables work as before', function () {
		alasql('INSERT INTO t VALUES (1), (2)');
		alasql('UPDATE t SET a = 3 WHERE a = 2');
		alasql('DELETE FROM t WHERE a = 1');
		assert.deepStrictEqual(alasql('SELECT * FROM t'), [{a: 3}]);
	});
});
