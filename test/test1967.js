if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test - Scalar Subquery Support', function () {
	const test = 'scalarsubquery';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Scalar subquery in SELECT clause - basic', function () {
		alasql('CREATE TABLE products (id INT, name STRING, price INT)');
		alasql(
			'INSERT INTO products VALUES (1, "Widget", 10), (2, "Gadget", 20), (3, "Doohickey", 30)'
		);

		var res = alasql(
			'SELECT id, name, price, (SELECT MAX(price) FROM products) as max_price FROM products'
		);

		assert.deepEqual(res, [
			{id: 1, name: 'Widget', price: 10, max_price: 30},
			{id: 2, name: 'Gadget', price: 20, max_price: 30},
			{id: 3, name: 'Doohickey', price: 30, max_price: 30},
		]);
	});

	it('B) Scalar subquery in SELECT clause - with aggregate functions', function () {
		var res = alasql(
			'SELECT id, name, price, (SELECT AVG(price) FROM products) as avg_price, (SELECT MIN(price) FROM products) as min_price FROM products'
		);

		assert.deepEqual(res, [
			{id: 1, name: 'Widget', price: 10, avg_price: 20, min_price: 10},
			{id: 2, name: 'Gadget', price: 20, avg_price: 20, min_price: 10},
			{id: 3, name: 'Doohickey', price: 30, avg_price: 20, min_price: 10},
		]);
	});

	it('C) Scalar subquery in WHERE clause', function () {
		var res = alasql('SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)');

		assert.deepEqual(res, [{id: 3, name: 'Doohickey', price: 30}]);
	});

	it('D) Scalar subquery in WHERE clause - with comparison operators', function () {
		var res = alasql('SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products)');

		assert.deepEqual(res, [{id: 3, name: 'Doohickey', price: 30}]);
	});

	it('E) Correlated scalar subquery - SUM aggregate', function () {
		alasql('CREATE TABLE customers (id INT, name STRING, income INT)');
		alasql(
			'INSERT INTO customers VALUES (1, "Alice", 50000), (2, "Bob", 60000), (3, "Charlie", 70000)'
		);
		alasql('CREATE TABLE orders (customer_id INT, amount INT)');
		alasql('INSERT INTO orders VALUES (1, 100), (1, 200), (2, 150), (2, 250), (3, 300), (3, 400)');

		var res = alasql(
			'SELECT c.id, c.name, (SELECT SUM(amount) FROM orders o WHERE o.customer_id = c.id) as total_orders FROM customers c'
		);

		assert.deepEqual(res, [
			{id: 1, name: 'Alice', total_orders: 300},
			{id: 2, name: 'Bob', total_orders: 400},
			{id: 3, name: 'Charlie', total_orders: 700},
		]);
	});

	it('F) Correlated scalar subquery - COUNT aggregate', function () {
		var res = alasql(
			'SELECT c.id, c.name, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) as order_count FROM customers c'
		);

		assert.deepEqual(res, [
			{id: 1, name: 'Alice', order_count: 2},
			{id: 2, name: 'Bob', order_count: 2},
			{id: 3, name: 'Charlie', order_count: 2},
		]);
	});

	it('G) Correlated scalar subquery - AVG aggregate', function () {
		var res = alasql(
			'SELECT c.id, c.name, (SELECT AVG(amount) FROM orders o WHERE o.customer_id = c.id) as avg_order FROM customers c'
		);

		assert.deepEqual(res, [
			{id: 1, name: 'Alice', avg_order: 150},
			{id: 2, name: 'Bob', avg_order: 200},
			{id: 3, name: 'Charlie', avg_order: 350},
		]);
	});

	it('H) Multiple scalar subqueries in SELECT clause', function () {
		var res = alasql(`
			SELECT c.id, c.name, 
				(SELECT SUM(amount) FROM orders o WHERE o.customer_id = c.id) as sum_amt, 
				(SELECT AVG(amount) FROM orders o WHERE o.customer_id = c.id) as avg_amt, 
				(SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) as cnt 
			FROM customers c 
			WHERE c.id = 1
		`);

		assert.deepEqual(res, [{id: 1, name: 'Alice', sum_amt: 300, avg_amt: 150, cnt: 2}]);
	});

	it('I) Scalar subquery with WHERE condition in subquery', function () {
		var res = alasql(
			'SELECT * FROM customers WHERE income > (SELECT AVG(income) FROM customers WHERE id > 1)'
		);

		assert.deepEqual(res, [{id: 3, name: 'Charlie', income: 70000}]);
	});

	it('J) Scalar subquery in complex WHERE condition', function () {
		alasql('CREATE TABLE stats (category STRING, avg_val INT)');
		alasql('INSERT INTO stats VALUES ("high", 65000), ("low", 55000)');

		var res = alasql(
			'SELECT * FROM customers WHERE income > (SELECT avg_val FROM stats WHERE category = "high")'
		);

		assert.deepEqual(res, [{id: 3, name: 'Charlie', income: 70000}]);
	});

	it('K) Scalar subquery returns 0 for SUM when no rows match', function () {
		var res = alasql(
			'SELECT c.id, c.name, (SELECT SUM(amount) FROM orders o WHERE o.customer_id = 999) as no_orders FROM customers c WHERE c.id = 1'
		);

		// Note: In AlaSQL, SUM returns 0 when no rows match.
		// This differs from standard SQL where SUM typically returns NULL for empty result sets.
		assert.deepEqual(res, [{id: 1, name: 'Alice', no_orders: 0}]);
	});

	it('L) Scalar subquery in arithmetic expression', function () {
		var res = alasql(
			'SELECT id, name, price, price - (SELECT AVG(price) FROM products) as price_diff FROM products WHERE id = 1'
		);

		assert.deepEqual(res, [{id: 1, name: 'Widget', price: 10, price_diff: -10}]);
	});
});
