// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 238 Test from string and into string', () => {
	if (typeof window !== 'undefined') {
		test('1. JSON', done => {
			alasql('SELECT 100 INTO "' + dirname + 'test238.json"', [], () => {
				alasql('SELECT VALUE * FROM "' + dirname + 'test238.json"', [], function (res) {
					expect(res == 100).toBe(true);
					done();
				});
			});
		});
		test('2. CSV() and AS', done => {
			alasql('SELECT 1 AS a, 2 AS b INTO "' + dirname + 'restest238a.csv"', [], () => {
				alasql(
					'SELECT VALUE test.a FROM "' + dirname + 'test238a.csv" AS test',
					[],
					function (res) {
						expect(res == 1).toBe(true);
						done();
					}
				);
			});
		});
		test('3. XLSX', done => {
			alasql('SELECT 1 AS a, 2 AS b INTO "' + dirname + 'restest238b.xlsx"', [], () => {
				alasql(
					'SELECT VALUE test.a FROM "' + dirname + 'test238b.xlsx" AS test',
					[],
					function (res) {
						expect(res == 1).toBe(true);
						done();
					}
				);
			});
		});
	}
});
