// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined')
	describe('Test 155 - InsexedDB INSERT', function () {
		test('1. Multiple lines async', function (done) {
			alasql(
				'DROP IndexedDB DATABASE IF EXISTS ag155;' +
					'CREATE IndexedDB DATABASE ag155;' +
					'ATTACH IndexedDB DATABASE ag155 AS test155;' +
					'CREATE TABLE test155.one;' +
					'CREATE TABLE test155.two;' +
					'SELECT * INTO test155.one FROM ?;' +
					'SELECT * FROM test155.one' +
					'',
				[[{a: 1}, {a: 2}]],
				function (res) {
					//				console.trace();
					//			console.log(res);
					assert.deepEqual(res, [1, 1, 1, 1, 1, 2, [{a: 1}, {a: 2}]]);
					done();
				}
			);
		});
	});
