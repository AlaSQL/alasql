if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 057-B - UPDATE with FROM and JOIN', function () {
	const test = '057B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) UPDATE with INNER JOIN using FROM clause', function () {
		// Create test tables
		alasql('CREATE TABLE odoc (uniqueid INT, osmlineid INT)');
		alasql('CREATE TABLE osmline (uniqueid INT, osmlineid INT)');

		// Insert test data
		alasql('INSERT INTO odoc VALUES (1, NULL), (2, NULL), (3, NULL)');
		alasql('INSERT INTO osmline VALUES (1, 100), (2, 200), (3, 300)');

		// Execute UPDATE with FROM and INNER JOIN
		var res = alasql(
			'UPDATE odoc SET osmlineid = s.osmlineid FROM odoc o INNER JOIN osmline s ON o.uniqueid = s.uniqueid'
		);

		// Verify the result - should return number of updated rows
		assert.equal(res, 3);

		// Verify the data was updated correctly
		var data = alasql('SELECT * FROM odoc ORDER BY uniqueid');
		assert.deepEqual(data, [
			{uniqueid: 1, osmlineid: 100},
			{uniqueid: 2, osmlineid: 200},
			{uniqueid: 3, osmlineid: 300},
		]);

		// Cleanup
		alasql('DROP TABLE odoc');
		alasql('DROP TABLE osmline');
	});

	it('B) UPDATE with LEFT JOIN using FROM clause', function () {
		// Create test tables
		alasql('CREATE TABLE targets (id INT, val INT)');
		alasql('CREATE TABLE sources (id INT, val INT)');

		// Insert test data
		alasql('INSERT INTO targets VALUES (1, NULL), (2, NULL), (3, NULL)');
		alasql('INSERT INTO sources VALUES (1, 10), (2, 20)'); // Note: no id=3

		// Execute UPDATE with FROM and LEFT JOIN
		var res = alasql(
			'UPDATE targets SET val = s.val FROM targets t LEFT JOIN sources s ON t.id = s.id'
		);

		// Verify the result
		assert.equal(res, 3);

		// Verify the data - id=3 should remain NULL
		var data = alasql('SELECT * FROM targets ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, val: 10},
			{id: 2, val: 20},
			{id: 3, val: null},
		]);

		// Cleanup
		alasql('DROP TABLE targets');
		alasql('DROP TABLE sources');
	});

	it('C) UPDATE with WHERE clause combined with JOIN', function () {
		// Create test tables
		alasql('CREATE TABLE items (id INT, price INT, category INT)');
		alasql('CREATE TABLE categories (id INT, discount INT)');

		// Insert test data
		alasql('INSERT INTO items VALUES (1, 100, 1), (2, 200, 1), (3, 150, 2)');
		alasql('INSERT INTO categories VALUES (1, 10), (2, 20)');

		// Execute UPDATE with FROM, JOIN, and WHERE
		var res = alasql(
			'UPDATE items SET price = i.price - c.discount FROM items i INNER JOIN categories c ON i.category = c.id WHERE i.price > 100'
		);

		// Verify only items with price > 100 were updated
		assert.equal(res, 2);

		var data = alasql('SELECT * FROM items ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, price: 100, category: 1}, // Not updated (price = 100)
			{id: 2, price: 190, category: 1}, // Updated (200 - 10)
			{id: 3, price: 130, category: 2}, // Updated (150 - 20)
		]);

		// Cleanup
		alasql('DROP TABLE items');
		alasql('DROP TABLE categories');
	});
});
