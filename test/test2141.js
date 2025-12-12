if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

/*
 * Test for UNNEST function to flatten nested arrays in objects
 *
 * This addresses the issue of "broadcasting" nested objects without SEARCH.
 * Using CROSS APPLY with UNNEST allows flattening of nested array properties.
 *
 * Example from the issue:
 * Input: [{ name: "a", entries: [{ id: 1, value: 2 }, { id: 3, value: 4 }] }]
 * Output: [{ name: "a", id: 1, value: 2 }, { name: "a", id: 3, value: 4 }]
 *
 * Usage:
 * SELECT parent.field, child.field
 * FROM table AS parent
 * CROSS APPLY (SELECT * FROM UNNEST(parent.array_field)) AS child
 */

describe('Test 2141 - UNNEST function for flattening nested objects', function () {
	it('1. Basic UNNEST function with simple array', function (done) {
		var data = [1, 2, 3, 4, 5];
		// Note: SELECT COLUMN _ is used for primitive values to return the array itself
		// rather than wrapping each value in an object
		var res = alasql('SELECT COLUMN _ FROM UNNEST(?)', [data]);
		assert.deepEqual(res, [1, 2, 3, 4, 5]);
		done();
	});

	it('2. UNNEST function with array of objects', function (done) {
		var data = [
			{id: 1, value: 2},
			{id: 3, value: 4},
		];
		var res = alasql('SELECT * FROM UNNEST(?)', [data]);
		assert.deepEqual(res, [
			{id: 1, value: 2},
			{id: 3, value: 4},
		]);
		done();
	});

	it('3. CROSS APPLY with UNNEST for nested object flattening', function (done) {
		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [
					{id: 5, value: 6},
					{id: 7, value: 8},
					{id: 9, value: 10},
				],
			},
		];

		var res = alasql(
			'SELECT b.name, e.id, e.value \
			FROM ? AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e',
			[data]
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2},
			{name: 'a', id: 3, value: 4},
			{name: 'b', id: 5, value: 6},
			{name: 'b', id: 7, value: 8},
			{name: 'b', id: 9, value: 10},
		]);
		done();
	});

	it('4. OUTER APPLY with UNNEST handles empty arrays', function (done) {
		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [],
			},
			{
				name: 'c',
				entries: [{id: 5, value: 6}],
			},
		];

		var res = alasql(
			'SELECT b.name, e.id, e.value \
			FROM ? AS b \
			OUTER APPLY (SELECT * FROM UNNEST(b.entries)) AS e',
			[data]
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2},
			{name: 'a', id: 3, value: 4},
			{name: 'b', id: undefined, value: undefined},
			{name: 'c', id: 5, value: 6},
		]);
		done();
	});

	it('5. CROSS APPLY with UNNEST - join flattened data with another table', function (done) {
		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [
					{id: 1, value: 6},
					{id: 2, value: 8},
				],
			},
		];

		var lookup = [
			{id: 1, label: 'first'},
			{id: 2, label: 'second'},
			{id: 3, label: 'third'},
		];

		var res = alasql(
			'SELECT b.name, e.id, e.value, l.label \
			FROM ? AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e \
			JOIN ? AS l ON l.id = e.id',
			[data, lookup]
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2, label: 'first'},
			{name: 'a', id: 3, value: 4, label: 'third'},
			{name: 'b', id: 1, value: 6, label: 'first'},
			{name: 'b', id: 2, value: 8, label: 'second'},
		]);
		done();
	});

	it('6. Flattening from database.table format', function (done) {
		alasql('CREATE DATABASE IF NOT EXISTS testdb2141');
		alasql('USE testdb2141');
		alasql('CREATE TABLE IF NOT EXISTS testtable (name STRING, entries)');

		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [
					{id: 5, value: 6},
					{id: 7, value: 8},
					{id: 9, value: 10},
				],
			},
		];

		alasql('INSERT INTO testtable SELECT * FROM ?', [data]);

		var res = alasql(
			'SELECT b.name, e.id, e.value \
			FROM testdb2141.testtable AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e'
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2},
			{name: 'a', id: 3, value: 4},
			{name: 'b', id: 5, value: 6},
			{name: 'b', id: 7, value: 8},
			{name: 'b', id: 9, value: 10},
		]);

		alasql('DROP DATABASE testdb2141');
		done();
	});

	it('7. Using arrow operator for nested property access in SELECT', function (done) {
		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [{id: 5, value: 6}],
			},
		];

		var res = alasql(
			'SELECT b.name, e.id AS id, e.value AS val \
			FROM ? AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e',
			[data]
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, val: 2},
			{name: 'a', id: 3, val: 4},
			{name: 'b', id: 5, val: 6},
		]);
		done();
	});

	it('8. Example from issue - exact scenario', function (done) {
		// Create database and table as in the issue
		alasql('CREATE DATABASE IF NOT EXISTS A');
		alasql('USE A');
		alasql('CREATE TABLE IF NOT EXISTS B (name STRING, entries)');

		var data = [
			{
				name: 'a',
				entries: [
					{id: 1, value: 2},
					{id: 3, value: 4},
				],
			},
			{
				name: 'b',
				entries: [
					{id: 5, value: 6},
					{id: 7, value: 8},
					{id: 9, value: 10},
				],
			},
		];

		alasql('INSERT INTO B SELECT * FROM ?', [data]);

		// Use the flattening query as suggested in the issue comments
		var res = alasql(
			'SELECT b.name, e.id, e.value \
			FROM A.B AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e'
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2},
			{name: 'a', id: 3, value: 4},
			{name: 'b', id: 5, value: 6},
			{name: 'b', id: 7, value: 8},
			{name: 'b', id: 9, value: 10},
		]);

		alasql('DROP DATABASE A');
		done();
	});
});
