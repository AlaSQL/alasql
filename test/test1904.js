if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1937: EXISTS in SQL Queries and SET Statements', function () {
	before(function () {
		alasql('create database test1937');
		alasql('use test1937');
		alasql('DROP TABLE IF EXISTS one');
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');
	});

	after(function () {
		alasql('drop database test1937');
	});

	it('Nested EXISTS in subquery', function (done) {
		const res = alasql(
			'SELECT EXISTS(SELECT a FROM one WHERE 0) AS main_exists, * FROM (SELECT EXISTS(SELECT a FROM one) AS sub_exists, a FROM one)'
		);
		assert.deepEqual(
			[
				{main_exists: false, a: 1, sub_exists: true},
				{main_exists: false, a: 2, sub_exists: true},
				{main_exists: false, a: 3, sub_exists: true},
				{main_exists: false, a: 4, sub_exists: true},
				{main_exists: false, a: 5, sub_exists: true},
			],
			res
		);
		done();
	});

	it('EXISTS in SET statement', function (done) {
		const res = alasql(
			`SET @existsLessThan3 = (SELECT EXISTS(SELECT a FROM one WHERE a < 3));
			SET @existsGreaterThan10 = (SELECT EXISTS(SELECT a FROM one WHERE a > 10));
			SELECT @existsLessThan3, @existsGreaterThan10;`
		);
		assert.deepEqual([{'@existsLessThan3': true, '@existsGreaterThan10': false}], res[2]);
		done();
	});
});
