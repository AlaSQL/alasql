if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2596'; // A statement from alasql.compile() running twice at once

describe(`Test ${testId} - a statement from alasql.compile() running twice at once`, function () {
	before(function () {
		alasql.from.SLOW2596 = function (ms, opts, cb, idx, query) {
			setTimeout(() => cb && cb(opts.rows, idx, query), ms);
			return null;
		};
	});

	it('A) Two overlapping runs with an asynchronous source both settle', async function () {
		var statement = alasql.compile('SELECT COLUMN x FROM SLOW2596(?, ?) ORDER BY x');
		var res = await Promise.all([
			new Promise(resolve => statement([30, {rows: [{x: 1}, {x: 2}]}], resolve)),
			new Promise(resolve => statement([10, {rows: [{x: 100}]}], resolve)),
		]);
		assert.deepStrictEqual(res, [[1, 2], [100]]);
	});

	it('B) The same through statement.promise()', async function () {
		var statement = alasql.compile('SELECT COLUMN x FROM SLOW2596(?, ?)');
		var res = await Promise.all([
			statement.promise([20, {rows: [{x: 'a'}]}]),
			statement.promise([5, {rows: [{x: 'b'}]}]),
		]);
		assert.deepStrictEqual(res, [['a'], ['b']]);
	});

	it('C) A user function that runs the same compiled statement again', function () {
		var statement = alasql.compile('SELECT id, below2596(kids) AS below FROM ? ORDER BY id');
		alasql.fn.below2596 = kids => (kids.length ? statement([kids]) : []);
		var tree = {
			id: 1,
			kids: [
				{id: 2, kids: [{id: 4, kids: []}]},
				{id: 3, kids: []},
			],
		};
		assert.deepStrictEqual(statement([[tree]]), [
			{
				id: 1,
				below: [
					{id: 2, below: [{id: 4, below: []}]},
					{id: 3, below: []},
				],
			},
		]);
	});

	it('D) Runs one after the other still use the compiled statement', function () {
		var statement = alasql.compile('SELECT COLUMN a FROM ? WHERE a > ?');
		assert.deepStrictEqual(statement([[{a: 1}, {a: 2}, {a: 3}], 1]), [2, 3]);
		assert.deepStrictEqual(statement([[{a: 5}], 4]), [5]);
	});

	// The cached statement of one SQL text, and how often a SELECT was compiled while fn ran
	function cached(sql) {
		var db = alasql.databases[alasql.useid];
		return Object.keys(db.sqlCache)
			.filter(k => k.startsWith(sql + '|'))
			.map(k => db.sqlCache[k])[0];
	}
	function compiles(fn) {
		var compile = alasql.yy.Select.prototype.compile;
		var n = 0;
		alasql.yy.Select.prototype.compile = function () {
			n++;
			return compile.apply(this, arguments);
		};
		try {
			fn();
		} finally {
			alasql.yy.Select.prototype.compile = compile;
		}
		return n;
	}

	it('E) A user function that runs the same cached SQL again, on one compiled statement', function () {
		var q = 'SELECT id, kidsOf2596(kids) AS below FROM ? ORDER BY id';
		alasql.fn.kidsOf2596 = kids => (kids.length ? alasql(q, [kids]) : []);
		var tree = {
			id: 1,
			kids: [
				{id: 2, kids: [{id: 4, kids: []}]},
				{id: 3, kids: []},
			],
		};
		var res;
		var n = compiles(() => (res = alasql(q, [[tree]])));
		assert.deepStrictEqual(res, [
			{
				id: 1,
				below: [
					{id: 2, below: [{id: 4, below: []}]},
					{id: 3, below: []},
				],
			},
		]);
		// the runs inside the first run share its compiled statement
		assert.strictEqual(n, 1);
	});

	it('F) The same with GROUP BY', function () {
		var q = 'SELECT a, SUM(b) AS s, inner2596(a) AS i FROM ? GROUP BY a';
		alasql.fn.inner2596 = a =>
			a < 2
				? alasql(q, [
						[
							{a: 9, b: 1},
							{a: 9, b: 2},
						],
					]).length
				: 0;
		var res;
		var n = compiles(
			() =>
				(res = alasql(q, [
					[
						{a: 1, b: 10},
						{a: 1, b: 5},
						{a: 2, b: 7},
					],
				]))
		);
		assert.deepStrictEqual(res, [
			{a: 1, s: 15, i: 1},
			{a: 2, s: 7, i: 0},
		]);
		assert.strictEqual(n, 1);
	});

	it('G) Two overlapping runs of the same cached SQL with an asynchronous source', async function () {
		var q = 'SELECT COLUMN x FROM SLOW2596(?, ?) ORDER BY x';
		var res = await Promise.all([
			alasql.promise(q, [30, {rows: [{x: 2}, {x: 1}]}]),
			alasql.promise(q, [10, {rows: [{x: 300}, {x: 100}, {x: 200}]}]),
		]);
		assert.deepStrictEqual(res, [
			[1, 2],
			[100, 200, 300],
		]);
	});

	it('H) Overlapping runs with other parameters: WHERE, LIMIT and a subquery', async function () {
		var q =
			'SELECT COLUMN x FROM SLOW2596(?, ?) WHERE x > ? AND x IN (SELECT COLUMN y FROM ?) ORDER BY x LIMIT ?';
		var rows = [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}];
		var ys = n => [1, 2, 3, 4, 5].filter(y => y !== n).map(y => ({y: y}));
		var res = await Promise.all([
			alasql.promise(q, [30, {rows: rows}, 1, ys(3), 2]),
			alasql.promise(q, [10, {rows: rows}, 2, ys(4), 3]),
			alasql.promise(q, [20, {rows: rows}, 0, ys(1), 1]),
		]);
		assert.deepStrictEqual(res, [[2, 4], [3, 5], [2]]);
	});

	it('I) A nested run with another modifier and other parameters', function () {
		var q = 'SELECT a, twice2596(a) AS t FROM ? WHERE a > ? ORDER BY a';
		alasql.fn.twice2596 = a => (a < 10 ? alasql(q, [[{a: a * 10}, {a: a * 100}], a * 50]) : null);
		assert.deepStrictEqual(alasql(q, [[{a: 1}, {a: 2}, {a: 3}], 1]), [
			{a: 2, t: [{a: 200, t: null}]},
			{a: 3, t: [{a: 300, t: null}]},
		]);
	});

	it('J) A cached statement holds no reference to the data of a run after it returns', function () {
		alasql('CREATE DATABASE test2596; USE test2596');
		try {
			alasql('CREATE TABLE one (a INT, b INT); CREATE TABLE two (a INT, c INT)');
			alasql('INSERT INTO two VALUES (1, 10), (2, 20)');
			var q =
				'SELECT one.a, SUM(two.c) AS s FROM ? AS one JOIN two ON one.a = two.a WHERE one.b > ? GROUP BY one.a ORDER BY one.a';
			var rows = [
				{a: 1, b: 5},
				{a: 2, b: 6},
			];
			var param = [rows, 0];
			var res = alasql(q, param);
			assert.deepStrictEqual(res, [
				{a: 1, s: 10},
				{a: 2, s: 20},
			]);
			var statement = cached(q);
			assert.ok(statement && statement.query);
			// Everything the compiled query and its sources hold themselves, a few levels deep
			var held = new Set();
			var walk = (v, depth) => {
				if (!v || typeof v !== 'object' || held.has(v) || depth > 4) return;
				if (v === alasql || v === alasql.databases.test2596) return;
				held.add(v);
				for (var key of Object.keys(v)) walk(v[key], depth + 1);
			};
			walk(statement.query, 0);
			var tableRows = alasql.databases.test2596.tables.two.data;
			[param, rows, rows[0], rows[1], res, res[0], tableRows, tableRows[0]].forEach((v, i) =>
				assert.ok(!held.has(v), 'the compiled query holds value ' + i)
			);
			assert.deepStrictEqual(statement.query.data, []);
			['params', 'scope', 'groups', 'xgroups', 'cb', 'queriesdata'].forEach(key =>
				assert.ok(!Object.keys(statement.query).includes(key), key)
			);
			statement.query.sources.forEach(source =>
				['data', 'ix', 'query', 'queriesdata'].forEach(key =>
					assert.ok(!Object.keys(source).includes(key), 'source.' + key)
				)
			);
		} finally {
			alasql('USE alasql; DROP DATABASE test2596');
		}
	});

	it('K) The lists of a compiled query do not grow from run to run', function () {
		var q = 'SELECT a FROM ? UNION ALL SELECT a FROM ? ORDER BY a';
		var data = [{a: 1}, {a: 2}];
		var first = alasql(q, [data, data]);
		var statement = cached(q);
		var sizes = () => [statement.query.removeKeys.length, statement.query.columns.length];
		var before = sizes();
		assert.deepStrictEqual(alasql(q, [data, data]), first);
		assert.deepStrictEqual(alasql(q, [data, data]), first);
		assert.deepStrictEqual(sizes(), before);

		var star = 'SELECT * FROM ?';
		alasql(star, [[{a: 1}]]);
		var columns = cached(star).query.columns.length;
		assert.deepStrictEqual(alasql('SELECT RECORDSET * FROM ?', [[{b: 1, c: 2}]]).columns, [
			{columnid: 'b'},
			{columnid: 'c'},
		]);
		alasql(star, [[{b: 1, c: 2}]]);
		assert.strictEqual(cached(star).query.columns.length, columns);
	});
});
