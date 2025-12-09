if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 136-B - INSERT INTO table SET column = value', function () {
	const test = '136B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Basic INSERT SET with single column', function () {
		alasql('CREATE TABLE users (id INT, name STRING)');
		var res = alasql('INSERT INTO users SET id = 1, name = "John"');
		assert.equal(res, 1);

		var data = alasql('SELECT * FROM users');
		assert.deepEqual(data, [{id: 1, name: 'John'}]);
	});

	it('B) INSERT SET with multiple columns', function () {
		alasql('CREATE TABLE products (id INT, name STRING, price FLOAT, inStock BOOLEAN)');
		var res = alasql(
			'INSERT INTO products SET id = 1, name = "Widget", price = 19.99, inStock = true'
		);
		assert.equal(res, 1);

		var data = alasql('SELECT * FROM products');
		assert.deepEqual(data, [{id: 1, name: 'Widget', price: 19.99, inStock: true}]);
	});

	it('C) INSERT SET with expressions', function () {
		alasql('CREATE TABLE calculations (id INT, result INT)');
		var res = alasql('INSERT INTO calculations SET id = 1, result = 2 + 3');
		assert.equal(res, 1);

		var data = alasql('SELECT * FROM calculations');
		assert.deepEqual(data, [{id: 1, result: 5}]);
	});

	it('D) Multiple INSERT SET statements', function () {
		alasql('CREATE TABLE items (id INT, itemValue STRING)');
		alasql('INSERT INTO items SET id = 1, itemValue = "first"');
		alasql('INSERT INTO items SET id = 2, itemValue = "second"');
		alasql('INSERT INTO items SET id = 3, itemValue = "third"');

		var data = alasql('SELECT * FROM items ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, itemValue: 'first'},
			{id: 2, itemValue: 'second'},
			{id: 3, itemValue: 'third'},
		]);
	});

	it('E) INSERT SET with DEFAULT values', function () {
		alasql(
			'CREATE TABLE withDefaults (id INT, status STRING DEFAULT "active", quantity INT DEFAULT 0)'
		);
		alasql('INSERT INTO withDefaults SET id = 1, status = "inactive"');

		var data = alasql('SELECT * FROM withDefaults');
		// Explicit SET values should override defaults
		assert.deepEqual(data, [{id: 1, status: 'inactive', quantity: 0}]);
	});
});
