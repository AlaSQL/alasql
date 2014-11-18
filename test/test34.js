if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 34', function() {
	it('INSERT INTO VALUES', function(done){

	var db = new alasql.Database("db");
		db.exec('CREATE TABLE test (a STRING)');
		db.exec("INSERT INTO test (a) VALUES ('a'), ('b'), ('c')");

		var sql = "SELECT * FROM test";
		assert.deepEqual(['a','b','c'], db.queryArray(sql));

		done();
	});
});
