// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 419;

describe.skip('Test ' + testId + ' Load data from text file with default headers option', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Load TXT', done => {
		alasql('SELECT * FROM TXT("' + __dirname + '/test419a.txt")', [], function (res) {
			expect(res).toEqual([
				{0: 'words,letters'},
				{0: 'There,5'},
				{0: 'are,3'},
				{0: 'five,4'},
				{0: 'lines,5'},
			]);
			done();
		});
	});

	test('2. Load CSV with {headers:true}', done => {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test419a.txt",{headers:true})',
			[],
			function (res) {
				expect(res).toEqual([
					{words: 'There', letters: 5},
					{words: 'are', letters: 3},
					{words: 'five', letters: 4},
					{words: 'lines', letters: 5},
				]);
				done();
			}
		);
	});

	test('3. Load CSV by default', done => {
		alasql('SELECT * FROM CSV("' + __dirname + '/test419a.txt")', [], function (res) {
			expect(res).toEqual([
				{words: 'There', letters: 5},
				{words: 'are', letters: 3},
				{words: 'five', letters: 4},
				{words: 'lines', letters: 5},
			]);
			done();
		});
	});

	test('4. Load CSV with {headers:false}', done => {
		alasql(
			'SELECT * FROM CSV("' + __dirname + '/test419a.txt",{headers:false})',
			[],
			function (res) {
				expect(res).toEqual([
					{0: 'words', 1: 'letters'},
					{0: 'There', 1: '5'},
					{0: 'are', 1: '3'},
					{0: 'five', 1: '4'},
					{0: 'lines', 1: '5'},
				]);
				done();
			}
		);
	});

	test('4. Load XLSX with {headers:true}', done => {
		alasql(
			'SELECT * FROM XLSX("' + __dirname + '/test419.xlsx",{headers:true})',
			[],
			function (res) {
				expect(res).toEqual([
					{words: 'don’t', letters: 1},
					{words: 'come', letters: 2},
					{words: 'easy', letters: 3},
				]);
				done();
			}
		);
	});

	test('5. Load XLSX', done => {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test419.xlsx")', [], function (res) {
			expect(res).toEqual([
				{words: 'don’t', letters: 1},
				{words: 'come', letters: 2},
				{words: 'easy', letters: 3},
			]);
			done();
		});
	});

	test('6. Load XLSX with {headers:true}', done => {
		alasql(
			'SELECT * FROM XLSX("' + __dirname + '/test419.xlsx",{headers:false})',
			[],
			function (res) {
				expect(res).toEqual([
					{A: 'words', B: 'letters'},
					{A: 'don’t', B: 1},
					{A: 'come', B: 2},
					{A: 'easy', B: 3},
				]);
				done();
			}
		);
	});
});
