if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for issue #547 - JOIN should return fields from both tables

describe('Test 547 - JOIN with duplicate column names', function () {
	after(function () {
		// Restore default joinstar option
		alasql.options.joinstar = 'overwrite';
	});

	it('1. OVERWRITE mode (default) - later columns overwrite earlier ones', function () {
		alasql.options.joinstar = 'overwrite';

		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];

		// JOIN without ON clause produces cartesian product (1 row × 1 row = 1 row)
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);

		// With overwrite mode, duplicate columns (dep, qt, price) should be overwritten by b's values
		// Non-duplicate column (extra) should be preserved from a
		assert.deepEqual(res, [{dep: 'B', qt: 2, price: 5, extra: 1}]);
	});

	it('2. JSON mode - nested objects by table alias', function () {
		alasql.options.joinstar = 'json';

		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];

		// JOIN without ON clause produces cartesian product (1 row × 1 row = 1 row)
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);

		// With json mode, each table's data should be nested under its alias
		assert.deepEqual(res, [
			{
				a: {dep: 'A', qt: 10, price: 5, extra: 1},
				b: {dep: 'B', qt: 2, price: 5},
			},
		]);
	});

	it('3. UNDERSCORE mode - prefix columns with table alias', function () {
		alasql.options.joinstar = 'underscore';

		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];

		// JOIN without ON clause produces cartesian product (1 row × 1 row = 1 row)
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);

		// With underscore mode, columns should be prefixed with their table alias
		assert.deepEqual(res, [
			{
				a_dep: 'A',
				a_qt: 10,
				a_price: 5,
				a_extra: 1,
				b_dep: 'B',
				b_qt: 2,
				b_price: 5,
			},
		]);
	});

	it('4. OVERWRITE mode with CROSS JOIN', function () {
		alasql.options.joinstar = 'overwrite';

		var data = [{a: 1}, {a: 2}];
		var data2 = [{a: 10}, {a: 20}];

		var res = alasql('SELECT * FROM ? as one, ? as two', [data, data2]);

		// Cartesian product with overwrite - column 'a' from 'two' overwrites 'a' from 'one'
		assert.deepEqual(res, [{a: 10}, {a: 20}, {a: 10}, {a: 20}]);
	});

	it('5. JSON mode with CROSS JOIN', function () {
		alasql.options.joinstar = 'json';

		var data = [{a: 1}, {a: 2}];
		var data2 = [{a: 10}, {a: 20}];

		var res = alasql('SELECT * FROM ? as one, ? as two', [data, data2]);

		// Cartesian product with nested objects
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
	});

	it('6. UNDERSCORE mode with CROSS JOIN', function () {
		alasql.options.joinstar = 'underscore';

		var data = [{a: 1}, {a: 2}];
		var data2 = [{a: 10}, {a: 20}];

		var res = alasql('SELECT * FROM ? as one, ? as two', [data, data2]);

		// Cartesian product with prefixed columns
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
	});

	it('7. Mixed columns - some shared, some unique', function () {
		alasql.options.joinstar = 'json';

		var data = [{id: 1, name: 'Alice', age: 30}];
		var data2 = [{id: 2, name: 'Bob', salary: 50000}];

		// JOIN without ON clause produces cartesian product (1 row × 1 row = 1 row)
		var res = alasql('SELECT * FROM ? as employees JOIN ? as contractors', [data, data2]);

		// Both tables have 'id' and 'name', but different other columns
		assert.deepEqual(res, [
			{
				employees: {id: 1, name: 'Alice', age: 30},
				contractors: {id: 2, name: 'Bob', salary: 50000},
			},
		]);
	});

	it('8. UNDERSCORE mode with mixed columns', function () {
		alasql.options.joinstar = 'underscore';

		var data = [{id: 1, name: 'Alice', age: 30}];
		var data2 = [{id: 2, name: 'Bob', salary: 50000}];

		// JOIN without ON clause produces cartesian product (1 row × 1 row = 1 row)
		var res = alasql('SELECT * FROM ? as employees JOIN ? as contractors', [data, data2]);

		// All columns prefixed with table alias
		assert.deepEqual(res, [
			{
				employees_id: 1,
				employees_name: 'Alice',
				employees_age: 30,
				contractors_id: 2,
				contractors_name: 'Bob',
				contractors_salary: 50000,
			},
		]);
	});
});
