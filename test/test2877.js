if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2877'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - DEFAULT in UPDATE SET and INSERT VALUES`, function () {
	it('A) UPDATE ... SET a = DEFAULT writes the column default', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE t (a INT DEFAULT 5, b INT); INSERT INTO t VALUES (1, 1)');
		db.exec('UPDATE t SET a = DEFAULT');
		assert.deepStrictEqual(db.exec('SELECT * FROM t'), [{a: 5, b: 1}]);
	});

	it('B) UPDATE ... SET b = DEFAULT on a column without a default sets it to NULL', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE t (a INT DEFAULT 5, b INT); INSERT INTO t VALUES (1, 1)');
		db.exec('UPDATE t SET b = DEFAULT, a = 2 WHERE a = 1');
		assert.deepStrictEqual(db.exec('SELECT a, b FROM t'), [{a: 2, b: undefined}]);
	});

	it('C) INSERT ... VALUES (DEFAULT, ...) uses the column default (#2791)', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE t (a INT DEFAULT 5, b INT)');
		db.exec('INSERT INTO t VALUES (DEFAULT, 1)');
		db.exec('INSERT INTO t (b, a) VALUES (2, DEFAULT), (3, 4)');
		assert.deepStrictEqual(db.exec('SELECT * FROM t'), [
			{a: 5, b: 1},
			{a: 5, b: 2},
			{a: 4, b: 3},
		]);
	});

	it('D) a quoted column named default is still read as a column', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE t ([default] INT, b INT); INSERT INTO t VALUES (7, 1)');
		db.exec('UPDATE t SET b = [default]');
		assert.deepStrictEqual(db.exec('SELECT b FROM t'), [{b: 7}]);
	});
});
