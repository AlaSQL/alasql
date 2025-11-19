if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for JOINSTAR Feature Incompatibility with Qualified Table Names

describe('Test 2197 JOINSTAR with Qualified Table Names', function () {
	var test = 2197;

	before(function () {
		alasql('CREATE DATABASE test' + test);
	});

	after(function () {
		alasql.options.joinstar = 'overwrite';
		alasql('DROP DATABASE test' + test);
	});

	it('1. Create tables', function (done) {
		alasql('CREATE TABLE test' + test + '.one (a INT)');
		alasql('INSERT INTO test' + test + '.one VALUES (1),(2)');
		alasql('CREATE TABLE test' + test + '.two (a INT)');
		alasql('INSERT INTO test' + test + '.two VALUES (10),(20)');
		done();
	});

	it('2. OVERWRITE JOINSTAR with qualified names', function (done) {
		alasql.options.joinstar = 'overwrite';
		var res = alasql('SELECT * FROM test' + test + '.one, test' + test + '.two');
		assert.deepEqual(res, [{a: 10}, {a: 20}, {a: 10}, {a: 20}]);
		done();
	});

	it('3. JSON JOINSTAR with qualified names', function (done) {
		alasql.options.joinstar = 'json';
		alasql.databases.alasql.dbversion++; // Reset database cache (for current database context)
		var res = alasql('SELECT * FROM test' + test + '.one, test' + test + '.two');
		// Expected: nested objects by table name
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
		done();
	});

	it('4. UNDERSCORE JOINSTAR with qualified names', function (done) {
		alasql.options.joinstar = 'underscore';
		alasql.databases.alasql.dbversion++; // Reset database cache (for current database context)
		var res = alasql('SELECT * FROM test' + test + '.one, test' + test + '.two');
		// Expected: columns prefixed with table names
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
		done();
	});

	it('5. JSON JOINSTAR with USE database', function (done) {
		alasql('USE test' + test);
		alasql.options.joinstar = 'json';
		alasql.databases['test' + test].dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one, two');
		// Expected: nested objects by table name (should work)
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
		done();
	});

	it('6. UNDERSCORE JOINSTAR with USE database', function (done) {
		alasql('USE test' + test);
		alasql.options.joinstar = 'underscore';
		alasql.databases['test' + test].dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one, two');
		// Expected: columns prefixed with table names (should work)
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
		done();
	});
});
