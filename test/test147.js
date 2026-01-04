if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 147 - WITH RECURSIVE CTE (Common Table Expression)', function () {
	const test = '147';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Simple non-recursive CTE should work', function () {
		var res = alasql('WITH cnt AS (SELECT 1 AS x) SELECT x FROM cnt');
		assert.deepStrictEqual(res, [{x: 1}]);
	});

	it('2. Recursive CTE with UNION ALL - count from 1 to 5', function () {
		var res = alasql(`
			WITH RECURSIVE cnt AS (
				SELECT 1 AS x
				UNION ALL
				SELECT x + 1 FROM cnt WHERE x < 5
			)
			SELECT x FROM cnt
		`);
		assert.deepStrictEqual(res, [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}]);
	});

	it('3. Recursive CTE with column names - count from 1 to 5', function () {
		var res = alasql(`
			WITH RECURSIVE cnt(x) AS (
				SELECT 1
				UNION ALL
				SELECT x + 1 FROM cnt WHERE x < 5
			)
			SELECT x FROM cnt
		`);
		assert.deepStrictEqual(res, [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}]);
	});

	it('4. Recursive CTE with multiple columns', function () {
		var res = alasql(`
			WITH RECURSIVE seq(a, b) AS (
				SELECT 1, 1
				UNION ALL
				SELECT a + 1, b * 2 FROM seq WHERE a < 4
			)
			SELECT a, b FROM seq
		`);
		assert.deepStrictEqual(res, [
			{a: 1, b: 1},
			{a: 2, b: 2},
			{a: 3, b: 4},
			{a: 4, b: 8},
		]);
	});

	it('5. Recursive CTE for hierarchical data (employee tree)', function () {
		// Create employee table - note: don't use INT for manager_id to allow NULL values
		alasql(`
			CREATE TABLE employees (
				id INT,
				name STRING,
				manager_id
			)
		`);

		alasql(`
			INSERT INTO employees VALUES
			(1, 'CEO', NULL),
			(2, 'VP Sales', 1),
			(3, 'VP Engineering', 1),
			(4, 'Sales Manager', 2),
			(5, 'Engineer 1', 3),
			(6, 'Engineer 2', 3)
		`);

		var res = alasql(`
			WITH RECURSIVE emp_tree AS (
				SELECT id, name, manager_id, 0 AS level
				FROM employees
				WHERE manager_id IS NULL
				UNION ALL
				SELECT e.id, e.name, e.manager_id, t.level + 1
				FROM employees e
				INNER JOIN emp_tree t ON e.manager_id = t.id
			)
			SELECT id, name, level FROM emp_tree ORDER BY level, id
		`);

		assert.deepStrictEqual(res, [
			{id: 1, name: 'CEO', level: 0},
			{id: 2, name: 'VP Sales', level: 1},
			{id: 3, name: 'VP Engineering', level: 1},
			{id: 4, name: 'Sales Manager', level: 2},
			{id: 5, name: 'Engineer 1', level: 2},
			{id: 6, name: 'Engineer 2', level: 2},
		]);

		alasql('DROP TABLE employees');
	});

	it('6. Multiple CTEs with one being recursive', function () {
		var res = alasql(`
			WITH 
			base AS (SELECT 10 AS start_val),
			RECURSIVE counter AS (
				SELECT start_val AS n FROM base
				UNION ALL
				SELECT n + 1 FROM counter WHERE n < 13
			)
			SELECT n FROM counter
		`);
		assert.deepStrictEqual(res, [{n: 10}, {n: 11}, {n: 12}, {n: 13}]);
	});

	it('7. ALASQL_DETAILS modifier returns data and columns', function () {
		alasql('CREATE TABLE testdetails (id INT, name STRING)');
		alasql("INSERT INTO testdetails VALUES (1, 'a'), (2, 'b')");

		// Create a select statement and set the modifier programmatically
		var yy = alasql.yy;
		var parsed = alasql.parse('SELECT id, name FROM testdetails');
		var selectStmt = parsed.statements[0];
		selectStmt.modifier = 'ALASQL_DETAILS';
		var result = selectStmt.execute('test147', {});

		assert.ok(result.data, 'Result should have data property');
		assert.ok(result.columns, 'Result should have columns property');
		assert.equal(result.length, 2, 'Result should have length property');
		assert.deepStrictEqual(result.data, [
			{id: 1, name: 'a'},
			{id: 2, name: 'b'},
		]);
		assert.equal(result.columns[0].columnid, 'id');
		assert.equal(result.columns[1].columnid, 'name');

		alasql('DROP TABLE testdetails');
	});

	it('8. maxCteIterations option limits recursive CTE iterations', function () {
		// Save original option
		var originalMax = alasql.options.maxCteIterations;

		// Set a low limit
		alasql.options.maxCteIterations = 3;

		var res = alasql(`
			WITH RECURSIVE cnt AS (
				SELECT 1 AS x
				UNION ALL
				SELECT x + 1 FROM cnt WHERE x < 100
			)
			SELECT x FROM cnt
		`);

		// Should only have 3 rows due to iteration limit (anchor + 2 recursive iterations)
		assert.ok(res.length <= 4, 'Should be limited by maxCteIterations');

		// Restore original option
		alasql.options.maxCteIterations = originalMax;
	});
});
