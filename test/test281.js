// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 281 UNIQUE Columns (for Meteor-Postgres)', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test281;USE test281');
		done();
	});

	test('2. UNIQUE constraint', function (done) {
		alasql('CREATE TABLE usersTable (id INT, name NVARCHAR(255) UNIQUE)');
		alasql('INSERT INTO usersTable VALUES (1,"Andrey")');
		alasql('INSERT INTO usersTable VALUES (2,"Kate")');
		done();
	});

	test('3. Shoud be the error here with UNIQUE constraint', function (done) {
		assert.throws(function () {
			alasql('INSERT INTO usersTable VALUES (3,"Andrey")');
		}, Error);
		done();
	});

	test('4. UNIQUE constraint', function (done) {
		alasql('DELETE FROM usersTable WHERE name = "Andrey"');
		done();
	});

	test('5. INSERT after deletion', function (done) {
		alasql('INSERT INTO usersTable VALUES (4,"Andrey")');
		done();
	});

	test('6. Shoud be the error here with UNIQUE constraint', function (done) {
		assert.throws(function () {
			alasql('INSERT INTO usersTable VALUES (5,"Andrey")');
		}, Error);
		done();
	});

	test('7. Test', function (done) {
		var res = alasql('SELECT * FROM usersTable');
		assert.deepEqual(res, [
			{id: 2, name: 'Kate'},
			{id: 4, name: 'Andrey'},
		]);
		done();
	});

	test('8. Shoud be the error here with UNIQUE constraint', function (done) {
		assert.throws(function () {
			alasql('UPDATE usersTable SET name = "Andrey" WHERE name = "Kate"');
		}, Error);
		done();
	});

	test('9. Test', function (done) {
		var res = alasql('SELECT * FROM usersTable');
		assert.deepEqual(res, [
			{id: 2, name: 'Kate'},
			{id: 4, name: 'Andrey'},
		]);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test281');
		done();
	});
});
