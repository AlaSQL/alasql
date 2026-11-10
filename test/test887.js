if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '887'; // HAVING may use a SELECT alias

describe(`Test ${testId} - HAVING may use a SELECT alias`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (a INT, b INT, cnt INT)');
		alasql('INSERT INTO t VALUES (1, 1, 0), (1, 2, 0), (2, 3, 100)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) An alias of an aggregate', function () {
		assert.deepStrictEqual(alasql('SELECT a, COUNT(*) AS n FROM t GROUP BY a HAVING n > 1'), [
			{a: 1, n: 2},
		]);
	});

	it('B) An alias in an expression, next to a plain aggregate', function () {
		assert.deepStrictEqual(
			alasql('SELECT a, SUM(b) AS s FROM t GROUP BY a HAVING s + 1 > 3 AND COUNT(*) = 2'),
			[{a: 1, s: 3}]
		);
	});

	it('C) An alias of a grouped column', function () {
		assert.deepStrictEqual(alasql('SELECT a AS x, COUNT(*) AS n FROM t GROUP BY a HAVING x = 2'), [
			{x: 2, n: 1},
		]);
	});

	it('D) A column of the table is not replaced by an alias of the same name', function () {
		// SQLite reads cnt from a row of the group here and keeps a = 2
		var res = alasql('SELECT a, COUNT(*) AS cnt FROM t GROUP BY a HAVING cnt > 1');
		assert.notDeepStrictEqual(res, [{a: 1, cnt: 2}]);
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS cnt FROM t GROUP BY a HAVING MAX(cnt) > 1'),
			[{a: 2, cnt: 1}]
		);
	});

	it('E) The alias inside an aggregate is the table column', function () {
		assert.deepStrictEqual(alasql('SELECT a, SUM(b) AS b FROM t GROUP BY a HAVING SUM(b) > 3'), []);
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS n FROM t GROUP BY a HAVING SUM(n) > 0'),
			[]
		);
	});

	it('F) The same statement gives the same result on every run', function () {
		var sql = 'SELECT a, COUNT(*) AS n FROM t GROUP BY a HAVING n > 1';
		alasql(sql);
		assert.deepStrictEqual(alasql(sql), [{a: 1, n: 2}]);
		var compiled = alasql.compile(sql);
		assert.deepStrictEqual(compiled(), [{a: 1, n: 2}]);
		assert.deepStrictEqual(compiled(), [{a: 1, n: 2}]);
	});

	it('G) Data without column definitions', function () {
		var data = [{c: 'x'}, {c: 'x'}, {c: 'y'}];
		assert.deepStrictEqual(
			alasql('SELECT c, COUNT(*) AS n FROM ? GROUP BY c HAVING n >= 2', [data]),
			[{c: 'x', n: 2}]
		);
	});
});
