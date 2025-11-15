// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 176 - CSV and TSV', () => {
	test('1. TAB', done => {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:false})',
			[],
			function (res) {
				expect(res[0]).toEqual({0: 'Country', 1: 'City'});
				done();
			}
		);
	});

	test('2. TAB+headers', done => {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:true})',
			[],
			function (res) {
				//			console.log(res);
				expect(res[0]).toEqual({Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('3. TAB+predfined headers', done => {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:@["country","city"]})',
			[],
			function (res) {
				//			console.log(res);
				expect(res[0]).toEqual({country: 'Country', city: 'City'});
				done();
			}
		);
	});

	test('4. CSV on TAB', done => {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176a.tab",{separator:"\t",headers:true})',
			[],
			function (res) {
				expect(res[0]).toEqual({Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('5. CSV with single quote', done => {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176b.csv",{separator:";",headers:true})',
			[],
			function (res) {
				expect(res[0]).toEqual({Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('6. CSV with single quote', done => {
		alasql(
			'SELECT * FROM CSV("' +
				__dirname +
				'/test176b.csv",{separator:";",quote:"\\"",headers:true})',
			[],
			function (res) {
				expect(res[1]).toEqual({Country: 'Kazakhstan', City: 'Almaty'});
				done();
			}
		);
	});

	test('7. Sync CSV', done => {
		var res = alasql(
			'SELECT * FROM CSV("' +
				__dirname +
				'/test176b.csv",{separator:";",quote:"\\"",headers:true})',
			[],
			function (res) {
				expect(res[1]).toEqual({Country: 'Kazakhstan', City: 'Almaty'});
				done();
			}
		);
	});

	test('8. CSV with commas and strings', done => {
		var res = alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176c.csv",{headers:true, quote:"\'"})'
		);
		//   console.log(res);
		//expect(res[1]).toEqual({ 'Country':'Kazakhstan', 'City':'Almaty' });
		done();
	});

	test('9. CSV with commas and strings and e-mails', done => {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176d.csv",{headers:true})',
			[],
			function (res) {
				expect(res.length == 4).toBe(true);
				//	    console.log(res);
				done();
			}
		);
		//expect(res[1]).toEqual({ 'Country':'Kazakhstan', 'City':'Almaty' });
	});
});
