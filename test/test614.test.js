// @ts-ignore
import {describe, expect, test, beforeAll, afterAll, beforeEach, afterEach} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 614 - Read data from columns irrespective of case in query', () => {
	const testId = '614'; // insert test file number

	beforeAll(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(() => {
		alasql('drop database test' + testId);
		alasql.options.casesensitive = true;
	});

	describe('1) casesensitive option set to false, data will be present', () => {
		beforeEach(() => {
			alasql.options.casesensitive = false;
		});

		afterEach(() => {
			alasql.options.casesensitive = true;
		});

		test('A) Mixed case header with Camel case select', done => {
			alasql('SELECT Account FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
				// using lower case value of header text irrespective of the original case in file
				// because when casesensitive option is set to false alasql converts all header texts to lowercase
				expect(res[0]['Account'.toLowerCase()]).toEqual(12);
				done();
			});
		});

		test('B) UPPER case header and Lower case header with Camel case select', done => {
			alasql(
				'SELECT Amount, Comments FROM XLSX("' + __dirname + '/test614.xlsx")',
				[],
				function (res) {
					expect(res[0]['Amount'.toLowerCase()]).toEqual(500);
					expect(res[0]['Comments'.toLowerCase()]).toEqual('present');
					done();
				}
			);
		});
	});

	describe('2) casesensitive option has default value which is true, data will not be present', () => {
		test('A) Mixed case header, Upper case header and Lower case header with Camel case select', done => {
			alasql(
				'SELECT Account, Amount, Comments FROM XLSX("' + __dirname + '/test614.xlsx")',
				[],
				function (res) {
					// console.log(res[0]);
					expect(res[0]['Account']).toEqual(undefined);
					expect(res[0]['Amount']).toEqual(undefined);
					expect(res[0]['Comments']).toEqual(undefined);
					done();
				}
			);
		});
	});
});
