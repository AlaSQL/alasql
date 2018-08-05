if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
}

// By Ben Nadel on June 14, 2006
//Why NULL Values Should Not Be Used in a Database Unless Required
//http://www.bennadel.com/blog/85-why-null-values-should-not-be-used-in-a-database-unless-required.htm
//
describe('Test 333 Check for NULLs', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test333;USE test333');

		done();
	});

	it('2. Create table', function(done) {
		var res = alasql(function() {
			/*
      CREATE TABLE test (name STRING);
      INSERT INTO test VALUES ("Ben"),("Jim"),("Simon"),(NULL),(NULL),("Ye"),(""),(""),("Dave"),("");
    */
		});
		assert.deepEqual(res.length, 2);
		done();
	});

	it('3. SELECT for NULLs', function(done) {
		alasql.options.modifier = 'RECORDSET';

		var res = alasql('SELECT COUNT(*) FROM test WHERE LEN(test.name) = 0');
		/// console.log(res);

		var res = alasql(function() {
			/*

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

    */
		});
		/// console.log(res);
		//    assert.deepEqual(res,[ [ 131, 1, 133 ], [ 182, 1, 183 ] ]);

		// Expected results
		// LEN Count: 3
		// NULL Count: 2
		// LIKE Count: 3
		// Combo Count: 5

		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test333');
		alasql.options.modifier = undefined;
		done();
	});
});
