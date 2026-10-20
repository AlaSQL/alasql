if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '744'; // ARRAY[...] keeps its elements in toString()

describe(`Test ${testId} - ARRAY[...] keeps its elements in toString()`, function () {
	it('A) toString() round trip', function () {
		var sql = "SELECT ARRAY[1, 'a', x + 1] AS arr FROM t";
		assert.strictEqual(alasql.parse(sql).toString(), sql);
	});

	it('B) Two arrays without an alias are two columns', function () {
		assert.deepStrictEqual(alasql('SELECT ARRAY[1, 2], ARRAY[3, 4] FROM ?', [[{x: 1}]]), [
			{'ARRAY[1, 2]': [1, 2], 'ARRAY[3, 4]': [3, 4]},
		]);
	});

	it('C) Two arrays in GROUP BY are two keys', function () {
		var data = [{a: 1}, {a: 2}];
		assert.deepStrictEqual(
			alasql('SELECT COUNT(*) AS n FROM ? GROUP BY ARRAY[a], ARRAY[1]', [data]),
			[{n: 1}, {n: 1}]
		);
	});
});
