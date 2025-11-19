// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1109 - Export empty tables to excel sheets', () => {
	const testId = '1109';

	beforeAll(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(() => {
		alasql('drop database test' + testId);
	});

	test('A) Export empty tables to excel sheets', () => {
		var res = [];
		var opts = [{sheetid: 'a'}, {sheetid: 'b'}];
		res.push(
			alasql('SELECT INTO XLSX("' + __dirname + '/restest1109.xlsx",?) FROM ?', [opts, [[], []]])
		);
		expect(res).toEqual([1]);
	});
});
