// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {unlink} from 'fs';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

(alasql.utils.isNode ? describe : describe.skip)('Test 815 date parsing options', function () {
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

	test('1. stores date and retrieves date correctly', function (done) {
		var res = alasql('SELECT * FROM dates');

		assert.deepEqual(res[0].date, now);
		assert.deepEqual(res[1].date, unixepoch);

		done();
	});
	test('2. XLSX parses date as number', function () {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
			return alasql
				.promise('SELECT * FROM xlsx("test/test815.xlsx", {cellDates: false})')
				.then(function (res) {
					assert.equal(typeof res[0].date, 'number');
					assert.equal(typeof res[1].date, 'number');
				});
		});
	});
	test('3. XLSX parses date as date', function () {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
			return alasql.promise('SELECT * FROM xlsx("test/test815.xlsx")').then(function (res) {
				assert.equal(res[0].date instanceof Date, true);
				assert.equal(res[1].date instanceof Date, true);
				// next assertion is like this since it is often off by 1 millisecond in CI.
				// this asserts that the time difference between now and alasql's date is less than 100 milliseconds
				assert.equal(res[0].date.getTime() - now.getTime() < 100, true);
				assert.equal(res[1].date.getTime() - unixepoch.getTime() < 100, true);
			});
		});
	});
});
