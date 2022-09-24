if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 24', function () {
	it('IN (select) and NOT IN (select)', function (done) {
		var db = new alasql.Database('test24');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (2,2)');
		db.exec('INSERT INTO test2 VALUES (3,3)');

		var res = db.exec('SELECT * FROM test1 WHERE a IN (SELECT a FROM test2)');
		assert(res.length == 2);
		//		console.log(res);
		done();
		return;
		var res = db.exec('SELECT COLUMN a FROM test1 WHERE a IN (SELECT a FROM test2)');
		assert.deepEqual([2, 3], res);
		var res = db.queryArray('SELECT a FROM test1 WHERE a NOT IN (SELECT a FROM test2)');
		assert.deepEqual([1, 4, 5, 6], res);

		alasql('drop database test24');
		done();
	});
});
