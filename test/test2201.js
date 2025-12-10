if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2201 - JSON with negative numbers', function () {
	const test = '2201';

	it('A) JSON array with negative numbers in objects', function () {
		var res = alasql('SELECT * FROM @[{delay:5},{delay:-7}]');
		assert.deepEqual(res, [{delay: 5}, {delay: -7}]);
	});

	it('B) JSON object with negative number property', function () {
		var res = alasql('SELECT VALUE @{a:-5}');
		assert.deepEqual(res, {a: -5});
	});

	it('C) JSON array with multiple negative numbers', function () {
		var res = alasql('SELECT * FROM @[{x:-1,y:-2},{x:-3,y:-4}]');
		assert.deepEqual(res, [
			{x: -1, y: -2},
			{x: -3, y: -4},
		]);
	});

	it('D) JSON with mix of positive and negative numbers', function () {
		var res = alasql('SELECT * FROM @[{a:10,b:-10},{a:-5,b:5}]');
		assert.deepEqual(res, [
			{a: 10, b: -10},
			{a: -5, b: 5},
		]);
	});

	it('E) JSON with negative decimal numbers', function () {
		var res = alasql('SELECT * FROM @[{val:-3.14},{val:-2.5}]');
		assert.deepEqual(res, [{val: -3.14}, {val: -2.5}]);
	});

	it('F) Array literals with negative numbers', function () {
		var res = alasql('SELECT @[-1.7,-2,-3] AS arr');
		assert.deepEqual(res, [{arr: [-1.7, -2, -3]}]);
	});

	it('G) Nested JSON with negative numbers', function () {
		var res = alasql('SELECT VALUE @{"outer":{"inner":-3.3}}');
		assert.deepEqual(res, {outer: {inner: -3.3}});
	});

	it('H) Nested object in array with negative numbers', function () {
		var res = alasql('SELECT * FROM @[{"data":{"value":-10.5}}]');
		assert.deepEqual(res, [{data: {value: -10.5}}]);
	});
});
