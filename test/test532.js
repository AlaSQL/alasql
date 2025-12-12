if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 532 - UNNEST function for flattening nested objects', function () {
	it('1. Basic UNNEST function with simple array', function (done) {
		var data = [1, 2, 3, 4, 5];
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
		alasql('CREATE DATABASE IF NOT EXISTS testdb532');
		alasql('USE testdb532');
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
			FROM testdb532.testtable AS b \
			CROSS APPLY (SELECT * FROM UNNEST(b.entries)) AS e'
		);

		assert.deepEqual(res, [
			{name: 'a', id: 1, value: 2},
			{name: 'a', id: 3, value: 4},
			{name: 'b', id: 5, value: 6},
			{name: 'b', id: 7, value: 8},
			{name: 'b', id: 9, value: 10},
		]);

		alasql('DROP DATABASE testdb532');
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
});
