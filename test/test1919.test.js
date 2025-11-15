// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
	Test for issue #1919
*/
describe(`Test 1919 Load data from JSONL file`, () => {
	const expectedResult = [
		{
			a: 'foo',
			b: 5,
			c: true,
			d: null,
		},
		{
			a: 'bar',
			b: 8,
			c: false,
			d: null,
		},
	];
	test('1. Load JSONL', done => {
		alasql('SELECT * FROM JSONL("' + __dirname + '/test1919")', [], function (res) {
			expect(res).toEqual(expectedResult);
			done();
		});
	});

	test('2. Load NDJSON', done => {
		alasql('SELECT * FROM NDJSON("' + __dirname + '/test1919")', [], function (res) {
			expect(res).toEqual(expectedResult);
			done();
		});
	});

	test('3. Load NDJSON - will accept file with different  extension', done => {
		alasql('SELECT * FROM NDJSON("' + __dirname + '/test1919.jsonl")', [], function (res) {
			expect(res).toEqual(expectedResult);
			done();
		});
	});

	test('4. Load JSONL - will accept file with different extension', done => {
		alasql('SELECT * FROM JSONL("' + __dirname + '/test1919.ndjson")', [], function (res) {
			expect(res).toEqual(expectedResult);
			done();
		});
	});
});
