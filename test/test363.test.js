// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 363 -> with undefined', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test363;USE test363');
		done();
	});

	test('2. TEST', done => {
		var res = alasql('VALUE OF SELECT a->name FROM ?', [[{a: {name: 'hello'}}]]);
		expect(res).toEqual('hello');
		var res = alasql('VALUE OF SELECT a->name FROM ?', [{}]);
		expect(res).toEqual(undefined);
		var res = alasql('VALUE OF SELECT {}->name');
		expect(res).toEqual(undefined);
		var res = alasql('VALUE OF SELECT {amt:10}->amt');
		expect(res).toEqual(10);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test363');
		done();
	});
});
