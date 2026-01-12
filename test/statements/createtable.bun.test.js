import {describe, expect, test, beforeEach, afterEach} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('CREATE TABLE statement', () => {
	let dbName;

	beforeEach(() => {
		dbName = 'testdb_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		alasql(`USE ${dbName}`);
	});

	afterEach(() => {
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('CREATE TABLE basic', () => {
		const result = alasql('CREATE TABLE users (id INT, name STRING)');
		expect(result).toBe(1);

		alasql("INSERT INTO users VALUES (1, 'Alice')");
		const rows = alasql('SELECT * FROM users');
		expect(rows).toStrictEqual([{id: 1, name: 'Alice'}]);
	});

	test('CREATE TABLE with multiple columns', () => {
		alasql('CREATE TABLE products (id INT, name STRING, price NUMBER, active BOOLEAN)');
		alasql("INSERT INTO products VALUES (1, 'Widget', 9.99, true)");

		const rows = alasql('SELECT * FROM products');
		expect(rows).toStrictEqual([{id: 1, name: 'Widget', price: 9.99, active: true}]);
	});

	test('CREATE TABLE IF NOT EXISTS', () => {
		alasql('CREATE TABLE items (id INT)');
		const result = alasql('CREATE TABLE IF NOT EXISTS items (id INT)');
		expect(result).toBe(0);
	});

	test('CREATE TABLE with PRIMARY KEY', () => {
		alasql('CREATE TABLE orders (id INT PRIMARY KEY, amount NUMBER)');
		alasql('INSERT INTO orders VALUES (1, 100)');

		expect(() => {
			alasql('INSERT INTO orders VALUES (1, 200)');
		}).toThrow();
	});

	test('CREATE TABLE with NOT NULL', () => {
		alasql('CREATE TABLE required (id INT, name STRING NOT NULL)');

		expect(() => {
			alasql('INSERT INTO required (id) VALUES (1)');
		}).toThrow();
	});
});

describe('DROP TABLE statement', () => {
	let dbName;

	beforeEach(() => {
		dbName = 'testdb_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		alasql(`USE ${dbName}`);
	});

	afterEach(() => {
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('DROP TABLE basic', () => {
		alasql('CREATE TABLE mytable (id INT)');
		const result = alasql('DROP TABLE mytable');
		expect(result).toBe(1);

		expect(() => {
			alasql('SELECT * FROM mytable');
		}).toThrow();
	});

	test('DROP TABLE IF EXISTS', () => {
		const result = alasql('DROP TABLE IF EXISTS nonexistent');
		expect(result).toBe(0);
	});

	test('DROP TABLE removes data', () => {
		alasql('CREATE TABLE data (id INT)');
		alasql('INSERT INTO data VALUES (1), (2), (3)');
		alasql('DROP TABLE data');

		alasql('CREATE TABLE data (id INT)');
		const rows = alasql('SELECT * FROM data');
		expect(rows).toStrictEqual([]);
	});
});

describe('TRUNCATE TABLE statement', () => {
	let dbName;

	beforeEach(() => {
		dbName = 'testdb_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		alasql(`USE ${dbName}`);
	});

	afterEach(() => {
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('TRUNCATE TABLE removes all data', () => {
		alasql('CREATE TABLE items (id INT)');
		alasql('INSERT INTO items VALUES (1), (2), (3)');

		alasql('TRUNCATE TABLE items');
		const rows = alasql('SELECT * FROM items');
		expect(rows).toStrictEqual([]);
	});

	test('TRUNCATE TABLE keeps structure', () => {
		alasql('CREATE TABLE items (id INT, name STRING)');
		alasql("INSERT INTO items VALUES (1, 'test')");
		alasql('TRUNCATE TABLE items');

		alasql("INSERT INTO items VALUES (2, 'new')");
		const rows = alasql('SELECT * FROM items');
		expect(rows).toStrictEqual([{id: 2, name: 'new'}]);
	});
});
