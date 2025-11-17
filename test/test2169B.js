if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var {compileToJS} = require('../dist/precompile');
}

describe('Test 2169B - compileToJS function', function () {
	const testId = '2169B';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) compileToJS should generate working JavaScript code', function () {
		// Test data
		const data = [
			{product: 'Ball', price: 3},
			{product: 'Pen', price: 1.5},
			{product: 'Book', price: 5},
			{product: 'Pencil', price: 2},
		];

		const sql =
			'SELECT product, price*100 AS calculated_price FROM ? where price > ? ORDER BY calculated_price DESC';

		// Test compileToJS
		const jsCode = compileToJS(sql);

		const compiledFn = new Function('return ' + jsCode)().bind(alasql);
		const result = compiledFn([data, 2]);

		const correctResult = alasql(sql, [data, 2]);

		assert.deepEqual(
			result,
			correctResult,
			'Compiled function should return same result as direct execution'
		);

		// Verify expected result
		const expected = [
			{product: 'Book', calculated_price: 500},
			{product: 'Ball', calculated_price: 300},
		];
		assert.deepEqual(result, expected, 'Should return correct filtered and sorted results');
	});

	it('B) compileToJS should work with database tables', function () {
		// Create test table
		alasql('create table testproducts (product string, price number)');
		alasql('insert into testproducts values ("Ball", 3), ("Pen", 1.5), ("Book", 5), ("Pencil", 2)');

		const sql =
			'SELECT product, price*100 AS calculated_price FROM testproducts where price > 2 ORDER BY calculated_price DESC';

		const jsCode = compileToJS(sql);

		const compiledFn = new Function('return ' + jsCode)().bind(alasql);
		const result = compiledFn();

		const correctResult = alasql(sql);

		assert.deepEqual(
			result,
			correctResult,
			'Compiled function should return same result as direct execution'
		);

		const expected = [
			{product: 'Book', calculated_price: 500},
			{product: 'Ball', calculated_price: 300},
		];
		assert.deepEqual(
			result,
			expected,
			'Should return correct filtered and sorted results from database table'
		);
	});
});
