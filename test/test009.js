if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 09', function () {
	it('Test LEFT JOIN', function (done) {
		alasql.exec('DROP TABLE IF EXISTS test');
		alasql.exec('CREATE TABLE test (a int, b int)');
		alasql.exec('INSERT INTO test VALUES (1,1)');
		alasql.exec('INSERT INTO test VALUES (1,7)');
		alasql.exec('INSERT INTO test VALUES (2,2)');
		alasql.exec('INSERT INTO test VALUES (3,3)');

		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('CREATE TABLE test1 (a int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,5)');
		alasql.exec('INSERT INTO test1 VALUES (2,6)');

		var res = alasql.exec(
			'SELECT SUM(b) AS sb,a,c FROM test LEFT JOIN test1 ON test.a = test1.a GROUP BY c,test.a'
		);

		assert.equal(5, res[0].c);
		assert.equal(6, res[1].c);
		assert.equal(undefined, res[2].c);
		done();
	});
});
