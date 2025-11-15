// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 289 SEARCH INSTANCEOF', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test289;USE test289');
		done();
	});

	test('2. SEARCH', done => {
		var ast = alasql.parse('SELECT SUM(x)+20 FROM one GROUP BY x');

		// { statements: [ { columns: [
		//    { left: { aggregatorid: 'SUM', expression: [Object], over: undefined },
		//    op: '+',
		//    right: { value: 20 } } ], from: [Object], group: [Object] } ] }

		var res = alasql('SEARCH /+ aggregatorid FROM ?', [ast]);
		expect(res).toEqual(['SUM']);
		/// console.log(res);
		//    expect(res).toEqual([ { a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 } ]);
		done();
	});

	// TODO: Add other operators

	test('3. DROP DATABASE', done => {
		alasql('DROP DATABASE test289');
		done();
	});
});
