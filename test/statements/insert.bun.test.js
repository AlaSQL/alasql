import {describe, expect, test, beforeEach, afterEach} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('INSERT statement', () => {
	let dbName;

	beforeEach(() => {
		dbName = 'testdb_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		alasql(`USE ${dbName}`);
		alasql('CREATE TABLE users (id INT, name STRING)');
	});

	afterEach(() => {
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('INSERT single row', () => {
		const result = alasql("INSERT INTO users VALUES (1, 'Alice')");
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users');
		expect(rows).toStrictEqual([{id: 1, name: 'Alice'}]);
	});

	test('INSERT multiple rows', () => {
		const result = alasql("INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')");
		expect(result).toBe(2);

		const rows = alasql('SELECT * FROM users ORDER BY id');
		expect(rows).toStrictEqual([
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		]);
	});

	test('INSERT with column list', () => {
		const result = alasql("INSERT INTO users (name, id) VALUES ('Charlie', 3)");
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users');
		expect(rows).toStrictEqual([{id: 3, name: 'Charlie'}]);
	});

	test('INSERT with SELECT', () => {
		alasql("INSERT INTO users VALUES (1, 'Alice')");

		alasql('CREATE TABLE users2 (id INT, name STRING)');
		const result = alasql('INSERT INTO users2 SELECT * FROM users');
		expect(result).toBe(1);

		const rows = alasql('SELECT * FROM users2');
		expect(rows).toStrictEqual([{id: 1, name: 'Alice'}]);
	});

	test('INSERT returns count', () => {
		const result = alasql("INSERT INTO users VALUES (1, 'A'), (2, 'B'), (3, 'C')");
		expect(result).toBe(3);
	});
});
