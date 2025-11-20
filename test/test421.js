if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for issue #379

describe('Test 421 Test for JOINSTAR', function () {
	var test = 421;

	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql.options.joinstar = 'overwrite';
		alasql('DROP DATABASE test' + test);
	});

	it('1. Create tables', () => {
		alasql('CREATE TABLE one (a INT); INSERT INTO one VALUES (1),(2)');
		alasql('CREATE TABLE two (a INT); INSERT INTO two VALUES (10),(20)');
	});

	it('2. OVERWRITE JOINSTAR', () => {
		alasql.options.joinstar = 'overwrite';
		var res = alasql('SELECT * FROM one,two');
		assert.deepEqual(res, [{a: 10}, {a: 20}, {a: 10}, {a: 20}]);
	});

	it('3. JSON JOINSTAR', () => {
		alasql.options.joinstar = 'json';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one,two');
		//console.log(res);
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
	});

	it('4. UNDESCORE JOINSTAR', () => {
		alasql.options.joinstar = 'underscore';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one,two');
		//console.log(res);
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
	});

	it('5. JSON JOINSTAR with qualified names', () => {
		alasql.options.joinstar = 'json';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM test' + test + '.one, test' + test + '.two');
		//console.log(res);
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
	});

	it('6. UNDERSCORE JOINSTAR with qualified names', () => {
		alasql.options.joinstar = 'underscore';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM test' + test + '.one, test' + test + '.two');
		//console.log(res);
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
	});
});
