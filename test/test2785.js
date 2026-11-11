if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2785'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - EXTRACT(field FROM value) and OVERLAPS`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (d DATE)');
		alasql("INSERT INTO t VALUES ('2020-01-02')");
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) EXTRACT from the issue', function () {
		assert.deepStrictEqual(
			alasql('SELECT EXTRACT(YEAR FROM d) AS y, EXTRACT(DAY FROM d) AS dd FROM t'),
			[{y: 2020, dd: 2}]
		);
	});

	it('B) the other fields, lower case and NULL', function () {
		const ts = "'2021-07-15 10:20:30'";
		assert.deepStrictEqual(
			alasql(
				`SELECT extract(month from ${ts}) AS m, EXTRACT(HOUR FROM ${ts}) AS h, ` +
					`EXTRACT(MINUTE FROM ${ts}) AS mi, EXTRACT(SECOND FROM ${ts}) AS s, ` +
					'EXTRACT(YEAR FROM NULL) IS NULL AS n'
			),
			[{m: 7, h: 10, mi: 20, s: 30, n: true}]
		);
	});

	it('C) OVERLAPS from the issue', function () {
		assert.deepStrictEqual(
			alasql(
				"SELECT (CAST('2020-01-01' AS DATE), CAST('2020-02-01' AS DATE)) OVERLAPS " +
					"(CAST('2020-01-15' AS DATE), CAST('2020-03-01' AS DATE)) AS o"
			),
			[{o: true}]
		);
	});

	it('D) OVERLAPS: periods that only touch, reversed ends and the same start', function () {
		assert.deepStrictEqual(
			alasql(
				"SELECT ('2020-01-01', '2020-02-01') OVERLAPS ('2020-02-01', '2020-03-01') AS a, " +
					'(1, 5) OVERLAPS (5, 3) AS b, (1, 2) OVERLAPS (1, 1) AS c, (1, 2) OVERLAPS (3, 4) AS d'
			),
			[{a: false, b: true, c: true, d: false}]
		);
	});

	it('E) extract and overlaps are still column names', function () {
		alasql('CREATE TABLE e (extract INT, overlaps INT)');
		alasql('INSERT INTO e VALUES (1, 2)');
		assert.deepStrictEqual(alasql('SELECT extract, overlaps FROM e'), [{extract: 1, overlaps: 2}]);
	});
});
