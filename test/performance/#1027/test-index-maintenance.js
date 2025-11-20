if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../../..');
}

describe('Performance Test #1027 - Index maintenance verification', function () {
	this.timeout(60000);

	const test = '1027b';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Verify index is updated on each INSERT', function () {
		alasql('CREATE TABLE test_table (id INT PRIMARY KEY, value INT)');
		alasql('CREATE INDEX idx_value ON test_table(value)');

		const db = alasql.databases.test1027b;
		const table = db.tables.test_table;
		const indexDef = table.inddefs['idx_value'];
		const indexHash = indexDef.hh;

		// Initially index should be empty
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 0);

		// Insert one record
		alasql('INSERT INTO test_table VALUES (1, 100)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 1);
		assert(table.indices[indexHash]['100']);
		assert.strictEqual(table.indices[indexHash]['100'].length, 1);

		// Insert another record with same value
		alasql('INSERT INTO test_table VALUES (2, 100)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 1);
		assert.strictEqual(table.indices[indexHash]['100'].length, 2);

		// Insert record with different value
		alasql('INSERT INTO test_table VALUES (3, 200)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 2);
		assert(table.indices[indexHash]['200']);
		assert.strictEqual(table.indices[indexHash]['200'].length, 1);
	});

	it('B) Verify composite index works', function () {
		alasql('CREATE TABLE multi_index (id INT PRIMARY KEY, a INT, b STRING)');
		alasql('CREATE INDEX idx_multi ON multi_index(a, b)');

		// Insert data
		alasql('INSERT INTO multi_index VALUES (1, 10, "alpha")');
		alasql('INSERT INTO multi_index VALUES (2, 10, "beta")');
		alasql('INSERT INTO multi_index VALUES (3, 10, "alpha")');

		const db = alasql.databases.test1027b;
		const table = db.tables.multi_index;
		const indexDef = table.inddefs['idx_multi'];
		const indexHash = indexDef.hh;

		// Should have 2 distinct keys: "10`alpha" and "10`beta"
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 2);

		// Check that the composite key format is correct
		const keys = Object.keys(table.indices[indexHash]);
		assert(keys.includes('10`alpha'));
		assert(keys.includes('10`beta'));

		// "10`alpha" should have 2 records
		assert.strictEqual(table.indices[indexHash]['10`alpha'].length, 2);
	});

	it('C) Verify index-optimized query performance', function () {
		// Create a scenario similar to the original issue
		alasql('CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount FLOAT)');
		alasql('CREATE TABLE customers (id INT PRIMARY KEY, name STRING)');
		alasql('CREATE INDEX idx_customer ON orders(customer_id)');

		// Insert customers
		for (let i = 1; i <= 100; i++) {
			alasql('INSERT INTO customers VALUES (?, ?)', [i, 'Customer ' + i]);
		}

		// Insert many orders (10 per customer)
		for (let i = 1; i <= 1000; i++) {
			const custId = ((i - 1) % 100) + 1;
			alasql('INSERT INTO orders VALUES (?, ?, ?)', [i, custId, Math.random() * 1000]);
		}

		// Verify index was populated
		const db = alasql.databases.test1027b;
		const ordersTable = db.tables.orders;
		const indexDef = ordersTable.inddefs['idx_customer'];
		const indexHash = indexDef.hh;

		console.log('  Index has', Object.keys(ordersTable.indices[indexHash]).length, 'keys');
		assert.strictEqual(
			Object.keys(ordersTable.indices[indexHash]).length,
			100,
			'Index should have 100 customer IDs'
		);

		// Run a join query
		const query = `
			SELECT c.name, COUNT(*) as order_count, SUM(o.amount) as total
			FROM customers c
			JOIN orders o ON c.id = o.customer_id
			WHERE c.id BETWEEN 45 AND 55
			GROUP BY c.id, c.name
		`;

		const startTime = Date.now();
		const result = alasql(query);
		const duration = Date.now() - startTime;

		console.log('  Query with 1000 orders took', duration, 'ms');
		assert.strictEqual(result.length, 11); // 11 customers (45-55 inclusive)
		result.forEach(r => {
			assert.strictEqual(r.order_count, 10); // Each customer has 10 orders
		});

		// Should be fast with indices
		assert(duration < 100, 'Query should complete in under 100ms with proper indices');
	});
});
