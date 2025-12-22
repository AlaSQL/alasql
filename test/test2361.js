if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 2361 - IndexedDB transactions support', function () {
		const SCHEMA_NAME = 'test2361db';

		before(function () {
			// Clean up any existing database
			return alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS ' + SCHEMA_NAME);
		});

		after(function () {
			// Clean up after tests
			return alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS ' + SCHEMA_NAME);
		});

		it('1. BEGIN TRANSACTION should work with IndexedDB', function (done) {
			const queriesAttach = [
				'CREATE INDEXEDDB DATABASE ' + SCHEMA_NAME,
				'ATTACH INDEXEDDB DATABASE ' + SCHEMA_NAME,
				'USE ' + SCHEMA_NAME,
			];

			alasql
				.promise(queriesAttach)
				.then(() => alasql.promise('CREATE TABLE test_table'))
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('2. COMMIT TRANSACTION should work with IndexedDB', function (done) {
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('3. ROLLBACK TRANSACTION should work with IndexedDB', function (done) {
			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise('ROLLBACK TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('4. Full transaction workflow with INSERT', function (done) {
			const query = "INSERT INTO test_table VALUES ('test1'), ('test2')";

			alasql
				.promise('USE ' + SCHEMA_NAME)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise(query))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});

		it('5. Transaction workflow as described in issue', function (done) {
			const queriesAttach = ['ATTACH INDEXEDDB DATABASE ' + SCHEMA_NAME, 'USE ' + SCHEMA_NAME];

			const query = 'SELECT * FROM test_table';

			alasql
				.promise(queriesAttach)
				.then(() => alasql.promise('BEGIN TRANSACTION'))
				.then(() => alasql.promise(query))
				.then(() => alasql.promise('COMMIT TRANSACTION'))
				.then(res => {
					// Should succeed without throwing the error:
					// "l.engines[l.databases[l.useid].engineid].begin is not a function"
					assert.equal(res, 1);
					done();
				})
				.catch(error => {
					done(error);
				});
		});
	});
}
describe('Test 2361 - GROUP BY with CASE expression alias', function () {
	const test = '2361';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) GROUP BY with CASE WHEN aliased expression', function () {
		// Create test data with ages
		var data = [
			{age: 25},
			{age: 26},
			{age: 35},
			{age: 36},
			{age: 45},
			{age: 55},
		];

		var result = alasql(
			`SELECT 
				CASE 
					WHEN age BETWEEN 20 AND 29 THEN '20-29'
					WHEN age BETWEEN 30 AND 39 THEN '30-39'
					WHEN age BETWEEN 40 AND 49 THEN '40-49'
					WHEN age BETWEEN 50 AND 59 THEN '50-59'
					ELSE '60+'
				END AS age_group,
				COUNT(*) AS customer_count
			FROM ?
			GROUP BY age_group
			ORDER BY age_group`,
			[data]
		);

		var expected = [
			{age_group: '20-29', customer_count: 2},
			{age_group: '30-39', customer_count: 2},
			{age_group: '40-49', customer_count: 1},
			{age_group: '50-59', customer_count: 1},
		];

		assert.deepEqual(result, expected);
	});

	it('B) GROUP BY with CASE WHEN and ELSE clause', function () {
		var data = [{age: 10}, {age: 20}, {age: 30}, {age: 100}];

		var result = alasql(
			`SELECT 
				CASE 
					WHEN age BETWEEN 0 AND 9 THEN '0-9'
					WHEN age BETWEEN 10 AND 19 THEN '10-19'
					WHEN age BETWEEN 20 AND 29 THEN '20-29'
					ELSE '30+'
				END AS age_group
			FROM ? 
			GROUP BY age_group`,
			[data]
		);

		// Should return three unique groups, not just '30+'
		var expected = [
			{age_group: '10-19'},
			{age_group: '20-29'},
			{age_group: '30+'},
		];

		assert.deepEqual(result.sort(), expected.sort());
	});

	it('C) GROUP BY with function expression alias', function () {
		var data = [
			{name: 'Alice'},
			{name: 'alice'},
			{name: 'Bob'},
			{name: 'bob'},
		];

		var result = alasql(
			`SELECT 
				UPPER(name) AS upper_name,
				COUNT(*) AS cnt
			FROM ?
			GROUP BY upper_name
			ORDER BY upper_name`,
			[data]
		);

		var expected = [
			{upper_name: 'ALICE', cnt: 2},
			{upper_name: 'BOB', cnt: 2},
		];

		assert.deepEqual(result, expected);
	});

	it('D) GROUP BY with multiple CASE expressions', function () {
		var data = [
			{age: 25, score: 85},
			{age: 26, score: 90},
			{age: 35, score: 85},
			{age: 36, score: 90},
		];

		var result = alasql(
			`SELECT 
				CASE 
					WHEN age BETWEEN 20 AND 29 THEN '20-29'
					ELSE '30+'
				END AS age_group,
				CASE 
					WHEN score >= 90 THEN 'High'
					ELSE 'Low'
				END AS score_group,
				COUNT(*) AS cnt
			FROM ?
			GROUP BY age_group, score_group
			ORDER BY age_group, score_group`,
			[data]
		);

		var expected = [
			{age_group: '20-29', score_group: 'High', cnt: 1},
			{age_group: '20-29', score_group: 'Low', cnt: 1},
			{age_group: '30+', score_group: 'High', cnt: 1},
			{age_group: '30+', score_group: 'Low', cnt: 1},
		];

		assert.deepEqual(result, expected);
	});

	it('E) GROUP BY with WHERE and CASE expression alias', function () {
		var data = [
			{age: 25, active: true},
			{age: 26, active: false},
			{age: 35, active: true},
			{age: 36, active: true},
		];

		var result = alasql(
			`SELECT 
				CASE 
					WHEN age BETWEEN 20 AND 29 THEN '20-29'
					ELSE '30+'
				END AS age_group,
				COUNT(*) AS cnt
			FROM ?
			WHERE active = true
			GROUP BY age_group
			ORDER BY age_group`,
			[data]
		);

		var expected = [
			{age_group: '20-29', cnt: 1},
			{age_group: '30+', cnt: 2},
		];

		assert.deepEqual(result, expected);
	});
});
