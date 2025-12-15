if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '606-B';

describe('Test ' + test + ' - Quoted column aliases (double and single quotes)', function () {
	before(function () {
		alasql('create database test' + test.replace('-', '_'));
		alasql('use test' + test.replace('-', '_'));
	});

	after(function () {
		alasql('drop database test' + test.replace('-', '_'));
	});

	it('A) Double-quoted alias with AS keyword', function () {
		var res = alasql('SELECT 1 AS "Fancy Name"');
		assert.deepEqual(res, [{'Fancy Name': 1}]);
	});

	it('B) Double-quoted alias without AS keyword', function () {
		var res = alasql('SELECT 1 "Another Fancy Name"');
		assert.deepEqual(res, [{'Another Fancy Name': 1}]);
	});

	it('C) Single-quoted alias with AS keyword', function () {
		var res = alasql("SELECT 1 AS 'Single Quoted'");
		assert.deepEqual(res, [{'Single Quoted': 1}]);
	});

	it('D) Single-quoted alias without AS keyword', function () {
		var res = alasql("SELECT 1 'Also Single Quoted'");
		assert.deepEqual(res, [{'Also Single Quoted': 1}]);
	});

	it('E) Backtick alias still works', function () {
		var res = alasql('SELECT 1 AS `Backtick Name`');
		assert.deepEqual(res, [{'Backtick Name': 1}]);
	});

	it('F) Bracket alias still works', function () {
		var res = alasql('SELECT 1 AS [Bracket Name]');
		assert.deepEqual(res, [{'Bracket Name': 1}]);
	});

	it('G) Multiple columns with different quote styles', function () {
		var res = alasql(`SELECT 
			1 AS "Double Quoted",
			2 AS 'Single Quoted',
			3 AS \`Backtick Quoted\`,
			4 AS [Bracket Quoted]
		`);
		assert.deepEqual(res, [
			{
				'Double Quoted': 1,
				'Single Quoted': 2,
				'Backtick Quoted': 3,
				'Bracket Quoted': 4,
			},
		]);
	});

	it('H) Quoted alias from table', function () {
		alasql('CREATE TABLE test_alias (id INT, name STRING)');
		alasql('INSERT INTO test_alias VALUES (1, "Alice"), (2, "Bob")');

		var res = alasql('SELECT id AS "User ID", name AS "Full Name" FROM test_alias');
		assert.deepEqual(res, [
			{'User ID': 1, 'Full Name': 'Alice'},
			{'User ID': 2, 'Full Name': 'Bob'},
		]);

		alasql('DROP TABLE test_alias');
	});

	it('I) Quoted alias with expression', function () {
		var res = alasql('SELECT 1 + 2 AS "Sum Result"');
		assert.deepEqual(res, [{'Sum Result': 3}]);
	});

	it('J) Quoted alias with special characters', function () {
		var res = alasql('SELECT 1 AS "Column With Spaces & Special!"');
		assert.deepEqual(res, [{'Column With Spaces & Special!': 1}]);
	});
});
