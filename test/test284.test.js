// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 284 PRIMARY KEY with AUTOINCREMENT', () => {
	test('1. CREATE TABLE and INSERT', done => {
		var res = alasql(`
      CREATE DATABASE test284;
      USE DATABASE test284;

      CREATE TABLE [Categories]
      (      [CategoryID] INTEGER PRIMARY KEY AUTOINCREMENT,
             [CategoryName] TEXT,
             [Description] TEXT
      );

      INSERT INTO Categories VALUES(null,'Beverages','Soft drinks, coffees, teas, beers, and ales');
      INSERT INTO Categories VALUES(null,'Condiments','Sweet and savory sauces, relishes, spreads, and seasonings');

      DROP DATABASE test284;
	  `);

		expect(res).toEqual([1, 1, 1, 1, 1, 1]);

		done();
	});
});
