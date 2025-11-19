// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {
describe('Test 157 - json()', () => {
	test('1. Load text data from file async', done => {
		alasql('select * from json("' + __dirname + '/test157.json")', [], function (res) {
			//			console.log(13,res);
			expect(res).toEqual([{a: 1}, {a: 2}, {c: '😂'}]);
			done();
		});
	});

	test('2. Load text file', done => {
		alasql(
			'select column * from txt("' + __dirname + '/test157.txt") where [0] like "M%" order by [0]',
			[],
			function (res) {
				//			console.log(res);
				expect(res).toEqual(['Madrid', 'Milano', 'Minsk', 'Moscow']);
				done();
			}
		);
	});

	test('3. Load tab-separated file', done => {
		alasql(
			'select column * from tab("' +
				__dirname +
				'/test157a.tab",{headers:false}) where [1] > 100 order by [0]',
			[],
			function (res) {
				expect(res).toEqual(['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	test('4. Load tab-separated file', done => {
		alasql(
			'select column city from tab("' +
				__dirname +
				'/test157b.tab", {headers:true}) where population > 100 order by city',
			[],
			function (res) {
				expect(res).toEqual(['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	test('5. Load CSV-file', done => {
		alasql(
			'select column * from csv("' +
				__dirname +
				'/test157a.csv",{headers:false}) where [1] > 100 order by [0]',
			[],
			function (res) {
				expect(res).toEqual(['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	test('6. Load CSV-file with headers', done => {
		alasql(
			'select column city from csv("' +
				__dirname +
				'/test157b.csv",{headers:true}) where population > 100 order by city',
			[],
			function (res) {
				expect(res).toEqual(['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});
});
