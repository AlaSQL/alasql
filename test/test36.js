if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 36', function() {
	it('INSERT INTO FROM', function(done){

		var db = new alasql.Database("db");
		db.exec('CREATE TABLE test1 (a STRING)');

		var sql = "INSERT INTO test1 (a) VALUES ('Alpha'), ('Beta'), ('Gamma'), ('Delta'), ('Epsilon')";
		db.exec(sql);
		
		var sql = "SELECT COUNT(*) FROM test1";
		assert.equal(5,db.queryValue(sql));

		db.exec('CREATE TABLE test2 (a STRING)');

		var sql = "INSERT INTO test2 SELECT * FROM test1 WHERE a LIKE '%mm%'";
		db.exec(sql);

		var res = db.exec("SELECT * FROM test2");
		assert.deepEqual([{a:'Gamma'}], res);


		done();
	});
});
