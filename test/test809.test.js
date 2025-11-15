// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var dbFile = __dirname + '/test_db_fs.json';

var testData = [
	{a: -2, b: -5},
	{a: -2, b: null},
	{a: -2, b: 1},
	{a: null, b: -5},
	{a: null, b: null},
	{a: null, b: 1},
	{a: 3, b: -5},
	{a: 3, b: null},
	{a: 3, b: 1},
];

// Without NULL FIRST/LAST null is sorted as 0
var testDataAscAsc = [
	{a: -2, b: -5},
	{a: -2, b: null},
	{a: -2, b: 1},
	{a: null, b: -5},
	{a: null, b: null},
	{a: null, b: 1},
	{a: 3, b: -5},
	{a: 3, b: null},
	{a: 3, b: 1},
];

var testDataDescDesc = [
	{a: 3, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: null, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
];

// Things get better with NULL FIRST/LAST
var testDataAscFirstAscFirst = [
	{a: null, b: null},
	{a: null, b: -5},
	{a: null, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
];

var testDataAscFirstAscLast = [
	{a: null, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: 3, b: null},
];

var testDataDescFirstAscFirst = [
	{a: null, b: null},
	{a: null, b: -5},
	{a: null, b: 1},
	{a: 3, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: -2, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
];

var testDataDescFirstAscLast = [
	{a: null, b: -5},
	{a: null, b: 1},
	{a: null, b: null},
	{a: 3, b: -5},
	{a: 3, b: 1},
	{a: 3, b: null},
	{a: -2, b: -5},
	{a: -2, b: 1},
	{a: -2, b: null},
];

describe('Test 809 - ORDER BY', () => {
	test('without NULLS clause', done => {
		var res;
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC, b ASC', [testData]);
		expect(res).toEqual(testDataAscAsc);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC, b DESC', [testData]);
		expect(res).toEqual(testDataDescDesc);
		done();
	});
	test('with NULLS CLAUSE', done => {
		var res;
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS FIRST, b ASC NULLS FIRST', [testData]);
		expect(res).toEqual(testDataAscFirstAscFirst);
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS FIRST, b ASC NULLS LAST', [testData]);
		expect(res).toEqual(testDataAscFirstAscLast);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS FIRST, b ASC NULLS FIRST', [testData]);
		expect(res).toEqual(testDataDescFirstAscFirst);
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS FIRST, b ASC NULLS LAST', [testData]);
		expect(res).toEqual(testDataDescFirstAscLast);

		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS LAST, b DESC NULLS LAST', [testData]);
		expect(res).toEqual(testDataAscFirstAscFirst.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a DESC NULLS LAST, b DESC NULLS FIRST', [testData]);
		expect(res).toEqual(testDataAscFirstAscLast.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS LAST, b DESC NULLS LAST', [testData]);
		expect(res).toEqual(testDataDescFirstAscFirst.slice().reverse());
		res = alasql('SELECT a, b FROM ? ORDER BY a ASC NULLS LAST, b DESC NULLS FIRST', [testData]);
		expect(res).toEqual(testDataDescFirstAscLast.slice().reverse());

		done();
	});
});
