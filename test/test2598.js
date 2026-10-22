if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2598'; // Issue #2598: v5: SUBSTRING with a start of zero or below follows SQLite

describe(`Test ${testId} - SUBSTRING SQLite & MySQL behavior`, function () {
	it('A) SQLite SUBSTRING behavior for zero and negative start', function () {
		const res = alasql(
			"SELECT " +
				"SUBSTRING('abcdef', 1, 3) AS a, " +
				"SUBSTRING('abcdef', 0, 3) AS b, " +
				"SUBSTRING('abcdef', -1, 3) AS c, " +
				"SUBSTRING('abcdef', -2) AS d, " +
				"SUBSTRING('abcdef', -2, 1) AS e, " +
				"SUBSTRING('abcdef', -7, 3) AS f, " +
				"SUBSTRING(12345, 2, 2) AS g"
		);
		assert.deepStrictEqual(res, [
			{
				a: 'abc',
				b: 'ab',
				c: 'f',
				d: 'ef',
				e: 'e',
				f: 'ab',
				g: '23',
			},
		]);
	});

	it('B) Support standard SQL FROM and FOR syntax', function () {
		const res = alasql(
			"SELECT " +
				"SUBSTRING('abcdef' FROM 2 FOR 3) AS a, " +
				"SUBSTRING('abcdef' FROM 2) AS b"
		);
		assert.deepStrictEqual(res, [{ a: 'bcd', b: 'bcdef' }]);
	});

	it('C) Handle NULL values across all arguments', function () {
		const res = alasql(
			"SELECT " +
				"SUBSTRING(NULL, 1, 2) AS a, " +
				"SUBSTRING('abcdef', NULL, 2) AS b, " +
				"SUBSTRING('abcdef', 1, NULL) AS c, " +
				"SUBSTRING(?, 1, 2) AS d",
			[null]
		);
		assert.deepStrictEqual(res, [
			{
				a: undefined,
				b: undefined,
				c: undefined,
				d: undefined,
			},
		]);
	});

	it('D) Allow SUBSTRING as column alias', function () {
		const res = alasql('SELECT 1 AS substring');
		assert.deepStrictEqual(res, [{ substring: 1 }]);
	});

	it('E) Follow MySQL behavior when sqlite mode is disabled', function () {
		const prevMysql = alasql.options.mysql;
		const prevSqlite = alasql.options.sqlite;
		try {
			alasql.options.mysql = true;
			alasql.options.sqlite = false;
			const res = alasql(
				"SELECT " +
					"SUBSTRING('abcdef', 0, 3) AS zero, " +
					"SUBSTRING('abcdef', -7, 3) AS beyondStart, " +
					"SUBSTRING('abcdef', -1, 3) AS negative, " +
					"SUBSTRING('abcdef', -2) AS negativeTwo"
			);
			assert.deepStrictEqual(res, [
				{ zero: '', beyondStart: '', negative: 'f', negativeTwo: 'ef' },
			]);
		} finally {
			alasql.options.mysql = prevMysql;
			alasql.options.sqlite = prevSqlite;
		}
	});
});
