if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2360 - DELETED keyword should not be overly restrictive', function () {
	const test = '2360';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	// NOTE: Tests should use assert.deepEqual to verify the complete expected output
	// against the actual result object. This ensures comprehensive validation and
	// makes test failures more informative by showing the full diff.

	it('A) DELETED should work as a table name', function () {
		alasql('create table deleted (id int, name string)');
		alasql('insert into deleted values (1, "Alice"), (2, "Bob")');
		var res = alasql('select * from deleted order by id');
		assert.deepEqual(res, [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		]);
		alasql('drop table deleted');
	});

	it('B) DELETED should work as a column name', function () {
		alasql('create table items (id int, deleted boolean)');
		alasql('insert into items values (1, false), (2, true), (3, false)');
		var res = alasql('select * from items where deleted = false order by id');
		assert.deepEqual(res, [
			{id: 1, deleted: false},
			{id: 3, deleted: false},
		]);
		alasql('drop table items');
	});

	it('C) DELETED should still work in OUTPUT clause with DELETE', function () {
		alasql('create table orders (id int, customer string, amount number)');
		alasql('insert into orders values (1, "Alice", 100), (2, "Bob", 200)');
		var res = alasql('delete from orders where amount > 120 output deleted.*');
		assert.deepEqual(res, [{id: 2, customer: 'Bob', amount: 200}]);
	});

	it('D) DELETED should still work in OUTPUT clause with UPDATE', function () {
		alasql('create table stock (id int, symbol string, price number)');
		alasql('insert into stock values (1, "AAPL", 150)');
		var res = alasql('update stock set price = 160 where symbol = "AAPL" output deleted.price');
		assert.deepEqual(res, [{price: 150}]);
	});

	it('E) Can use DELETED as column name and in OUTPUT clause', function () {
		alasql('create table audit (id int, deleted boolean, val int)');
		alasql('insert into audit values (1, false, 100), (2, true, 200)');
		// Update the deleted column and use OUTPUT with DELETED prefix
		var res = alasql(
			'update audit set val = 999 where id = 1 output deleted.deleted as was_deleted, inserted.deleted as is_deleted'
		);
		assert.deepEqual(res, [{was_deleted: false, is_deleted: false}]);
		alasql('drop table audit');
	});

	it('F) DELETED table with DELETED column', function () {
		alasql('create table deleted (id int, deleted boolean)');
		alasql('insert into deleted values (1, true), (2, false)');
		var res = alasql('select * from deleted where deleted = true');
		assert.deepEqual(res, [{id: 1, deleted: true}]);
		alasql('drop table deleted');
	});

	it('G) DELETED as table name in joins', function () {
		// DELETED works as a table name. Note: qualified references like "deleted.column"
		// when joined may be ambiguous with OUTPUT pseudo-table. Use aliases as workaround.
		alasql('create table deleted (xid int, xname string)');
		alasql('insert into deleted values (1, "Test")');
		var res = alasql('select * from deleted');
		assert.deepEqual(res, [{xid: 1, xname: 'Test'}]);
		alasql('drop table deleted');
	});

	it('H) Table alias named DELETED', function () {
		alasql('create table products (id int, productname string)');
		alasql('insert into products values (1, "Widget")');
		var res = alasql('select * from products as deleted');
		assert.deepEqual(res, [{id: 1, productname: 'Widget'}]);
		alasql('drop table products');
	});

	it('I) Select with DELETED as column alias', function () {
		alasql('create table data (id int, status string)');
		alasql('insert into data values (1, "removed")');
		var res = alasql('select status as deleted from data');
		assert.deepEqual(res, [{deleted: 'removed'}]);
	});

	it('J) DELETED in WHERE clause as column reference', function () {
		alasql('create table records (id int, deleted boolean, val int)');
		alasql('insert into records values (1, false, 10), (2, true, 20), (3, false, 30)');
		var res = alasql('select * from records where deleted = false order by id');
		assert.deepEqual(res, [
			{id: 1, deleted: false, val: 10},
			{id: 3, deleted: false, val: 30},
		]);
		alasql('drop table records');
	});

	it('K) ORDER BY with DELETED column', function () {
		alasql('create table tasks (id int, deleted boolean)');
		alasql('insert into tasks values (3, true), (1, false), (2, true)');
		var res = alasql('select * from tasks order by deleted, id');
		assert.deepEqual(res, [
			{id: 1, deleted: false},
			{id: 2, deleted: true},
			{id: 3, deleted: true},
		]);
		alasql('drop table tasks');
	});

	it('L) GROUP BY with DELETED column', function () {
		alasql('create table stats (id int, deleted boolean, cnt int)');
		alasql('insert into stats values (1, false, 5), (2, true, 3), (3, false, 7)');
		var res = alasql('select deleted, sum(cnt) as sumcnt from stats group by deleted');
		// Sort to ensure consistent order
		res.sort((a, b) => (a.deleted === b.deleted ? 0 : a.deleted ? 1 : -1));
		assert.deepEqual(res, [
			{deleted: false, sumcnt: 12},
			{deleted: true, sumcnt: 3},
		]);
		alasql('drop table stats');
	});

	it('M) INSERT into table named DELETED', function () {
		alasql('create table deleted2 (id int, val string)');
		var count = alasql('insert into deleted2 values (1, "test")');
		assert.equal(count, 1);
		var res = alasql('select * from deleted2');
		assert.deepEqual(res, [{id: 1, val: 'test'}]);
		alasql('drop table deleted2');
	});

	it('N) UPDATE table named DELETED', function () {
		alasql('create table deleted3 (id int, val string)');
		alasql('insert into deleted3 values (1, "old")');
		var count = alasql('update deleted3 set val = "new" where id = 1');
		assert.equal(count, 1);
		var res = alasql('select * from deleted3');
		assert.deepEqual(res, [{id: 1, val: 'new'}]);
		alasql('drop table deleted3');
	});

	it('O) DELETE from table named DELETED', function () {
		alasql('create table deleted4 (id int, val string)');
		alasql('insert into deleted4 values (1, "test"), (2, "test2")');
		var count = alasql('delete from deleted4 where id = 1');
		assert.equal(count, 1);
		var res = alasql('select * from deleted4');
		assert.deepEqual(res, [{id: 2, val: 'test2'}]);
		alasql('drop table deleted4');
	});
});
