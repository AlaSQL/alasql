if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 284 PRIMARY KEY with AUTOINCREMENT', function () {
	it('1. CREATE TABLE and INSERT', function (done) {
		var res = alasql(function () {
			/*

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
    */
		});

		assert.deepEqual(res, [1, 1, 1, 1, 1, 1]);

		done();
	});
});
