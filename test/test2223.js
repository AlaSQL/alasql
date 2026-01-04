if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2223 - ORDER as context-aware keyword', function () {
	const test = '2223';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	// NOTE: Tests should use assert.deepEqual to verify the complete expected output
	// against the actual result object. This ensures comprehensive validation and
	// makes test failures more informative by showing the full diff.

	it('A) ORDER BY clause works correctly', function () {
		alasql('CREATE TABLE products (id INT, name STRING, price INT)');
		alasql('INSERT INTO products VALUES (1, "Widget", 100), (2, "Gadget", 50), (3, "Tool", 75)');

		var res = alasql('SELECT * FROM products ORDER BY price ASC');
		assert.deepStrictEqual(res, [
			{id: 2, name: 'Gadget', price: 50},
			{id: 3, name: 'Tool', price: 75},
			{id: 1, name: 'Widget', price: 100},
		]);

		alasql('DROP TABLE products');
	});

	it('B) ORDER as a column name', function () {
		alasql('CREATE TABLE orders (id INT, order INT, amount INT)');
		alasql('INSERT INTO orders VALUES (1, 100, 500), (2, 101, 750)');

		var res = alasql('SELECT id, order, amount FROM orders');
		assert.deepStrictEqual(res, [
			{id: 1, order: 100, amount: 500},
			{id: 2, order: 101, amount: 750},
		]);

		alasql('DROP TABLE orders');
	});

	it('C) ORDER as a table name', function () {
		alasql('CREATE TABLE order (id INT, price INT)');
		alasql('INSERT INTO order VALUES (1, 10), (2, 20)');

		var res = alasql('SELECT * FROM order');
		assert.deepStrictEqual(res, [
			{id: 1, price: 10},
			{id: 2, price: 20},
		]);

		alasql('DROP TABLE order');
	});

	it('D) ORDER in JSON property (data->order)', function () {
		alasql('CREATE TABLE items (id INT, data OBJECT)');
		alasql(
			'INSERT INTO items VALUES (1, {order: 100, status: "pending"}), (2, {order: 101, status: "shipped"})'
		);

		var res = alasql('SELECT id, data->order as order_num FROM items');
		assert.deepStrictEqual(res, [
			{id: 1, order_num: 100},
			{id: 2, order_num: 101},
		]);

		alasql('DROP TABLE items');
	});

	it('E) ORDER BY with ORDER as column name', function () {
		alasql('CREATE TABLE shipments (id INT, order INT, priority INT)');
		alasql('INSERT INTO shipments VALUES (1, 200, 3), (2, 201, 1), (3, 202, 2)');

		var res = alasql('SELECT * FROM shipments ORDER BY priority ASC');
		assert.deepStrictEqual(res, [
			{id: 2, order: 201, priority: 1},
			{id: 3, order: 202, priority: 2},
			{id: 1, order: 200, priority: 3},
		]);

		alasql('DROP TABLE shipments');
	});

	it('F) Multiple ORDER keywords in same query', function () {
		alasql('CREATE TABLE order (id INT, order INT, status STRING)');
		alasql('INSERT INTO order VALUES (1, 500, "new"), (2, 501, "processing"), (3, 502, "shipped")');

		var res = alasql('SELECT * FROM order ORDER BY order DESC');
		assert.deepStrictEqual(res, [
			{id: 3, order: 502, status: 'shipped'},
			{id: 2, order: 501, status: 'processing'},
			{id: 1, order: 500, status: 'new'},
		]);

		alasql('DROP TABLE order');
	});

	it('G) CREATE INDEX with ORDER as column name', function () {
		alasql('CREATE TABLE transactions (id INT, order INT, amount INT)');
		alasql('CREATE INDEX idx_order ON transactions(order)');
		alasql('INSERT INTO transactions VALUES (1, 300, 150), (2, 301, 250)');

		var res = alasql('SELECT * FROM transactions WHERE order = 300');
		assert.deepStrictEqual(res, [{id: 1, order: 300, amount: 150}]);

		alasql('DROP TABLE transactions');
	});

	it('H) GROUP BY with ORDER BY', function () {
		alasql('CREATE TABLE sales (id INT, order INT, category STRING, amount INT)');
		alasql(
			'INSERT INTO sales VALUES (1, 400, "A", 100), (2, 401, "B", 150), (3, 402, "A", 200), (4, 403, "B", 50)'
		);

		var res = alasql(
			'SELECT category, SUM(amount) as amount FROM sales GROUP BY category ORDER BY amount DESC'
		);
		assert.deepStrictEqual(res, [
			{category: 'A', amount: 300},
			{category: 'B', amount: 200},
		]);

		alasql('DROP TABLE sales');
	});
});
