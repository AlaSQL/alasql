if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2348 - Anonymous data tables', function () {
	const test = '2348';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) UPDATE anonymous data table with WHERE clause', function () {
		var mydata = [
			{type: 1, status: 'off'},
			{type: 4, status: 'off'},
			{type: 2, status: 'off'},
			{type: 4, status: 'off'},
		];

		var res = alasql("UPDATE ? SET status = 'on' WHERE type = 4", [mydata]);

		// UPDATE should return the number of rows updated
		assert.equal(res, 2);

		// Check that the complete data matches expected output
		assert.deepEqual(mydata, [
			{type: 1, status: 'off'},
			{type: 4, status: 'on'},
			{type: 2, status: 'off'},
			{type: 4, status: 'on'},
		]);
	});

	it('B) UPDATE anonymous data table without WHERE clause', function () {
		var mydata = [
			{name: 'Alice', age: 25},
			{name: 'Bob', age: 30},
		];

		var res = alasql('UPDATE ? SET age = age + 1', [mydata]);

		assert.equal(res, 2);
		assert.deepEqual(mydata, [
			{name: 'Alice', age: 26},
			{name: 'Bob', age: 31},
		]);
	});

	it('C) DELETE from anonymous data table with WHERE clause', function () {
		var mydata = [
			{id: 1, active: true},
			{id: 2, active: false},
			{id: 3, active: true},
			{id: 4, active: false},
		];

		var res = alasql('DELETE FROM ? WHERE active = false', [mydata]);

		// DELETE should return the number of rows deleted
		assert.equal(res, 2);

		// Check that the complete data matches expected output
		assert.deepEqual(mydata, [
			{id: 1, active: true},
			{id: 3, active: true},
		]);
	});

	it('D) DELETE from anonymous data table without WHERE clause', function () {
		var mydata = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];

		var res = alasql('DELETE FROM ?', [mydata]);

		assert.equal(res, 3);
		assert.deepEqual(mydata, []);
	});

	it('E) INSERT into anonymous data table from VALUES', function () {
		var mydata = [{id: 1, name: 'Alice'}];

		var res = alasql('INSERT INTO ? VALUES (2, "Bob")', [mydata]);

		// INSERT should return the number of rows inserted
		assert.equal(res, 1);

		// Check that the complete data matches expected output
		assert.deepEqual(mydata, [{id: 1, name: 'Alice'}, [2, 'Bob']]);
	});

	it('F) INSERT into anonymous data table from SELECT', function () {
		var mydata = [];
		var sourcedata = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];

		var res = alasql('INSERT INTO ? SELECT * FROM ?', [mydata, sourcedata]);

		assert.equal(res, 2);
		assert.deepEqual(mydata, [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		]);
	});

	it('G) Complex UPDATE with expression', function () {
		var mydata = [
			{price: 100, discount: 10},
			{price: 200, discount: 20},
		];

		var res = alasql('UPDATE ? SET price = price - discount WHERE price > 150', [mydata]);

		assert.equal(res, 1);
		assert.deepEqual(mydata, [
			{price: 100, discount: 10},
			{price: 180, discount: 20},
		]);
	});
});
