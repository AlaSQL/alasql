if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2680'; // A bare name that no table defines is read per row from the first source whose row has it

describe(`Test ${testId} - per-row read of a column from a source without column definitions`, function () {
	// In A the first row has id NULL, and the second row has no id at all
	const A = [{k: 1, id: null}, {k: 2}];
	const B = [
		{k: 1, id: 'b1'},
		{k: 2, id: 'b2'},
	];
	const shapes = {
		'FROM ? a JOIN ? b': 'FROM ? a JOIN ? b ON a.k = b.k',
		'a subquery in FROM': 'FROM (SELECT * FROM ?) a JOIN ? b ON a.k = b.k',
		'CROSS APPLY': 'FROM ? a CROSS APPLY (SELECT * FROM ? x) b',
	};

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	function run(sql) {
		return alasql(sql, [A, B]);
	}

	describe('A) A NULL in the first source is read, a missing key reads the next source', function () {
		const expected = {
			'FROM ? a JOIN ? b': {
				select: [
					{k: 1, id: null},
					{k: 2, id: 'b2'},
				],
				whereNull: [{k: 1}],
				whereB2: [{k: 2}],
				orderBy: [{k: 2}, {k: 1}],
				groupBy: [
					{id: null, n: 1},
					{id: 'b2', n: 1},
				],
				plus: [
					{k: 1, v: undefined},
					{k: 2, v: 'b20'},
				],
				upper: [
					{k: 1, v: 'NULL'},
					{k: 2, v: 'B2'},
				],
			},
			'CROSS APPLY': {
				select: [
					{k: 1, id: null},
					{k: 1, id: null},
					{k: 2, id: 'b1'},
					{k: 2, id: 'b2'},
				],
				whereNull: [{k: 1}, {k: 1}],
				whereB2: [{k: 2}],
				orderBy: [{k: 2}, {k: 2}, {k: 1}, {k: 1}],
				groupBy: [
					{id: null, n: 2},
					{id: 'b1', n: 1},
					{id: 'b2', n: 1},
				],
				plus: [
					{k: 1, v: undefined},
					{k: 1, v: undefined},
					{k: 2, v: 'b10'},
					{k: 2, v: 'b20'},
				],
				upper: [
					{k: 1, v: 'NULL'},
					{k: 1, v: 'NULL'},
					{k: 2, v: 'B1'},
					{k: 2, v: 'B2'},
				],
			},
		};
		expected['a subquery in FROM'] = expected['FROM ? a JOIN ? b'];

		for (const [name, from] of Object.entries(shapes)) {
			const exp = expected[name];
			it(`${name}: select list`, function () {
				assert.deepStrictEqual(run(`SELECT a.k, id ${from} ORDER BY a.k`), exp.select);
			});
			it(`${name}: WHERE`, function () {
				assert.deepStrictEqual(run(`SELECT a.k ${from} WHERE id IS NULL`), exp.whereNull);
				assert.deepStrictEqual(run(`SELECT a.k ${from} WHERE id = 'b2'`), exp.whereB2);
			});
			it(`${name}: ORDER BY`, function () {
				assert.deepStrictEqual(run(`SELECT a.k ${from} ORDER BY id DESC, a.k`), exp.orderBy);
			});
			it(`${name}: GROUP BY`, function () {
				assert.deepStrictEqual(run(`SELECT id, COUNT(*) AS n ${from} GROUP BY id`), exp.groupBy);
			});
			it(`${name}: id + 0`, function () {
				assert.deepStrictEqual(run(`SELECT a.k, id + 0 AS v ${from} ORDER BY a.k`), exp.plus);
			});
			it(`${name}: UPPER(id)`, function () {
				assert.deepStrictEqual(run(`SELECT a.k, UPPER(id) AS v ${from} ORDER BY a.k`), exp.upper);
			});
		}
	});

	it('B) ON: the row of a without the key reads b, the NULL matches nothing', function () {
		const exp = [
			{k: 2, bid: 'b1'},
			{k: 2, bid: 'b2'},
		];
		assert.deepStrictEqual(
			run('SELECT a.k, b.id AS bid FROM ? a JOIN ? b ON id = b.id ORDER BY a.k, b.id'),
			exp
		);
		assert.deepStrictEqual(
			run(
				'SELECT a.k, b.id AS bid FROM (SELECT * FROM ?) a JOIN ? b ON id = b.id ORDER BY a.k, b.id'
			),
			exp
		);
	});

	it('C) A name no table defines, beside a table, is still checked against the table', function () {
		alasql('CREATE TABLE t (a INT, b INT); CREATE TABLE u (c INT, x INT)');
		alasql('INSERT INTO t VALUES (1, 2); INSERT INTO u VALUES (1, 5)');
		assert.throws(
			() => alasql('SELECT x FROM t JOIN (SELECT c FROM u) s ON true'),
			/Column does not exist: x/
		);
		assert.throws(
			() => alasql('SELECT zz FROM t CROSS APPLY (SELECT c FROM u) s'),
			/Column does not exist: zz/
		);
		assert.deepStrictEqual(alasql('SELECT zz FROM (SELECT c FROM u) s JOIN t ON true'), [
			{zz: undefined},
		]);
		assert.deepStrictEqual(alasql('SELECT x FROM t JOIN ? s ON true', [[{x: 9}]]), [{x: 9}]);
	});
});
