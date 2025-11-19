// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 347 Undescores in names Issue #245', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test348_a;USE test348_a');
		done();
	});

	test('2. TEST', done => {
		var res = alasql(`
      CREATE TABLE students_a (
        _id serial NOT NULL,
        na_me nvarchar(50) NOT NULL,
        CONSTRAINT students_pkey PRIMARY KEY (_id)
      );
      `);
		done();
	});

	test('3. TEST', done => {
		var res = alasql(`
      INSERT INTO students_a VALUES
        (1 , 'John Doe'),
        (2 , 'Larry Loe');

      `);
		done();
	});

	test('4. TEST', done => {
		var res = alasql(`
      SELECT
        _id, na_me
      FROM
        students_a
    `);
		expect(res).toEqual([
			{_id: 1, na_me: 'John Doe'},
			{_id: 2, na_me: 'Larry Loe'},
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test348_a');
		done();
	});
});
