// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// See http://www.codeproject.com/Articles/300785/Calculating-simple-running-totals-in-SQL-Server
describe('Test 230 Fix GROUP BY expressions', () => {
	test('046-1 FROM array of arrays', done => {
		alasql('CREATE DATABASE test230; USE test230;');
		done();
	});

	test('217. TRUNCATE TABLE', done => {
		alasql(
			'CREATE TABLE test230.one(a INT);\
            INSERT INTO test230.one VALUES (1),(2),(3); \
            TRUNCATE TABLE test230.one;'
		);
		var res = alasql('SELECT VALUE COUNT(*) FROM test230.one');
		//        console.log(res);
		//        var res = alasql('SELECT VALUE COUNT(*) FROM one');
		expect(res == 0).toBe(true);
		done();
	});

	test('1 FROM array of arrays', done => {
		var data = [
			[2014, 1, 1],
			[2015, 2, 1],
			[2016, 3, 1],
			[2017, 4, 2],
			[2018, 5, 3],
			[2019, 6, 3],
		];

		var res = alasql(
			'SELECT MATRIX [2] AS 0, SUM([1]) AS 1 \
            FROM ? d \
            WHERE [0]>2016 \
            GROUP BY [2] ',
			[data]
		);
		expect(res).toEqual([
			[2, 4],
			[3, 11],
		]);

		done();
	});

	test('99. DROP', done => {
		alasql('DROP DATABASE test230');
		done();
	});
});
