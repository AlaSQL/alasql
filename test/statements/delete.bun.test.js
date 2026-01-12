import {describe, expect, test, beforeEach, afterEach} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('DELETE statement', () => {
	let dbName;

	beforeEach(() => {
		dbName = 'testdb_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		alasql(`USE ${dbName}`);
		alasql('CREATE TABLE users (id INT, name STRING, age INT)');
		alasql("INSERT INTO users VALUES (1, 'Alice', 30), (2, 'Bob', 25), (3, 'Charlie', 35)");
	});

	afterEach(() => {
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('DELETE with WHERE clause', () => {
		const result = alasql('DELETE FROM users WHERE id = 1');
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users ORDER BY id');
		expect(rows).toStrictEqual([
			{id: 2, name: 'Bob', age: 25},
			{id: 3, name: 'Charlie', age: 35},
		]);
	});

	test('DELETE multiple rows', () => {
		const result = alasql('DELETE FROM users WHERE age > 25');
		expect(result).toBe(2);

		const rows = alasql('SELECT * FROM users');
		expect(rows).toStrictEqual([{id: 2, name: 'Bob', age: 25}]);
	});

	test('DELETE all rows (no WHERE)', () => {
		const result = alasql('DELETE FROM users');
		expect(result).toBe(3);

		const rows = alasql('SELECT * FROM users');
		expect(rows).toStrictEqual([]);
	});

	test('DELETE no matching rows', () => {
		const result = alasql('DELETE FROM users WHERE id > 100');
		expect(result).toBe(0);

		const rows = alasql('SELECT * FROM users ORDER BY id');
		expect(rows.length).toBe(3);
	});

	test('DELETE returns count of affected rows', () => {
		const result = alasql("DELETE FROM users WHERE name = 'Bob'");
		expect(result).toBe(1);
	});

	test('DELETE with complex WHERE', () => {
		const result = alasql("DELETE FROM users WHERE age >= 30 AND name != 'Alice'");
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users ORDER BY id');
		expect(rows).toStrictEqual([
			{id: 1, name: 'Alice', age: 30},
			{id: 2, name: 'Bob', age: 25},
		]);
	});
});
