// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 262 Leaking of "key" variable to global scope', () => {
		test('1. Sqllogic', done => {
			const mytable = [{name: 'Hello'}, {name: 'Wolrd'}];

			expect(typeof global.key === 'undefined').toBe(true); // undefined

			alasql('SELECT * FROM ?', [mytable]);
			expect(typeof global.key === 'undefined').toBe(true); // undefined

			done();
		});
	});
}
