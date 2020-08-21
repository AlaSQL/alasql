if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 347 Undescores in names Issue #245', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test348_a;USE test348_a');
		done();
	});

	it('2. TEST', function (done) {
		var res = alasql(function () {
			/*
      CREATE TABLE students_a (
        _id serial NOT NULL,
        na_me nvarchar(50) NOT NULL,
        CONSTRAINT students_pkey PRIMARY KEY (_id)
      );
      */
		});
		done();
	});

	it('3. TEST', function (done) {
		var res = alasql(function () {
			/*
      INSERT INTO students_a VALUES
        (1 , 'John Doe'),
        (2 , 'Larry Loe');

      */
		});
		done();
	});

	it('4. TEST', function (done) {
		var res = alasql(function () {
			/*
      SELECT
        _id, na_me
      FROM
        students_a
    */
		});
		assert.deepEqual(res, [
			{_id: 1, na_me: 'John Doe'},
			{_id: 2, na_me: 'Larry Loe'},
		]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test348_a');
		done();
	});
});
