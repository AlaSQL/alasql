if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2605';

describe(`Test ${testId} - Set operation keeps ORDER BY / LIMIT of the first SELECT on every run`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE e1 (a INT); INSERT INTO e1 VALUES (1),(2),(3),(4)');
		alasql('CREATE TABLE e2 (a INT); INSERT INTO e2 VALUES (1),(5)');
	});

	after(function () {
		alasql.options.cache = true;
		alasql('drop database test' + testId);
	});

	function runTwice(sql) {
		return [alasql(sql), alasql(sql)];
	}

	it('A) UNION ALL with ORDER BY and LIMIT on both SELECTs', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a DESC LIMIT 2) UNION ALL (SELECT a FROM e2 ORDER BY a DESC LIMIT 1)';
		const expected = [{a: 4}, {a: 3}, {a: 5}];
		assert.deepStrictEqual(runTwice(sql), [expected, expected]);
	});

	it('B) UNION ALL with ORDER BY and no LIMIT on both SELECTs', function () {
		const sql = '(SELECT a FROM e1 ORDER BY a DESC) UNION ALL (SELECT a FROM e2 ORDER BY a DESC)';
		const expected = [{a: 4}, {a: 3}, {a: 2}, {a: 1}, {a: 5}, {a: 1}];
		assert.deepStrictEqual(runTwice(sql), [expected, expected]);
	});

	it('C) UNION with ORDER BY and LIMIT on both SELECTs', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a DESC LIMIT 2) UNION (SELECT a FROM e2 ORDER BY a DESC LIMIT 1)';
		const expected = [{a: 5}, {a: 4}, {a: 3}];
		assert.deepStrictEqual(runTwice(sql), [expected, expected]);
	});

	it('D) EXCEPT with ORDER BY and LIMIT on both SELECTs', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a DESC LIMIT 3) EXCEPT (SELECT a FROM e2 ORDER BY a LIMIT 1)';
		const expected = [{a: 4}, {a: 3}, {a: 2}];
		assert.deepStrictEqual(runTwice(sql), [expected, expected]);
	});

	it('E) Statement from alasql.compile() called twice', function () {
		const st = alasql.compile(
			'(SELECT a FROM e1 ORDER BY a DESC LIMIT 2) UNION ALL (SELECT a FROM e2 ORDER BY a DESC LIMIT 1)'
		);
		const expected = [{a: 4}, {a: 3}, {a: 5}];
		assert.deepStrictEqual([st(), st()], [expected, expected]);
	});

	it('F) Query from test2414 G with parameters, run twice', function () {
		const data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];
		const sql =
			'(SELECT b FROM ? ORDER BY a LIMIT 2) UNION ALL (SELECT b FROM ? ORDER BY a DESC LIMIT 1)';
		const expected = [{b: 'x'}, {b: 'y'}, {b: 'w'}];
		assert.deepStrictEqual(
			[alasql(sql, [data, data]), alasql(sql, [data, data])],
			[expected, expected]
		);
	});

	it('G) Same result with the statement cache on and off', function () {
		const sql =
			'(SELECT a FROM e1 ORDER BY a DESC LIMIT 2) UNION ALL (SELECT a FROM e2 ORDER BY a DESC LIMIT 1)';
		alasql.options.cache = false;
		const uncached = alasql(sql);
		alasql.options.cache = true;
		assert.deepStrictEqual(runTwice(sql), [uncached, uncached]);
	});
});
