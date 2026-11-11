if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2796'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - DROP ... CASCADE and RESTRICT`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('use alasql');
		alasql('drop database if exists test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) DROP TABLE with CASCADE and RESTRICT', function () {
		let res = [];
		alasql('CREATE TABLE t1 (a INT)');
		alasql('CREATE TABLE t2 (a INT)');
		res.push(alasql('DROP TABLE t1 CASCADE'));
		res.push(alasql('drop table if exists t2 restrict'));
		res.push(Object.keys(alasql.databases['test' + testId].tables));
		assert.deepStrictEqual(res, [1, 1, []]);
	});

	it('B) ALTER TABLE DROP COLUMN with RESTRICT', function () {
		alasql('CREATE TABLE t3 (a INT, b INT)');
		alasql('ALTER TABLE t3 DROP COLUMN b RESTRICT');
		alasql('INSERT INTO t3 VALUES (1)');
		assert.deepStrictEqual(alasql('SELECT * FROM t3'), [{a: 1}]);
	});

	it('C) DROP VIEW and DROP SCHEMA with CASCADE', function () {
		let res = [];
		alasql('CREATE VIEW v AS SELECT 1 AS x');
		res.push(alasql('DROP VIEW v CASCADE'));
		alasql('CREATE DATABASE s2796');
		res.push(alasql('DROP SCHEMA s2796 CASCADE'));
		res.push(!!alasql.databases.s2796);
		assert.deepStrictEqual(res, [1, 1, false]);
	});

	it('D) CASCADE and RESTRICT are still column names', function () {
		alasql('CREATE TABLE c (cascade INT, restrict INT)');
		alasql('INSERT INTO c VALUES (1, 2)');
		assert.deepStrictEqual(alasql('SELECT cascade, restrict FROM c'), [{cascade: 1, restrict: 2}]);
	});
});
