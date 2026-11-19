if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1054';

describe(`Test ${testId} - SELECT INTO a table checks its constraints`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql(`
			CREATE TABLE fruits (fruitid INT PRIMARY KEY, fruitname STRING);
			CREATE TABLE orders (
				orderid INT PRIMARY KEY IDENTITY,
				fruitid INT REFERENCES fruits(fruitid),
				qty INT CHECK (qty > 0)
			);
		`);
		alasql('SELECT * INTO fruits FROM ?', [
			[
				{fruitid: 1, fruitname: 'Banana'},
				{fruitid: 2, fruitname: 'Apple'},
			],
		]);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Rejects a duplicate primary key', function () {
		assert.throws(function () {
			alasql('SELECT * INTO fruits FROM ?', [[{fruitid: 1, fruitname: 'Cherry'}]]);
		}, /primary key/);
		assert.throws(function () {
			alasql('INSERT INTO fruits VALUES (2, "Cherry")');
		}, /primary key/);
		assert.deepStrictEqual(alasql('SELECT * FROM fruits'), [
			{fruitid: 1, fruitname: 'Banana'},
			{fruitid: 2, fruitname: 'Apple'},
		]);
	});

	it('B) Rejects a missing foreign key', function () {
		assert.throws(function () {
			alasql('SELECT * INTO orders FROM ?', [[{orderid: 1, fruitid: 9, qty: 7}]]);
		}, /Foreign key "9" not found in table "fruits"/);
		assert.deepStrictEqual(alasql('SELECT * FROM orders'), []);
	});

	it('C) Rejects a failed CHECK constraint', function () {
		assert.throws(function () {
			alasql('SELECT * INTO orders FROM ?', [[{orderid: 1, fruitid: 1, qty: 0}]]);
		}, /CHECK constraint/);
		assert.deepStrictEqual(alasql('SELECT * FROM orders'), []);
	});

	it('D) Fills IDENTITY columns', function () {
		var res = alasql('SELECT * INTO orders FROM ?', [
			[
				{fruitid: 1, qty: 7},
				{fruitid: 2, qty: 3},
			],
		]);
		assert.strictEqual(res, 2);
		assert.deepStrictEqual(alasql('SELECT * FROM orders'), [
			{fruitid: 1, qty: 7, orderid: 1},
			{fruitid: 2, qty: 3, orderid: 2},
		]);
	});
});
