if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 33', function() {
	it('WHERE IN', function(done){

	var db = alasql.Database("db");
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1), (2,2), (3,3), (4,4), (5,5), (6,6)');

		var sql = 'SELECT a FROM test1 WHERE b IN (3,5)';
		var res = db.queryArray(sql);
		assert.deepEqual([ 3,5 ], res);

		done();
	});
});
