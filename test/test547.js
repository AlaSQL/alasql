if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for issue #547 - joinstar option not working with inline data

describe('Test 547 - JOINSTAR with inline data (FROM ?)', function () {
	var test = 547;

	after(function () {
		alasql.options.joinstar = 'overwrite';
	});

	it('1. UNDERSCORE JOINSTAR with inline data', () => {
		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];
		alasql.options.joinstar = 'underscore';
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);
		console.log('Result:', JSON.stringify(res));
		// Expected: columns prefixed with table aliases
		assert.deepEqual(res, [
			{a_dep: 'A', a_qt: 10, a_price: 5, a_extra: 1, b_dep: 'B', b_qt: 2, b_price: 5},
		]);
	});

	it('2. JSON JOINSTAR with inline data', () => {
		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];
		alasql.options.joinstar = 'json';
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);
		console.log('Result:', JSON.stringify(res));
		// Expected: nested objects by table alias
		assert.deepEqual(res, [
			{
				a: {dep: 'A', qt: 10, price: 5, extra: 1},
				b: {dep: 'B', qt: 2, price: 5},
			},
		]);
	});

	it('3. OVERWRITE JOINSTAR with inline data (default behavior)', () => {
		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];
		alasql.options.joinstar = 'overwrite';
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);
		console.log('Result:', JSON.stringify(res));
		// Expected: later columns overwrite earlier ones
		assert.deepEqual(res, [{dep: 'B', qt: 2, price: 5, extra: 1}]);
	});
});
