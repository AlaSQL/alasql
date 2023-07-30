if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 21', function () {
	it('Aggregators', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (2,1)');
		db.exec('INSERT INTO test VALUES (3,1)');
		db.exec('INSERT INTO test VALUES (4,2)');
		db.exec('INSERT INTO test VALUES (5,2)');
		db.exec('INSERT INTO test VALUES (6,2)');

		var res = db.exec('SELECT b, SUM(a), COUNT(a), FIRST(a), LAST(a) FROM test GROUP BY b');
		assert.deepEqual(
			[
				{
					b: 1,
					'SUM(a)': 6,
					'COUNT(a)': 3,
					'FIRST(a)': 1,
					'LAST(a)': 3,
				},
				{
					b: 2,
					'SUM(a)': 15,
					'COUNT(a)': 3,
					'FIRST(a)': 4,
					'LAST(a)': 6,
				},
			],
			res
		);
		done();
	});
});
