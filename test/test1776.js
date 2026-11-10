if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '1776'; // insert test file number

describe('Test ' + test + ' - case-insensitive distinct keyword within aggregations', function () {
	var data;
	var res;

	it('a) GROUP_CONCAT aggregation', function () {
		data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 1, b: 'z'},
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
		];
		res = alasql('SELECT a, GROUP_CONCAT(Distinct b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, 'x,z');
		assert.equal(res[1].b, 'y');
	});

	it('b) A user-defined aggregate', function () {
		alasql.aggr.CNT1776 = function (v, s, stage) {
			if (stage == 1) return 1;
			if (stage == 2) return s + 1;
			return s;
		};
		data = [{b: 'x'}, {b: 'x'}, {b: 'z'}];
		['DISTINCT', 'distinct', 'Distinct'].forEach(function (kw) {
			res = alasql(`SELECT CNT1776(${kw} b) AS c FROM ?`, [data]);
			assert.deepStrictEqual(res, [{c: 2}], kw);
		});
		assert.deepStrictEqual(alasql('SELECT CNT1776(b) AS c FROM ?', [data]), [{c: 3}]);
		assert.deepStrictEqual(alasql('SELECT CNT1776(all b) AS c FROM ?', [data]), [{c: 3}]);
	});

	it('c) Built-in aggregates and SELECT distinct', function () {
		data = [{a: 1}, {a: 1}, {a: 2}];
		assert.deepStrictEqual(
			alasql('SELECT count(distinct a) AS c, sum(Distinct a) AS s FROM ?', [data]),
			[{c: 2, s: 3}]
		);
		assert.deepStrictEqual(alasql('select distinct a from ?', [data]), [{a: 1}, {a: 2}]);
	});
});
