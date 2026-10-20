if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 31', function () {
	it('ALTER TABLE RENAME', function (done) {
		var db = new alasql.Database('db');
		db.exec('DROP TABLE IF EXISTS test1');
		db.exec('DROP TABLE IF EXISTS test2');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT a FROM test1';
		assert.equal(6, db.exec(sql).length);

		var sql = 'ALTER TABLE test1 RENAME TO test2';
		db.exec(sql);

		var sql = 'SELECT a FROM test2 ';
		assert.equal(6, db.exec(sql).length);
		done();
	});
});
