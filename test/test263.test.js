// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 263 MIN and MAX: aggregators and functions', () => {
		test('1. Test', done => {
			var data = [
				{a: 1, b: 3},
				{a: 2, b: 1},
				{a: 2, b: 3},
				{a: 8, b: 1},
			];
			var res = alasql('SELECT MAX(MAX(a),MIN(a)), MIN(MAX(a),MIN(a)) FROM ?', [data]);
			expect(res).toEqual([{'MAX(MAX(a),MIN(a))': 8, 'MIN(MAX(a),MIN(a))': 1}]);
			done();
		});

		test('2. Test MIN MAX', done => {
			var a = [
				{a: 1, b: 5},
				{a: 2, b: 0},
				{a: 0, b: -5},
				{a: 5, b: 5},
			];
			var res = alasql('SELECT MIN(`a`, `b`) AS c FROM ?', [a]);
			expect(res).toEqual([{c: 1}, {c: 0}, {c: -5}, {c: 5}]);
			//		console.log(res);
			var res = alasql('SELECT * FROM ? WHERE MIN(`a`, `b`) > 1', [a]);
			expect(res).toEqual([{a: 5, b: 5}]);
			//		console.log(res);
			done();
		});
		test('3. MIN in GROUP BY function', done => {
			var a = [
				{a: 1, b: 5},
				{a: 2, b: 0},
				{a: 0, b: -5},
				{a: 5, b: 5},
			];
			var res = alasql('SELECT b FROM ? GROUP BY b HAVING MIN(MIN(a),5) > 1', [a]);
			expect(res).toEqual([{b: 0}]);
			//		console.log(res);
			done();
		});
	});
}
