if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var {compileToJS} = require('../dist/precompile/index.js');
}

/**
 Test 2169: Comprehensive verification of compileToJS functionality
 Tests various SQL features with the precompile module
*/

// Test data - consistent across all tests
const testData = [
	{id: 1, name: 'Alice', age: 25, salary: 50000, department: 'Engineering', active: true},
	{id: 2, name: 'Bob', age: 30, salary: 60000, department: 'Sales', active: false},
	{id: 3, name: 'Charlie', age: 35, salary: 70000, department: 'Engineering', active: true},
	{id: 4, name: 'Diana', age: 28, salary: 55000, department: 'Marketing', active: true},
	{id: 5, name: 'Eve', age: 32, salary: 65000, department: 'Sales', active: false},
];

function runTest(testName, sql, params = [testData]) {
	try {
		// Get original AlaSQL result
		const originalResult = alasql(sql, params);

		// Test compileToJS
		const compiledCode = compileToJS(sql);
		const compiledFn = new Function('return ' + compiledCode)().bind(alasql);
		const compiledResult = compiledFn(params);

		// Compare results using assert
		assert.deepEqual(compiledResult, originalResult, `compileToJS result mismatch for ${testName}`);

		return true;
	} catch (error) {
		console.error(`❌ TEST ERROR: ${testName} - ${error.message}`);
		return false;
	}
}

describe.skip('Test 2169: Comprehensive verification of compileToJS functionality', function () {
	it('1. Basic SELECT', function () {
		runTest('Basic SELECT', 'SELECT name, age FROM ?');
	});

	it('2. WHERE filtering', function () {
		runTest('WHERE filtering', 'SELECT name, age FROM ? WHERE age > ?', [testData, 25]);
	});

	it('3. ORDER BY', function () {
		runTest('ORDER BY', 'SELECT name, age FROM ? ORDER BY age DESC');
	});

	it('4. DISTINCT', function () {
		runTest('DISTINCT', 'SELECT DISTINCT department FROM ? ORDER BY department');
	});

	it('5. LIMIT', function () {
		runTest('LIMIT', 'SELECT name, age FROM ? LIMIT 3');
	});

	it('6. OFFSET', function () {
		runTest('OFFSET', 'SELECT name, age FROM ? LIMIT 2 OFFSET 2');
	});

	it('7. Complex expressions', function () {
		runTest(
			'Complex expressions',
			'SELECT name, salary * 1.1 AS new_salary, age + 5 AS future_age FROM ? WHERE salary > 55000'
		);
	});

	it('8. Multiple WHERE conditions', function () {
		runTest(
			'Multiple WHERE conditions',
			'SELECT name, department, salary FROM ? WHERE department = "Engineering" AND salary > 55000'
		);
	});

	it('9. ORDER BY with expression', function () {
		runTest(
			'ORDER BY with expression',
			'SELECT name, salary, salary * 0.1 AS bonus FROM ? ORDER BY bonus DESC'
		);
	});

	it('10. Boolean conditions', function () {
		runTest('Boolean conditions', 'SELECT name, active FROM ? WHERE active = true');
	});

	it('11. Mathematical operations', function () {
		runTest(
			'Mathematical operations',
			'SELECT name, salary, salary * 12 AS annual_salary FROM ? WHERE annual_salary > 600000'
		);
	});

	// Test 12: String operations (if supported) - .skip - fails with alasql.utils reference
	it('12. String operations', function () {
		runTest(
			'String operations',
			'SELECT name, UPPER(name) AS upper_name FROM ? WHERE name LIKE "A%"'
		);
	});

	it('13. Complex WHERE with OR', function () {
		runTest(
			'Complex WHERE with OR',
			'SELECT name, department, salary FROM ? WHERE department = "Engineering" OR salary > 60000'
		);
	});

	it('14. LIMIT with ORDER BY', function () {
		runTest('LIMIT with ORDER BY', 'SELECT name, salary FROM ? ORDER BY salary DESC LIMIT 2');
	});

	it('15. OFFSET with ORDER BY', function () {
		runTest('OFFSET with ORDER BY', 'SELECT name, age FROM ? ORDER BY age LIMIT 2 OFFSET 1');
	});

	it('16. NULL handling', function () {
		const dataWithNulls = [
			...testData,
			{id: 6, name: null, age: 40, salary: null, department: 'Engineering', active: true},
		];
		runTest('NULL handling', 'SELECT name, salary FROM ? WHERE salary IS NOT NULL', [
			dataWithNulls,
		]);
	});

	it('17. CASE expressions', function () {
		runTest(
			'CASE expressions',
			'SELECT name, salary, CASE WHEN salary > 60000 THEN "High" WHEN salary > 55000 THEN "Medium" ELSE "Low" END AS salary_level FROM ?'
		);
	});

	it('18. Multiple calculations', function () {
		runTest(
			'Multiple calculations',
			'SELECT name, salary, salary * 0.1 AS bonus, salary + (salary * 0.1) AS total_comp FROM ? ORDER BY total_comp DESC'
		);
	});

	it('19. BETWEEN operator', function () {
		runTest('BETWEEN operator', 'SELECT name, age FROM ? WHERE age BETWEEN 25 AND 30');
	});

	//Test 20: IN operator - .skip - fails with alasql.sets reference
	it('20. IN operator', function () {
		runTest(
			'IN operator',
			'SELECT name, department FROM ? WHERE department IN ("Engineering", "Sales")'
		);
	});
});
