if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2590'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - INSERT without column list keeps NULL in numeric columns`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	const types = ['INT', 'FLOAT', 'NUMBER', 'MONEY', 'INTEGER', 'DECIMAL', 'REAL', 'STRING', 'DATE'];

	types.forEach(function (type, i) {
		it(`A${i}) ${type}: NULL literal, null parameter and column list all store NULL`, function () {
			const t = 'tlit' + i;
			alasql(`create table ${t} (a INT, b ${type})`);
			alasql(`insert into ${t} values (1, NULL)`);
			alasql(`insert into ${t} values (?, ?)`, [2, null]);
			alasql(`insert into ${t} (a, b) values (3, NULL)`);
			// NULL may be stored as undefined or null; it must not become NaN or 0
			const res = alasql.tables[t].data.map(r => r.b == null);
			assert.deepStrictEqual(res, [true, true, true]);
		});
	});

	it('B) Stored NULL behaves as NULL in queries', function () {
		alasql('create table t (a INT, b INT)');
		alasql('insert into t values (1, NULL), (2, 3)');
		const res = [
			alasql('select a, b from t'),
			alasql('select count(b) as n from t'),
			alasql('select a from t where b is null'),
		];
		assert.deepStrictEqual(res, [
			[
				{a: 1, b: undefined},
				{a: 2, b: 3},
			],
			[{n: 1}],
			[{a: 1}],
		]);
	});

	it('C) Non-NULL values are still converted to numbers', function () {
		alasql('create table conv (a INT, b FLOAT, c MONEY)');
		alasql("insert into conv values ('7', '1.5', 0)");
		alasql('insert into conv values (?, ?, ?)', ['8', '2.5', 0]);
		assert.deepStrictEqual(alasql.tables.conv.data, [
			{a: 7, b: 1.5, c: 0},
			{a: 8, b: 2.5, c: 0},
		]);
	});

	it('D) NULL in a numeric NOT NULL column is rejected', function () {
		alasql('create table nn (a INT NOT NULL, b CHAR(2) NOT NULL, c FLOAT NOT NULL)');
		assert.throws(() => alasql("insert into nn values (NULL, 'x', 1)"), /NOT NULL column a/);
		assert.throws(() => alasql("insert into nn values (1, 'x', NULL)"), /NOT NULL column c/);
		assert.throws(
			() => alasql('insert into nn values (?, ?, ?)', [null, 'x', 1]),
			/NOT NULL column a/
		);
		assert.deepStrictEqual(alasql.tables.nn.data, []);
	});
});
