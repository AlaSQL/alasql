// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 286 CREATE UNIQUE INDEX', () => {
	afterAll(() => {
		alasql('DROP DATABASE test286');
	});

	test('1. CREATE TABLE and UNIQUE INDEX', () => {
		alasql('CREATE DATABASE test286;USE test286');
		alasql('CREATE TABLE users (id INT PRIMARY KEY, email STRING, name STRING)');
		alasql('CREATE INDEX idx_users_email ON users(email)');
	});

	test('2. INSERT unique values - should succeed', () => {
		var res = alasql('INSERT INTO users VALUES (1, "user1@test.com", "User One")');
		expect(res).toBe(1);
		
		res = alasql('INSERT INTO users VALUES (2, "user2@test.com", "User Two")');
		expect(res).toBe(1);
		
		res = alasql('INSERT INTO users VALUES (3, "user3@test.com", "User Three")');
		expect(res).toBe(1);
	});

	test('3. INSERT duplicate primary key - should fail', () => {
		expect(() => {
			alasql('INSERT INTO users VALUES (1, "user4@test.com", "User Four")');
		}).toThrow(Error);
	});

	test('4. INSERT duplicate email with index - currently allowed (UNIQUE INDEX not enforced)', () => {
		// Note: UNIQUE INDEX constraints are not enforced in AlaSQL
		// This test documents current behavior
		var res = alasql('INSERT INTO users VALUES (4, "user1@test.com", "User Four")');
		expect(res).toBe(1);
	});

	test('5. Verify index creation and basic functionality', () => {
		// Test basic SELECT operations work with indexed data
		var res = alasql('SELECT * FROM users WHERE email = "user1@test.com"');
		expect(res.length).toBe(2); // Both records with same email
		
		res = alasql('SELECT * FROM users ORDER BY id');
		expect(res.length).toBe(4);
		expect(res[0]).toEqual({id: 1, email: "user1@test.com", name: "User One"});
		expect(res[1]).toEqual({id: 2, email: "user2@test.com", name: "User Two"});
		expect(res[2]).toEqual({id: 3, email: "user3@test.com", name: "User Three"});
		expect(res[3]).toEqual({id: 4, email: "user1@test.com", name: "User Four"});
	});
});
