// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 137 get JSON property', () => {
	test('1. Get JSON object', done => {
		var res = alasql('SELECT VALUE @{a:1, b:2}');
		expect(res).toEqual({a: 1, b: 2});

		var res = alasql('SELECT VALUE @{a:1, b:2} = @{a:1, b:2}');
		expect(res == false).toBe(true);

		// TODO compare objects of known types!!! (without deepEqual!)
		// or warning at the time of compilation!

		var res = alasql('SELECT VALUE @{a:1, b:2} == @{a:1, b:2}');
		expect(res == true).toBe(true);

		var res = alasql('SELECT VALUE @{a:1, b:2} != @{a:1, b:2}');
		expect(res == true).toBe(true);

		// TODO compare objects of known types!!! (without deepEqual!)

		var res = alasql('SELECT VALUE @{a:1, b:2} !== @{a:1, b:2}');
		expect(res == false).toBe(true);

		var res = alasql('SELECT VALUE @{a:1, b:2} = @{a:2, b:2}');
		expect(res == false).toBe(true);

		var res = alasql('SELECT VALUE @{a:1, b:2} == @{a:2, b:2}');
		expect(res == false).toBe(true);

		var res = alasql('SELECT VALUE @{a:1, b:2} != @{a:2, b:2}');
		expect(res == true).toBe(true);

		var res = alasql('SELECT VALUE @{a:1, b:2} !== @{a:2, b:2}');
		expect(res == true).toBe(true);

		done();
	});

	test('2. Get JSON property operator', done => {
		var res = alasql('SELECT VALUE {a:1, b:2}->a');
		expect(res).toEqual(1);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->b');
		expect(res).toEqual([3, {c: 3, d: 4}, 5, 6]);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->b->3');
		expect(res == 6).toBe(true);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->("b")->("3")');
		expect(res == 6).toBe(true);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->("b")->3');
		expect(res == 6).toBe(true);

		var res = alasql('SELECT VALUE {a:1, b1:@[3,{c:3,d:4},5,6]}->("b"+1)->(2*2-1)');
		expect(res == 6).toBe(true);

		done();
	});

	test('3. Get JSON param values', done => {
		//		var res = alasql('SELECT VALUE @{a:?, b:?}->a',[1,2]);
		var res = alasql('SELECT VALUE {a:?, b:?}->a', [1, 2]);
		//		console.log(71);
		expect(res == 1).toBe(true);
		var res = alasql('SELECT VALUE {a:?, b:?}->a', [1, 2]);
		expect(res == 1).toBe(true);
		done();
	});

	test('4. Get JSON param values in sub-arrays', done => {
		var res = alasql('SELECT VALUE @{a:1, b1:@[3,{c:?,d:4},?,6]}', [100, 200]);
		expect(res).toEqual({a: 1, b1: [3, {c: 100, d: 4}, 200, 6]});

		var res = alasql('SELECT VALUE @{a:1, b1:@[3,{c:?,d:4},?,6]}->b1->1->c', [100, 200]);
		expect(res == 100).toBe(true);

		done();
	});
});
