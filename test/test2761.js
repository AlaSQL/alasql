if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2761 - x IN tablename', function () {
	before(function () {
		alasql('CREATE DATABASE test2761; USE test2761');
		alasql('CREATE TABLE t1 (x INTEGER)');
		alasql('INSERT INTO t1 VALUES (1), (2)');
		alasql('CREATE TABLE t2 (y INTEGER)');
		alasql('INSERT INTO t2 VALUES (2), (3)');
	});

	after(function () {
		alasql('DROP DATABASE test2761');
	});

	it('A) IN a table as a value', function () {
		assert.deepEqual(alasql('SELECT 1 IN t1 AS v'), [{v: true}]);
		assert.deepEqual(alasql('SELECT 5 IN t1 AS v'), [{v: false}]);
		assert.deepEqual(alasql('SELECT 5 NOT IN t1 AS v'), [{v: true}]);
	});

	it('B) IN a table in WHERE', function () {
		assert.deepEqual(alasql('SELECT x FROM t1 WHERE x IN t1'), [{x: 1}, {x: 2}]);
		assert.deepEqual(alasql('SELECT x FROM t1 WHERE x IN t2'), [{x: 2}]);
		assert.deepEqual(alasql('SELECT x FROM t1 WHERE x NOT IN t2'), [{x: 1}]);
	});

	it('C) IN an array column still reads the column', function () {
		var data = [
			{a: 1, b: [1, 2]},
			{a: 3, b: [4]},
		];
		assert.deepEqual(alasql('SELECT a FROM ? WHERE a IN b', [data]), [{a: 1}]);
	});
});
