// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

if (false) {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test159.json', {
		strict: false,
		ws: '',
	});

	describe('Test 160 - load text file, csv, tab, and other functions', () => {
		test('1. Text file', done => {
			alasql(
				"select column * from txt('test160.txt') where [0] like 'M%' order by [0]",
				[],
				function (res) {
					expect(res).toEqual(['Madrid', 'Minsk', 'Mogadisho']);
					done();
				}
			);
		});

		test('2. TAB file without headers', done => {
			alasql(
				"select column [1] from tab('test160.tab') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});

		test('3. TAB file with headers', done => {
			alasql(
				"select column population from tab('test160h.tab',{headers:true}) where city like 'M%' order by population",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});

		test('4. CSV file without headers', done => {
			alasql(
				"select column [1] from csv('test160.csv') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});

		test('5. CSV file with headers', done => {
			alasql(
				"select column population from csv('test160h.csv',{headers:true}) where city like 'M%' order by population",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});

		test('6. CSV file with headers with semicolon', done => {
			alasql(
				"select column population from csv('test160hs.csv',{headers:true, separator:';'}) where city like 'M%' order by population",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});

		test('4. CSV file without extension', done => {
			alasql(
				"select column [1] from csv('test160') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					expect(res).toEqual([10, 20, 30]);
					done();
				}
			);
		});
	});
}
