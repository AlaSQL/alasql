import {describe, expect, test} from 'bun:test';
// Use legacy dist for integration testing until ESM entry is fully wired
import alasql from '../../dist/alasql.fs.js';

describe('Database integration', () => {
	test('CREATE DATABASE works', () => {
		const dbName = 'test_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}`);
		expect(alasql.databases[dbName]).toBeDefined();
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('CREATE TABLE works', () => {
		const dbName = 'test_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}; USE ${dbName}`);
		alasql('CREATE TABLE users (id INT, name STRING)');
		expect(alasql.databases[dbName].tables.users).toBeDefined();
		alasql(`DROP DATABASE ${dbName}`);
	});

	test('INSERT and SELECT work', () => {
		const dbName = 'test_' + Date.now();
		alasql(`CREATE DATABASE ${dbName}; USE ${dbName}`);
		alasql('CREATE TABLE users (id INT, name STRING)');
		alasql("INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')");
		const result = alasql('SELECT * FROM users');
		expect(result).toHaveLength(2);
		expect(result[0].name).toBe('Alice');
		alasql(`DROP DATABASE ${dbName}`);
	});
});
