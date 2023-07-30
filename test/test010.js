if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 10', function () {
	it('Test JOIN ON variations', function (done) {
		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('DROP TABLE IF EXISTS test2');

		alasql.exec('CREATE TABLE test1 (a int, b int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,10,1)');
		alasql.exec('INSERT INTO test1 VALUES (1,20,2)');
		alasql.exec('INSERT INTO test1 VALUES (2,30,2)');
		alasql.exec('INSERT INTO test1 VALUES (3,40,3)');

		alasql.exec('CREATE TABLE test2 (a int, c int, d int)');
		alasql.exec('INSERT INTO test2 VALUES (1,1,100)');
		alasql.exec('INSERT INTO test2 VALUES (2,2,200)');

		var res = alasql.exec(
			'SELECT test1.a AS a1, test2.a AS a2 ' + ' FROM test1 JOIN test2 ON test1.a=test2.a-1'
		);
		assert.deepEqual(
			[
				{a1: 1, a2: 2},
				{a1: 1, a2: 2},
			],
			res
		);

		var res = alasql.exec(
			'SELECT test1.a AS a1, test2.a AS a2 ' + ' FROM test1 JOIN test2 ON test2.a=test1.a+1'
		);
		assert.deepEqual(
			[
				{a1: 1, a2: 2},
				{a1: 1, a2: 2},
			],
			res
		);

		var res = alasql.exec(
			'SELECT test1.a AS a1, test2.a AS a2 ' + ' FROM test1 JOIN test2 ON test2.a-test1.a=1'
		);
		assert.deepEqual(
			[
				{a1: 1, a2: 2},
				{a1: 1, a2: 2},
			],
			res
		);

		var res = alasql.exec(
			'SELECT test1.a AS a1, test2.a AS a2 ' + ' FROM test1 JOIN test2 ON 1=test2.a-test1.a'
		);
		assert.deepEqual(
			[
				{a1: 1, a2: 2},
				{a1: 1, a2: 2},
			],
			res
		);

		var res = alasql.exec(
			'SELECT test1.b, test2.d FROM test1 ' +
				' JOIN test2 ON test1.a = test2.a AND test1.c = test2.c'
		);
		assert.deepEqual(
			[
				{b: 10, d: 100},
				{b: 30, d: 200},
			],
			res
		);

		var res = alasql.exec('SELECT test1.b, test2.d FROM test1 JOIN test2 USING a,c');
		assert.deepEqual(
			[
				{b: 10, d: 100},
				{b: 30, d: 200},
			],
			res
		);
		done();
	});
});
