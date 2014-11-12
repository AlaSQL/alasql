if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 20', function() {
	it('User-defined functions', function(done){

		var db = alasql.Database("db");
		db.exec('CREATE TABLE test1 (a int)');
		db.exec('INSERT INTO test1 VALUES (1)');
		db.exec('INSERT INTO test1 VALUES (2)');
		db.exec('INSERT INTO test1 VALUES (3)');
		db.exec('INSERT INTO test1 VALUES (4)');
		db.exec('INSERT INTO test1 VALUES (5)');
		db.exec('INSERT INTO test1 VALUES (6)');


		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (1, 1)');
		db.exec('INSERT INTO test2 VALUES (1, 2)');
		db.exec('INSERT INTO test2 VALUES (1, 3)');
		db.exec('INSERT INTO test2 VALUES (2, 4)');

		alasql.fn.double = function(x){return x*2};
		alasql.fn.cubic = function(x){return x*x*x};
		
		var res = db.exec('SELECT a, double(a) AS b, cubic(a) AS c FROM test1 WHERE a = 2');
		assert.deepEqual([ { a: 2, b: 4, c: 8 } ], res);
		done();
	});
});
