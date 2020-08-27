if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 23', function () {
	it('BETWEEN and NOT BETWEEN', function (done) {
		var db = new alasql.Database('db');
		//		alasql.use('db');
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');
		db.exec('INSERT INTO test VALUES (4,4)');
		db.exec('INSERT INTO test VALUES (5,5)');
		db.exec('INSERT INTO test VALUES (6,6)');

		//		var res = alasql.parse('SELECT COLUMN a FROM test WHERE a BETWEEN 2 AND 4');
		//		console.log(res.statements[0].where.expression);
		//		assert.deepEqual([ 2,3,4 ], res);

		var res = db.exec('SELECT COLUMN a FROM test WHERE a BETWEEN 2 AND 4');
		assert.deepEqual([2, 3, 4], res);
		var res = db.exec('SELECT COLUMN a FROM test WHERE a NOT BETWEEN 2 AND 4');
		assert.deepEqual([1, 5, 6], res);
		done();
	});
});
