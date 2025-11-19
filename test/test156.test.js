// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 156 - match()', () => {
	test('1. Multiple lines async', done => {
		alasql(
			'CREATE DATABASE test156; USE test156;' +
				'CREATE TABLE test156.one (a string);' +
				'INSERT INTO test156.one VALUES ("Moscow"), ("Frankfurt"), ("Paris");' +
				'SELECT * FROM test156.one WHERE a->match(?)' +
				'',
			['Moscow'],
			function (res) {
				//		 	console.log(res[4]);
				expect(res[4]).toEqual([{a: 'Moscow'}]);
				done();
			}
		);
	});

	//https://docs.oracle.com/cd/B19306_01/appdev.102/b14251/adfns_regexp.htm
	if (false) {
		test('2. RegExp like Oracle functions', done => {
			alasql('SELECT * FROM test156.one WHERE REGEXP_LIKE(a,"Mos")');
			expect(res).toEqual([{a: 'Moscow'}]);

			alasql(
				'SELECT VALUE REGEXP_REPLACE(a,"Moscow","London") FROM test156.one WHERE REGEXP_LIKE(a,"Mos.*")'
			);
			expect(res == 'London').toBe(true);

			alasql('SELECT VALUE REGEXP_INSTR(a,"osco") FROM test156.one WHERE REGEXP_LIKE(a,"Mos.*")');
			expect(res == 2).toBe(true);

			alasql('SELECT VALUE REGEXP_SUBSTR(a,"osco") FROM test156.one WHERE REGEXP_LIKE(a,"Mos.*")');
			expect(res == 'osco').toBe(true);

			done();
		});

		test('3. Criterias for WHERE like MongoDB', done => {
			alasql('SELECT * FROM test156.one WHERE CRITERIA(@{a:"Moscow"})');
			expect(res).toEqual([{a: 'Moscow'}]);

			alasql('SELECT * FROM test156.one WHERE CRITERIA(@{a:?})', ['Moscow']);
			expect(res).toEqual([{a: 'Moscow'}]);

			// Do we really need this?
			alasql('SELECT * FROM test156.one WHERE CRITERIA(?)', [{a: 'Moscow'}]);
			expect(res).toEqual([{a: 'Moscow'}]);

			done();
		});
	}

	test('99. Drop database', done => {
		alasql('drop database test156');
		done();
	});
});

//}
