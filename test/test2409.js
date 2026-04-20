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

	// --- LEAD tests ---

	it('1. LEAD basic - next row value', function () {
		var res = alasql(
			'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary) AS next_salary FROM ? ORDER BY salary',
			[data]
		);
		assert.strictEqual(res[0].next_salary, 1200);
		assert.strictEqual(res[1].next_salary, 1500);
		assert.strictEqual(res[4].next_salary, null);
	});

	it('2. LEAD with explicit offset', function () {
		var res = alasql(
			'SELECT emp, salary, LEAD(salary, 2) OVER (ORDER BY salary) AS next2_salary FROM ? ORDER BY salary',
			[data]
		);
		assert.strictEqual(res[0].next2_salary, 1500);
		assert.strictEqual(res[1].next2_salary, 2000);
		assert.strictEqual(res[3].next2_salary, null);
		assert.strictEqual(res[4].next2_salary, null);
	});

	it('3. LEAD with custom default', function () {
		var res = alasql(
			'SELECT emp, salary, LEAD(salary, 1, 0) OVER (ORDER BY salary) AS next_salary FROM ? ORDER BY salary',
			[data]
		);
		assert.strictEqual(res[4].next_salary, 0);
		assert.strictEqual(res[0].next_salary, 1200);
	});

	it('4. LEAD with PARTITION BY', function () {
		var res = alasql(
			'SELECT dept, emp, salary, LEAD(salary) OVER (PARTITION BY dept ORDER BY salary) AS next_salary FROM ? ORDER BY dept, salary',
			[data]
		);
		// IT partition: Dave(2000), Eve(2500)
		var it = res.filter(function (r) {
			return r.dept === 'IT';
		});
		assert.strictEqual(it[0].next_salary, 2500);
		assert.strictEqual(it[1].next_salary, null);

		// Sales partition: Alice(1000), Bob(1200), Carol(1500)
		var sales = res.filter(function (r) {
			return r.dept === 'Sales';
		});
		assert.strictEqual(sales[0].next_salary, 1200);
		assert.strictEqual(sales[1].next_salary, 1500);
		assert.strictEqual(sales[2].next_salary, null);
	});

	// --- LAG tests ---

	it('5. LAG basic - previous row value', function () {
		var res = alasql(
			'SELECT emp, salary, LAG(salary) OVER (ORDER BY salary) AS prev_salary FROM ? ORDER BY salary',
			[data]
		);
		assert.strictEqual(res[0].prev_salary, null);
		assert.strictEqual(res[1].prev_salary, 1000);
		assert.strictEqual(res[4].prev_salary, 2000);
	});

	it('6. LAG with offset and default', function () {
		var res = alasql(
			'SELECT emp, salary, LAG(salary, 2, -1) OVER (ORDER BY salary) AS prev2_salary FROM ? ORDER BY salary',
			[data]
		);
		assert.strictEqual(res[0].prev2_salary, -1);
		assert.strictEqual(res[1].prev2_salary, -1);
		assert.strictEqual(res[2].prev2_salary, 1000);
		assert.strictEqual(res[3].prev2_salary, 1200);
	});

	it('7. LAG with PARTITION BY', function () {
		var res = alasql(
			'SELECT dept, emp, salary, LAG(salary) OVER (PARTITION BY dept ORDER BY salary) AS prev_salary FROM ? ORDER BY dept, salary',
			[data]
		);
		var it = res.filter(function (r) {
			return r.dept === 'IT';
		});
		assert.strictEqual(it[0].prev_salary, null);
		assert.strictEqual(it[1].prev_salary, 2000);

		var sales = res.filter(function (r) {
			return r.dept === 'Sales';
		});
		assert.strictEqual(sales[0].prev_salary, null);
		assert.strictEqual(sales[1].prev_salary, 1000);
		assert.strictEqual(sales[2].prev_salary, 1200);
	});

	// --- FIRST_VALUE tests ---

	it('8. FIRST_VALUE basic', function () {
		var res = alasql(
			'SELECT emp, salary, FIRST_VALUE(salary) OVER (ORDER BY salary) AS first_sal FROM ? ORDER BY salary',
			[data]
		);
		for (var i = 0; i < res.length; i++) {
			assert.strictEqual(res[i].first_sal, 1000);
		}
	});

	it('9. FIRST_VALUE with PARTITION BY', function () {
		var res = alasql(
			'SELECT dept, emp, salary, FIRST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary) AS first_sal FROM ? ORDER BY dept, salary',
			[data]
		);
		var it = res.filter(function (r) {
			return r.dept === 'IT';
		});
		assert.strictEqual(it[0].first_sal, 2000);
		assert.strictEqual(it[1].first_sal, 2000);

		var sales = res.filter(function (r) {
			return r.dept === 'Sales';
		});
		assert.strictEqual(sales[0].first_sal, 1000);
		assert.strictEqual(sales[2].first_sal, 1000);
	});

	it('10. FIRST_VALUE with column name reference', function () {
		var res = alasql(
			'SELECT dept, emp, FIRST_VALUE(emp) OVER (PARTITION BY dept ORDER BY salary) AS first_emp FROM ? ORDER BY dept, salary',
			[data]
		);
		var it = res.filter(function (r) {
			return r.dept === 'IT';
		});
		assert.strictEqual(it[0].first_emp, 'Dave');
		assert.strictEqual(it[1].first_emp, 'Dave');
	});

	// --- LAST_VALUE tests ---

	it('11. LAST_VALUE basic', function () {
		var res = alasql(
			'SELECT emp, salary, LAST_VALUE(salary) OVER (ORDER BY salary) AS last_sal FROM ? ORDER BY salary',
			[data]
		);
		for (var i = 0; i < res.length; i++) {
			assert.strictEqual(res[i].last_sal, 2500);
		}
	});

	it('12. LAST_VALUE with PARTITION BY', function () {
		var res = alasql(
			'SELECT dept, emp, salary, LAST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary) AS last_sal FROM ? ORDER BY dept, salary',
			[data]
		);
		var it = res.filter(function (r) {
			return r.dept === 'IT';
		});
		assert.strictEqual(it[0].last_sal, 2500);
		assert.strictEqual(it[1].last_sal, 2500);

		var sales = res.filter(function (r) {
			return r.dept === 'Sales';
		});
		assert.strictEqual(sales[0].last_sal, 1500);
		assert.strictEqual(sales[2].last_sal, 1500);
	});

	// --- Edge cases ---

	it('13. Null values in column', function () {
		var dataWithNulls = [
			{id: 1, val: 10},
			{id: 2, val: null},
			{id: 3, val: 30},
		];
		var res = alasql('SELECT id, val, LAG(val) OVER (ORDER BY id) AS prev_val FROM ? ORDER BY id', [
			dataWithNulls,
		]);
		assert.strictEqual(res[0].prev_val, null);
		assert.strictEqual(res[1].prev_val, 10);
		assert.strictEqual(res[2].prev_val, null); // null from the data row
	});

	it('14. Offset exceeds partition size', function () {
		var smallData = [
			{id: 1, val: 100},
			{id: 2, val: 200},
		];
		var res = alasql(
			'SELECT id, val, LEAD(val, 5) OVER (ORDER BY id) AS far_ahead FROM ? ORDER BY id',
			[smallData]
		);
		assert.strictEqual(res[0].far_ahead, null);
		assert.strictEqual(res[1].far_ahead, null);
	});

	it('15. Multiple window functions in one query', function () {
		var res = alasql(
			'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary) AS next_sal, LAG(salary) OVER (ORDER BY salary) AS prev_sal, FIRST_VALUE(salary) OVER (ORDER BY salary) AS first_sal, LAST_VALUE(salary) OVER (ORDER BY salary) AS last_sal FROM ? ORDER BY salary',
			[data]
		);
		// First row
		assert.strictEqual(res[0].prev_sal, null);
		assert.strictEqual(res[0].next_sal, 1200);
		assert.strictEqual(res[0].first_sal, 1000);
		assert.strictEqual(res[0].last_sal, 2500);
		// Last row
		assert.strictEqual(res[4].prev_sal, 2000);
		assert.strictEqual(res[4].next_sal, null);
		assert.strictEqual(res[4].first_sal, 1000);
		assert.strictEqual(res[4].last_sal, 2500);
	});

	it('16. DESC ordering', function () {
		var res = alasql(
			'SELECT emp, salary, LEAD(salary) OVER (ORDER BY salary DESC) AS next_sal FROM ? ORDER BY salary DESC',
			[data]
		);
		// DESC order: 2500, 2000, 1500, 1200, 1000
		assert.strictEqual(res[0].next_sal, 2000);
		assert.strictEqual(res[1].next_sal, 1500);
		assert.strictEqual(res[4].next_sal, null);
	});
});
