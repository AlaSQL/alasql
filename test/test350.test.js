// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 350 SERIAL data type', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test350;USE test350');
		done();
	});

	test('2. CREATE TABLE', done => {
		var res = alasql('CREATE TABLE one (id SERIAL, name STRING)');
		expect(res).toEqual(1);
		done();
	});

	test('3. INSERT', done => {
		var res = alasql('INSERT INTO one (name) VALUES ("One"), ("Two"), ("Three")');
		expect(res).toEqual(3);
		done();
	});

	test('4. SELECT', done => {
		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([
			{id: 1, name: 'One'},
			{id: 2, name: 'Two'},
			{id: 3, name: 'Three'},
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test350');
		done();
	});
});
