if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '000'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - multiple statements`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepEqual the final and complete output of the last call to alasql

	it('A) From single lines', function () {
		let res = [];
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		assert.deepStrictEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('B) Multiple statements in one string', function () {
		//
		let sql = 'create table two (a int);';
		sql += 'insert into two values (1),(2),(3),(4),(5);';
		sql += 'select * from two;';
		let res = alasql(sql);
		assert.deepStrictEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('C) Multiple statements in one string with callback', function (done) {
		// use first param (here `done`) when operating with async function or async code
		let sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function (res) {
			assert.deepStrictEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
});
