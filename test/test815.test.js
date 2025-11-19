// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {unlink} from 'fs';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

(alasql.utils.isNode ? describe : describe.skip)('Test 815 date parsing options', () => {
	var now = new Date();
	var unixepoch = new Date(0);

	beforeAll(() => {
		unlink('test/test815.xlsx', () => {});
		alasql('CREATE TABLE dates (date datetime)');
		alasql('INSERT INTO dates (?)', [now]);
		alasql('INSERT INTO dates (?)', [unixepoch]);
	});
	afterAll(() => {
		unlink('test/test815.xlsx', () => {});
	});

	test('1. stores date and retrieves date correctly', done => {
		var res = alasql('SELECT * FROM dates');

		expect(res[0].date).toEqual(now);
		expect(res[1].date).toEqual(unixepoch);

		done();
	});
	test('2. XLSX parses date as number', () => {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(() => {
			return alasql
				.promise('SELECT * FROM xlsx("test/test815.xlsx", {cellDates: false})')
				.then(function (res) {
					expect(typeof res[0].date).toEqual('number');
					expect(typeof res[1].date).toEqual('number');
				});
		});
	});
	test('3. XLSX parses date as date', () => {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(() => {
			return alasql.promise('SELECT * FROM xlsx("test/test815.xlsx")').then(function (res) {
				expect(res[0].date instanceof Date).toEqual(true);
				expect(res[1].date instanceof Date).toEqual(true);
				// next assertion is like this since it is often off by 1 millisecond in CI.
				// this asserts that the time difference between now and alasql's date is less than 100 milliseconds
				expect(res[0].date.getTime() - now.getTime() < 100).toEqual(true);
				expect(res[1].date.getTime() - unixepoch.getTime() < 100).toEqual(true);
			});
		});
	});
});
