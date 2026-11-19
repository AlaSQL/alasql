if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2721'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - A SELECT expression is matched to its GROUP BY expression by what it is, not by its text`, function () {
	var db;
	var data = [{a: 1}, {a: 1}, {a: 2}];
	var expected = [
		{x: 2, n: 2},
		{x: 3, n: 1},
	];

	before(function () {
		alasql('create database test' + testId);
		db = alasql.databases['test' + testId];
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Written the same way (worked before)', function () {
		var res = db.exec('SELECT a+1 AS x, COUNT(*) AS n FROM ? GROUP BY a + 1', [data]);
		assert.deepStrictEqual(res, expected);
	});

	it('B) Parentheses in SELECT', function () {
		var res = db.exec('SELECT (a+1) AS x, COUNT(*) AS n FROM ? GROUP BY a+1', [data]);
		assert.deepStrictEqual(res, expected);
	});

	it('C) Parentheses in GROUP BY', function () {
		var res = db.exec('SELECT a+1 AS x, COUNT(*) AS n FROM ? GROUP BY (a+1)', [data]);
		assert.deepStrictEqual(res, expected);
	});

	it('D) Parentheses inside the expression', function () {
		var res = db.exec('SELECT (a)+(1) AS x, COUNT(*) AS n FROM ? GROUP BY ((a+1))', [data]);
		assert.deepStrictEqual(res, expected);
	});

	it('E) Without an alias the column keeps the name it is written with', function () {
		var res = [];
		res.push(db.exec('SELECT (a+1), COUNT(*) AS n FROM ? GROUP BY a+1', [data]));
		res.push(db.exec('SELECT a+1, COUNT(*) AS n FROM ? GROUP BY (a+1)', [data]));
		assert.deepStrictEqual(res, [
			[
				{'(a + 1)': 2, n: 2},
				{'(a + 1)': 3, n: 1},
			],
			[
				{'a + 1': 2, n: 2},
				{'a + 1': 3, n: 1},
			],
		]);
	});

	it('F) With HAVING and ORDER BY', function () {
		var res = db.exec(
			'SELECT (a+1) AS x, COUNT(*) AS n FROM ? GROUP BY a+1 HAVING COUNT(*) > 0 ORDER BY n',
			[data]
		);
		assert.deepStrictEqual(res, [
			{x: 3, n: 1},
			{x: 2, n: 2},
		]);
	});

	it('G) The same expression twice in SELECT', function () {
		var res = db.exec('SELECT a+1 AS x, (a+1) AS y, COUNT(*) AS n FROM ? GROUP BY a+1', [data]);
		assert.deepStrictEqual(res, [
			{x: 2, y: 2, n: 2},
			{x: 3, y: 3, n: 1},
		]);
	});

	it('H) A function in another case, and a CASE', function () {
		var rows = [{s: 'x'}, {s: 'X'}, {s: 'y'}];
		var res = [];
		res.push(db.exec('SELECT (upper(s)) AS u, COUNT(*) AS n FROM ? GROUP BY UPPER(s)', [rows]));
		res.push(
			db.exec(
				"SELECT (CASE WHEN a > 1 THEN 'big' ELSE 'small' END) AS size, COUNT(*) AS n FROM ? " +
					"GROUP BY CASE WHEN a > 1 THEN 'big' ELSE 'small' END",
				[data]
			)
		);
		assert.deepStrictEqual(res, [
			[
				{u: 'X', n: 2},
				{u: 'Y', n: 1},
			],
			[
				{size: 'small', n: 2},
				{size: 'big', n: 1},
			],
		]);
	});

	it('I) With ROLLUP', function () {
		var res = db.exec('SELECT (a+1) AS x, COUNT(*) AS n FROM ? GROUP BY ROLLUP(a+1)', [data]);
		assert.deepStrictEqual(res, [
			{x: null, n: 3},
			{x: 2, n: 2},
			{x: 3, n: 1},
		]);
	});

	it('J) With CUBE over a function that has a string literal', function () {
		var rows = [
			{a: 1, b: 'x'},
			{a: 1, b: 'y'},
			{a: 2, b: 'x'},
		];
		var res = [];
		res.push(
			db.exec("SELECT CONCAT(b,'z') AS k, COUNT(*) AS n FROM ? GROUP BY CUBE(CONCAT(b,'z'))", [
				rows,
			])
		);
		res.push(
			db.exec("SELECT (concat(b,'z')), COUNT(*) AS n FROM ? GROUP BY CUBE(CONCAT(b,'z'))", [rows])
		);
		assert.deepStrictEqual(res, [
			[
				{k: null, n: 3},
				{k: 'xz', n: 2},
				{k: 'yz', n: 1},
			],
			[
				{"(CONCAT(b,'z'))": null, n: 3},
				{"(CONCAT(b,'z'))": 'xz', n: 2},
				{"(CONCAT(b,'z'))": 'yz', n: 1},
			],
		]);
	});

	it('K) With GROUPING SETS over a function that has a string literal', function () {
		var rows = [
			{a: 1, b: 'x'},
			{a: 1, b: 'y'},
			{a: 2, b: 'x'},
		];
		var res = [];
		res.push(
			db.exec(
				"SELECT CONCAT(b,'z') AS k, COUNT(*) AS n FROM ? GROUP BY GROUPING SETS(CONCAT(b,'z'))",
				[rows]
			)
		);
		res.push(
			db.exec(
				"SELECT a, CONCAT(b,'z') AS k, COUNT(*) AS n FROM ? GROUP BY GROUPING SETS(a, CONCAT(b,'z'))",
				[rows]
			)
		);
		assert.deepStrictEqual(res, [
			[
				{k: 'xz', n: 2},
				{k: 'yz', n: 1},
			],
			[
				{a: 1, k: null, n: 2},
				{a: null, k: 'xz', n: 2},
				{a: null, k: 'yz', n: 1},
				{a: 2, k: null, n: 1},
			],
		]);
	});

	it('L) Another expression is not matched', function () {
		var res = db.exec('SELECT (a+2) AS x, COUNT(*) AS n FROM ? GROUP BY a+1', [data]);
		assert.deepStrictEqual(res, [
			{x: undefined, n: 2},
			{x: undefined, n: 1},
		]);
	});
});
