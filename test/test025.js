if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 25', function () {
	it('JOIN USING', function (done) {
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

		var sql =
			'SELECT test1.a, test2.b FROM test1 JOIN test2 USING a WHERE test1.a<5 AND test2.b > 20';

		var res = db.exec(sql);

		assert.deepEqual(
			[
				{a: 3, b: 30},
				{a: 4, b: 40},
			],
			res
		);
		done();
	});
});
