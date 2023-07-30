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
		assert.deepEqual(res, {
			columns: [
				{
					columnid: 'a',
				},
			],
			data: [],
		});
	});
});
