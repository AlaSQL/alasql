if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2610';

describe(`Test ${testId} - Set operations compare rows correctly when both SELECTs have ORDER BY`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE e1 (a INT); INSERT INTO e1 VALUES (1),(2),(3),(4)');
		alasql('CREATE TABLE e2 (a INT); INSERT INTO e2 VALUES (1),(5)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) INTERSECT with ORDER BY and LIMIT on both SELECTs', function () {
		const res = alasql(
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) INTERSECT (SELECT a FROM e2 ORDER BY a LIMIT 1)'
		);
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('B) INTERSECT with ORDER BY and no LIMIT on both SELECTs', function () {
		const res = alasql('(SELECT a FROM e1 ORDER BY a) INTERSECT (SELECT a FROM e2 ORDER BY a)');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('C) EXCEPT with ORDER BY and LIMIT on both SELECTs', function () {
		const res = alasql(
			'(SELECT a FROM e1 ORDER BY a LIMIT 3) EXCEPT (SELECT a FROM e2 ORDER BY a LIMIT 1)'
		);
		assert.deepStrictEqual(res, [{a: 2}, {a: 3}]);
	});

	it('D) UNION with ORDER BY and LIMIT on both SELECTs removes duplicates', function () {
		const res = alasql(
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) UNION (SELECT a FROM e2 ORDER BY a LIMIT 1)'
		);
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
	});

	it('E) UNION ALL with ORDER BY and LIMIT on both SELECTs keeps duplicates', function () {
		const res = alasql(
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) UNION ALL (SELECT a FROM e2 ORDER BY a LIMIT 1)'
		);
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}, {a: 1}]);
	});
});
