if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2823'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - VALUES as a query`, function () {
	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) VALUES as a statement', function () {
		assert.deepStrictEqual(alasql('VALUES (1, 2), (3, 4)'), [
			{column1: 1, column2: 2},
			{column1: 3, column2: 4},
		]);
	});

	it('B) FROM (VALUES ...) AS v (a, b)', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM (VALUES (1, 2), (3, 4)) AS v (a, b)'), [
			{a: 1, b: 2},
			{a: 3, b: 4},
		]);
	});

	it('C) FROM (VALUES ...) AS v without names', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM (VALUES (1, 2)) AS v'), [
			{column1: 1, column2: 2},
		]);
	});

	it('D) expressions, qualified columns and WHERE', function () {
		assert.deepStrictEqual(
			alasql('select v.a + 1 as x from (values (1, 2), (3, 4)) v(a, b) where b > 2'),
			[{x: 4}]
		);
	});

	it('E) the example from the issue', function () {
		assert.deepStrictEqual(alasql('SELECT x FROM (VALUES (-2.5), (-1.5)) t(x)'), [
			{x: -2.5},
			{x: -1.5},
		]);
	});

	it('F) two VALUES tables joined by a comma', function () {
		assert.deepStrictEqual(
			alasql(
				"SELECT v.s, w.t FROM (VALUES (1, 'a'), (2, 'b')) v(n, s), (VALUES (2, 'x')) w(n, t) WHERE v.n = w.n"
			),
			[{s: 'b', t: 'x'}]
		);
	});
});
