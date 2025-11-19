// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var testId = '1666';
describe('Test' + testId + 'Newline characters in like', () => {
	test('1. LIKE', done => {
		var data = [
			{a: 'one', b: 'first'},
			{a: 'two', b: 'second\n\ritem'},
			{a: 'THREE', b: 'THI\n\rRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE b LIKE "t%"', [data]);

		//console.log(res);
		expect(res).toEqual([{b: 'THI\n\rRD'}]);
		done();
	});

	test('2. LIKE', done => {
		var data = [
			{a: 'one', b: 'Nine'},
			{a: 'two', b: 'second\n\ritem'},
			{a: 'THREE', b: 'THIRD'},
			{a: 'FOUR', b: '\n\rFifth'},
			{a: 'FIVE', b: 'Six\nth'},
		];

		var res = alasql('SELECT b FROM ? WHERE b LIKE "%T%"', [data]);

		//console.log(res);
		expect(res).toEqual([{b: 'second\n\ritem'}, {b: 'THIRD'}, {b: '\n\rFifth'}, {b: 'Six\nth'}]);
		done();
	});

	test('3. LIKE', done => {
		var data = [
			{a: 'one', b: 0},
			{a: 'three', b: 'three'},
			{a: 'two', b: '0ne'},
		];

		var res = alasql('SELECT b FROM ? WHERE b LIKE "0%"', [data]);

		//console.log(res);
		expect(res).toEqual([{b: 0}, {b: '0ne'}]);
		done();
	});
});
