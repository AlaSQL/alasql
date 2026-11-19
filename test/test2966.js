if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2966'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - LIMIT 0 and TOP 0`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('create table one (a int)');
		alasql('insert into one values (1),(2),(3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) LIMIT 0 returns no rows', function () {
		assert.deepStrictEqual(alasql('select * from one limit 0'), []);
	});

	it('B) LIMIT from a parameter set to 0 returns no rows', function () {
		assert.deepStrictEqual(alasql('select * from one limit ?', [0]), []);
	});

	it('C) LIMIT 0 with OFFSET returns no rows', function () {
		assert.deepStrictEqual(alasql('select * from one order by a limit 0 offset 1'), []);
	});

	it('D) TOP 0 returns no rows', function () {
		assert.deepStrictEqual(alasql('select top 0 * from one'), []);
	});

	it('E) LIMIT 0 on both sides of UNION ALL returns no rows', function () {
		assert.deepStrictEqual(
			alasql('(select a from one limit 0) union all (select a from one limit 0)'),
			[]
		);
	});

	it('F) Inline data from the issue returns no rows', function () {
		let data = [{a: 1}, {a: 2}, {a: 3}];
		assert.deepStrictEqual(alasql('select * from ? limit 0', [data]), []);
		assert.deepStrictEqual(alasql('select * from ? limit ?', [data, 0]), []);
		assert.deepStrictEqual(alasql('select top 0 * from ?', [data]), []);
	});

	it('G) Non-zero LIMIT and TOP still limit the rows', function () {
		assert.deepStrictEqual(alasql('select * from one limit 2'), [{a: 1}, {a: 2}]);
		assert.deepStrictEqual(alasql('select top 2 * from one'), [{a: 1}, {a: 2}]);
	});
});
