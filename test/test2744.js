if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2744 - UNION removes duplicates by key', function () {
	it('removes duplicates inside the second SELECT', function () {
		var res = alasql('SELECT * FROM ? UNION SELECT * FROM ?', [[{id: 2}], [{id: 1}, {id: 1}]]);
		assert.deepEqual(res, [{id: 1}, {id: 2}]);
	});

	it('keeps values of different types apart', function () {
		var res = alasql('SELECT * FROM ? UNION SELECT * FROM ?', [
			[{a: 1}, {a: '1'}],
			[{a: 1}, {a: null}],
		]);
		assert.deepEqual(res, [{a: 1}, {a: null}, {a: '1'}]);
	});

	it('compares dates by time and ignores the order of the keys', function () {
		var res = alasql('SELECT * FROM ? UNION SELECT * FROM ?', [
			[{d: new Date(1000), x: 1}],
			[
				{x: 1, d: new Date(1000)},
				{x: 1, d: new Date(2000)},
			],
		]);
		assert.equal(res.length, 2);
	});

	it('is fast on large inputs', function () {
		var tab = (from, n) =>
			Array.from({length: n}, (_, i) => ({id: from + i, val: 'v' + ((from + i) % 1000)}));
		var start = Date.now();
		var res = alasql('SELECT * FROM ? UNION SELECT * FROM ?', [tab(0, 8000), tab(6400, 8000)]);
		assert.equal(res.length, 14400);
		assert.ok(Date.now() - start < 1000);
	});
});
