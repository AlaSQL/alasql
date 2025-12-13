if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 942 - Anonymous data tables', function () {
	const test = '942';

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

		// Check that the original data was modified
		assert.equal(mydata[1].status, 'on');
		assert.equal(mydata[3].status, 'on');
		assert.equal(mydata[0].status, 'off');
		assert.equal(mydata[2].status, 'off');
	});

	it('B) UPDATE anonymous data table without WHERE clause', function () {
		var mydata = [
			{name: 'Alice', age: 25},
			{name: 'Bob', age: 30},
		];

		var res = alasql('UPDATE ? SET age = age + 1', [mydata]);

		assert.equal(res, 2);
		assert.equal(mydata[0].age, 26);
		assert.equal(mydata[1].age, 31);
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

		// Check that rows were removed from the array
		assert.equal(mydata.length, 2);
		assert.equal(mydata[0].id, 1);
		assert.equal(mydata[1].id, 3);
	});

	it('D) DELETE from anonymous data table without WHERE clause', function () {
		var mydata = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];

		var res = alasql('DELETE FROM ?', [mydata]);

		assert.equal(res, 3);
		assert.equal(mydata.length, 0);
	});

	it('E) INSERT into anonymous data table from VALUES', function () {
		var mydata = [{id: 1, name: 'Alice'}];

		var res = alasql('INSERT INTO ? VALUES (2, "Bob")', [mydata]);

		// INSERT should return the number of rows inserted
		assert.equal(res, 1);

		// Check that the row was added
		assert.equal(mydata.length, 2);
		assert.deepEqual(mydata[1], [2, 'Bob']);
	});

	it('F) INSERT into anonymous data table from SELECT', function () {
		var mydata = [];
		var sourcedata = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];

		var res = alasql('INSERT INTO ? SELECT * FROM ?', [mydata, sourcedata]);

		assert.equal(res, 2);
		assert.equal(mydata.length, 2);
		assert.deepEqual(mydata[0], {id: 1, name: 'Alice'});
		assert.deepEqual(mydata[1], {id: 2, name: 'Bob'});
	});

	it('G) Complex UPDATE with expression', function () {
		var mydata = [
			{price: 100, discount: 10},
			{price: 200, discount: 20},
		];

		var res = alasql('UPDATE ? SET price = price - discount WHERE price > 150', [mydata]);

		assert.equal(res, 1);
		assert.equal(mydata[0].price, 100);
		assert.equal(mydata[1].price, 180);
	});
});
