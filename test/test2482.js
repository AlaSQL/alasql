if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2482 - MODE aggregate function', function () {
	it('1. Basic numbers mode', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 1}, {a: 2}, {a: 2}, {a: 3}]]);
		assert.deepStrictEqual(res, [{m: 2}]);
	});

	it('2. Single value', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 42}]]);
		assert.deepStrictEqual(res, [{m: 42}]);
	});

	it('3. Mode with tie breaking (smallest value)', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 3}, {a: 1}, {a: 3}, {a: 1}]]);
		assert.deepStrictEqual(res, [{m: 1}]);

		var resOrder = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 2}, {a: 1}, {a: 1}, {a: 2}]]);
		assert.deepStrictEqual(resOrder, [{m: 1}]);
	});

	it('4. Mode with strings and string ties', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [
			[{a: 'apple'}, {a: 'banana'}, {a: 'apple'}, {a: 'orange'}],
		]);
		assert.deepStrictEqual(res, [{m: 'apple'}]);

		// Lexicographical tie breaking: 'a' < 'b'
		var resTie = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 'b'}, {a: 'a'}, {a: 'a'}, {a: 'b'}]]);
		assert.deepStrictEqual(resTie, [{m: 'a'}]);
	});

	it('5. Mode ignores NULL and undefined values when other values exist', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: null}, {a: 5}, {a: undefined}, {a: 5}]]);
		assert.deepStrictEqual(res, [{m: 5}]);

		var resMixed = alasql('SELECT MODE(a) AS m FROM ?', [[{a: null}, {a: 2}, {a: 2}, {a: 3}]]);
		assert.deepStrictEqual(resMixed, [{m: 2}]);
	});

	it('6. All NULLs or undefined', function () {
		var resNull = alasql('SELECT MODE(a) AS m FROM ?', [[{a: null}, {a: null}]]);
		assert.deepStrictEqual(resNull, [{m: undefined}]);

		var resUndefined = alasql('SELECT MODE(a) AS m FROM ?', [[{a: undefined}, {a: undefined}]]);
		assert.deepStrictEqual(resUndefined, [{m: undefined}]);

		var resMixed = alasql('SELECT MODE(a) AS m FROM ?', [[{a: null}, {a: undefined}]]);
		assert.deepStrictEqual(resMixed, [{m: undefined}]);
	});

	it('7. Boolean values and boolean ties', function () {
		var resTrue = alasql('SELECT MODE(a) AS m FROM ?', [[{a: true}, {a: false}, {a: true}]]);
		assert.deepStrictEqual(resTrue, [{m: true}]);

		var resFalse = alasql('SELECT MODE(a) AS m FROM ?', [[{a: false}, {a: true}, {a: false}]]);
		assert.deepStrictEqual(resFalse, [{m: false}]);

		// Tie breaking between booleans: false < true
		var resTie = alasql('SELECT MODE(a) AS m FROM ?', [[{a: true}, {a: false}]]);
		assert.deepStrictEqual(resTie, [{m: false}]);
	});

	it('8. Strict Equality / Mixed Types', function () {
		// 1 and '1' are treated as distinct types
		var resNum = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 1}, {a: '1'}, {a: 1}]]);
		assert.deepStrictEqual(resNum, [{m: 1}]);

		var resStr = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 1}, {a: '1'}, {a: '1'}]]);
		assert.deepStrictEqual(resStr, [{m: '1'}]);

		// 0 vs false
		var resZero = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 0}, {a: false}, {a: 0}]]);
		assert.deepStrictEqual(resZero, [{m: 0}]);

		// true vs 'true'
		var resBoolStr = alasql('SELECT MODE(a) AS m FROM ?', [[{a: true}, {a: 'true'}, {a: true}]]);
		assert.deepStrictEqual(resBoolStr, [{m: true}]);
	});

	it('9. Negative Numbers and Floats', function () {
		var resNeg = alasql('SELECT MODE(a) AS m FROM ?', [[{a: -10}, {a: -20}, {a: -10}, {a: -30}]]);
		assert.deepStrictEqual(resNeg, [{m: -10}]);

		var resFloat = alasql('SELECT MODE(a) AS m FROM ?', [
			[{a: 1.5}, {a: 2.25}, {a: 1.5}, {a: 3.75}],
		]);
		assert.deepStrictEqual(resFloat, [{m: 1.5}]);

		var resNegFloat = alasql('SELECT MODE(a) AS m FROM ?', [
			[{a: -3.14}, {a: 2.71}, {a: -3.14}, {a: -0.5}],
		]);
		assert.deepStrictEqual(resNegFloat, [{m: -3.14}]);

		// Negative number tie breaking: -10 < -5
		var resNegTie = alasql('SELECT MODE(a) AS m FROM ?', [[{a: -5}, {a: -10}, {a: -5}, {a: -10}]]);
		assert.deepStrictEqual(resNegTie, [{m: -10}]);
	});

	it('10. Date values', function () {
		var dates = [{d: '2024-01-01'}, {d: '2024-02-01'}, {d: '2024-01-01'}, {d: '2024-03-01'}];
		var res = alasql('SELECT MODE(d) AS m FROM ?', [dates]);
		assert.deepStrictEqual(res, [{m: '2024-01-01'}]);
	});

	it('11. Mode with GROUP BY', function () {
		var data = [
			{g: 1, v: 10},
			{g: 1, v: 20},
			{g: 1, v: 20},
			{g: 2, v: 30},
			{g: 2, v: 30},
			{g: 2, v: 40},
			{g: 3, v: null},
			{g: 3, v: undefined},
			{g: 4, v: 'tie-b'},
			{g: 4, v: 'tie-a'},
		];
		var res = alasql('SELECT g, MODE(v) AS m FROM ? GROUP BY g ORDER BY g', [data]);
		assert.deepStrictEqual(res, [
			{g: 1, m: 20},
			{g: 2, m: 30},
			{g: 3, m: undefined},
			{g: 4, m: 'tie-a'},
		]);
	});

	it('12. Empty input returns undefined/null', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[]]);
		assert.deepStrictEqual(res, [{m: undefined}]);
	});

	it('13. Case sensitivity / aliases: mode and MODE resolve identically', function () {
		var data = [{a: 1}, {a: 2}, {a: 2}];
		var resUpper = alasql('SELECT MODE(a) AS m FROM ?', [data]);
		var resLower = alasql('SELECT mode(a) AS m FROM ?', [data]);
		assert.deepStrictEqual(resUpper, [{m: 2}]);
		assert.deepStrictEqual(resLower, [{m: 2}]);
		assert.deepStrictEqual(resUpper, resLower);
	});

	it('14. Direct aggregate function lifecycle (stages 1, 2, 3, and unknown stage)', function () {
		var fn = alasql.aggr.MODE;
		// Stage 1: initialization
		var s = fn(10, undefined, 1);
		assert.strictEqual(s.maxCount, 1);
		assert.strictEqual(s.counts.get(10), 1);

		// Stage 2: accumulation
		s = fn(20, s, 2);
		s = fn(20, s, 2);
		assert.strictEqual(s.maxCount, 2);
		assert.strictEqual(s.counts.get(20), 2);

		// Stage 2: null values ignored
		s = fn(null, s, 2);
		s = fn(undefined, s, 2);

		// Stage 3: finalization
		var result = fn(undefined, s, 3);
		assert.strictEqual(result, 20);

		// Stage 3: with all null accumulator
		var nullAcc = fn(null, undefined, 1);
		assert.strictEqual(fn(undefined, nullAcc, 3), undefined);

		// Unknown stage returns undefined
		assert.strictEqual(fn(10, s, 99), undefined);
	});
});
