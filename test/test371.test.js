// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 371 INSERT OR REPLACE', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test371; USE test371');
		done();
	});

	test('2. Test INSERT', function (done) {
		alasql('CREATE TABLE one (a INT PRIMARY KEY, b STRING)');
		alasql('INSERT INTO one VALUES (1,"One"), (2,"Two"), (3,"Three")');
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 'One'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		alasql('CREATE TABLE two (a INT PRIMARY KEY, b STRING)');
		alasql('INSERT INTO two VALUES (4,"Four"), (5,"Five"), (1,"Ein")');
		var res = alasql('SELECT * FROM two');
		assert.deepEqual(res, [
			{a: 4, b: 'Four'},
			{a: 5, b: 'Five'},
			{a: 1, b: 'Ein'},
		]);

		done();
	});

	test('3. Test INSERT OR REPLACE', function (done) {
		var res = alasql('INSERT OR REPLACE INTO one VALUES (1,"Uno")');
		assert(res == 1);

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		done();
	});

	test('4. Test INSERT OR REPLACE SELECT', function (done) {
		var res = alasql('INSERT OR REPLACE INTO one SELECT * FROM two');
		assert(res == 3);
		//console.log(res);

		//        assert(res == 1);

		var res = alasql('SELECT * FROM one');

		assert.deepEqual(res, [
			{a: 1, b: 'Ein'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
			{a: 4, b: 'Four'},
			{a: 5, b: 'Five'},
		]);

		done();
	});

	test('5. Test REPLACE with existing record', function (done) {
		alasql('DELETE FROM one WHERE a IN (4,5)');
		alasql('INSERT OR REPLACE INTO one VALUES (1,"Uno")');

		var res = alasql('REPLACE INTO one VALUES (2,"Deux")');
		assert(res == 1);

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Deux'},
			{a: 3, b: 'Three'},
		]);

		done();
	});

	test('6. Test REPLACE without existing record', function (done) {
		var res = alasql('REPLACE INTO one VALUES (4,"Quarto")');
		assert(res == 1);

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Deux'},
			{a: 3, b: 'Three'},
			{a: 4, b: 'Quarto'},
		]);

		done();
	});

	test('98. DROP TABLE', function (done) {
		alasql('DROP TABLE one');
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test371');
		done();
	});
});
