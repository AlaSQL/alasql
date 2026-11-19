if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2876'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - UNIQUE key with a function that compiles to alasql.*`, function () {
	it('A) UNIQUE (ROUND(a)) in CREATE TABLE', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE u (a NUMBER, UNIQUE (ROUND(a)))');
		db.exec('INSERT INTO u VALUES (1.2)');
		assert.throws(function () {
			db.exec('INSERT INTO u VALUES (1.4)');
		}, /unique index/);
		db.exec('INSERT INTO u VALUES (2.6)');
		assert.deepStrictEqual(db.exec('SELECT a FROM u'), [{a: 1.2}, {a: 2.6}]);
	});

	it('B) CREATE UNIQUE INDEX on ROUND(a)', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE v (a NUMBER)');
		db.exec('CREATE UNIQUE INDEX iv ON v (ROUND(a))');
		db.exec('INSERT INTO v VALUES (1.2)');
		assert.throws(function () {
			db.exec('INSERT INTO v VALUES (1.4)');
		}, /unique index/);
		db.exec('INSERT INTO v VALUES (2.6)');
		assert.deepStrictEqual(db.exec('SELECT a FROM v'), [{a: 1.2}, {a: 2.6}]);
	});
});
