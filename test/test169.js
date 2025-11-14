// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname =
	typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/') : '.';

describe('Test 169 - select into TXT, CSV, XLSX', function () {
	test('0. Write TXT file', function (done) {
		alasql('create database test169;use test169');
		alasql('create table one (a string, b string)');
		alasql('insert into one values ("Hello","Warsaw"), ("World!","Quito")');
		done();
	});

	test('1. Write TXT file', function (done) {
		alasql('select * into txt("' + __dirname + '/restest169.txt") from one', [], function (res) {
			assert(res == 1);
			done();
		});
	});

	test('2. Write TAB file', function (done) {
		alasql('select * into tab("' + __dirname + '/restest169a.tab") from one', [], function (res) {
			assert(res == 1);
			done();
		});
	});

	test('3. Write TAB file with headers', function (done) {
		alasql(
			'select * into tab("' + __dirname + '/restest169b.tab",{headers:true}) from one',
			[],
			function (res) {
				assert(res == 1);
				done();
			}
		);
	});

	test('4. Write CSV file with headers', function (done) {
		alasql(
			'select * into csv("' + __dirname + '/restest169a.csv",{headers:true}) from one',
			[],
			function (res) {
				assert(res == 1);
				done();
			}
		);
	});

	test('5. Write XLSX file with headers', function (done) {
		alasql(
			'select * into xlsx("' + __dirname + '/restest169a.xlsx",{headers:true}) from one',
			[],
			function (res) {
				//			console.log(res);
				assert(res == 1);
				done();
			}
		);
	});

	test('99. Drop database', function (done) {
		alasql('drop database test169');
		done();
	});
});
