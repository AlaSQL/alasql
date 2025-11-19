// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 323 ANY() and ALL()', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test323; USE test323');
		done();
	});

	var data = [{a: 1}, {a: 2}];
	test('2. ALL', done => {
		var res = alasql('SEARCH ALL(/a) FROM ?', [data]);
		expect(res).toEqual([1, 2]); // To be checked
		done();
	});

	test('3. ANY', done => {
		var res = alasql('SEARCH ANY(/a) FROM ?', [data]);
		expect(res).toEqual([1]); // To be checked
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test323');
		done();
	});
});
