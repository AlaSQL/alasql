//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 110: LEFT JOIN', function () {
	it('Left join of two tables', function (done) {
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
			'SELECT SUM(b) AS sb,test1.a,test1.c\
		 FROM test LEFT JOIN test1 ON test.a = test1.a GROUP BY c,test.a'
		);

		assert.equal(8, res[0].sb);
		assert.equal(2, res[1].sb);
		assert.equal(3, res[2].sb);
		done();
	});
});

describe('INNER JOIN', function () {
	it('Inner join of three tables', function (done) {
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

		alasql.exec('DROP TABLE IF EXISTS test2');
		alasql.exec('CREATE TABLE test2 (c int, d int)');
		alasql.exec('INSERT INTO test2 VALUES (5,50)');
		alasql.exec('INSERT INTO test2 VALUES (6,60)');

		var res = alasql.exec(
			'SELECT test1.a, test2.d FROM test ' +
				' JOIN test1 ON test.a = test1.a ' +
				' JOIN test2 ON test1.c = test2.c '
		);

		assert.equal(3, res.length);
		done();
	});

	it('Inner join and aggregate of three tables', function (done) {
		alasql.exec('DROP TABLE IF EXISTS test');
		alasql.exec('CREATE TABLE test (a int, b int)');
		alasql.exec('INSERT INTO test VALUES (1,1)');
		alasql.exec('INSERT INTO test VALUES (1,7)');
		alasql.exec('INSERT INTO test VALUES (1,9)');
		alasql.exec('INSERT INTO test VALUES (2,2)');
		alasql.exec('INSERT INTO test VALUES (3,3)');

		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('CREATE TABLE test1 (a int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,5)');
		alasql.exec('INSERT INTO test1 VALUES (2,6)');

		alasql.exec('DROP TABLE IF EXISTS test2');
		alasql.exec('CREATE TABLE test2 (c int, d int)');
		alasql.exec('INSERT INTO test2 VALUES (5,50)');
		alasql.exec('INSERT INTO test2 VALUES (6,60)');

		var res = alasql.exec(
			'SELECT SUM(test.b) AS sumb, test2.d FROM test ' +
				' JOIN test1 ON test.a = test1.a ' +
				' JOIN test2 ON test1.c = test2.c ' +
				' GROUP BY d'
		);

		assert.equal(17, res[0].sumb);
		assert.equal(2, res.length);
		done();
	});
});
