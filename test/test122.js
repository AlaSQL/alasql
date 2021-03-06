if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 122 - PRIMARY KEY, CREATE INDEX UNIQUE', function () {
	before(function () {
		alasql('create database test122');
		alasql('use test122');
	});

	after(function () {
		alasql('drop database test122');
	});

	it('1. Create Index', function (done) {
		alasql('create table one (a int, b int)');

		alasql('create unique index onea on one(a)');
		//		console.log(alasql.databases.test122.tables.one);

		alasql('create index oneb on one(b)');

		alasql('insert into one values (1,10), (2,20), (3,30)');

		done();
	});

	it.skip('2. UNIQUE Index with repeated data', function (done) {
		assert.throws(function () {
			alasql('insert into one values (1,40)');
		}, Error);
		done();
	});

	it('3. normal Index with repeated data', function (done) {
		alasql('insert into one values (4,30)');
		done();
	});

	it('4. same data index', function (done) {
		alasql('insert into one values (4,30)');
		done();
	});
});
