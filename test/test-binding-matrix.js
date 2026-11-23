if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
	The column binding matrix (#2723): every kind of column name in every place a column can
	stand in, over several shapes of FROM.

	The test asserts nothing about the results. Many of the statements are wrong on purpose (an
	unknown column, an unknown source, an ambiguous name), and an SQL error is an outcome like any
	other. The test only fails when it crashes itself. What it is for is the parity check
	(test/parity/), which runs this file on the base of a pull request and on the pull request
	and lists every statement whose result, error or generated code differs. A change to how a
	column is resolved then shows on names and places that no other test has (#3115, #3119).

	To add a case, add a name, a place or a shape of FROM below. Every combination is run.
*/
describe('Test binding matrix - every kind of column name in every place', function () {
	const db = 'test_binding_matrix';

	// A parameter as a source: rows without column definitions, one of them without x
	const rows = [
		{k: 1, z: -1, x: 7},
		{k: 2, z: 2},
	];

	// The shapes of FROM. params is what a statement with a `?` source gets.
	const froms = {
		'one table': {from: 'FROM t0'},
		'two tables': {from: 'FROM t0 JOIN t1 ON t0.k = t1.k'},
		'a table and a table without column definitions': {from: 'FROM t0 JOIN nc ON t0.k = nc.k'},
		'a table without column definitions and a table': {from: 'FROM nc JOIN t0 ON t0.k = nc.k'},
		'a table without column definitions': {from: 'FROM nc'},
		'a parameter': {from: 'FROM ? p0', params: [rows]},
		'a parameter and a table': {from: 'FROM ? p0 JOIN t0 ON t0.k = p0.k', params: [rows]},
		'a subquery': {from: 'FROM (SELECT k, x FROM t0) q'},
		'a table and a subquery': {from: 'FROM t1 JOIN (SELECT k, x FROM t0) q ON q.k = t1.k'},
		'a table and an APPLY source': {
			from: 'FROM t0 CROSS APPLY (SELECT v FROM t1 WHERE t1.k = t0.k) ap',
		},
		'three tables, two of them with the same column': {
			from: 'FROM t0 JOIN t1 ON t0.k = t1.k JOIN t2 ON t0.k = t2.k',
		},
	};

	// The kinds of name: bare or written with a source, known or not. Which of them exist
	// depends on the shape of FROM, so each is known in some shapes and unknown in others.
	const names = [
		'x',
		'k',
		's',
		'v',
		'z',
		'nosuch',
		't0.x',
		't0.nosuch',
		't1.v',
		'zz.x',
		'zz.nosuch',
		'nc.z',
		'q.x',
		'p0.z',
		'ap.v',
		'_',
		't0._',
	];

	// The places. @FROM stands for the FROM of the shape.
	const places = {
		'alone in the select list': n => `SELECT ${n} @FROM`,
		'alone in the select list with an alias': n => `SELECT ${n} AS c @FROM`,
		'in an expression': n => `SELECT ${n} + 0 AS c @FROM`,
		'as the argument of a function': n => `SELECT ABS(${n}) AS c @FROM`,
		'as the argument of two functions': n =>
			`SELECT COALESCE(${n}, 0) AS c, IIF(${n} > 0, 1, 2) AS d @FROM`,
		'in WHERE': n => `SELECT 1 AS one @FROM WHERE ${n} > 0`,
		'in a function in WHERE': n => `SELECT 1 AS one @FROM WHERE ABS(${n}) > 0`,
		'in ORDER BY': n => `SELECT 1 AS one @FROM ORDER BY ${n}`,
		'as a GROUP BY key': n => `SELECT COUNT(*) AS n @FROM GROUP BY ${n}`,
		'in a select list with an aggregate': n => `SELECT ${n}, COUNT(*) AS n @FROM`,
		'in a grouped select list and as its key': n =>
			`SELECT ${n}, COUNT(*) AS n @FROM GROUP BY ${n}`,
		'as the argument of an aggregate': n => `SELECT SUM(${n}) AS q, MAX(ABS(${n})) AS m @FROM`,
		'in an aggregate in HAVING': n => `SELECT COUNT(*) AS n @FROM HAVING MAX(${n}) > 0`,
		'in CASE': n => `SELECT CASE WHEN ${n} > 0 THEN 1 ELSE 2 END AS c @FROM`,
		'in a correlated subquery': n => `SELECT (SELECT MAX(v) FROM t1 i WHERE i.k = ${n}) AS c @FROM`,
	};

	// The inner SELECT of EXISTS, where a name can also be a column of the outer SELECT
	const inner = {
		'in WHERE of the inner SELECT': n => `${n} > 0`,
		'in a function in the inner SELECT': n => `ABS(${n}) > 0`,
		'in a function beside an outer column': n => `ABS(${n}) = ABS(t1.v) + 20`,
		'in an expression in the inner SELECT': n => `${n} + 0 > -100`,
	};

	before(function () {
		alasql('CREATE DATABASE ' + db);
		alasql('USE ' + db);
		alasql('CREATE TABLE t0 (k INT, x INT, s STRING)');
		alasql('CREATE TABLE t1 (k INT, v INT, s STRING)');
		alasql('CREATE TABLE t2 (k INT, v INT, w STRING)');
		alasql('CREATE TABLE nc');
		alasql('INSERT INTO t0 VALUES (1, 5, "a"), (2, -6, "b")');
		alasql('INSERT INTO t1 VALUES (1, -10, "c"), (2, 11, "d")');
		alasql('INSERT INTO t2 VALUES (1, 20, "e"), (2, -21, "f")');
		alasql('INSERT INTO nc VALUES {k: 1, z: -3, x: 40}, {k: 2, z: 4}');
	});

	after(function () {
		alasql('DROP DATABASE ' + db);
	});

	// Runs a statement for its outcome. An error of the statement is an outcome.
	function run(sql, params) {
		try {
			alasql(sql, params);
		} catch (err) {
			// not a failure of this test
		}
	}

	Object.keys(froms).forEach(function (shape) {
		it('FROM ' + shape, function () {
			var count = 0;
			Object.keys(places).forEach(function (place) {
				names.forEach(function (name) {
					run(places[place](name).replace('@FROM', froms[shape].from), froms[shape].params);
					count++;
				});
			});
			assert.strictEqual(count, Object.keys(places).length * names.length);
		});
	});

	it('The inner SELECT of EXISTS', function () {
		var count = 0;
		Object.keys(inner).forEach(function (place) {
			names.forEach(function (name) {
				run(
					'SELECT t1.k FROM t1 WHERE EXISTS (SELECT 1 FROM t0 WHERE t0.k = t1.k AND ' +
						inner[place](name) +
						')'
				);
				count++;
			});
		});
		assert.strictEqual(count, Object.keys(inner).length * names.length);
	});
});
