if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 105-B - FORMAT function', function () {
	const test = '105B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) MySQL-style numeric formatting - FORMAT(number, decimals)', function () {
		// Basic number formatting with 2 decimal places
		var res = alasql('SELECT VALUE FORMAT(12332.123456, 2)');
		assert.equal(res, '12,332.12');

		// Single decimal place
		res = alasql('SELECT VALUE FORMAT(12332.2, 1)');
		assert.equal(res, '12,332.2');

		// No decimal places
		res = alasql('SELECT VALUE FORMAT(12332.2, 0)');
		assert.equal(res, '12,332');

		// Small number
		res = alasql('SELECT VALUE FORMAT(123.456, 2)');
		assert.equal(res, '123.46');
	});

	it('B) FORMAT with negative numbers', function () {
		var res = alasql('SELECT VALUE FORMAT(-12332.123456, 2)');
		assert.equal(res, '-12,332.12');

		res = alasql('SELECT VALUE FORMAT(-999.99, 0)');
		assert.equal(res, '-1,000');
	});

	it('C) FORMAT with zero and NULL', function () {
		var res = alasql('SELECT VALUE FORMAT(0, 2)');
		assert.equal(res, '0.00');

		res = alasql('SELECT VALUE FORMAT(NULL, 2)');
		assert.equal(res, null);
	});

	it('D) FORMAT in table queries', function () {
		alasql('CREATE TABLE prices (id INT, price DECIMAL(10,2))');
		alasql('INSERT INTO prices VALUES (1, 1234.567), (2, 98765.4321), (3, 0.99)');

		var res = alasql('SELECT id, FORMAT(price, 2) AS formatted FROM prices ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, formatted: '1,234.57'},
			{id: 2, formatted: '98,765.43'},
			{id: 3, formatted: '0.99'},
		]);

		alasql('DROP TABLE prices');
	});

	it('E) FORMAT with different decimal precision', function () {
		var res = alasql('SELECT VALUE FORMAT(1234.56789, 0)');
		assert.equal(res, '1,235');

		res = alasql('SELECT VALUE FORMAT(1234.56789, 1)');
		assert.equal(res, '1,234.6');

		res = alasql('SELECT VALUE FORMAT(1234.56789, 3)');
		assert.equal(res, '1,234.568');

		res = alasql('SELECT VALUE FORMAT(1234.56789, 4)');
		assert.equal(res, '1,234.5679');
	});

	it('F) FORMAT with very large numbers', function () {
		var res = alasql('SELECT VALUE FORMAT(1234567890.123, 2)');
		assert.equal(res, '1,234,567,890.12');

		res = alasql('SELECT VALUE FORMAT(999999999999.99, 2)');
		assert.equal(res, '999,999,999,999.99');
	});

	it('G) FORMAT with numbers less than 1', function () {
		var res = alasql('SELECT VALUE FORMAT(0.123456, 2)');
		assert.equal(res, '0.12');

		res = alasql('SELECT VALUE FORMAT(0.999, 0)');
		assert.equal(res, '1');
	});

	it('H) FORMAT with string numbers', function () {
		var res = alasql("SELECT VALUE FORMAT('1234.567', 2)");
		assert.equal(res, '1,234.57');
	});
});
