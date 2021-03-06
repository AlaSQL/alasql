if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 29', function () {
	it('JOIN USING', function (done) {
		var db = alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT COLUMN a FROM test1 WHERE a IN (2,3,4) AND a NOT IN (3)';
		var res = db.exec(sql);
		assert.deepEqual([2, 4], res);

		var sql = 'SELECT COLUMN a FROM test1 WHERE a = ANY (2,3,4)';
		var res = db.exec(sql);
		assert.deepEqual([2, 3, 4], res);

		// Postgres notation
		var sql = 'SELECT COLUMN a FROM test1 WHERE a = ANY (ARRAY[2,3,4])';
		var res = db.exec(sql);
		assert.deepEqual([2, 3, 4], res);

		done();
	});
});
