// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// By Ben Nadel on June 14, 2006
//Why NULL Values Should Not Be Used in a Database Unless Required
//http://www.bennadel.com/blog/85-why-null-values-should-not-be-used-in-a-database-unless-required.htm
//
describe('Test 333 Check for NULLs', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test333;USE test333');

		done();
	});

	test('2. Create table', done => {
		var res = alasql(`
      CREATE TABLE test (name STRING);
      INSERT INTO test VALUES ("Ben"),("Jim"),("Simon"),(NULL),(NULL),("Ye"),(""),(""),("Dave"),("")
    `);
		expect(res.length).toEqual(2);
		done();
	});

	test('3. SELECT for NULLs', done => {
		alasql.options.modifier = 'RECORDSET';

		var res = alasql('SELECT COUNT(*) FROM test WHERE LEN(test.name) = 0');
		/// console.log(res);

		var res = alasql(`
      SELECT
          (
              SELECT
                  COUNT( * )
              FROM
                  test t
              WHERE
                  LEN( t.name ) = 0
          ) AS len_count,
          (
              SELECT
                  COUNT( * )
              FROM
                  test t
              WHERE
                  t.name IS NULL
              ) AS null_count,
          (
              SELECT
                  COUNT( * )
              FROM
                  test t
              WHERE
                  t.name NOT LIKE '_%'
          ) AS like_count,
          (
              SELECT
                  COUNT( * )
              FROM
                  test t
              WHERE
                  t.name IS NULL
              OR
                  t.name NOT LIKE '_%'
          ) AS combo_count
    `);
		/// console.log(res);
		//    expect(res).toEqual([ [ 131, 1, 133 ], [ 182, 1, 183 ] ]);

		// Expected results
		// LEN Count: 3
		// NULL Count: 2
		// LIKE Count: 3
		// Combo Count: 5

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test333');
		alasql.options.modifier = undefined;
		done();
	});
});
