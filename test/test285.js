if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 285 CREATE UNIQUE INDEX', function () {
	it('1. CREATE TABLE and FIRST INSERT', function (done) {
		var res = alasql(function () {
			/*

      CREATE DATABASE test285;
      USE DATABASE test285;

      CREATE TABLE One
      (      a INT ,
             b INT
      );

      CREATE UNIQUE INDEX ux_one ON One(a,b);

      INSERT INTO One VALUES(1,1);
      INSERT INTO One VALUES(1,2);

    */
		});
		/// console.log(res);
		//    assert.deepEqual(res,[1,1,1,1,1,1]);

		done();
	});

	it('1. DROP DATABASE', function (done) {
		var res = alasql('DROP DATABASE test285');
		done();
	});
});
