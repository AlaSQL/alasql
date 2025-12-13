if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 356 PIVOT', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test356;USE test356');
		done();
	});

	/* Source: http://sqlfiddle.com/#!3/6f4a1/3 */
	it('2. Prepare Data', function (done) {
		alasql(function () {
			/*
      create table test
      (
        username varchar(10),
        subject varchar(10),
        score int
      )
  */
		});

		alasql(function () {
			/*
    insert into test values
      ('Nick', 'Chinese', 80),
      ('Nick', 'Math', 90),
      ('Nick', 'English', 70),
      ('Nick', 'Biology', 85),
      ('Kent', 'Chinese', 80),
      ('Kent', 'Math', 90),
      ('Kent', 'English', 70),
      ('Kent', 'Biology', 85)
  */
		});

		done();
	});

	it('3. Simple PIVOT by subject', function (done) {
		var res = alasql(function () {
			/*
      SELECT * FROM test
      PIVOT (AVG(score) FOR subject IN (Chinese, Math, English, Biology))
    */
		});

		// Should have one row per username
		assert.equal(res.length, 2);
		// Check that pivot worked
		assert.equal(res[0].Chinese, 80);
		assert.equal(res[0].Math, 90);
		done();
	});

	it.skip('4. PIVOT BY syntax - not yet implemented', function (done) {
		// PIVOT BY is a different syntax not currently supported
		// This test is kept for reference but skipped
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test356');
		done();
	});
});
