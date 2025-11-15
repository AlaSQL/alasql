// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 315a Brackets for SEARCH', () => {
	var data = {a: 10, b: 100, c: {d: 5, e: 6}};

	test('1. Simple Brackets', done => {
		var res = alasql('SEARCH a FROM ?', [data]);
		expect(res[0] == 10).toBe(true);
		done();
	});

	test('2. Simple Brackets', done => {
		var res = alasql('SEARCH (a) FROM ?', [data]);
		expect(res[0] == 10).toBe(true);
		done();
	});

	test('3. Simple Brackets', done => {
		var res = alasql('SEARCH WITH(c d) FROM ?', [data]);
		expect(res[0] == 5).toBe(true);

		done();
	});

	test('4. Simple Brackets', done => {
		var res = alasql('SEARCH c WITH(d) FROM ?', [data]);
		expect(res[0] == 5).toBe(true);

		done();
	});

	test('5. Simple Brackets', done => {
		var res = alasql('SEARCH WITH(c) d FROM ?', [data]);
		//    console.log(43,res);
		expect(res[0] == 5).toBe(true);

		done();
	});

	test('6. Simple Brackets', done => {
		var res = alasql('SEARCH with(c) with(d) FROM ?', [data]);
		//    console.log(51,res);
		expect(res[0] == 5).toBe(true);
		done();
	});
});
describe('Test 315b Brackets for SEARCH', () => {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	test('1. Simple Brackets', done => {
		var res = alasql('SEARCH / / a FROM ?', [data]);
		expect(res == 2).toBe(true);
		done();
	});

	test('2. Simple Brackets', done => {
		var res = alasql('SEARCH / a FROM ?', [data]);
		expect(res).toEqual([1]);
		done();
	});

	test('3. Simple Brackets', done => {
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		expect(res).toEqual([1, 2]);
		done();
	});

	test('4. Simple Brackets', done => {
		var res = alasql('SEARCH (/)+ a FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		done();
	});

	test('5. Simple Brackets', done => {
		var res = alasql('SEARCH ((/)+ (a)) FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		done();
	});

	test('6. Simple Brackets', done => {
		var res = alasql('SEARCH (/)? a FROM ?', [data]);
		expect(res).toEqual([1]);
		//    console.log(res);
		done();
	});
});

describe('Test 315c Brackets for SEARCH', () => {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	test('1. Simple Brackets', done => {
		var res = alasql('SEARCH /+ a FROM ?', [data]);
		expect(res).toEqual([1, 2]);

		done();
	});
	test('2. Simple Brackets', done => {
		var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		done();
	});
	test('3. Simple Brackets', done => {
		var res = alasql('SEARCH / + FROM ?', [data]);
		expect(res).toEqual([{a: 1}, {b: {a: 2}, c: 2}, {c: 3}, 1, {a: 2}, 2, 3, 2]);
		done();
	});

	test('4. Simple Brackets', done => {
		var res = alasql('SEARCH ((/+) a) FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		expect(res).toEqual([2, 1]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(ASC) FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		done();
	});

	test('5. Simple Brackets', done => {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		done();
	});
	test('6. Simple Brackets', done => {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		expect(res).toEqual([2, 1]);
		done();
	});
	test('7. Simple Brackets', done => {
		var res = alasql('SEARCH ALL(/+a) ORDER BY(DESC) FROM ?', [data]);
		expect(res).toEqual([2, 1]);
		done();
	});
	test('8. Simple Brackets', done => {
		var res = alasql('SEARCH ALL(/ *a) ORDER BY(DESC) FROM ?', [data]);
		expect(res).toEqual([2, 1]);
		done();
	});
});
