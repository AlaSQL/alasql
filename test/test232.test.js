// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var testNum = 232;

describe('Test 232 Errors handling', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testNum + '; USE test' + testNum + ';');
	});

	afterAll(() => {
		alasql('set errorlog off');
		alasql('DROP DATABASE test' + testNum + '');
	});

	test('2. Throw error', () => {
		alasql('set errorlog off');
		expect(() => {
			alasql('SELECT * FROM faultyName', [], function (data, err) {});
		}).toThrow(Error);
	});

	test('3. Log error async', done => {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName', [], function (data, err) {
			expect(/^Table does not exist\:/.test(err.message)).toBe(true);
			done();
		});
	});

	test('4. Log error sync', () => {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName');
		expect(/^Table does not exist\:/.test(alasql.error.message)).toBe(true);
		alasql('SELECT * FROM ?', [{a: 1}, {a: 2}]);
		expect(!alasql.error).toBe(true);
	});
});
