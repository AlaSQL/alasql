// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 176 - CSV and TSV', function () {
	test('1. TAB', function (done) {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:false})',
			[],
			function (res) {
				assert.deepEqual(res[0], {0: 'Country', 1: 'City'});
				done();
			}
		);
	});

	test('2. TAB+headers', function (done) {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:true})',
			[],
			function (res) {
				//			console.log(res);
				assert.deepEqual(res[0], {Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('3. TAB+predfined headers', function (done) {
		alasql(
			'SELECT * FROM TAB("' + __dirname + '/test176a.tab",{headers:@["country","city"]})',
			[],
			function (res) {
				//			console.log(res);
				assert.deepEqual(res[0], {country: 'Country', city: 'City'});
				done();
			}
		);
	});

	test('4. CSV on TAB', function (done) {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176a.tab",{separator:"\t",headers:true})',
			[],
			function (res) {
				assert.deepEqual(res[0], {Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('5. CSV with single quote', function (done) {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176b.csv",{separator:";",headers:true})',
			[],
			function (res) {
				assert.deepEqual(res[0], {Country: 'Kazakhstan', City: 'Astana'});
				done();
			}
		);
	});

	test('6. CSV with single quote', function (done) {
		alasql(
			'SELECT * FROM CSV("' +
				__dirname +
				'/test176b.csv",{separator:";",quote:"\\"",headers:true})',
			[],
			function (res) {
				assert.deepEqual(res[1], {Country: 'Kazakhstan', City: 'Almaty'});
				done();
			}
		);
	});

	test('7. Sync CSV', function (done) {
		var res = alasql(
			'SELECT * FROM CSV("' +
				__dirname +
				'/test176b.csv",{separator:";",quote:"\\"",headers:true})',
			[],
			function (res) {
				assert.deepEqual(res[1], {Country: 'Kazakhstan', City: 'Almaty'});
				done();
			}
		);
	});

	test('8. CSV with commas and strings', function (done) {
		var res = alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176c.csv",{headers:true, quote:"\'"})'
		);
		//   console.log(res);
		//assert.deepEqual(res[1],{ 'Country':'Kazakhstan', 'City':'Almaty' });
		done();
	});

	test('9. CSV with commas and strings and e-mails', function (done) {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test176d.csv",{headers:true})',
			[],
			function (res) {
				assert(res.length == 4);
				//	    console.log(res);
				done();
			}
		);
		//assert.deepEqual(res[1],{ 'Country':'Kazakhstan', 'City':'Almaty' });
	});
});
