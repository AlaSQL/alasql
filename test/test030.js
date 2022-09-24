if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 30', function () {
	it('JOIN USING', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT COLUMN TOP 2 a FROM test1';
		var res = db.exec(sql);
		assert.deepEqual([1, 2], res);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 3';
		var res = db.exec(sql);
		assert.deepEqual([1, 2, 3], res);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 3 OFFSET 2';
		var res = db.exec(sql);
		assert.deepEqual([3, 4, 5], res);

		done();
	});
});
