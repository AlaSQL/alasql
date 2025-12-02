if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 926 - PRIMARY KEY constraint on INSERT...SELECT', function () {
	const test = '926';

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
				{ city: 'Redmond', population: 57530 },
				{ city: 'Atlanta', population: 447841 },
			],
		]);
		assert.equal(res, 2);
		
		var data = alasql('SELECT * FROM cities ORDER BY city');
		assert.deepEqual(data, [
			{ city: 'Atlanta', population: 447841 },
			{ city: 'Redmond', population: 57530 },
		]);
	});

	it('C) Attempt to insert duplicate PRIMARY KEY value should throw error', function () {
		assert.throws(
			function () {
				alasql('INSERT INTO cities SELECT * FROM ?', [
					[{ city: 'Redmond', population: 42 }],
				]);
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
			{ city: 'Atlanta', population: 447841 },
			{ city: 'Redmond', population: 57530 },
		]);
	});
});
