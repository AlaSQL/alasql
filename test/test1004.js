if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for issue #1004 - joinstar option not working with inline data
// Related to issue #547
//
// The joinstar option controls how columns are named when using SELECT * with JOINs:
// - 'overwrite' (default): Later columns overwrite earlier ones with same name
// - 'underscore': Columns are prefixed with table alias (e.g., a_col, b_col)
// - 'json': Results are nested objects by table alias (e.g., {a: {...}, b: {...}})

describe('Test 1004 - JOINSTAR with inline data (FROM ?)', function () {
	var test = 1004;

	after(function () {
		alasql.options.joinstar = 'overwrite';
	});

	it('1. UNDERSCORE JOINSTAR with inline data', () => {
		var data = [{dep: 'A', qt: 10, price: 5, extra: 1}];
		var data2 = [{dep: 'B', qt: 2, price: 5}];
		alasql.options.joinstar = 'underscore';
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);
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
		// Expected: later columns overwrite earlier ones
		assert.deepEqual(res, [{dep: 'B', qt: 2, price: 5, extra: 1}]);
	});

	it('4. UNDERSCORE JOINSTAR with multiple rows', () => {
		var data = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];
		var data2 = [
			{id: 10, dept: 'Sales'},
			{id: 20, dept: 'IT'},
		];
		alasql.options.joinstar = 'underscore';
		var res = alasql('SELECT * FROM ? as users JOIN ? as depts', [data, data2]);
		// Cartesian product with underscore prefixes
		assert.deepEqual(res, [
			{users_id: 1, users_name: 'Alice', depts_id: 10, depts_dept: 'Sales'},
			{users_id: 1, users_name: 'Alice', depts_id: 20, depts_dept: 'IT'},
			{users_id: 2, users_name: 'Bob', depts_id: 10, depts_dept: 'Sales'},
			{users_id: 2, users_name: 'Bob', depts_id: 20, depts_dept: 'IT'},
		]);
	});

	it('5. JSON JOINSTAR with multiple rows', () => {
		var data = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];
		var data2 = [
			{id: 10, dept: 'Sales'},
			{id: 20, dept: 'IT'},
		];
		alasql.options.joinstar = 'json';
		var res = alasql('SELECT * FROM ? as users JOIN ? as depts', [data, data2]);
		// Cartesian product with nested objects
		assert.deepEqual(res, [
			{users: {id: 1, name: 'Alice'}, depts: {id: 10, dept: 'Sales'}},
			{users: {id: 1, name: 'Alice'}, depts: {id: 20, dept: 'IT'}},
			{users: {id: 2, name: 'Bob'}, depts: {id: 10, dept: 'Sales'}},
			{users: {id: 2, name: 'Bob'}, depts: {id: 20, dept: 'IT'}},
		]);
	});

	it('6. UNDERSCORE JOINSTAR with three-way join', () => {
		var data1 = [{id: 1}];
		var data2 = [{val: 'A'}];
		var data3 = [{num: 100}];
		alasql.options.joinstar = 'underscore';
		var res = alasql('SELECT * FROM ? as t1 JOIN ? as t2 JOIN ? as t3', [data1, data2, data3]);
		assert.deepEqual(res, [{t1_id: 1, t2_val: 'A', t3_num: 100}]);
	});

	it('7. JSON JOINSTAR with three-way join', () => {
		var data1 = [{id: 1}];
		var data2 = [{val: 'A'}];
		var data3 = [{num: 100}];
		alasql.options.joinstar = 'json';
		var res = alasql('SELECT * FROM ? as t1 JOIN ? as t2 JOIN ? as t3', [data1, data2, data3]);
		assert.deepEqual(res, [{t1: {id: 1}, t2: {val: 'A'}, t3: {num: 100}}]);
	});

	it('8. Cache invalidation when switching joinstar modes', () => {
		var data = [{a: 1}];
		var data2 = [{b: 2}];

		// First query with underscore mode
		alasql.options.joinstar = 'underscore';
		var res1 = alasql('SELECT * FROM ? as x JOIN ? as y', [data, data2]);
		assert.deepEqual(res1, [{x_a: 1, y_b: 2}]);

		// Same query with json mode should not use cached version
		alasql.options.joinstar = 'json';
		var res2 = alasql('SELECT * FROM ? as x JOIN ? as y', [data, data2]);
		assert.deepEqual(res2, [{x: {a: 1}, y: {b: 2}}]);

		// Same query with overwrite mode
		alasql.options.joinstar = 'overwrite';
		var res3 = alasql('SELECT * FROM ? as x JOIN ? as y', [data, data2]);
		assert.deepEqual(res3, [{a: 1, b: 2}]);
	});

	it('9. UNDERSCORE JOINSTAR with empty result', () => {
		var data = [{id: 1}];
		var data2 = [];
		alasql.options.joinstar = 'underscore';
		var res = alasql('SELECT * FROM ? as a JOIN ? as b', [data, data2]);
		assert.deepEqual(res, []);
	});

	it('10. JSON JOINSTAR with special characters in column names', () => {
		var data = [{'col-name': 'A', 'col.name': 'B'}];
		var data2 = [{col_name: 'C'}];
		alasql.options.joinstar = 'json';
		var res = alasql('SELECT * FROM ? as t1 JOIN ? as t2', [data, data2]);
		assert.deepEqual(res, [{t1: {'col-name': 'A', 'col.name': 'B'}, t2: {col_name: 'C'}}]);
	});
});
