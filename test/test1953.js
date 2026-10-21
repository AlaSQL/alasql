if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1953'; // Two runs of the same SQL text at the same time, with the statement cache on

describe(`Test ${testId} - the same SQL text running twice at once`, function () {
	var fs = require('fs');
	var os = require('os');
	var path = require('path');
	var dir;

	before(function () {
		dir = fs.mkdtempSync(path.join(os.tmpdir(), 'alasql-1953-'));
		fs.writeFileSync(path.join(dir, 'a.json'), JSON.stringify([{n: 'a'}]));
		fs.writeFileSync(path.join(dir, 'b.json'), JSON.stringify([{n: 'b'}, {n: 'c'}]));
	});

	after(function () {
		fs.rmSync(dir, {recursive: true, force: true});
	});

	it('A) Two overlapping runs with an asynchronous source both settle', async function () {
		alasql.from.SLOW1953 = function (ms, opts, cb, idx, query) {
			setTimeout(() => cb && cb(opts.rows, idx, query), ms);
			return null;
		};
		var sql = 'SELECT COLUMN x FROM SLOW1953(?, ?) ORDER BY x';
		var res = await Promise.all([
			alasql.promise(sql, [30, {rows: [{x: 1}, {x: 2}]}]),
			alasql.promise(sql, [10, {rows: [{x: 100}, {x: 200}, {x: 300}]}]),
		]);
		assert.deepStrictEqual(res, [
			[1, 2],
			[100, 200, 300],
		]);
	});

	it('B) Promise.all over two files with the same query (the report in #1953)', async function () {
		var sql = 'SELECT * FROM JSON(?)';
		var res = await Promise.all([
			alasql.promise(sql, [path.join(dir, 'a.json')]),
			alasql.promise(sql, [path.join(dir, 'b.json')]),
		]);
		assert.deepStrictEqual(res, [[{n: 'a'}], [{n: 'b'}, {n: 'c'}]]);
	});

	it('C) A user function that runs the same query again', function () {
		var tree = {
			id: 1,
			kids: [
				{id: 2, kids: [{id: 4, kids: []}]},
				{id: 3, kids: []},
			],
		};
		var sql = 'SELECT id, kidsOf1953(kids) AS below FROM ? ORDER BY id';
		alasql.fn.kidsOf1953 = kids => (kids.length ? alasql(sql, [kids]) : []);
		assert.deepStrictEqual(alasql(sql, [[tree]]), [
			{
				id: 1,
				below: [
					{id: 2, below: [{id: 4, below: []}]},
					{id: 3, below: []},
				],
			},
		]);
	});

	it('D) The same with GROUP BY', function () {
		var sql = 'SELECT a, SUM(b) AS s, inner1953(a) AS i FROM ? GROUP BY a';
		alasql.fn.inner1953 = a =>
			a < 2
				? alasql(sql, [
						[
							{a: 9, b: 1},
							{a: 9, b: 2},
						],
					]).length
				: 0;
		assert.deepStrictEqual(
			alasql(sql, [
				[
					{a: 1, b: 10},
					{a: 1, b: 5},
					{a: 2, b: 7},
				],
			]),
			[
				{a: 1, s: 15, i: 1},
				{a: 2, s: 7, i: 0},
			]
		);
	});

	it('E) The cache keeps no result data once a run has finished', async function () {
		var sql = 'SELECT COLUMN x FROM SLOW1953(?, ?)';
		await alasql.promise(sql, [5, {rows: [{x: 7}]}]);
		var db = alasql.databases[alasql.useid];
		var statement = Object.keys(db.sqlCache)
			.filter(k => k.startsWith(sql + '|'))
			.map(k => db.sqlCache[k])[0];
		assert.deepStrictEqual(statement.query.data, []);
		assert.strictEqual(statement.running, 0);
	});
});
