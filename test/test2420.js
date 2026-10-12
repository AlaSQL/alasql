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

	it('E) EXCEPT with subquery', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test5');
		alasql('select * into test5 from ?', [d]);
		let res = alasql(
			'select d from test5 where d in (select 1, 2) except select d from test5 where d in (select 2)'
		);
		assert.deepStrictEqual(res, [{d: 1}]);
		alasql('drop table test5');
	});

	it('F) INTERSECT with subquery', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test6');
		alasql('select * into test6 from ?', [d]);
		let res = alasql('select d from test6 where d <= 2 intersect select d from test6 where d >= 2');
		// Intersection should give d=2
		assert.deepStrictEqual(res, [{d: 2}]);
		alasql('drop table test6');
	});

	it('G) Multiple UNION ALL with subqueries', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test7');
		alasql('select * into test7 from ?', [d]);
		let res = alasql(
			'select d from test7 where d in (select 1) union all select d from test7 where d in (select 2) union all select d from test7 where d in (select 3)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}, {d: 3}]);
		alasql('drop table test7');
	});

	it('H) Subquery in SELECT clause with UNION ALL', function () {
		let d = [{d: 1}];
		alasql('create table test8');
		alasql('select * into test8 from ?', [d]);
		let res = alasql(
			'select d, (select 1) as x from test8 union all select d, (select 2) as x from test8'
		);
		assert.deepStrictEqual(res, [
			{d: 1, x: 1},
			{d: 1, x: 2},
		]);
		alasql('drop table test8');
	});

	it('I) Subquery with IN in both parts of UNION ALL', function () {
		let d = [{d: 1}, {d: 2}];
		alasql('create table test9');
		alasql('select * into test9 from ?', [d]);
		let res = alasql(
			'select d from test9 where d in (select 1) union all select d from test9 where d in (select 2)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}]);
		alasql('drop table test9');
	});

	it('J) Empty result set with subquery in UNION ALL', function () {
		let d = [{d: 1}];
		alasql('create table test10');
		alasql('select * into test10 from ?', [d]);
		let res = alasql(
			'select d from test10 where d in (select 99) union all select d from test10 where d not in (select 1)'
		);
		assert.deepStrictEqual(res, []);
		alasql('drop table test10');
	});

	it('K) Nested subqueries in UNION ALL', function () {
		let d = [{d: 1}, {d: 2}];
		alasql('create table test11');
		alasql('select * into test11 from ?', [d]);
		let res = alasql(
			'select d from test11 where d in (select d from (select 1 as d)) union all select d from test11 where d in (select d from (select 2 as d))'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}]);
		alasql('drop table test11');
	});

	it('L) Parenthesized SELECT with subquery in UNION ALL', function () {
		let d = [{d: 1}];
		alasql('create table test12');
		alasql('select * into test12 from ?', [d]);
		let res = alasql(
			'(select d from test12 where d in (select 1)) union all (select d from test12 where d not in (select 2))'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 1}]);
		alasql('drop table test12');
	});

	it('M) Subquery with comparison operators in UNION ALL', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test13');
		alasql('select * into test13 from ?', [d]);
		let res = alasql(
			'select d from test13 where d > (select 0) and d <= (select 1) union all select d from test13 where d >= (select 2) and d < (select 4)'
		);
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}, {d: 3}]);
		alasql('drop table test13');
	});

	it('N) Multiple columns with subqueries in UNION ALL', function () {
		let d = [
			{a: 1, b: 2},
			{a: 3, b: 4},
		];
		alasql('create table test14');
		alasql('select * into test14 from ?', [d]);
		let res = alasql(
			'select a, b from test14 where a in (select 1) union all select a, b from test14 where b in (select 4)'
		);
		assert.deepStrictEqual(res, [
			{a: 1, b: 2},
			{a: 3, b: 4},
		]);
		alasql('drop table test14');
	});

	it('O) Subquery with aggregate functions in UNION ALL', function () {
		let d = [{d: 1}, {d: 2}, {d: 3}];
		alasql('create table test15');
		alasql('select * into test15 from ?', [d]);
		let res = alasql(
			'select d from test15 where d < (select max(d) from test15) union all select d from test15 where d > (select min(d) from test15)'
		);
		// d < 3 gives [1,2], d > 1 gives [2,3]
		assert.deepStrictEqual(res, [{d: 1}, {d: 2}, {d: 2}, {d: 3}]);
		alasql('drop table test15');
	});

	it('P) UNION ALL CORRESPONDING with subquery', function () {
		let d1 = [{a: 1, b: 2}];
		let d2 = [{b: 3, a: 4}];
		alasql('create table test16a');
		alasql('create table test16b');
		alasql('select * into test16a from ?', [d1]);
		alasql('select * into test16b from ?', [d2]);
		let res = alasql(
			'select a, b from test16a where a in (select 1) union all corresponding select b, a from test16b where a in (select 4)'
		);
		assert.deepStrictEqual(res, [
			{a: 1, b: 2},
			{a: 4, b: 3},
		]);
		alasql('drop table test16a');
		alasql('drop table test16b');
	});
});
