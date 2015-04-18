if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

describe('Test 36', function() {
	it('INSERT INTO FROM', function(done){

		var db = new alasql.Database("db");
		db.exec('CREATE TABLE test1 (a STRING)');

		var sql = "INSERT INTO test1 (a) VALUES ('Alpha'), ('Beta'), ('Gamma'), ('Delta'), ('Epsilon')";
		db.exec(sql);
		
		var sql = "SELECT VALUE COUNT(*) FROM test1";
		assert.equal(5,db.exec(sql));

		db.exec('CREATE TABLE test2 (a STRING)');

		var sql = "INSERT INTO test2 SELECT * FROM test1 WHERE a LIKE '%mm%'";
		db.exec(sql);

		var res = db.exec("SELECT * FROM test2");
		assert.deepEqual([{a:'Gamma'}], res);

		db.exec('CREATE TABLE test3 (a STRING)');

		var sql = "INSERT INTO test3 SELECT * FROM test1 WHERE a NOT LIKE '%e%'";
		db.exec(sql);
		
		var res = db.exec("SELECT * FROM test3");
		assert.deepEqual([{a:'Alpha'}, {a:'Gamma'}], res);		

		done();
	});
});
