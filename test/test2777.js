if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2777';

describe(`Test ${testId} - CREATE DATABASE IF NOT EXISTS`, function () {
	const dbid = 'test' + testId;

	afterEach(function () {
		alasql('drop database if exists ' + dbid);
	});

	it('A) Returns 1 then 0 and keeps the existing database', function () {
		let res = [];
		res.push(alasql('create database if not exists ' + dbid));
		alasql.databases[dbid].exec('create table one (a int)');
		alasql.databases[dbid].exec('insert into one values (1)');
		res.push(alasql('create database if not exists ' + dbid));
		res.push(alasql.databases[dbid].exec('select * from one'));
		assert.deepStrictEqual(res, [1, 0, [{a: 1}]]);
	});

	it('B) Reports 0 through the callback when the database exists', function (done) {
		alasql('create database ' + dbid);
		alasql('create database if not exists ' + dbid, function (res) {
			assert.deepStrictEqual(res, 0);
			done();
		});
	});

	it('C) Still throws without IF NOT EXISTS when the database exists', function () {
		alasql('create database ' + dbid);
		assert.throws(() => alasql('create database ' + dbid), /already exists/);
	});

	it('D) Parses IF NOT EXISTS into the statement', function () {
		const statement = alasql.parse('create database if not exists ' + dbid).statements[0];
		assert.deepStrictEqual(statement.ifnotexists, true);
		assert.ok(statement.toString().includes('IF NOT EXISTS'));
	});
});
