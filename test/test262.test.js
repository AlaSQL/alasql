// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 262 Leaking of "key" variable to global scope', function () {
		test('1. Sqllogic', function (done) {
			const mytable = [{name: 'Hello'}, {name: 'Wolrd'}];

			assert(typeof global.key === 'undefined'); // undefined

			alasql('SELECT * FROM ?', [mytable]);
			assert(typeof global.key === 'undefined'); // undefined

			done();
		});
	});
}
