if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var db;

describe('Test 19', function () {
	it('1. Create tables', function (done) {
		db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int)');
		db.exec('INSERT INTO test1 VALUES (1)');
		db.exec('INSERT INTO test1 VALUES (2)');
		db.exec('INSERT INTO test1 VALUES (3)');
		db.exec('INSERT INTO test1 VALUES (4)');
		db.exec('INSERT INTO test1 VALUES (5)');
		db.exec('INSERT INTO test1 VALUES (6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (1, 1)');
		db.exec('INSERT INTO test2 VALUES (1, 2)');
		db.exec('INSERT INTO test2 VALUES (1, 3)');
		db.exec('INSERT INTO test2 VALUES (2, 4)');
		done();
	});

	it('2. EXISTS', function (done) {
		var res = db.exec(
			'SELECT COLUMN a FROM test1 WHERE EXISTS ' + '(SELECT * FROM test2 WHERE test1.a = test2.b)'
		);
		assert.deepEqual(res, [1, 2, 3, 4]);
		done();
	});

	it('3. NOT EXISTS', function (done) {
		var res = db.exec(
			'SELECT COLUMN a FROM test1 WHERE NOT EXISTS ' +
				'(SELECT * FROM test2 WHERE test1.a = test2.a)'
		);
		assert.deepEqual(res, [3, 4, 5, 6]);
		done();
	});
});
