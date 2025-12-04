if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1414 - NOT IN with NULL values should follow SQL semantics', function () {
	const test = '1414';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) NOT IN with NULL in subquery should return empty result', function () {
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: 1}, {a: null}];
		alasql.tables.S.data = [{b: null}];
		var res = alasql('select a from R where a not in (select b from S)');
		// When subquery contains NULL, NOT IN should return empty result
		// because comparison with NULL is UNKNOWN, and NOT IN UNKNOWN = UNKNOWN (false in WHERE)
		assert.deepEqual(res, []);
	});

	it('B) NOT IN with NULL value on left side', function () {
		alasql('DROP TABLE IF EXISTS R');
		alasql('DROP TABLE IF EXISTS S');
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: null}, {a: 2}];
		alasql.tables.S.data = [{b: 1}];
		var res = alasql('select a from R where a not in (select b from S)');
		// NULL NOT IN (1) should evaluate to UNKNOWN (excluded from WHERE result)
		// 2 NOT IN (1) should be TRUE (included)
		assert.deepEqual(res, [{a: 2}]);
	});

	it('C) NOT IN without NULL should work normally', function () {
		alasql('DROP TABLE IF EXISTS R');
		alasql('DROP TABLE IF EXISTS S');
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: 1}, {a: 2}, {a: 3}];
		alasql.tables.S.data = [{b: 2}];
		var res = alasql('select a from R where a not in (select b from S)');
		// 1 NOT IN (2) = TRUE, 2 NOT IN (2) = FALSE, 3 NOT IN (2) = TRUE
		assert.deepEqual(res, [{a: 1}, {a: 3}]);
	});

	it('D) NOT IN with multiple values including NULL', function () {
		alasql('DROP TABLE IF EXISTS R');
		alasql('DROP TABLE IF EXISTS S');
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: 1}, {a: 2}, {a: 3}];
		alasql.tables.S.data = [{b: 2}, {b: null}];
		var res = alasql('select a from R where a not in (select b from S)');
		// When subquery contains NULL, all comparisons are UNKNOWN
		assert.deepEqual(res, []);
	});

	it('E) NOT IN with array literal containing NULL', function () {
		alasql('DROP TABLE IF EXISTS R');
		alasql('CREATE TABLE R (a number)');
		alasql.tables.R.data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('select a from R where a not in (2, NULL)');
		// When list contains NULL, all NOT IN comparisons are UNKNOWN
		assert.deepEqual(res, []);
	});

	it('F) IN with NULL in subquery', function () {
		alasql('DROP TABLE IF EXISTS R');
		alasql('DROP TABLE IF EXISTS S');
		alasql('CREATE TABLE R (a number)');
		alasql('CREATE TABLE S (b number)');
		alasql.tables.R.data = [{a: 1}, {a: 2}];
		alasql.tables.S.data = [{b: 1}, {b: null}];
		var res = alasql('select a from R where a in (select b from S)');
		// 1 IN (1, NULL) = TRUE, 2 IN (1, NULL) = UNKNOWN (excluded)
		assert.deepEqual(res, [{a: 1}]);
	});
});
