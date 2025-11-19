// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 281 UNIQUE Columns (for Meteor-Postgres)', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test281;USE test281');
		done();
	});

	test('2. UNIQUE constraint', done => {
		alasql('CREATE TABLE usersTable (id INT, name NVARCHAR(255) UNIQUE)');
		alasql('INSERT INTO usersTable VALUES (1,"Andrey")');
		alasql('INSERT INTO usersTable VALUES (2,"Kate")');
		done();
	});

	test('3. Shoud be the error here with UNIQUE constraint', done => {
		expect(() => {
			alasql('INSERT INTO usersTable VALUES (3,"Andrey")');
		}).toThrow(Error);
		done();
	});

	test('4. UNIQUE constraint', done => {
		alasql('DELETE FROM usersTable WHERE name = "Andrey"');
		done();
	});

	test('5. INSERT after deletion', done => {
		alasql('INSERT INTO usersTable VALUES (4,"Andrey")');
		done();
	});

	test('6. Shoud be the error here with UNIQUE constraint', done => {
		expect(() => {
			alasql('INSERT INTO usersTable VALUES (5,"Andrey")');
		}).toThrow(Error);
		done();
	});

	test('7. Test', done => {
		var res = alasql('SELECT * FROM usersTable');
		expect(res).toEqual([
			{id: 2, name: 'Kate'},
			{id: 4, name: 'Andrey'},
		]);
		done();
	});

	test('8. Shoud be the error here with UNIQUE constraint', done => {
		expect(() => {
			alasql('UPDATE usersTable SET name = "Andrey" WHERE name = "Kate"');
		}).toThrow(Error);
		done();
	});

	test('9. Test', done => {
		var res = alasql('SELECT * FROM usersTable');
		expect(res).toEqual([
			{id: 2, name: 'Kate'},
			{id: 4, name: 'Andrey'},
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test281');
		done();
	});
});
