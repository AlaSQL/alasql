if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 950 - CREATE VIEW with subquery', function () {
	const test = '950';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Create tables', function () {
		alasql('create table sub_table(id int)');
		alasql('create table from_table(id int)');
		alasql('insert into sub_table values (1), (2), (3)');
		alasql('insert into from_table values (100)');
	});

	it('B) Test the query works without view', function () {
		var result = alasql('select (select count(id) from sub_table) as amount from from_table');
		assert.deepStrictEqual(result, [{amount: 3}]);
	});

	it('C) Create view with subquery', function () {
		// This should not throw "Table does not exist: sub_table" error
		alasql(
			'create view new_view as select (select count(id) from sub_table) as amount from from_table'
		);
	});

	it('D) Query from view', function () {
		var result = alasql('select * from new_view');
		assert.deepStrictEqual(result, [{amount: 3}]);
	});

	it('E) View should reflect data changes', function () {
		alasql('insert into sub_table values (4), (5)');
		var result = alasql('select * from new_view');
		assert.deepStrictEqual(result, [{amount: 5}]);
	});

	it('F) Drop view', function () {
		alasql('drop view new_view');
	});
});
