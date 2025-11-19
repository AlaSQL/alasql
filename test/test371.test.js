// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 371 INSERT OR REPLACE', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test371');
		done();
	});

	test('2. Test INSERT', done => {
		alasql('CREATE TABLE test371.one (a INT PRIMARY KEY, b STRING)');
		alasql('INSERT INTO test371.one VALUES (1,"One"), (2,"Two"), (3,"Three")');
		var res = alasql('SELECT * FROM test371.one');
		expect(res).toEqual([
			{a: 1, b: 'One'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		alasql('CREATE TABLE test371.two (a INT PRIMARY KEY, b STRING)');
		alasql('INSERT INTO test371.two VALUES (4,"Four"), (5,"Five"), (1,"Ein")');
		var res = alasql('SELECT * FROM test371.two');
		expect(res).toEqual([
			{a: 4, b: 'Four'},
			{a: 5, b: 'Five'},
			{a: 1, b: 'Ein'},
		]);

		done();
	});

	test('3. Test INSERT OR REPLACE', done => {
		var res = alasql('INSERT OR REPLACE INTO test371.one VALUES (1,"Uno")');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT * FROM test371.one');
		expect(res).toEqual([
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		done();
	});

	test('4. Test INSERT OR REPLACE SELECT', done => {
		var res = alasql('INSERT OR REPLACE INTO test371.one SELECT * FROM test371.two');
		expect(res == 3).toBe(true);
		//console.log(res);

		//        expect(res == 1).toBe(true);

		var res = alasql('SELECT * FROM test371.one');

		expect(res).toEqual([
			{a: 1, b: 'Ein'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
			{a: 4, b: 'Four'},
			{a: 5, b: 'Five'},
		]);

		done();
	});

	test('5. Test REPLACE with existing record', done => {
		alasql('DELETE FROM test371.one WHERE a IN (4,5)');
		alasql('INSERT OR REPLACE INTO test371.one VALUES (1,"Uno")');

		var res = alasql('REPLACE INTO test371.one VALUES (2,"Deux")');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT * FROM test371.one');
		expect(res).toEqual([
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Deux'},
			{a: 3, b: 'Three'},
		]);

		done();
	});

	test('6. Test REPLACE without existing record', done => {
		var res = alasql('REPLACE INTO test371.one VALUES (4,"Quarto")');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT * FROM test371.one');
		expect(res).toEqual([
			{a: 1, b: 'Uno'},
			{a: 2, b: 'Deux'},
			{a: 3, b: 'Three'},
			{a: 4, b: 'Quarto'},
		]);

		done();
	});

	test('98. DROP TABLE', done => {
		alasql('DROP TABLE test371.one');
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test371');
		done();
	});
});
