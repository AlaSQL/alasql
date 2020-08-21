if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 120 - Tables and column names with dots, commas, spaces, square brackets, and backquotes', function () {
	it('1. Create database Spaces and dots inside names', function (done) {
		alasql('create database [My database]');
		assert(!!alasql.databases['My database']);

		alasql('use [My database]');
		assert(alasql.useid == 'My database');

		alasql('create table [A.table] ([Primary column] int primary key)');
		assert(!!alasql.databases['My database'].tables['A.table']);
		assert(!!alasql.databases['My database'].tables['A.table'].xcolumns['Primary column']);

		alasql('insert into [A.table] values (1), (2), (3)');
		var res = alasql('select sum([Primary column]) AS [AS] from [A.table]');
		assert.deepEqual(res, [{AS: 6}]);

		alasql('delete from [A.table] where [Primary column] = 2');
		var res = alasql('select * from [A.table] order by [Primary column]');
		assert.deepEqual(res, [{'Primary column': 1}, {'Primary column': 3}]);

		alasql('update [A.table] set [Primary column] = 30 where [Primary column] = 3');
		var res = alasql('select * from [A.table] order by [Primary column]');
		assert.deepEqual(res, [{'Primary column': 1}, {'Primary column': 30}]);

		done();
	});

	it('2. Quotes', function (done) {
		//		var res = alasql('select sum([Primary column]) AS [quoted] from [A.table]');
		//		assert.deepEqual(res, [{"'quoted'":31}]);

		alasql('create table [A`TABLE] ([My test] int)');
		alasql('insert into [A`TABLE] values (1), (2), (3)');

		var res = alasql('select sum([My test]) AS [ala"column] from [A`TABLE]');
		assert.deepEqual(res, [{'ala"column': 6}]);

		done();
	});
	it('3. Non-reserved keywords', function (done) {
		//		var res = alasql('select sum([Primary column]) AS [quoted] from [A.table]');
		//		assert.deepEqual(res, [{"'quoted'":31}]);

		alasql('create table key (after int)');
		alasql('insert into key values (1), (2), (3)');

		var res = alasql('select sum(after) AS c from key');
		assert.deepEqual(res, [{c: 6}]);

		done();
	});

	it('Mix with letter sizes', function (done) {
		alasql('create table [Big] ([Col] int, [col] int)');
		alasql('insert into [Big] values (1,10), (2,20), (3,30)');

		alasql('create table [big] ([Col] int, [col] int)');
		alasql('insert into [big] values (1,100), (2,200), (3,300)');

		var res = alasql(
			'select [Big].[col], [big].[col] AS [COL] from [Big] ' +
				' join [big] using [Col] where [Big].[Col] IN (2,3)'
		);
		assert.deepEqual(res, [
			{col: 20, COL: 200},
			{col: 30, COL: 300},
		]);
		done();
	});

	it('Mix with keywords', function (done) {
		alasql('create table [table] ([int] int, [create] int)');
		alasql('insert into [table] values (1,10), (2,20), (3,30)');

		var res = alasql('select sum([int]) as [Sum], sum([create]) as [AS] from [table]');
		assert.deepEqual(res, [{Sum: 6, AS: 60}]);
		done();
	});

	it('Clear database', function (done) {
		alasql('drop database [My database]');
		done();
	});
});
