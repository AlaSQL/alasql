if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1027 - Index maintenance during INSERT', function () {
	const test = '1027';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Index is created and populated during CREATE INDEX', function () {
		alasql('CREATE TABLE t1 (id INT PRIMARY KEY, val INT)');

		// Insert data first
		alasql('INSERT INTO t1 VALUES (1, 100)');
		alasql('INSERT INTO t1 VALUES (2, 100)');
		alasql('INSERT INTO t1 VALUES (3, 200)');

		// Create index after data exists
		alasql('CREATE INDEX idx_val ON t1(val)');

		var db = alasql.databases.test1027;
		var table = db.tables.t1;
		var indexDef = table.inddefs['idx_val'];
		var indexHash = indexDef.hh;

		// Index should be populated with existing data
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 2);
		assert(table.indices[indexHash]['100']);
		assert.strictEqual(table.indices[indexHash]['100'].length, 2);
		assert(table.indices[indexHash]['200']);
		assert.strictEqual(table.indices[indexHash]['200'].length, 1);
	});

	it('B) Index is updated during INSERT operations', function () {
		alasql('CREATE TABLE t2 (id INT PRIMARY KEY, val INT)');
		alasql('CREATE INDEX idx_val ON t2(val)');

		var db = alasql.databases.test1027;
		var table = db.tables.t2;
		var indexDef = table.inddefs['idx_val'];
		var indexHash = indexDef.hh;

		// Initially index should be empty
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 0);

		// Insert one record
		alasql('INSERT INTO t2 VALUES (1, 100)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 1);
		assert(table.indices[indexHash]['100']);
		assert.strictEqual(table.indices[indexHash]['100'].length, 1);

		// Insert another record with same value
		alasql('INSERT INTO t2 VALUES (2, 100)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 1);
		assert.strictEqual(table.indices[indexHash]['100'].length, 2);

		// Insert record with different value
		alasql('INSERT INTO t2 VALUES (3, 200)');
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 2);
		assert(table.indices[indexHash]['200']);
		assert.strictEqual(table.indices[indexHash]['200'].length, 1);
	});

	it('C) Composite index is maintained correctly', function () {
		alasql('CREATE TABLE t3 (id INT PRIMARY KEY, a INT, b STRING)');
		alasql('CREATE INDEX idx_composite ON t3(a, b)');

		// Insert data
		alasql('INSERT INTO t3 VALUES (1, 10, "alpha")');
		alasql('INSERT INTO t3 VALUES (2, 10, "beta")');
		alasql('INSERT INTO t3 VALUES (3, 10, "alpha")');

		var db = alasql.databases.test1027;
		var table = db.tables.t3;
		var indexDef = table.inddefs['idx_composite'];
		var indexHash = indexDef.hh;

		// Should have 2 distinct composite keys
		assert.strictEqual(Object.keys(table.indices[indexHash]).length, 2);

		// Check composite key format (separated by backtick)
		assert(table.indices[indexHash]['10`alpha']);
		assert(table.indices[indexHash]['10`beta']);

		// "10`alpha" should have 2 records
		assert.strictEqual(table.indices[indexHash]['10`alpha'].length, 2);
		assert.strictEqual(table.indices[indexHash]['10`beta'].length, 1);
	});

	it('D) JOIN query uses indices correctly', function () {
		alasql('CREATE TABLE customers (id INT PRIMARY KEY, name STRING)');
		alasql('CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount INT)');
		alasql('CREATE INDEX idx_customer ON orders(customer_id)');

		// Insert customers
		for (var i = 1; i <= 10; i++) {
			alasql('INSERT INTO customers VALUES (?, ?)', [i, 'Customer ' + i]);
		}

		// Insert orders (5 per customer)
		for (var i = 1; i <= 50; i++) {
			var custId = ((i - 1) % 10) + 1;
			alasql('INSERT INTO orders VALUES (?, ?, ?)', [i, custId, i * 10]);
		}

		// Verify index was populated
		var db = alasql.databases.test1027;
		var ordersTable = db.tables.orders;
		var indexDef = ordersTable.inddefs['idx_customer'];
		var indexHash = indexDef.hh;

		assert.strictEqual(Object.keys(ordersTable.indices[indexHash]).length, 10);

		// Each customer should have 5 orders in the index
		for (var custId = 1; custId <= 10; custId++) {
			assert(ordersTable.indices[indexHash][custId]);
			assert.strictEqual(ordersTable.indices[indexHash][custId].length, 5);
		}

		// Run JOIN query
		var result = alasql(`
			SELECT c.name, COUNT(*) as order_count, SUM(o.amount) as total_amount
			FROM customers c
			JOIN orders o ON c.id = o.customer_id
			WHERE c.id = 5
			GROUP BY c.id, c.name
		`);

		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0].name, 'Customer 5');
		assert.strictEqual(result[0].order_count, 5);
	});

	it('E) Multiple indices on same table work correctly', function () {
		alasql('CREATE TABLE products (id INT PRIMARY KEY, category STRING, price INT, stock INT)');
		alasql('CREATE INDEX idx_category ON products(category)');
		alasql('CREATE INDEX idx_price ON products(price)');
		alasql('CREATE INDEX idx_stock ON products(stock)');

		// Insert data
		alasql("INSERT INTO products VALUES (1, 'Electronics', 100, 50)");
		alasql("INSERT INTO products VALUES (2, 'Electronics', 200, 30)");
		alasql("INSERT INTO products VALUES (3, 'Books', 20, 100)");
		alasql("INSERT INTO products VALUES (4, 'Books', 15, 200)");

		var db = alasql.databases.test1027;
		var table = db.tables.products;

		// Verify all three indices are populated
		var categoryIdx = table.inddefs['idx_category'];
		var priceIdx = table.inddefs['idx_price'];
		var stockIdx = table.inddefs['idx_stock'];

		// Category index should have 2 keys
		assert.strictEqual(Object.keys(table.indices[categoryIdx.hh]).length, 2);
		assert.strictEqual(table.indices[categoryIdx.hh]['Electronics'].length, 2);
		assert.strictEqual(table.indices[categoryIdx.hh]['Books'].length, 2);

		// Price index should have 4 keys (all different)
		assert.strictEqual(Object.keys(table.indices[priceIdx.hh]).length, 4);

		// Stock index should have 4 keys (all different)
		assert.strictEqual(Object.keys(table.indices[stockIdx.hh]).length, 4);
	});
});
