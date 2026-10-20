if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

let testId = '1276'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - WITH using a CSV source`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	const csv = __dirname + '/test134.csv';

	it('A) SELECT from CSV source in a CTE with callback', function (done) {
		alasql(
			'WITH c AS (SELECT * FROM CSV(?, {headers:true})) SELECT * FROM c',
			[csv],
			function (res, err) {
				assert.ifError(err);
				assert.deepStrictEqual(res, [
					{a: 10, b: 'Ten'},
					{a: 20, b: 'Twenty'},
				]);
				done();
			}
		);
	});

	it('B) SELECT from CSV source in a CTE with promise', async function () {
		const res = await alasql.promise(
			'WITH c AS (SELECT * FROM CSV(?, {headers:true})) SELECT b FROM c WHERE a > 10',
			[csv]
		);
		assert.deepStrictEqual(res, [{b: 'Twenty'}]);
	});

	it('C) CTE referencing a previous CTE with a CSV source', async function () {
		const res = await alasql.promise(
			'WITH c AS (SELECT * FROM CSV(?, {headers:true})), d AS (SELECT a * 2 AS a2 FROM c) SELECT * FROM d',
			[csv]
		);
		assert.deepStrictEqual(res, [{a2: 20}, {a2: 40}]);
	});

	it('D) Temporary CTE tables are removed after the query', async function () {
		await alasql.promise('WITH c AS (SELECT * FROM CSV(?, {headers:true})) SELECT * FROM c', [csv]);
		assert.strictEqual(alasql.databases['test' + testId].tables.c, undefined);
	});

	it('E) Synchronous CTEs still return their result directly', function () {
		const res = alasql(
			'WITH c AS (SELECT 1 AS a UNION ALL SELECT 2 AS a), d AS (SELECT a * 10 AS b FROM c) SELECT SUM(b) AS s FROM d'
		);
		assert.deepStrictEqual(res, [{s: 30}]);
	});
});
