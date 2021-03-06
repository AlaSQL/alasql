if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 116', function () {
	it('1. Single statement CREATE, USE and DROP DATABASE', function (done) {
		alasql('create database test116');
		assert(!!alasql.databases.test116);
		alasql('use test116');
		assert(alasql.useid == 'test116');
		alasql('drop database test116');
		assert(!alasql.databases.test116);
		assert(alasql.useid == 'alasql');
		done();
	});

	it('2. Single statement CREATE, USE and DROP CREATE TABLE ', function (done) {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		assert(!!alasql.tables.one);
		alasql('insert into one values (10)');
		assert(alasql.tables.one.data.length == 1);
		var res = alasql('select value sum(a) from one');
		assert(res == 10);
		alasql('drop database test116');
		done();
	});

	it('3. Single statement CREATE, USE and DROP CREATE TABLE ', function (done) {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		var ins = alasql.compile('insert into one values (10)');
		ins();
		assert(alasql.tables.one.data.length == 1);
		var sel = alasql.compile('select value sum(a) from one where a = ?');
		var res = sel([10]);
		var res = alasql('select value sum(a) from one');
		assert(res == 10);
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 1);
		alasql('drop database test116');
		done();
	});

	it('4. Compile and reset cache', function (done) {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into one (a) values (?)', [20]);
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 1);

		alasql('insert into one values (?)', [30]);
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 2);

		var res = alasql('select column a from one order by a');
		assert.deepEqual(res, [10, 20, 30]);
		alasql.databases.test116.resetSqlCache();
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 0);

		alasql('insert into one (a) values (?)', [40]);
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 1);

		var ins = alasql.compile('insert into one values (?)');
		ins([50]);
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 1);

		alasql('insert into one (a) values (60); insert into one (a) values (70)');
		assert(Object.keys(alasql.databases.test116.sqlCache).length == 1);

		var res = alasql('select value count(*) from one');
		assert(res == 7);

		var res = alasql('select value sum(a) from one');
		assert(res == 280);

		alasql('drop database test116');
		done();
	});

	it('5. INSERT INTO one SELECT ', function (done) {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('create table two (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into two select * from one');
		var res = alasql('select value * from two');
		assert((res = 10));
		alasql('drop database test116');
		done();
	});

	it('6. SELECT * INTO one ', function (done) {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('create table two (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into one (a) values (?)', [5]);
		var res = alasql('select value sum(a) from one');
		assert((res = 15));
		alasql('insert into two (a) values (?)', [20]);
		var res = alasql('select * into two from one');
		//		console.log(107,res);
		assert(res == 2);
		assert(alasql.databases.test116.tables.one.data.length == 2);
		assert(alasql.databases.test116.tables.two.data.length == 3);
		var res = alasql('select value sum(a) from two');
		//		console.log(res);
		assert(res == 35);
		alasql('drop database test116');
		done();
	});
});
