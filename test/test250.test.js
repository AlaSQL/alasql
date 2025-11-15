// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 250 Index problem', () => {
	test('1. INSERT SELECT problem', done => {
		alasql(`
      CREATE TABLE tab0(pk INTEGER NOT NULL PRIMARY KEY, col0 INTEGER, col1 FLOAT, col2 TEXT, col3 INTEGER, col4 FLOAT, col5 TEXT);
      INSERT INTO tab0 VALUES(0,6,4.67,'wdbsg',4,2.89,'altmp');
      INSERT INTO tab0 VALUES(1,5,4.67,'wdbsg',4,2.22,'altmp');
      CREATE TABLE tab1(pk INTEGER NOT NULL PRIMARY KEY, col0 INTEGER, col1 FLOAT, col2 TEXT, col3 INTEGER, col4 FLOAT, col5 TEXT);
      CREATE INDEX idx_tab1_4 on tab1 (col4);
      INSERT INTO tab1 SELECT * FROM tab0;
      DELETE FROM tab1 WHERE col4 > 2.27;
      `);

		var res = alasql('SELECT * from tab1');

		expect(res).toEqual([
			{
				pk: 1,
				col0: 5,
				col1: 4.67,
				col2: 'wdbsg',
				col3: 4,
				col4: 2.22,
				col5: 'altmp',
			},
		]);

		//  	expect(res == false).toBe(true);

		done();
	});
});
