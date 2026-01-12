import {describe, expect, test, beforeEach, afterEach} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('UPDATE statement', () => {
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

	test('UPDATE single column', () => {
		const result = alasql('UPDATE users SET age = 31 WHERE id = 1');
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users WHERE id = 1');
		expect(rows).toStrictEqual([{id: 1, name: 'Alice', age: 31}]);
	});

	test('UPDATE multiple columns', () => {
		const result = alasql("UPDATE users SET name = 'Alicia', age = 32 WHERE id = 1");
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users WHERE id = 1');
		expect(rows).toStrictEqual([{id: 1, name: 'Alicia', age: 32}]);
	});

	test('UPDATE multiple rows', () => {
		const result = alasql('UPDATE users SET age = 40 WHERE age > 25');
		expect(result).toBe(2);

		const rows = alasql('SELECT * FROM users WHERE age = 40 ORDER BY id');
		expect(rows).toStrictEqual([
			{id: 1, name: 'Alice', age: 40},
			{id: 3, name: 'Charlie', age: 40},
		]);
	});

	test('UPDATE all rows (no WHERE)', () => {
		const result = alasql('UPDATE users SET age = 50');
		expect(result).toBe(3);

		const rows = alasql('SELECT * FROM users ORDER BY id');
		expect(rows).toStrictEqual([
			{id: 1, name: 'Alice', age: 50},
			{id: 2, name: 'Bob', age: 50},
			{id: 3, name: 'Charlie', age: 50},
		]);
	});

	test('UPDATE with expression', () => {
		const result = alasql('UPDATE users SET age = age + 1 WHERE id = 2');
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users WHERE id = 2');
		expect(rows).toStrictEqual([{id: 2, name: 'Bob', age: 26}]);
	});

	test('UPDATE returns count of affected rows', () => {
		const result = alasql('UPDATE users SET age = 99 WHERE id > 100');
		expect(result).toBe(0);
	});
});
