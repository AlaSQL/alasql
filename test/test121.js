if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 121 - Views', function () {
	it('0. Create database', function (done) {
		alasql('create database test121');
		alasql('use test121');
		done();
	});

	it('1. CREATE VIEW', function (done) {
		alasql('create table one (a int, b int)');
		alasql('insert into one values (1,10), (2,20), (3,30)');

		alasql('create view two as select a from one');
		//		assert(!!alasql.databases.test121.tables.two);

		var res = alasql('select value sum(a) from two');
		assert(res == 6);

		alasql('drop view two');
		//		assert(!alasql.databases.test121.tables.two);
		done();
	});

	it('Clear database', function (done) {
		alasql('drop database test121');
		done();
	});
});
