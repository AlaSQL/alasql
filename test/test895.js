if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 895 - SERIAL type should not overwrite explicitly provided values', function () {
	const testId = '895';

	before(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(() => {
		alasql('drop database test' + testId);
	});

	it('A) SERIAL column should auto-increment when not provided', () => {
		alasql(`
			CREATE TABLE users (id serial, name varchar(50));
			INSERT INTO users (name) VALUES ("first");
			INSERT INTO users (name) VALUES ("second");
			INSERT INTO users (name) VALUES ("third");
		`);
		var res = alasql('SELECT * FROM users ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'first'},
			{id: 2, name: 'second'},
			{id: 3, name: 'third'},
		]);
	});

	it('B) SERIAL column should accept explicitly provided value', () => {
		alasql(`
			CREATE TABLE products (id serial, name varchar(50));
			INSERT INTO products (id, name) VALUES (10, "first");
			INSERT INTO products (id, name) VALUES (20, "second");
			INSERT INTO products (id, name) VALUES (30, "third");
		`);
		var res = alasql('SELECT * FROM products ORDER BY id');
		assert.deepEqual(res, [
			{id: 10, name: 'first'},
			{id: 20, name: 'second'},
			{id: 30, name: 'third'},
		]);
	});

	it('C) SERIAL column should accept explicitly provided value even if lower than counter', () => {
		alasql(`
			CREATE TABLE orders (id serial, name varchar(50));
			INSERT INTO orders (name) VALUES ("auto1");
			INSERT INTO orders (name) VALUES ("auto2");
			INSERT INTO orders (name) VALUES ("auto3");
			INSERT INTO orders (id, name) VALUES (100, "explicit");
		`);
		var res = alasql('SELECT * FROM orders ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'auto1'},
			{id: 2, name: 'auto2'},
			{id: 3, name: 'auto3'},
			{id: 100, name: 'explicit'},
		]);
	});

	it('D) SERIAL with mixed auto and explicit values', () => {
		alasql(`
			CREATE TABLE customers (id serial, name varchar(50));
			INSERT INTO customers (id, name) VALUES (5, "explicit5");
			INSERT INTO customers (name) VALUES ("auto");
			INSERT INTO customers (id, name) VALUES (10, "explicit10");
			INSERT INTO customers (name) VALUES ("auto2");
		`);
		var res = alasql('SELECT * FROM customers ORDER BY id');
		assert.deepEqual(res, [
			{id: 5, name: 'explicit5'},
			{id: 6, name: 'auto'},
			{id: 10, name: 'explicit10'},
			{id: 11, name: 'auto2'},
		]);
	});

	it('E) Bulk insert with explicit SERIAL values', () => {
		alasql(`
			CREATE TABLE items (id serial, name varchar(50));
			INSERT INTO items (id, name) VALUES (4, "item4"), (8, "item8"), (12, "item12");
		`);
		var res = alasql('SELECT * FROM items ORDER BY id');
		assert.deepEqual(res, [
			{id: 4, name: 'item4'},
			{id: 8, name: 'item8'},
			{id: 12, name: 'item12'},
		]);
	});

	it('F) Re-inserting data after truncate with explicit IDs', () => {
		alasql(`
			CREATE TABLE records (id serial, name varchar(50));
			INSERT INTO records (name) VALUES ("first"), ("second"), ("third");
		`);
		var res1 = alasql('SELECT * FROM records ORDER BY id');
		assert.deepEqual(res1, [
			{id: 1, name: 'first'},
			{id: 2, name: 'second'},
			{id: 3, name: 'third'},
		]);

		// Simulate the flush scenario from the issue
		alasql(`
			DELETE FROM records;
			INSERT INTO records (id, name) VALUES (4, "item4");
			INSERT INTO records (id, name) VALUES (7, "item7");
			INSERT INTO records (id, name) VALUES (9, "item9");
		`);

		var res2 = alasql('SELECT * FROM records ORDER BY id');
		assert.deepEqual(res2, [
			{id: 4, name: 'item4'},
			{id: 7, name: 'item7'},
			{id: 9, name: 'item9'},
		]);
	});
});
