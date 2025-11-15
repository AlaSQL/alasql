// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 341 Intellectual DOT operator', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test341;USE test341');
		done();
	});

	test.skip('2. Create tables', done => {
		var res = alasql(() => {
			/*

      CREATE TABLE cities (city STRING PRIMARY KEY, population INT);
      INSERT INTO cities VALUES 
        ("New York", 16200000),
        ("Krasnodar", 1200000),
        ("Prague", 2300000);

      CREATE TABLE persons (id INT PRIMARY KEY, name STRING, city STRING REFERENCES cities);
      INSERT INTO persons VALUES (1,"Andrey","Krasnodar"), (2,"Valery","Prague"), (3,"Michael","New York");
  */
		});
		expect(res).toEqual([1, 3, 1, 3]);
		done();
	});

	test.skip('3. SQL Standard way', done => {
		var res = alasql('SELECT COLUMN persons.name FROM persons');
		expect(res).toEqual(['Andrey', 'Valery', 'Michael']);
		done();
	});

	test.skip('4. JavaScript way', done => {
		var res = alasql('SET @a = "who".length');
		expect(res).toEqual([6, 6, 7]);
		done();
	});

	test.skip('5. JavaScript way', done => {
		var res = alasql('SELECT COLUMN name.length FROM persons');
		expect(res).toEqual([6, 6, 7]);
		done();
	});

	test.skip('5. FOREIGN KEY way', done => {
		var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0', [100]);
		expect(res.sort()).toEqual([100, 1, 200]);
		done();
	});

	test.skip('6. Object reference', done => {
		/** @todo Create this test */
		//    var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0',[100]);
		//    expect(res.sort()).toEqual([100,1,200]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test341');
		done();
	});
});
