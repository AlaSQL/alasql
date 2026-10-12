if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '832'; // Unqualified columns from a joined subquery in expressions

describe(`Test ${testId} - unqualified columns of subqueries in expressions`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE one (a INT, b INT)');
		alasql('INSERT INTO one VALUES (1,10),(2,20)');
		alasql('CREATE TABLE two (a INT, c INT)');
		alasql('INSERT INTO two VALUES (1,100),(2,200)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Expression over columns of two joined subqueries (issue example)', function () {
		const res = alasql(
			'SELECT t0.`a` AS a, c - b AS bc FROM (SELECT a,b FROM one) t0 JOIN (SELECT a,c FROM two) t1 ON t0.`a`=t1.`a`'
		);
		assert.deepStrictEqual(res, [
			{a: 1, bc: 90},
			{a: 2, bc: 180},
		]);
	});

	it('B) Table joined with a subquery', function () {
		const res = alasql(
			'SELECT t0.a AS a, c - b AS bc FROM one t0 JOIN (SELECT a, c FROM two) t1 ON t0.a = t1.a'
		);
		assert.deepStrictEqual(res, [
			{a: 1, bc: 90},
			{a: 2, bc: 180},
		]);
	});

	it('C) Aliased subquery columns in WHERE and ORDER BY expressions', function () {
		const res = alasql(
			`SELECT t0.a AS a, dbl FROM one t0
				JOIN (SELECT a, c * 2 AS dbl FROM two) t1 ON t0.a = t1.a
				WHERE dbl + b > 300 ORDER BY dbl + 0 DESC`
		);
		assert.deepStrictEqual(res, [{a: 2, dbl: 400}]);
	});

	it('D) Table columns keep their resolution', function () {
		const res = alasql(
			'SELECT t0.a AS a, b + 1 AS b1 FROM (SELECT a, c FROM two) t1 JOIN one t0 ON t0.a = t1.a'
		);
		assert.deepStrictEqual(res, [
			{a: 1, b1: 11},
			{a: 2, b1: 21},
		]);
	});

	it('E) With a schemaless source an unqualified name keeps resolving to the first source', function () {
		const A = [
			{id: 1, x: 10},
			{id: 2, x: 20},
		];
		const B = [
			{id: 1, x: 100},
			{id: 2, x: 200},
		];
		assert.deepStrictEqual(
			alasql('SELECT x + 0 AS v FROM ? t0 JOIN (SELECT id, x FROM ?) t1 ON t0.id = t1.id', [A, B]),
			[{v: 10}, {v: 20}]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT a + 0 AS v FROM (SELECT * FROM one) t0 JOIN (SELECT a, c FROM two) t1 ON t0.a = t1.a'
			),
			[{v: 1}, {v: 2}]
		);
	});
});
