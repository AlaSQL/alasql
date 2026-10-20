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
		assert.deepStrictEqual(res[0], {id: 1, name: 'John', age: 30});
		assert.deepStrictEqual(res[1], {id: 2, name: 'Jane', age: 25});
	});

	it('B) INSERT with OUTPUT clause - specific columns', function () {
		alasql('create table products (id int, name string, price number)');
		var res = alasql(
			'INSERT INTO products VALUES (1, "Widget", 9.99), (2, "Gadget", 19.99) OUTPUT INSERTED.id, INSERTED.name'
		);
		assert.equal(res.length, 2);
		assert.deepStrictEqual(res[0], {id: 1, name: 'Widget'});
		assert.deepStrictEqual(res[1], {id: 2, name: 'Gadget'});
	});

	it('C) DELETE with OUTPUT clause - basic', function () {
		alasql('create table orders (id int, customer string, amount number)');
		alasql('INSERT INTO orders VALUES (1, "Alice", 100), (2, "Bob", 200), (3, "Charlie", 150)');
		var res = alasql('DELETE FROM orders WHERE amount > 120 OUTPUT DELETED.*');
		assert.equal(res.length, 2);
		assert.deepStrictEqual(res[0], {id: 2, customer: 'Bob', amount: 200});
		assert.deepStrictEqual(res[1], {id: 3, customer: 'Charlie', amount: 150});
		// Verify remaining data
		var remaining = alasql('SELECT * FROM orders');
		assert.equal(remaining.length, 1);
		assert.deepStrictEqual(remaining[0], {id: 1, customer: 'Alice', amount: 100});
	});

	it('D) DELETE with OUTPUT clause - specific columns', function () {
		alasql('create table inventory (id int, item string, quantity int)');
		alasql('INSERT INTO inventory VALUES (1, "Apple", 10), (2, "Banana", 5), (3, "Orange", 8)');
		var res = alasql(
			'DELETE FROM inventory WHERE quantity < 7 OUTPUT DELETED.item, DELETED.quantity'
		);
		assert.equal(res.length, 1);
		assert.deepStrictEqual(res[0], {item: 'Banana', quantity: 5});
	});

	it('E) UPDATE with OUTPUT clause - INSERTED columns', function () {
		alasql('create table employees (id int, name string, salary number)');
		alasql('INSERT INTO employees VALUES (1, "John", 50000), (2, "Jane", 60000)');
		var res = alasql(
			'UPDATE employees SET salary = salary * 1.1 WHERE id = 1 OUTPUT INSERTED.id, INSERTED.name, INSERTED.salary'
		);
		assert.equal(res.length, 1);
		// Use approximate equality for floating point
		assert.equal(res[0].id, 1);
		assert.equal(res[0].name, 'John');
		assert.ok(
			Math.abs(res[0].salary - 55000) < 0.01,
			'Expected salary ~55000, got ' + res[0].salary
		);
	});

	it('F) UPDATE with OUTPUT clause - DELETED columns', function () {
		alasql('create table stock (id int, symbol string, price number)');
		alasql('INSERT INTO stock VALUES (1, "AAPL", 150), (2, "GOOGL", 2800)');
		var res = alasql('UPDATE stock SET price = 160 WHERE symbol = "AAPL" OUTPUT DELETED.price');
		assert.equal(res.length, 1);
		assert.deepStrictEqual(res[0], {price: 150});
	});

	it('G) UPDATE with OUTPUT clause - both INSERTED and DELETED', function () {
		alasql('create table prices (id int, item string, old_price number, new_price number)');
		alasql('INSERT INTO prices VALUES (1, "Widget", 10, 10)');
		// Note: This test may need adjustment based on how we handle DELETED vs INSERTED
		var res = alasql(
			'UPDATE prices SET new_price = 15 WHERE id = 1 OUTPUT INSERTED.id, DELETED.new_price AS oldval, INSERTED.new_price AS newval'
		);
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
		assert.equal(res[0].oldval, 10);
		assert.equal(res[0].newval, 15);
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

	// Edge case tests to ensure existing functionality is not broken
	it('L) INSERT without OUTPUT clause still works', function () {
		alasql('create table no_output_test (id int, name string)');
		var res = alasql('INSERT INTO no_output_test VALUES (1, "Test")');
		assert.equal(res, 1); // Should return count, not data
		var data = alasql('SELECT * FROM no_output_test');
		assert.equal(data.length, 1);
		assert.equal(data[0].id, 1);
	});

	it('M) DELETE without OUTPUT clause still works', function () {
		alasql('create table del_no_output (id int, name string)');
		alasql('INSERT INTO del_no_output VALUES (1, "Test"), (2, "Test2")');
		var res = alasql('DELETE FROM del_no_output WHERE id = 1');
		assert.equal(res, 1); // Should return count
		var data = alasql('SELECT * FROM del_no_output');
		assert.equal(data.length, 1);
	});

	it('N) UPDATE without OUTPUT clause still works', function () {
		alasql('create table upd_no_output (id int, val int)');
		alasql('INSERT INTO upd_no_output VALUES (1, 10), (2, 20)');
		var res = alasql('UPDATE upd_no_output SET val = 15 WHERE id = 1');
		assert.equal(res, 1); // Should return count
		var data = alasql('SELECT * FROM upd_no_output WHERE id = 1');
		assert.equal(data[0].val, 15);
	});

	it('O) INSERT OR REPLACE with OUTPUT', function () {
		alasql('create table replace_test (id int, name string)');
		var res = alasql('INSERT OR REPLACE INTO replace_test VALUES (1, "First") OUTPUT INSERTED.*');
		assert.equal(res.length, 1);
		assert.equal(res[0].name, 'First');
	});

	it('P) REPLACE with OUTPUT', function () {
		alasql('create table replace_test2 (id int, name string)');
		var res = alasql('REPLACE INTO replace_test2 VALUES (1, "Test") OUTPUT INSERTED.*');
		assert.equal(res.length, 1);
		assert.equal(res[0].name, 'Test');
	});

	it('Q) INSERT SELECT with OUTPUT', function () {
		alasql('create table source (id int, name string)');
		alasql('create table dest (id int, name string)');
		alasql('INSERT INTO source VALUES (1, "Test1"), (2, "Test2")');
		var res = alasql('INSERT INTO dest SELECT * FROM source OUTPUT INSERTED.*');
		assert.equal(res.length, 2);
		assert.equal(res[0].id, 1);
		assert.equal(res[1].id, 2);
	});

	it('R) Multiple row INSERT with OUTPUT', function () {
		alasql('create table multi_insert (id int, val string)');
		var res = alasql(
			'INSERT INTO multi_insert VALUES (1, "a"), (2, "b"), (3, "c"), (4, "d") OUTPUT INSERTED.*'
		);
		assert.equal(res.length, 4);
		assert.equal(res[0].val, 'a');
		assert.equal(res[3].val, 'd');
	});

	it('S) UPDATE multiple rows with OUTPUT', function () {
		alasql('create table multi_update (id int, status string)');
		alasql('INSERT INTO multi_update VALUES (1, "old"), (2, "old"), (3, "old")');
		var res = alasql('UPDATE multi_update SET status = "new" OUTPUT INSERTED.id, INSERTED.status');
		assert.equal(res.length, 3);
		res.forEach(function (row) {
			assert.equal(row.status, 'new');
		});
	});

	it('T) DELETE multiple rows with OUTPUT', function () {
		alasql('create table multi_delete (id int, category string)');
		alasql('INSERT INTO multi_delete VALUES (1, "A"), (2, "B"), (3, "A"), (4, "B"), (5, "A")');
		var res = alasql('DELETE FROM multi_delete WHERE category = "A" OUTPUT DELETED.*');
		assert.equal(res.length, 3);
		assert.equal(res[0].category, 'A');
		assert.equal(res[1].category, 'A');
		assert.equal(res[2].category, 'A');
	});

	it('U) OUTPUT with expressions and calculations', function () {
		alasql('create table calc_test (id int, price number, quantity int)');
		alasql('INSERT INTO calc_test VALUES (1, 10.5, 3)');
		// Note: This test verifies that direct column access works
		var res = alasql(
			'UPDATE calc_test SET price = 12.0 WHERE id = 1 OUTPUT INSERTED.id, INSERTED.price'
		);
		assert.equal(res.length, 1);
		assert.equal(res[0].price, 12.0);
	});

	it('V) Verify INSERT with VALUES keyword explicitly', function () {
		alasql('create table values_test (id int, name string)');
		var res = alasql('INSERT INTO values_test VALUES (1, "Test") OUTPUT INSERTED.*');
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
	});

	it('W) Verify INSERT without VALUES keyword', function () {
		alasql('create table novalues_test (id int, name string)');
		var res = alasql('INSERT INTO novalues_test (1, "Test") OUTPUT INSERTED.*');
		assert.equal(res.length, 1);
		assert.equal(res[0].id, 1);
	});
});
