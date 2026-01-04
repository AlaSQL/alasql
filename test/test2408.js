if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2362 - Window Aggregate Functions (COUNT/MAX/MIN/SUM/AVG) with PARTITION BY', function () {
	it('1. COUNT(*) OVER (PARTITION BY) should return per-row values', function () {
		var data = [
			{dept: 'Sales', emp: 'John', salary: 1000},
			{dept: 'Sales', emp: 'Jane', salary: 1200},
			{dept: 'IT', emp: 'Bob', salary: 1500},
			{dept: 'IT', emp: 'Alice', salary: 1600},
		];

		var res = alasql(
			'SELECT dept, emp, COUNT(*) OVER (PARTITION BY dept) AS dept_count FROM ? ORDER BY dept, emp',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', emp: 'Alice', dept_count: 2},
			{dept: 'IT', emp: 'Bob', dept_count: 2},
			{dept: 'Sales', emp: 'Jane', dept_count: 2},
			{dept: 'Sales', emp: 'John', dept_count: 2},
		]);
	});

	it('2. MAX() OVER (PARTITION BY) should return per-row values', function () {
		var data = [
			{dept: 'Sales', emp: 'John', salary: 1000},
			{dept: 'Sales', emp: 'Jane', salary: 1200},
			{dept: 'IT', emp: 'Bob', salary: 1500},
			{dept: 'IT', emp: 'Alice', salary: 1600},
		];

		var res = alasql(
			'SELECT dept, emp, salary, MAX(salary) OVER (PARTITION BY dept) AS max_dept_salary FROM ? ORDER BY dept, emp',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', emp: 'Alice', salary: 1600, max_dept_salary: 1600},
			{dept: 'IT', emp: 'Bob', salary: 1500, max_dept_salary: 1600},
			{dept: 'Sales', emp: 'Jane', salary: 1200, max_dept_salary: 1200},
			{dept: 'Sales', emp: 'John', salary: 1000, max_dept_salary: 1200},
		]);
	});

	it('3. MIN() OVER (PARTITION BY) should return per-row values', function () {
		var data = [
			{dept: 'Sales', emp: 'John', salary: 1000},
			{dept: 'Sales', emp: 'Jane', salary: 1200},
			{dept: 'IT', emp: 'Bob', salary: 1500},
			{dept: 'IT', emp: 'Alice', salary: 1600},
		];

		var res = alasql(
			'SELECT dept, emp, salary, MIN(salary) OVER (PARTITION BY dept) AS min_dept_salary FROM ? ORDER BY dept, emp',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', emp: 'Alice', salary: 1600, min_dept_salary: 1500},
			{dept: 'IT', emp: 'Bob', salary: 1500, min_dept_salary: 1500},
			{dept: 'Sales', emp: 'Jane', salary: 1200, min_dept_salary: 1000},
			{dept: 'Sales', emp: 'John', salary: 1000, min_dept_salary: 1000},
		]);
	});

	it('4. SUM() OVER (PARTITION BY) should return per-row values', function () {
		var data = [
			{dept: 'Sales', emp: 'John', salary: 1000},
			{dept: 'Sales', emp: 'Jane', salary: 1200},
			{dept: 'IT', emp: 'Bob', salary: 1500},
			{dept: 'IT', emp: 'Alice', salary: 1600},
		];

		var res = alasql(
			'SELECT dept, emp, salary, SUM(salary) OVER (PARTITION BY dept) AS total_dept_salary FROM ? ORDER BY dept, emp',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', emp: 'Alice', salary: 1600, total_dept_salary: 3100},
			{dept: 'IT', emp: 'Bob', salary: 1500, total_dept_salary: 3100},
			{dept: 'Sales', emp: 'Jane', salary: 1200, total_dept_salary: 2200},
			{dept: 'Sales', emp: 'John', salary: 1000, total_dept_salary: 2200},
		]);
	});

	it('5. AVG() OVER (PARTITION BY) should return per-row values', function () {
		var data = [
			{dept: 'Sales', emp: 'John', salary: 1000},
			{dept: 'Sales', emp: 'Jane', salary: 1200},
			{dept: 'IT', emp: 'Bob', salary: 1500},
			{dept: 'IT', emp: 'Alice', salary: 1600},
		];

		var res = alasql(
			'SELECT dept, emp, salary, AVG(salary) OVER (PARTITION BY dept) AS avg_dept_salary FROM ? ORDER BY dept, emp',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', emp: 'Alice', salary: 1600, avg_dept_salary: 1550},
			{dept: 'IT', emp: 'Bob', salary: 1500, avg_dept_salary: 1550},
			{dept: 'Sales', emp: 'Jane', salary: 1200, avg_dept_salary: 1100},
			{dept: 'Sales', emp: 'John', salary: 1000, avg_dept_salary: 1100},
		]);
	});

	it('6. Multiple window aggregates in same query', function () {
		var data = [
			{category: 'A', amount: 10},
			{category: 'A', amount: 20},
			{category: 'B', amount: 30},
			{category: 'B', amount: 40},
		];

		var res = alasql(
			'SELECT category, amount, COUNT(*) OVER (PARTITION BY category) AS cnt, ' +
				'SUM(amount) OVER (PARTITION BY category) AS sum_amt, ' +
				'AVG(amount) OVER (PARTITION BY category) AS avg_amt ' +
				'FROM ? ORDER BY category, amount',
			[data]
		);

		assert.deepStrictEqual(res, [
			{category: 'A', amount: 10, cnt: 2, sum_amt: 30, avg_amt: 15},
			{category: 'A', amount: 20, cnt: 2, sum_amt: 30, avg_amt: 15},
			{category: 'B', amount: 30, cnt: 2, sum_amt: 70, avg_amt: 35},
			{category: 'B', amount: 40, cnt: 2, sum_amt: 70, avg_amt: 35},
		]);
	});

	it('7. Window aggregate with multi-column PARTITION BY', function () {
		var data = [
			{dept: 'IT', team: 'A', score: 100},
			{dept: 'IT', team: 'A', score: 95},
			{dept: 'IT', team: 'B', score: 90},
			{dept: 'Sales', team: 'A', score: 85},
		];

		var res = alasql(
			'SELECT dept, team, score, MAX(score) OVER (PARTITION BY dept, team) AS max_score FROM ? ORDER BY dept, team, score DESC',
			[data]
		);

		assert.deepStrictEqual(res, [
			{dept: 'IT', team: 'A', score: 100, max_score: 100},
			{dept: 'IT', team: 'A', score: 95, max_score: 100},
			{dept: 'IT', team: 'B', score: 90, max_score: 90},
			{dept: 'Sales', team: 'A', score: 85, max_score: 85},
		]);
	});

	it('8. COUNT with expression in OVER clause', function () {
		var data = [
			{category: 'A', val: 10},
			{category: 'A', val: null},
			{category: 'B', val: 30},
		];

		var res = alasql(
			'SELECT category, val, COUNT(val) OVER (PARTITION BY category) AS cnt FROM ? ORDER BY category',
			[data]
		);

		assert.deepStrictEqual(res, [
			{category: 'A', val: 10, cnt: 1},
			{category: 'A', val: null, cnt: 1},
			{category: 'B', val: 30, cnt: 1},
		]);
	});
});
