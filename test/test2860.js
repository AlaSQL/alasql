if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2860';

describe(`Test ${testId} - SELECT ... FROM DUAL`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) FROM DUAL is the same as no FROM', function () {
		assert.deepStrictEqual(alasql('SELECT 1 + 1 AS x FROM DUAL'), [{x: 2}]);
		assert.deepStrictEqual(alasql('select 1 + 1 as x from dual'), [{x: 2}]);
		assert.deepStrictEqual(alasql('SELECT ? AS a, UPPER(?) AS b FROM DUAL', [1, 'q']), [
			{a: 1, b: 'Q'},
		]);
	});

	it('B) FROM DUAL works with WHERE', function () {
		assert.deepStrictEqual(alasql('SELECT 1 AS x FROM DUAL WHERE 1 = 1'), [{x: 1}]);
		assert.deepStrictEqual(alasql('SELECT 1 AS x FROM DUAL WHERE 1 = 2'), []);
	});

	it('C) FROM DUAL in a subquery', function () {
		alasql('CREATE TABLE t (a INT)');
		alasql('INSERT INTO t VALUES (1), (2)');
		assert.deepStrictEqual(alasql('SELECT a FROM t WHERE a IN (SELECT 2 FROM DUAL)'), [{a: 2}]);
	});

	it('D) a column named dual still works', function () {
		assert.deepStrictEqual(alasql('SELECT dual FROM ?', [[{dual: 3}]]), [{dual: 3}]);
	});

	it('E) a table named dual is still read', function () {
		alasql('CREATE TABLE dual (x INT)');
		alasql('INSERT INTO dual VALUES (5)');
		assert.deepStrictEqual(alasql('SELECT x FROM dual'), [{x: 5}]);
		alasql('DROP TABLE dual');
		assert.deepStrictEqual(alasql('SELECT 1 + 1 AS x FROM dual'), [{x: 2}]);
	});
});
