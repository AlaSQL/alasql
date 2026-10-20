if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 26', function () {
	it('Modulo operator', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (1,10)');
		db.exec('INSERT INTO test2 VALUES (2,20)');
		db.exec('INSERT INTO test2 VALUES (3,30)');

		var res = db.exec('SELECT VALUE SUM(a%3) FROM test1');
		assert.equal(6, res);
		done();
	});
});
