if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 32', function() {
	it('LIKE and NOT LIKE', function(done){

	var db = new alasql.Database("db");
		db.exec('CREATE TABLE test (a STRING, b INT, t DATETIME)');
		db.exec("INSERT INTO test (a) VALUES ('a')");
		db.exec("INSERT INTO test (a) VALUES ('ab')");
		db.exec("INSERT INTO test (a) VALUES ('abc')");
		db.exec("INSERT INTO test (a) VALUES ('abcd')");
		db.exec("INSERT INTO test (a) VALUES ('abcde')");

		var sql = 'UPDATE test SET b = LEN(a), t = NOW()';
		assert.equal(5,db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a LIKE '%bc%'";
		assert.deepEqual([3,4,5],db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a NOT LIKE '%bc%'";
		assert.deepEqual([1,2],db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a NOT     LIKE '%bc%'";
		assert.deepEqual([1,2],db.exec(sql));

		done();
	});
});
