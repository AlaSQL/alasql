if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 125B - ORDER BY with numeric column reference', function () {
	it('1. ORDER BY 1 with simple SELECT', function (done) {
		var data = [
			{name: 'John', age: 30, city: 'New York'},
			{name: 'Jane', age: 25, city: 'Boston'},
			{name: 'Bob', age: 35, city: 'Chicago'},
		];

		var res = alasql('SELECT name, age, city FROM ? ORDER BY 1', [data]);
		assert.deepEqual(res, [
			{name: 'Bob', age: 35, city: 'Chicago'},
			{name: 'Jane', age: 25, city: 'Boston'},
			{name: 'John', age: 30, city: 'New York'},
		]);
		done();
	});

	it('2. ORDER BY 2 DESC with simple SELECT', function (done) {
		var data = [
			{name: 'John', age: 30, city: 'New York'},
			{name: 'Jane', age: 25, city: 'Boston'},
			{name: 'Bob', age: 35, city: 'Chicago'},
		];

		var res = alasql('SELECT name, age, city FROM ? ORDER BY 2 DESC', [data]);
		assert.deepEqual(res, [
			{name: 'Bob', age: 35, city: 'Chicago'},
			{name: 'John', age: 30, city: 'New York'},
			{name: 'Jane', age: 25, city: 'Boston'},
		]);
		done();
	});

	it('3. ORDER BY 1, 2 with multiple columns', function (done) {
		var data = [
			{name: 'John', age: 30, city: 'New York'},
			{name: 'Jane', age: 25, city: 'Boston'},
			{name: 'John', age: 25, city: 'Chicago'},
		];

		var res = alasql('SELECT name, age FROM ? ORDER BY 1, 2', [data]);
		assert.deepEqual(res, [
			{name: 'Jane', age: 25},
			{name: 'John', age: 25},
			{name: 'John', age: 30},
		]);
		done();
	});

	it('4. ORDER BY 1 with SELECT *', function (done) {
		var data = [
			{name: 'John', age: 30},
			{name: 'Jane', age: 25},
			{name: 'Bob', age: 35},
		];

		var res = alasql('SELECT * FROM ? ORDER BY 1', [data]);
		assert.deepEqual(res, [
			{name: 'Bob', age: 35},
			{name: 'Jane', age: 25},
			{name: 'John', age: 30},
		]);
		done();
	});
});
