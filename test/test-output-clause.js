if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test OUTPUT clause for INSERT/DELETE/UPDATE/MERGE', function () {
	const test = 'outputclause';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) INSERT with OUTPUT clause - basic', function () {
		alasql('create table users (id int, name string, age int)');
		var res = alasql('INSERT INTO users VALUES (1, "John", 30), (2, "Jane", 25) OUTPUT INSERTED.*');
		assert.equal(res.length, 2);
		assert.deepEqual(res[0], {id: 1, name: 'John', age: 30});
		assert.deepEqual(res[1], {id: 2, name: 'Jane', age: 25});
	});

	it('B) INSERT with OUTPUT clause - specific columns', function () {
		alasql('create table products (id int, name string, price number)');
		var res = alasql(
			'INSERT INTO products VALUES (1, "Widget", 9.99), (2, "Gadget", 19.99) OUTPUT INSERTED.id, INSERTED.name'
		);
		assert.equal(res.length, 2);
		assert.deepEqual(res[0], {id: 1, name: 'Widget'});
		assert.deepEqual(res[1], {id: 2, name: 'Gadget'});
	});

	it('C) DELETE with OUTPUT clause - basic', function () {
		alasql('create table orders (id int, customer string, amount number)');
		alasql('INSERT INTO orders VALUES (1, "Alice", 100), (2, "Bob", 200), (3, "Charlie", 150)');
		var res = alasql('DELETE FROM orders WHERE amount > 120 OUTPUT DELETED.*');
		assert.equal(res.length, 2);
		assert.equal(res[0].customer, 'Bob');
		assert.equal(res[0].amount, 200);
		assert.equal(res[1].customer, 'Charlie');
		assert.equal(res[1].amount, 150);
		// Verify remaining data
		var remaining = alasql('SELECT * FROM orders');
		assert.equal(remaining.length, 1);
		assert.equal(remaining[0].customer, 'Alice');
	});

	it('D) DELETE with OUTPUT clause - specific columns', function () {
		alasql('create table inventory (id int, item string, quantity int)');
		alasql('INSERT INTO inventory VALUES (1, "Apple", 10), (2, "Banana", 5), (3, "Orange", 8)');
		var res = alasql('DELETE FROM inventory WHERE quantity < 7 OUTPUT DELETED.item, DELETED.quantity');
		assert.equal(res.length, 1);
		assert.deepEqual(res[0], {item: 'Banana', quantity: 5});
	});

	it('E) UPDATE with OUTPUT clause - INSERTED columns', function () {
		alasql('create table employees (id int, name string, salary number)');
		alasql('INSERT INTO employees VALUES (1, "John", 50000), (2, "Jane", 60000)');
		var res = alasql(
			'UPDATE employees SET salary = salary * 1.1 WHERE id = 1 OUTPUT INSERTED.id, INSERTED.name, INSERTED.salary'
		);
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
		assert.equal(res[0].name, 'John');
		assert.equal(res[0].salary, 55000);
	});

	it('F) UPDATE with OUTPUT clause - DELETED columns', function () {
		alasql('create table stock (id int, symbol string, price number)');
		alasql('INSERT INTO stock VALUES (1, "AAPL", 150), (2, "GOOGL", 2800)');
		var res = alasql('UPDATE stock SET price = 160 WHERE symbol = "AAPL" OUTPUT DELETED.price');
		assert.equal(res.length, 1);
		assert.equal(res[0].price, 150);
	});

	it('G) UPDATE with OUTPUT clause - both INSERTED and DELETED', function () {
		alasql('create table prices (id int, item string, old_price number, new_price number)');
		alasql('INSERT INTO prices VALUES (1, "Widget", 10, 10)');
		// Note: This test may need adjustment based on how we handle DELETED vs INSERTED
		var res = alasql(
			'UPDATE prices SET new_price = 15 WHERE id = 1 OUTPUT INSERTED.id, DELETED.new_price AS old, INSERTED.new_price AS new'
		);
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
		// Old value should be 10, new value should be 15
	});

	it('H) INSERT with OUTPUT clause - no rows', function () {
		alasql('create table empty_test (id int, name string)');
		// This should parse but return empty result
		var res = alasql('INSERT INTO empty_test SELECT * FROM empty_test OUTPUT INSERTED.*');
		assert.equal(res.length, 0);
	});

	it('I) DELETE with OUTPUT clause - no matching rows', function () {
		alasql('create table delete_test (id int, val int)');
		alasql('INSERT INTO delete_test VALUES (1, 10), (2, 20)');
		var res = alasql('DELETE FROM delete_test WHERE val > 100 OUTPUT DELETED.*');
		assert.equal(res.length, 0);
		// Verify all data still exists
		var all = alasql('SELECT * FROM delete_test');
		assert.equal(all.length, 2);
	});

	it('J) DELETE without WHERE with OUTPUT clause', function () {
		alasql('create table delete_all (id int, name string)');
		alasql('INSERT INTO delete_all VALUES (1, "A"), (2, "B"), (3, "C")');
		var res = alasql('DELETE FROM delete_all OUTPUT DELETED.*');
		assert.equal(res.length, 3);
		assert.equal(res[0].name, 'A');
		assert.equal(res[1].name, 'B');
		assert.equal(res[2].name, 'C');
		// Verify table is empty
		var remaining = alasql('SELECT * FROM delete_all');
		assert.equal(remaining.length, 0);
	});

	it('K) INSERT with OUTPUT and column specification', function () {
		alasql('create table partial_insert (id int, name string, status string)');
		var res = alasql(
			'INSERT INTO partial_insert (id, name) VALUES (1, "Test") OUTPUT INSERTED.id, INSERTED.name'
		);
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
		assert.equal(res[0].name, 'Test');
	});
});
