if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2420'; // UNION ALL with subquery issue

describe(`Test ${testId} - UNION ALL with subquery in NOT IN clause`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) UNION ALL with literal in NOT IN (baseline test)', function () {
		let d = [{d: 1}];
		alasql('create table test1');
		alasql('select * into test1 from ?', [d]);
		let res = alasql(
			'select d from test1 where d in (select 1) union all select d from test1 where d not in (2)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 1}]);
		alasql('drop table test1');
	});

	it('B) UNION ALL with subquery in NOT IN (main test)', function () {
		let d = [{d: 1}];
		alasql('create table test2');
		alasql('select * into test2 from ?', [d]);
		let res = alasql(
			'select d from test2 where d in (select 1) union all select d from test2 where d not in (select 2)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 1}]);
		alasql('drop table test2');
	});

	it('C) UNION ALL with multiple subqueries', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test3');
		alasql('select * into test3 from ?', [d]);
		let res = alasql(
			'select d from test3 where d in (select 1) union all select d from test3 where d in (select 2)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}]);
		alasql('drop table test3');
	});

	it('D) UNION with subquery (not UNION ALL)', function () {
		let d = [{d: 1}];
		alasql('create table test4');
		alasql('select * into test4 from ?', [d]);
		let res = alasql(
			'select d from test4 where d in (select 1) union select d from test4 where d not in (select 2)'
		);
		// UNION removes duplicates, so only one row
		assert.deepStrictEqual(res, [{d: 1}]);
		alasql('drop table test4');
	});
});
