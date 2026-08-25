if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2355'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - SELECT ALL support`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) SELECT ALL returns all rows including duplicates', function () {
		alasql('create table t1 (a int)');
		alasql('insert into t1 values (1),(1),(2)');
		var res = alasql('SELECT ALL * FROM t1');
		assert.deepStrictEqual(res, [{a: 1}, {a: 1}, {a: 2}]);
		alasql('drop table t1');
	});

	it('B) SELECT ALL vs SELECT DISTINCT', function () {
		alasql('create table t2 (a int)');
		alasql('insert into t2 values (1),(1),(2)');
		var resAll = alasql('SELECT ALL * FROM t2');
		var resDistinct = alasql('SELECT DISTINCT * FROM t2');
		assert.deepStrictEqual(resAll, [{a: 1}, {a: 1}, {a: 2}]);
		assert.deepStrictEqual(resDistinct, [{a: 1}, {a: 2}]);
		alasql('drop table t2');
	});

	it('C) SELECT ALL with CROSS JOIN', function () {
		alasql('create table tab1;create table tab2');
		var res = alasql('SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1');
		assert.deepStrictEqual(res, []);
		alasql('drop table tab1;drop table tab2');
	});
});
