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

	// Run each query twice: the second run uses the cached statement (see #2605)
	function runTwice(sql) {
		return [alasql(sql), alasql(sql)];
	}

	// UNION does not define the order of the result, so compare the values sorted
	const values = res => res.map(r => r.a).sort((x, y) => x - y);

	it('A) INTERSECT with ORDER BY and LIMIT on both SELECTs', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) INTERSECT (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		assert.deepStrictEqual(runTwice(sql), [[{a: 1}], [{a: 1}]]);
	});

	it('B) INTERSECT with ORDER BY and no LIMIT on both SELECTs', function () {
		const sql = '(SELECT a FROM e1 ORDER BY a) INTERSECT (SELECT a FROM e2 ORDER BY a)';
		assert.deepStrictEqual(runTwice(sql), [[{a: 1}], [{a: 1}]]);
	});

	it('C) EXCEPT with ORDER BY and LIMIT on both SELECTs', function () {
		const sql2 =
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) EXCEPT (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		assert.deepStrictEqual(runTwice(sql2), [[{a: 2}], [{a: 2}]]);

		const sql3 =
			'(SELECT a FROM e1 ORDER BY a LIMIT 3) EXCEPT (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		const expected = [{a: 2}, {a: 3}];
		assert.deepStrictEqual(runTwice(sql3), [expected, expected]);
	});

	it('D) UNION with ORDER BY and LIMIT on both SELECTs removes duplicates', function () {
		const sql = '(SELECT a FROM e1 ORDER BY a LIMIT 2) UNION (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		const [first, second] = runTwice(sql);
		assert.deepStrictEqual(
			[values(first), values(second)],
			[
				[1, 2],
				[1, 2],
			]
		);
	});

	it('E) UNION with ORDER BY and no LIMIT on both SELECTs removes duplicates', function () {
		const sql = '(SELECT a FROM e1 ORDER BY a) UNION (SELECT a FROM e2 ORDER BY a)';
		const [first, second] = runTwice(sql);
		assert.deepStrictEqual(
			[values(first), values(second)],
			[
				[1, 2, 3, 4, 5],
				[1, 2, 3, 4, 5],
			]
		);
	});

	it('F) UNION ALL with ORDER BY and LIMIT on both SELECTs keeps duplicates', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a LIMIT 2) UNION ALL (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		const expected = [{a: 1}, {a: 2}, {a: 1}];
		assert.deepStrictEqual(runTwice(sql), [expected, expected]);
	});

	it('G) INTERSECT with no ORDER BY on the first SELECT', function () {
		const sql = '(SELECT a FROM e1 LIMIT 2) INTERSECT (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		assert.deepStrictEqual(runTwice(sql), [[{a: 1}], [{a: 1}]]);
	});
});
