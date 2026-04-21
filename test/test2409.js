if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2409 - LEAD/LAG/FIRST_VALUE/LAST_VALUE Window Functions', function () {
	var data = [
		{dept: 'Sales', emp: 'Alice', salary: 1000},
		{dept: 'Sales', emp: 'Bob', salary: 1200},
		{dept: 'Sales', emp: 'Carol', salary: 1500},
		{dept: 'IT', emp: 'Dave', salary: 2000},
		{dept: 'IT', emp: 'Eve', salary: 2500},
	];

	describe('LEAD', function () {
		it('returns the next row value with default offset', function () {
			var res = alasql(
				'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary) AS next_salary FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, next_salary: 1200},
				{emp: 'Bob', salary: 1200, next_salary: 1500},
				{emp: 'Carol', salary: 1500, next_salary: 2000},
				{emp: 'Dave', salary: 2000, next_salary: 2500},
				{emp: 'Eve', salary: 2500, next_salary: null},
			]);
		});

		it('honours an explicit offset', function () {
			var res = alasql(
				'SELECT emp, salary, LEAD(salary, 2) OVER (ORDER BY salary) AS next2_salary FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, next2_salary: 1500},
				{emp: 'Bob', salary: 1200, next2_salary: 2000},
				{emp: 'Carol', salary: 1500, next2_salary: 2500},
				{emp: 'Dave', salary: 2000, next2_salary: null},
				{emp: 'Eve', salary: 2500, next2_salary: null},
			]);
		});

		it('uses a custom default when no row is ahead', function () {
			var res = alasql(
				'SELECT emp, salary, LEAD(salary, 1, 0) OVER (ORDER BY salary) AS next_salary FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, next_salary: 1200},
				{emp: 'Bob', salary: 1200, next_salary: 1500},
				{emp: 'Carol', salary: 1500, next_salary: 2000},
				{emp: 'Dave', salary: 2000, next_salary: 2500},
				{emp: 'Eve', salary: 2500, next_salary: 0},
			]);
		});

		it('restarts within each PARTITION BY group', function () {
			var res = alasql(
				'SELECT dept, emp, salary, LEAD(salary) OVER (PARTITION BY dept ORDER BY salary) AS next_salary FROM ? ORDER BY dept, salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{dept: 'IT', emp: 'Dave', salary: 2000, next_salary: 2500},
				{dept: 'IT', emp: 'Eve', salary: 2500, next_salary: null},
				{dept: 'Sales', emp: 'Alice', salary: 1000, next_salary: 1200},
				{dept: 'Sales', emp: 'Bob', salary: 1200, next_salary: 1500},
				{dept: 'Sales', emp: 'Carol', salary: 1500, next_salary: null},
			]);
		});

		it('walks DESC ordering correctly', function () {
			var res = alasql(
				'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary DESC) AS next_sal FROM ? ORDER BY salary DESC',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Eve', salary: 2500, next_sal: 2000},
				{emp: 'Dave', salary: 2000, next_sal: 1500},
				{emp: 'Carol', salary: 1500, next_sal: 1200},
				{emp: 'Bob', salary: 1200, next_sal: 1000},
				{emp: 'Alice', salary: 1000, next_sal: null},
			]);
		});

		it('returns the default when offset exceeds partition size', function () {
			var smallData = [
				{id: 1, val: 100},
				{id: 2, val: 200},
			];
			var res = alasql(
				'SELECT id, val, LEAD(val, 5) OVER (ORDER BY id) AS far_ahead FROM ? ORDER BY id',
				[smallData]
			);
			assert.deepStrictEqual(res, [
				{id: 1, val: 100, far_ahead: null},
				{id: 2, val: 200, far_ahead: null},
			]);
		});
	});

	describe('LAG', function () {
		it('returns the previous row value with default offset', function () {
			var res = alasql(
				'SELECT emp, salary, LAG(salary) OVER (ORDER BY salary) AS prev_salary FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, prev_salary: null},
				{emp: 'Bob', salary: 1200, prev_salary: 1000},
				{emp: 'Carol', salary: 1500, prev_salary: 1200},
				{emp: 'Dave', salary: 2000, prev_salary: 1500},
				{emp: 'Eve', salary: 2500, prev_salary: 2000},
			]);
		});

		it('honours offset and default value (including negatives)', function () {
			var res = alasql(
				'SELECT emp, salary, LAG(salary, 2, -1) OVER (ORDER BY salary) AS prev2_salary FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, prev2_salary: -1},
				{emp: 'Bob', salary: 1200, prev2_salary: -1},
				{emp: 'Carol', salary: 1500, prev2_salary: 1000},
				{emp: 'Dave', salary: 2000, prev2_salary: 1200},
				{emp: 'Eve', salary: 2500, prev2_salary: 1500},
			]);
		});

		it('restarts within each PARTITION BY group', function () {
			var res = alasql(
				'SELECT dept, emp, salary, LAG(salary) OVER (PARTITION BY dept ORDER BY salary) AS prev_salary FROM ? ORDER BY dept, salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{dept: 'IT', emp: 'Dave', salary: 2000, prev_salary: null},
				{dept: 'IT', emp: 'Eve', salary: 2500, prev_salary: 2000},
				{dept: 'Sales', emp: 'Alice', salary: 1000, prev_salary: null},
				{dept: 'Sales', emp: 'Bob', salary: 1200, prev_salary: 1000},
				{dept: 'Sales', emp: 'Carol', salary: 1500, prev_salary: 1200},
			]);
		});

		it('returns null when the source value itself is null', function () {
			var dataWithNulls = [
				{id: 1, val: 10},
				{id: 2, val: null},
				{id: 3, val: 30},
			];
			var res = alasql(
				'SELECT id, val, LAG(val) OVER (ORDER BY id) AS prev_val FROM ? ORDER BY id',
				[dataWithNulls]
			);
			assert.deepStrictEqual(res, [
				{id: 1, val: 10, prev_val: null},
				{id: 2, val: null, prev_val: 10},
				{id: 3, val: 30, prev_val: null},
			]);
		});
	});

	describe('FIRST_VALUE', function () {
		it('returns the partition-wide minimum-by-order value', function () {
			var res = alasql(
				'SELECT emp, salary, FIRST_VALUE(salary) OVER (ORDER BY salary) AS first_sal FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, first_sal: 1000},
				{emp: 'Bob', salary: 1200, first_sal: 1000},
				{emp: 'Carol', salary: 1500, first_sal: 1000},
				{emp: 'Dave', salary: 2000, first_sal: 1000},
				{emp: 'Eve', salary: 2500, first_sal: 1000},
			]);
		});

		it('restarts within each PARTITION BY group', function () {
			var res = alasql(
				'SELECT dept, emp, salary, FIRST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary) AS first_sal FROM ? ORDER BY dept, salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{dept: 'IT', emp: 'Dave', salary: 2000, first_sal: 2000},
				{dept: 'IT', emp: 'Eve', salary: 2500, first_sal: 2000},
				{dept: 'Sales', emp: 'Alice', salary: 1000, first_sal: 1000},
				{dept: 'Sales', emp: 'Bob', salary: 1200, first_sal: 1000},
				{dept: 'Sales', emp: 'Carol', salary: 1500, first_sal: 1000},
			]);
		});

		it('works on non-numeric columns', function () {
			var res = alasql(
				'SELECT dept, emp, FIRST_VALUE(emp) OVER (PARTITION BY dept ORDER BY salary) AS first_emp FROM ? ORDER BY dept, salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{dept: 'IT', emp: 'Dave', first_emp: 'Dave'},
				{dept: 'IT', emp: 'Eve', first_emp: 'Dave'},
				{dept: 'Sales', emp: 'Alice', first_emp: 'Alice'},
				{dept: 'Sales', emp: 'Bob', first_emp: 'Alice'},
				{dept: 'Sales', emp: 'Carol', first_emp: 'Alice'},
			]);
		});
	});

	describe('LAST_VALUE', function () {
		it('returns the partition-wide maximum-by-order value', function () {
			var res = alasql(
				'SELECT emp, salary, LAST_VALUE(salary) OVER (ORDER BY salary) AS last_sal FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{emp: 'Alice', salary: 1000, last_sal: 2500},
				{emp: 'Bob', salary: 1200, last_sal: 2500},
				{emp: 'Carol', salary: 1500, last_sal: 2500},
				{emp: 'Dave', salary: 2000, last_sal: 2500},
				{emp: 'Eve', salary: 2500, last_sal: 2500},
			]);
		});

		it('restarts within each PARTITION BY group', function () {
			var res = alasql(
				'SELECT dept, emp, salary, LAST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary) AS last_sal FROM ? ORDER BY dept, salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{dept: 'IT', emp: 'Dave', salary: 2000, last_sal: 2500},
				{dept: 'IT', emp: 'Eve', salary: 2500, last_sal: 2500},
				{dept: 'Sales', emp: 'Alice', salary: 1000, last_sal: 1500},
				{dept: 'Sales', emp: 'Bob', salary: 1200, last_sal: 1500},
				{dept: 'Sales', emp: 'Carol', salary: 1500, last_sal: 1500},
			]);
		});
	});

	describe('Combined window functions', function () {
		it('evaluates LEAD/LAG/FIRST_VALUE/LAST_VALUE in a single query', function () {
			var res = alasql(
				'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary) AS next_sal, LAG(salary) OVER (ORDER BY salary) AS prev_sal, FIRST_VALUE(salary) OVER (ORDER BY salary) AS first_sal, LAST_VALUE(salary) OVER (ORDER BY salary) AS last_sal FROM ? ORDER BY salary',
				[data]
			);
			assert.deepStrictEqual(res, [
				{
					emp: 'Alice',
					salary: 1000,
					next_sal: 1200,
					prev_sal: null,
					first_sal: 1000,
					last_sal: 2500,
				},
				{emp: 'Bob', salary: 1200, next_sal: 1500, prev_sal: 1000, first_sal: 1000, last_sal: 2500},
				{
					emp: 'Carol',
					salary: 1500,
					next_sal: 2000,
					prev_sal: 1200,
					first_sal: 1000,
					last_sal: 2500,
				},
				{
					emp: 'Dave',
					salary: 2000,
					next_sal: 2500,
					prev_sal: 1500,
					first_sal: 1000,
					last_sal: 2500,
				},
				{emp: 'Eve', salary: 2500, next_sal: null, prev_sal: 2000, first_sal: 1000, last_sal: 2500},
			]);
		});
	});
});
