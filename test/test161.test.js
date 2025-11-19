// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
} else {
	// how to attach these files in browser?
	var XLS = null;
	var XLSX = null;
}

if (false) {
	describe('Test 161 - load and process Excel file', () => {
		test('1. Load Excel file', done => {
			alasql(
				"select country, population from xlsx('test161.xlsx',{sheet:'Sheet1',range:'A1:D5',headers:true}) where city like 'M%'",
				[],
				function (res) {
					expect(res).toEqual([
						{country: 'USA', population: 12000000},
						{country: 'Spain', population: 2500000},
					]);
					done();
				}
			);
		});

		test('2. Create Excel file from SELECT query', done => {
			var people = [
				{name: 'Joan Watson', age: 42},
				{name: 'Sherlok Holmes', age: 44},
			];

			alasql("select * into xlsx('test160res.xlsx') from ?", [people], function (res) {
				// TODO - what to do in browser? try to save?
				// How to protect node.js (where to save these files?)
				expect(res).toEqual(2);
				done();
			});
		});
	});
}
