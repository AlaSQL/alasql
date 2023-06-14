if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

const testID = '000'; // Seek to use a github issue number

describe('Issue #' + testID + ' - multiple statements', function () {
	before(function () {
		alasql('create database test' + testID);
		alasql('use test' + testID);
	});

	after(function () {
		alasql('drop database test' + testID);
	});

	it('A) From single lines', function () {
		const res = [];
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('B) Multiple statements in one string', function () {
		//
		let sql = 'create table two (a int);';
		sql += 'insert into two values (1),(2),(3),(4),(5);';
		sql += 'select * from two;';
		let res = alasql(sql);
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	it('C) Multiple statements in one string with callback', function (done) {
		// Please note that first parameter (here `done`) must be called if defined - and is needed when testing async code
		let sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql.promise(sql).then( function (res) {
			assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
});
