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
});
