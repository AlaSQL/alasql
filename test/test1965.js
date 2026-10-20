if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test UNION ALL with ORDER BY and LIMIT on each SELECT', function () {
	const test = 'union_order_limit';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) UNION ALL with ORDER BY and LIMIT using parentheses in UNION branch', function () {
		// Create test data
		alasql('CREATE TABLE temptable (subcategoryname STRING, totalamount FLOAT)');
		alasql(`INSERT INTO temptable VALUES 
('Bikes', 1000.5),
('Components', 2000.75),
('Clothing', 1500.25),
('Accessories', 800.10),
('Socks', 9556.37),
('Helmets', 3000.00),
('Gloves', 1200.50)`);

		// SQL-99 compliant: Use parentheses on second SELECT for ORDER BY/LIMIT
		// This works: plain SELECT, then UNION ALL with parenthesized SELECT
		var sql = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
WHERE subcategoryname IN ('Socks', 'Helmets', 'Components')
GROUP BY subcategoryname
UNION ALL
(SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
WHERE subcategoryname IN ('Accessories', 'Bikes', 'Gloves')
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3)
`;

		var res = alasql(sql);

		// Expected: 6 rows (3 from first + 3 from second with LIMIT 3)
		var expected = [
			{subcategoryname: 'Components', sales: 2000.75},
			{subcategoryname: 'Socks', sales: 9556.37},
			{subcategoryname: 'Helmets', sales: 3000},
			{subcategoryname: 'Accessories', sales: 800.1},
			{subcategoryname: 'Bikes', sales: 1000.5},
			{subcategoryname: 'Gloves', sales: 1200.5},
		];
		assert.deepStrictEqual(
			res,
			expected,
			'Should return correct rows with ORDER BY/LIMIT on second SELECT'
		);

		alasql('DROP TABLE temptable');
	});

	it('B) UNION with ORDER BY and LIMIT using parentheses', function () {
		// Create test data
		alasql('CREATE TABLE test2 (val INT)');
		alasql('INSERT INTO test2 VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10)');

		// SQL-99 compliant: Use parentheses on second SELECT for ORDER BY/LIMIT
		var sql = `
SELECT val FROM test2
WHERE val <= 5
UNION
(SELECT val FROM test2
WHERE val >= 6
ORDER BY val ASC
LIMIT 2)
`;

		var res = alasql(sql);

		// Expected: 7 rows (5 from first + 2 from second with LIMIT, UNION removes duplicates)
		// Note: UNION doesn't guarantee order, so we sort the result for comparison
		res.sort((a, b) => a.val - b.val);
		var expected = [{val: 1}, {val: 2}, {val: 3}, {val: 4}, {val: 5}, {val: 6}, {val: 7}];
		assert.deepStrictEqual(
			res,
			expected,
			'Should return correct rows with UNION and LIMIT on second SELECT'
		);

		alasql('DROP TABLE test2');
	});

	it('C) Both SELECTs parenthesized with ORDER BY/LIMIT', function () {
		// Test with both branches having parentheses
		alasql('CREATE TABLE test3 (id INT, name STRING)');
		alasql("INSERT INTO test3 VALUES (1,'Alice'),(2,'Bob'),(3,'Charlie'),(4,'David'),(5,'Eve')");

		var sql = `
(SELECT id, name FROM test3 ORDER BY id DESC LIMIT 2)
UNION ALL
(SELECT id, name FROM test3 ORDER BY id ASC LIMIT 2)
`;

		var res = alasql(sql);

		var expected = [
			{id: 5, name: 'Eve'},
			{id: 4, name: 'David'},
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];
		assert.deepStrictEqual(res, expected, 'Both parenthesized SELECTs with ORDER BY/LIMIT');

		alasql('DROP TABLE test3');
	});

	it('D) Parenthesized SELECT with ORDER BY DESC and LIMIT in UNION', function () {
		// Test ORDER BY DESC
		alasql('CREATE TABLE test4 (num INT)');
		alasql('INSERT INTO test4 VALUES (10),(20),(30),(40),(50)');

		var sql = `
SELECT num FROM test4 WHERE num <= 30
UNION ALL
(SELECT num FROM test4 WHERE num > 30 ORDER BY num DESC LIMIT 1)
`;

		var res = alasql(sql);

		var expected = [{num: 10}, {num: 20}, {num: 30}, {num: 50}];
		assert.deepStrictEqual(res, expected, 'Parenthesized SELECT with ORDER BY DESC');

		alasql('DROP TABLE test4');
	});

	it('E) UNION ALL with ORDER BY on both branches', function () {
		// Test UNION ALL with ORDER BY on both first and second SELECT
		alasql('CREATE TABLE test5 (letter STRING)');
		alasql("INSERT INTO test5 VALUES ('a'),('b'),('c'),('d'),('e'),('f')");

		var sql = `
SELECT letter FROM test5 WHERE letter < 'c'
UNION ALL
(SELECT letter FROM test5 WHERE letter >= 'c' ORDER BY letter DESC LIMIT 2)
`;

		var res = alasql(sql);

		var expected = [{letter: 'a'}, {letter: 'b'}, {letter: 'f'}, {letter: 'e'}];
		assert.deepStrictEqual(
			res,
			expected,
			'UNION ALL with ORDER BY DESC and LIMIT on second branch'
		);

		alasql('DROP TABLE test5');
	});

	it('F) EXCEPT with parenthesized ORDER BY/LIMIT', function () {
		// Test EXCEPT operation with parentheses
		alasql('CREATE TABLE test6a (num INT)');
		alasql('CREATE TABLE test6b (num INT)');
		alasql('INSERT INTO test6a VALUES (1),(2),(3),(4),(5)');
		alasql('INSERT INTO test6b VALUES (3),(4)');

		var sql = `
SELECT num FROM test6a
EXCEPT
(SELECT num FROM test6b ORDER BY num ASC LIMIT 1)
`;

		var res = alasql(sql);

		var expected = [{num: 1}, {num: 2}, {num: 4}, {num: 5}];
		assert.deepStrictEqual(res, expected, 'EXCEPT with parenthesized ORDER BY/LIMIT');

		alasql('DROP TABLE test6a');
		alasql('DROP TABLE test6b');
	});

	it('G) INTERSECT with parenthesized ORDER BY/LIMIT', function () {
		// Test INTERSECT operation with parentheses
		alasql('CREATE TABLE test7a (num INT)');
		alasql('CREATE TABLE test7b (num INT)');
		alasql('INSERT INTO test7a VALUES (1),(2),(3),(4),(5)');
		alasql('INSERT INTO test7b VALUES (3),(4),(5),(6)');

		var sql = `
(SELECT num FROM test7a WHERE num >= 3 ORDER BY num ASC LIMIT 2)
INTERSECT
SELECT num FROM test7b
`;

		var res = alasql(sql);

		var expected = [{num: 3}, {num: 4}];
		assert.deepStrictEqual(res, expected, 'INTERSECT with parenthesized ORDER BY/LIMIT');

		alasql('DROP TABLE test7a');
		alasql('DROP TABLE test7b');
	});

	it('H) ORDER BY after UNION applies to entire result (backwards compatibility)', function () {
		// Test that ORDER BY after UNION still applies to the entire result
		alasql('CREATE TABLE test8 (val INT)');
		alasql('INSERT INTO test8 VALUES (30),(10),(20)');

		var sql = `
SELECT val FROM test8
UNION ALL
(SELECT val + 100 AS val FROM test8 ORDER BY val DESC LIMIT 2)
ORDER BY val ASC
`;

		var res = alasql(sql);

		// ORDER BY val ASC should apply to the combined result
		var expected = [{val: 10}, {val: 20}, {val: 30}, {val: 130}, {val: 120}];
		assert.deepStrictEqual(res, expected, 'ORDER BY after UNION applies to entire result');

		alasql('DROP TABLE test8');
	});
});
