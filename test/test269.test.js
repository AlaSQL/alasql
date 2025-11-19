// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + './restest267.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 269 options', () => {
	var data1 = [
		{a: 1, b: 10},
		{a: 2, b: 20},
		{a: 3, b: 30},
	];
	var data2 = [
		{b: 10, c: 100},
		{b: 20, c: 200},
		{b: 40, c: 400},
	];

	test.skip('1. Create database', done => {
		alasql('CREATE DATABASE test269; USE test269');
		done();
	});

	test.skip('2. by default', done => {
		alasql.options.modifier = undefined;
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual([
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
			{a: 3, b: 30},
			{b: 40, c: 400},
		]);

		done();
	});

	test.skip('3. VALUE', done => {
		alasql.options.modifier = 'VALUE';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual(1);

		done();
	});

	test.skip('4. ROW', done => {
		alasql.options.modifier = 'ROW';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual([1, 10, 100]);

		done();
	});

	test.skip('5. COLUMN', done => {
		alasql.options.modifier = 'COLUMN';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual([1, 2, 3, undefined]);

		done();
	});

	test.skip('6. MATRIX', done => {
		alasql.options.modifier = 'MATRIX';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		//console.log(res);
		// Wrong with reduced rows
		expect(res).toEqual([
			[1, 10, 100],
			[2, 20, 200],
			[3, 30, undefined],
			[undefined, 40, 400],
		]);

		done();
	});

	test.skip('6a. MATRIX', done => {
		alasql.options.modifier = 'MATRIX';
		//    alasql.options.modifier = 'RECORDSET';
		var res = alasql(
			'SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b \
      ORDER BY a',
			[data1, data2]
		);
		console.log(res);
		// Wrong with reduced rows
		expect(res).toEqual([
			[undefined, 40, 400],
			[1, 10, 100],
			[2, 20, 200],
			[3, 30, undefined],
		]);

		done();
	});

	test.skip('7. RECORDSET', done => {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		//console.log(res);
		// Wrong with reduced rows
		expect(res).toEqual({
			data: [
				{a: 1, b: 10, c: 100},
				{a: 2, b: 20, c: 200},
				{a: 3, b: 30},
				{b: 40, c: 400},
			],
			columns: [{columnid: 'a'}, {columnid: 'b'}, {columnid: 'c'}],
		});
		done();
	});

	test.skip('8. INDEX', done => {
		alasql.options.modifier = 'INDEX';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual({1: 10, 2: 20, 3: 30, undefined: 40});

		done();
	});

	test.skip('9. TEXTSTRING', done => {
		alasql.options.modifier = 'TEXTSTRING';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		expect(res).toEqual('1\n2\n3\n');

		done();
	});

	test.skip('99. Drop phase', done => {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test269');
		done();
	});
});
