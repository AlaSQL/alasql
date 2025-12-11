if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 143-B - INSERT IGNORE', function () {
	const test = '143B';

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. INSERT IGNORE should skip duplicate primary key', function () {
		// Create table with primary key
		alasql('CREATE TABLE Amazon ([Date] STRING PRIMARY KEY, Ct INT)');

		// Insert first record
		var res = alasql("INSERT INTO Amazon VALUES ('12/12/14', 0)");
		assert.equal(res, 1);

		// Try to insert duplicate with INSERT IGNORE - should succeed silently
		var res2 = alasql("INSERT IGNORE INTO Amazon VALUES ('12/12/14', 0)");
		assert.equal(res2, 0); // 0 rows inserted

		// Verify only one record exists
		var data = alasql('SELECT * FROM Amazon');
		assert.deepEqual(data, [{Date: '12/12/14', Ct: 0}]);

		// Clean up
		alasql('DROP TABLE Amazon');
	});

	it('2. INSERT IGNORE should insert non-duplicate records', function () {
		// Create table with primary key
		alasql('CREATE TABLE Amazon ([Date] STRING PRIMARY KEY, Ct INT)');

		// Insert first record
		alasql("INSERT INTO Amazon VALUES ('12/12/14', 0)");

		// Insert different record with INSERT IGNORE - should succeed
		var res = alasql("INSERT IGNORE INTO Amazon VALUES ('12/13/14', 1)");
		assert.equal(res, 1);

		// Verify two records exist
		var data = alasql('SELECT * FROM Amazon ORDER BY [Date]');
		assert.deepEqual(data, [
			{Date: '12/12/14', Ct: 0},
			{Date: '12/13/14', Ct: 1},
		]);

		// Clean up
		alasql('DROP TABLE Amazon');
	});

	it('3. INSERT IGNORE with multiple values', function () {
		// Create table with primary key
		alasql('CREATE TABLE Amazon ([Date] STRING PRIMARY KEY, Ct INT)');

		// Insert first record
		alasql("INSERT INTO Amazon VALUES ('12/12/14', 0)");

		// Try to insert multiple records, one duplicate and one new
		// Should insert only the new one
		var res = alasql("INSERT IGNORE INTO Amazon VALUES ('12/12/14', 5), ('12/13/14', 10)");
		assert.equal(res, 1); // Only 1 new row inserted

		// Verify correct records exist - original value unchanged
		var data = alasql('SELECT * FROM Amazon ORDER BY [Date]');
		assert.deepEqual(data, [
			{Date: '12/12/14', Ct: 0},
			{Date: '12/13/14', Ct: 10},
		]);

		// Clean up
		alasql('DROP TABLE Amazon');
	});

	it('4. INSERT IGNORE with column specification', function () {
		// Create table with primary key
		alasql('CREATE TABLE Amazon ([Date] STRING PRIMARY KEY, Ct INT)');

		// Insert first record
		alasql("INSERT INTO Amazon VALUES ('12/12/14', 0)");

		// Try to insert duplicate with column specification
		var res = alasql("INSERT IGNORE INTO Amazon ([Date], Ct) VALUES ('12/12/14', 5)");
		assert.equal(res, 0);

		// Verify original value unchanged
		var data = alasql('SELECT * FROM Amazon');
		assert.deepEqual(data, [{Date: '12/12/14', Ct: 0}]);

		// Clean up
		alasql('DROP TABLE Amazon');
	});

	it('5. Regular INSERT should still throw error on duplicate', function () {
		// Create table with primary key
		alasql('CREATE TABLE Amazon ([Date] STRING PRIMARY KEY, Ct INT)');

		// Insert first record
		alasql("INSERT INTO Amazon VALUES ('12/12/14', 0)");

		// Try to insert duplicate without IGNORE - should throw error
		assert.throws(function () {
			alasql("INSERT INTO Amazon VALUES ('12/12/14', 5)");
		}, /primary key/i);

		// Clean up
		alasql('DROP TABLE Amazon');
	});
});
