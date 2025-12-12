if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2318 - Update table with PK and direct data assignment', function () {
	const test = '2318';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Update with no PK and direct assignment works', function () {
		alasql('create table nopk (id int, name string)');
		var db = alasql.databases['test' + test];
		db.tables.nopk.data = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];

		var res = alasql('update nopk set name = ? where id = ?', ['Charlie', 1]);
		assert.equal(res, 1);

		var data = alasql('select * from nopk order by id');
		assert.deepEqual(data, [
			{id: 1, name: 'Charlie'},
			{id: 2, name: 'Bob'},
		]);
	});

	it('B) Update with PK and INSERT works', function () {
		alasql('create table withpk (id int primary key, name string)');
		alasql('insert into withpk values (1, ?)', ['Alice']);
		alasql('insert into withpk values (2, ?)', ['Bob']);

		var res = alasql('update withpk set name = ? where id = ?', ['Charlie', 1]);
		assert.equal(res, 1);

		var data = alasql('select * from withpk order by id');
		assert.deepEqual(data, [
			{id: 1, name: 'Charlie'},
			{id: 2, name: 'Bob'},
		]);
	});

	it('C) Update with PK and direct assignment should work', function () {
		alasql('create table withpk2 (id int primary key, name string)');
		var db = alasql.databases['test' + test];
		db.tables.withpk2.data = [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		];

		// This should work but currently throws "Something wrong with index on table"
		var res = alasql('update withpk2 set name = ? where id = ?', ['Charlie', 1]);
		assert.equal(res, 1);

		var data = alasql('select * from withpk2 order by id');
		assert.deepEqual(data, [
			{id: 1, name: 'Charlie'},
			{id: 2, name: 'Bob'},
		]);
	});

	it('D) Update with composite PK and direct assignment should work', function () {
		alasql('create table composite (id1 int, id2 int, name string, primary key(id1, id2))');
		var db = alasql.databases['test' + test];
		db.tables.composite.data = [
			{id1: 1, id2: 1, name: 'Alice'},
			{id1: 1, id2: 2, name: 'Bob'},
		];

		var res = alasql('update composite set name = ? where id1 = ? and id2 = ?', ['Charlie', 1, 1]);
		assert.equal(res, 1);

		var data = alasql('select * from composite order by id1, id2');
		assert.deepEqual(data, [
			{id1: 1, id2: 1, name: 'Charlie'},
			{id1: 1, id2: 2, name: 'Bob'},
		]);
	});

	it('E) Update with UNIQUE constraint and direct assignment should work', function () {
		alasql('create table withunique (id int, email string unique, name string)');
		var db = alasql.databases['test' + test];
		db.tables.withunique.data = [
			{id: 1, email: 'alice@example.com', name: 'Alice'},
			{id: 2, email: 'bob@example.com', name: 'Bob'},
		];

		var res = alasql('update withunique set name = ? where email = ?', [
			'Charlie',
			'alice@example.com',
		]);
		assert.equal(res, 1);

		var data = alasql('select * from withunique order by id');
		assert.deepEqual(data, [
			{id: 1, email: 'alice@example.com', name: 'Charlie'},
			{id: 2, email: 'bob@example.com', name: 'Bob'},
		]);
	});
});
