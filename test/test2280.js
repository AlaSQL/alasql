if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2280 - Subquery caching optimization', function () {
	const test = '2280';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) IN subquery with larger dataset works correctly', function () {
		alasql('CREATE TABLE users (id INT, name STRING)');
		alasql('CREATE TABLE orders (id INT, userId INT, amount NUMBER)');

		// Insert test data
		for (let i = 1; i <= 100; i++) {
			alasql('INSERT INTO users VALUES (?, ?)', [i, 'User' + i]);
		}
		for (let i = 1; i <= 300; i++) {
			const userId = ((i - 1) % 100) + 1;
			const amount = 100 + ((i - 1) % 100) * 10;
			alasql('INSERT INTO orders VALUES (?, ?, ?)', [i, userId, amount]);
		}

		// Users whose id appears in orders with amount > 800
		// amount > 800 means userId in {72, 73, ..., 100} (29 users, amounts 810-1090)
		const result = alasql(
			'SELECT * FROM users WHERE id IN (SELECT userId FROM orders WHERE amount > 800)'
		);

		assert.strictEqual(result.length, 29);
		assert.ok(result.every(u => u.id >= 72));
	});

	it('B) NOT IN subquery works correctly', function () {
		// Users whose id does NOT appear in orders with amount > 800
		const result = alasql(
			'SELECT * FROM users WHERE id NOT IN (SELECT userId FROM orders WHERE amount > 800)'
		);

		assert.strictEqual(result.length, 71);
		assert.ok(result.every(u => u.id < 72));
	});

	it('C) IN subquery with empty result works', function () {
		const result = alasql(
			'SELECT * FROM users WHERE id IN (SELECT userId FROM orders WHERE amount > 9999)'
		);
		assert.strictEqual(result.length, 0);
	});

	it('D) NOT IN subquery with empty result returns all rows', function () {
		const result = alasql(
			'SELECT * FROM users WHERE id NOT IN (SELECT userId FROM orders WHERE amount > 9999)'
		);
		assert.strictEqual(result.length, 100);
	});

	it('E) Subquery cache does not persist between separate query executions', function () {
		// Execute query once
		const result1 = alasql(
			'SELECT COUNT(*) as cnt FROM users WHERE id IN (SELECT userId FROM orders WHERE amount > 500)'
		);
		const count1 = result1[0].cnt;

		// Add new data that would change the subquery result
		alasql('INSERT INTO orders VALUES (999, 1, 999)');

		// Execute again - should reflect new data (cache should not persist)
		const result2 = alasql(
			'SELECT COUNT(*) as cnt FROM users WHERE id IN (SELECT userId FROM orders WHERE amount > 500)'
		);
		const count2 = result2[0].cnt;

		// User 1 should now be in the result since we added an order with amount 999
		// Result should be one more than before
		assert.strictEqual(count2, count1 + 1);
	});

	it('F) Subquery performance is optimized', function () {
		// This test verifies that the subquery is not re-executed for each row
		// by checking that the query completes in a reasonable time
		const start = Date.now();
		const iterations = 10;

		for (let i = 0; i < iterations; i++) {
			alasql('SELECT * FROM users WHERE id IN (SELECT userId FROM orders WHERE amount > 500)');
		}

		const elapsed = Date.now() - start;
		const avgTime = elapsed / iterations;

		// With caching, each query should take less than 50ms on average
		// Without caching (re-executing subquery per row), it would take 100+ ms
		assert.ok(avgTime < 50, 'Query should complete quickly with caching (avg: ' + avgTime + 'ms)');
	});

	it('G) Correlated subqueries are detected and not cached', function () {
		// Create test tables
		alasql('CREATE TABLE outer_table (id INT, val INT)');
		alasql('CREATE TABLE inner_table (outer_id INT, data INT)');

		alasql('INSERT INTO outer_table VALUES (1, 100), (2, 200), (3, 300)');
		alasql('INSERT INTO inner_table VALUES (1, 10), (2, 20), (3, 30)');

		// This subquery references outer_table.val, making it correlated
		const result = alasql(
			'SELECT * FROM outer_table WHERE id IN (SELECT outer_id FROM inner_table WHERE outer_table.val > 150)'
		);

		// Should return rows with id 2 and 3 (val > 150)
		assert.strictEqual(result.length, 2);
		assert.ok(result.some(r => r.id === 2 && r.val === 200));
		assert.ok(result.some(r => r.id === 3 && r.val === 300));

		// Verify the query was marked as correlated
		const compiled = alasql.compile(
			'SELECT * FROM outer_table WHERE id IN (SELECT outer_id FROM inner_table WHERE outer_table.val > 150)'
		);
		assert.strictEqual(compiled.query.queriesfn[0].query.isCorrelated, true);
	});
});
