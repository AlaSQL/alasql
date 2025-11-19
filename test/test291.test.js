// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 291 - Promises:', () => {
	test('.promise', done => {
		alasql
			.promise('SELECT VALUE 1')
			.then(function (res) {
				expect(res).toEqual(1);
				done();
			})
			.catch(function (err) {
				throw err;
			});
	});

	test('.promise all', done => {
		// this.timeout(2000); // dont get why this is timing out...

		alasql
			.promise(['SELECT VALUE 1'])
			.then(function (res) {
				expect(res).toEqual([1]);
				done();
			})
			.catch(function (err) {
				//console.log(err)
				throw err;
			});
	});

	test('.promise .catch exception', done => {
		// this.timeout(2000); // dont get why this is timing out...

		alasql.promise('SELECT * FROM tableThatDoesNotExists').catch(function (err) {
			expect(err instanceof Error).toBe(true);
			done();
		});
	});

	test('.promise all .catch exception', done => {
		// this.timeout(5000); // dont get why this is timing out...

		alasql.promise(['SELECT * FROM tableThatDoesNotExists']).catch(function (err) {
			expect(err instanceof Error).toBe(true);
			done();
		});
	});

	test('.promise all multi + params', done => {
		alasql
			.promise(['value of SELECT 1', ['value of select ?', 2]])
			.then(function (res) {
				expect(res).toEqual([1, 2]);
				done();
			})
			.catch(function (reason) {
				console.log(reason);
			});
	});

	test('.promise all, lazy notation', done => {
		alasql(['value of SELECT 1 --so lazy', ['value of select ?', 2]])
			.then(function (res) {
				expect(res).toEqual([1, 2]);
				done();
			})
			.catch(function (reason) {
				console.log(reason);
			});
	});
});
