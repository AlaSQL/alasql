// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 134 SELECT FROM', () => {
	if (false) {
		test('1. Load data from CSV and TAB', done => {
			alasql('CREATE DATABASE test134; USE test134');
			alasql('CREATE TABLE one (a INT, b STRING)');
			alasql('SELECT * INTO one FROM CSV("' + __dirname + '/test134.csv",true)');
			alasql('SELECT [0] AS a, [1] AS b INTO one FROM TAB("' + __dirname + '/test134.tab")');

			var res = alasql('SELECT VALUE COUNT(*) FROM one');
			expect(res == 10).toBe(true);

			done();
		});

		test('2. INSERT (Node.js only)', done => {
			if (typeof window === 'object') {
				alasql('SELECT * INTO CSV("' + __dirname + '/out/test134-out.csv", true)');
				alasql('SELECT * INTO TAB("' + __dirname + '/out/test134-out.tab", false)');
				done();
			}
		});

		test('3. EXCEL LOAD (require load sheet.xls libraries', done => {
			alasql('SELECT * FROM XLS("' + __dirname + '/out/test134.xls", true, "Sheet1")');
			alasql('SELECT * FROM XLSX("' + __dirname + '/out/test134.xlsx", false, "Sheet2", "A2:C4")');
			alasql('SELECT * FROM XLSX("' + __dirname + '/out/test134.xlsx", "A", "Sheet2", "B2:C4")');
			done();
		});

		test('4. EXCEL SAVE', done => {
			if (typeof window === 'object') {
				alasql('SELECT * INTO XLS("' + __dirname + '/out/test134-out.xls", true)');
				alasql('SELECT * INTO XLSX("' + __dirname + '/out/test134-out.xlsx", false)');
				done();
			}
		});

		test('99. UPDATE', done => {
			alasql('DROP DATABASE test134');
			done();
		});
	}
});
