if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2316B'; // Numbers with an exponent are numbers, names starting with digits stay names

describe(`Test ${testId} - numbers with an exponent`, function () {
	it('A) Exponent forms are numbers', function () {
		assert.deepStrictEqual(
			alasql('SELECT 1e5 AS a, 2E3 AS b, 1.5e2 AS c, 1e-2 AS d, 3e+1 AS e, .5e1 AS f'),
			[{a: 100000, b: 2000, c: 150, d: 0.01, e: 30, f: 5}]
		);
	});

	it('B) An exponent in a WHERE clause', function () {
		assert.deepStrictEqual(alasql('SELECT x FROM ? WHERE x < 1e3', [[{x: 5}, {x: 5000}]]), [
			{x: 5},
		]);
	});

	it('C) Names that start with digits are still names (#1173, #1185)', function () {
		var data = [{'6minAvg': 1, '1e5x': 2, '50k': 3}];
		assert.deepStrictEqual(alasql('SELECT 6minAvg, 1e5x, 50k FROM ?', [data]), data);
	});
});
