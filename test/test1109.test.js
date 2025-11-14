// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 1109 - Export empty tables to excel sheets', function () {
	const testId = '1109';

	beforeAll(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(function () {
		alasql('drop database test' + testId);
	});

	test('A) Export empty tables to excel sheets', function () {
		var res = [];
		var opts = [{sheetid: 'a'}, {sheetid: 'b'}];
		res.push(
			alasql('SELECT INTO XLSX("' + __dirname + '/restest1109.xlsx",?) FROM ?', [opts, [[], []]])
		);
		assert.deepEqual(res, [1]);
	});
});
