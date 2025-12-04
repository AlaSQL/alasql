if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1406 - PRIMARY KEY constraint on INSERT...SELECT', function () {
	const test = '1406';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Create table with PRIMARY KEY', function () {
		var res = alasql('CREATE TABLE cities (city STRING PRIMARY KEY, population NUMBER)');
		assert.equal(res, 1);
	});

	it('B) Insert records using INSERT...SELECT', function () {
		var res = alasql('INSERT INTO cities SELECT * FROM ?', [
			[
				{city: 'Redmond', population: 57530},
				{city: 'Atlanta', population: 447841},
			],
		]);
		assert.equal(res, 2);

		var data = alasql('SELECT * FROM cities ORDER BY city');
		assert.deepEqual(data, [
			{city: 'Atlanta', population: 447841},
			{city: 'Redmond', population: 57530},
		]);
	});

	it('C) Attempt to insert duplicate PRIMARY KEY value should throw error', function () {
		assert.throws(
			function () {
				alasql('INSERT INTO cities SELECT * FROM ?', [[{city: 'Redmond', population: 42}]]);
			},
			function (err) {
				return err.message.indexOf('primary key') > -1;
			},
			'Expected error for duplicate PRIMARY KEY'
		);
	});

	it('D) Verify no duplicate was inserted', function () {
		var data = alasql('SELECT * FROM cities ORDER BY city');
		assert.equal(data.length, 2);
		assert.deepEqual(data, [
			{city: 'Atlanta', population: 447841},
			{city: 'Redmond', population: 57530},
		]);
	});
});

describe('Test 1406 - PRIMARY KEY constraint verification', function () {
	const test = '1406';

	it('A) Test with in-memory database (not IndexedDB)', function () {
		alasql('CREATE DATABASE test' + test + 'a');
		alasql('USE test' + test + 'a');

		alasql('CREATE TABLE cities (city STRING PRIMARY KEY, population NUMBER)');

		// Round 1
		var res1 = alasql('INSERT INTO cities SELECT * FROM ?', [
			[
				{city: 'Redmond', population: 57530},
				{city: 'Atlanta', population: 447841},
			],
		]);
		assert.equal(res1, 2);

		var data1 = alasql('SELECT * FROM cities');
		assert.equal(data1.length, 2);

		// Round 2 - Try to insert duplicate
		var errorThrown = false;
		try {
			alasql('INSERT INTO cities SELECT * FROM ?', [[{city: 'Redmond', population: 42}]]);
		} catch (e) {
			errorThrown = true;
			assert(e.message.indexOf('primary key') > -1, 'Error message should mention primary key');
		}

		assert(errorThrown, 'Expected error for duplicate PRIMARY KEY');

		// Verify no duplicate was inserted
		var data2 = alasql('SELECT * FROM cities');
		assert.equal(data2.length, 2, 'Should still have 2 records');

		alasql('DROP DATABASE test' + test + 'a');
	});

	it('B) Test with regular INSERT VALUES', function () {
		alasql('CREATE DATABASE test' + test + 'b');
		alasql('USE test' + test + 'b');

		alasql('CREATE TABLE cities (city STRING PRIMARY KEY, population NUMBER)');

		// Insert first record
		var res1 = alasql("INSERT INTO cities VALUES ('Redmond', 57530), ('Atlanta', 447841)");
		assert.equal(res1, 2);

		// Try to insert duplicate
		var errorThrown = false;
		try {
			alasql("INSERT INTO cities VALUES ('Redmond', 42)");
		} catch (e) {
			errorThrown = true;
			assert(e.message.indexOf('primary key') > -1, 'Error message should mention primary key');
		}

		assert(errorThrown, 'Expected error for duplicate PRIMARY KEY');

		// Verify no duplicate was inserted
		var data = alasql('SELECT * FROM cities');
		assert.equal(data.length, 2, 'Should still have 2 records');

		alasql('DROP DATABASE test' + test + 'b');
	});
});
