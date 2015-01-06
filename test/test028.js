if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 28', function() {
	it('>= ANY', function(done){

	var db = new alasql.Database("db");
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
		db.exec('INSERT INTO test2 VALUES (4,30)');


		db.exec('CREATE TABLE test3 (a int, b int)');
		db.exec('INSERT INTO test3 VALUES (3,10)');
		db.exec('INSERT INTO test3 VALUES (4,20)');
		db.exec('INSERT INTO test3 VALUES (5,30)');
		db.exec('INSERT INTO test3 VALUES (6,30)');

		var sql = 'SELECT COLUMN a FROM test1 WHERE a > ALL (SELECT a FROM test2)';
		var res = db.exec(sql);
		assert.deepEqual([ 5, 6], res);


		var sql = 'SELECT COLUMN a FROM test2 WHERE a >= ANY (SELECT a FROM test3)';
		var res = db.exec(sql);

		assert.deepEqual([ 3,4 ], res);
		done();
	});
});
