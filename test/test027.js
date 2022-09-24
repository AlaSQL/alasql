if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 27', function() {
	it('JOIN USING and IN', function(done) {
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
		db.exec('INSERT INTO test2 VALUES (4,40)');
		db.exec('INSERT INTO test2 VALUES (5,50)');
		db.exec('INSERT INTO test2 VALUES (6,60)');

		db.exec('CREATE TABLE test3 (q int)');
		db.exec('INSERT INTO test3 VALUES (10)');
		db.exec('INSERT INTO test3 VALUES (20)');
		db.exec('INSERT INTO test3 VALUES (30)');
		db.exec('INSERT INTO test3 VALUES (40)');
		db.exec('INSERT INTO test3 VALUES (50)');

		var sql =
			'SELECT COLUMN test1.a, test2.b FROM test1 JOIN test2 USING a WHERE test1.a<6 ' +
			'AND test2.b IN (SELECT * FROM test3 WHERE test3.q > 30)';

		var res = db.exec(sql);

		assert.deepEqual([4, 5], res);
		done();
	});
});
