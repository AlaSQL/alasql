if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2362 - Window Offset Functions (LEAD, LAG, FIRST_VALUE, LAST_VALUE)', function () {
	before(function () {
		alasql('CREATE DATABASE test2362; USE test2362');
	});

	after(function () {
		alasql('DROP DATABASE test2362');
	});

	describe('LEAD() function', function () {
		it('1. Basic LEAD() with PARTITION BY', function (done) {
			var data = [
				{category: 'A', amount: 10},
				{category: 'A', amount: 20},
				{category: 'A', amount: 30},
				{category: 'B', amount: 40},
			];
			var res = alasql(
				'SELECT category, amount, LEAD(amount) OVER (PARTITION BY category ORDER BY amount) AS next_amt FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{category: 'A', amount: 10, next_amt: 20},
				{category: 'A', amount: 20, next_amt: 30},
				{category: 'A', amount: 30, next_amt: null},
				{category: 'B', amount: 40, next_amt: null},
			]);
			done();
		});

		it('2. LEAD() with offset parameter', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
				{id: 4, amount: 40},
			];
			var res = alasql(
				'SELECT id, amount, LEAD(amount, 2) OVER (ORDER BY id) AS next_2_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, next_2_amount: 30},
				{id: 2, amount: 20, next_2_amount: 40},
				{id: 3, amount: 30, next_2_amount: null},
				{id: 4, amount: 40, next_2_amount: null},
			]);
			done();
		});

		it('3. LEAD() with default amount', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
			];
			var res = alasql(
				'SELECT id, amount, LEAD(amount, 1, -1) OVER (ORDER BY id) AS next_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, next_amount: 20},
				{id: 2, amount: 20, next_amount: 30},
				{id: 3, amount: 30, next_amount: -1},
			]);
			done();
		});
	});

	describe('LAG() function', function () {
		it('4. Basic LAG() with PARTITION BY', function (done) {
			var data = [
				{category: 'A', amount: 10},
				{category: 'A', amount: 20},
				{category: 'A', amount: 30},
				{category: 'B', amount: 40},
			];
			var res = alasql(
				'SELECT category, amount, LAG(amount) OVER (PARTITION BY category ORDER BY amount) AS prev_amt FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{category: 'A', amount: 10, prev_amt: null},
				{category: 'A', amount: 20, prev_amt: 10},
				{category: 'A', amount: 30, prev_amt: 20},
				{category: 'B', amount: 40, prev_amt: null},
			]);
			done();
		});

		it('5. LAG() with offset parameter', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
				{id: 4, amount: 40},
			];
			var res = alasql(
				'SELECT id, amount, LAG(amount, 2) OVER (ORDER BY id) AS prev_2_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, prev_2_amount: null},
				{id: 2, amount: 20, prev_2_amount: null},
				{id: 3, amount: 30, prev_2_amount: 10},
				{id: 4, amount: 40, prev_2_amount: 20},
			]);
			done();
		});

		it('6. LAG() with default amount', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
			];
			var res = alasql(
				'SELECT id, amount, LAG(amount, 1, 0) OVER (ORDER BY id) AS prev_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, prev_amount: 0},
				{id: 2, amount: 20, prev_amount: 10},
				{id: 3, amount: 30, prev_amount: 20},
			]);
			done();
		});
	});

	describe('FIRST_VALUE() function', function () {
		it('7. Basic FIRST_VALUE() with PARTITION BY', function (done) {
			var data = [
				{category: 'A', amount: 10},
				{category: 'A', amount: 20},
				{category: 'A', amount: 30},
				{category: 'B', amount: 40},
			];
			var res = alasql(
				'SELECT category, amount, FIRST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS first_amt FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{category: 'A', amount: 10, first_amt: 10},
				{category: 'A', amount: 20, first_amt: 10},
				{category: 'A', amount: 30, first_amt: 10},
				{category: 'B', amount: 40, first_amt: 40},
			]);
			done();
		});

		it('8. FIRST_VALUE() without PARTITION BY', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
			];
			var res = alasql(
				'SELECT id, amount, FIRST_VALUE(amount) OVER (ORDER BY id) AS first_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, first_amount: 10},
				{id: 2, amount: 20, first_amount: 10},
				{id: 3, amount: 30, first_amount: 10},
			]);
			done();
		});
	});

	describe('LAST_VALUE() function', function () {
		it('9. Basic LAST_VALUE() with PARTITION BY', function (done) {
			var data = [
				{category: 'A', amount: 10},
				{category: 'A', amount: 20},
				{category: 'A', amount: 30},
				{category: 'B', amount: 40},
			];
			var res = alasql(
				'SELECT category, amount, LAST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS last_amt FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{category: 'A', amount: 10, last_amt: 30},
				{category: 'A', amount: 20, last_amt: 30},
				{category: 'A', amount: 30, last_amt: 30},
				{category: 'B', amount: 40, last_amt: 40},
			]);
			done();
		});

		it('10. LAST_VALUE() without PARTITION BY', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
			];
			var res = alasql(
				'SELECT id, amount, LAST_VALUE(amount) OVER (ORDER BY id) AS last_amount FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, last_amount: 30},
				{id: 2, amount: 20, last_amount: 30},
				{id: 3, amount: 30, last_amount: 30},
			]);
			done();
		});
	});

	describe('Period-over-Period calculations', function () {
		it('11. Calculate month-over-month change using LAG() - subquery approach', function (done) {
			// NOTE: Direct expressions like "sales - LAG(sales) OVER (...)" in the same SELECT don't currently work
			// This is because window functions are computed after the SELECT clause is evaluated
			// SQL-99 compliant approach: Use subquery to compute LAG first, then reference it in outer query
			// TODO: Implement proper evaluation order for expressions containing window functions
			var data = [
				{month: 1, sales: 100},
				{month: 2, sales: 150},
				{month: 3, sales: 120},
			];
			var res = alasql(
				'SELECT month, sales, sales - prev_sales AS mom_change FROM (SELECT month, sales, LAG(sales) OVER (ORDER BY month) AS prev_sales FROM ?) ',
				[data]
			);
			// Note: First row has no mom_change because prev_sales is NULL (100 - null = undefined)
			assert.deepEqual(res, [
				{month: 1, sales: 100, mom_change: undefined},
				{month: 2, sales: 150, mom_change: 50},
				{month: 3, sales: 120, mom_change: -30},
			]);
			done();
		});
	});

	describe('Multiple window functions in same query', function () {
		it('12. Use LEAD, LAG, FIRST_VALUE and LAST_VALUE together', function (done) {
			var data = [
				{id: 1, amount: 10},
				{id: 2, amount: 20},
				{id: 3, amount: 30},
			];
			var res = alasql(
				'SELECT id, amount, ' +
					'LEAD(amount) OVER (ORDER BY id) AS next_val, ' +
					'LAG(amount) OVER (ORDER BY id) AS prev_val, ' +
					'FIRST_VALUE(amount) OVER (ORDER BY id) AS first_val, ' +
					'LAST_VALUE(amount) OVER (ORDER BY id) AS last_val ' +
					'FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{id: 1, amount: 10, next_val: 20, prev_val: null, first_val: 10, last_val: 30},
				{id: 2, amount: 20, next_val: 30, prev_val: 10, first_val: 10, last_val: 30},
				{id: 3, amount: 30, next_val: null, prev_val: 20, first_val: 10, last_val: 30},
			]);
			done();
		});

		// Known limitation: Direct expressions with window functions
		it.skip('13. Direct expression with window function (not yet supported)', function (done) {
			// TODO: This requires implementing proper evaluation order
			// Window functions need to be computed before expressions containing them are evaluated
			// Currently, expressions are all evaluated during SELECT compilation
			var data = [
				{month: 1, sales: 100},
				{month: 2, sales: 150},
				{month: 3, sales: 120},
			];
			var res = alasql(
				'SELECT month, sales, sales - LAG(sales) OVER (ORDER BY month) AS mom_change FROM ?',
				[data]
			);
			assert.deepEqual(res, [
				{month: 1, sales: 100}, // mom_change would be null if supported
				{month: 2, sales: 150, mom_change: 50},
				{month: 3, sales: 120, mom_change: -30},
			]);
			done();
		});
	});
});
