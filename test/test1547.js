if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1547 - Empty recordset', function () {
	const test = '1547';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('Returns columns for empty recordset', function () {
		alasql('create table one (a int)');
		alasql('insert into one values (1),(2),(3),(4),(5)');
		let res = alasql('recordset of select * from one where a = 999');

		// Verify that columns are returned even when there are no rows
		assert.strictEqual(res.columns.length, 1, 'Should have 1 column');
		assert.strictEqual(res.columns[0].columnid, 'a', 'Column should be named "a"');
		assert.strictEqual(res.data.length, 0, 'Data should be empty');
	});

	it('Returns multiple columns for empty recordset', function () {
		alasql('create table multi (id int, name varchar(50), amount double)');
		alasql('insert into multi values (1, "test", 1.5), (2, "test2", 2.5)');
		let res = alasql('recordset of select * from multi where id = 999');

		// Verify that all columns are returned even when there are no rows
		assert.strictEqual(res.columns.length, 3, 'Should have 3 columns');
		assert.strictEqual(res.columns[0].columnid, 'id', 'First column should be "id"');
		assert.strictEqual(res.columns[1].columnid, 'name', 'Second column should be "name"');
		assert.strictEqual(res.columns[2].columnid, 'amount', 'Third column should be "amount"');
		assert.strictEqual(res.data.length, 0, 'Data should be empty');
	});
});
