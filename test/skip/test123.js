if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 123 - SHOW DATABASES, TABLES, COLUMNS, INDEX, CREATE TABLE', function () {
	it('1. SHOW DATABASES', function (done) {
		alasql('create database test123a');
		alasql('create database test123b');
		alasql('use test123a');
		var res = alasql('show databases');
		assert(res.length >= 3);
		assert(
			res.filter(function (r) {
				return r.databaseid == 'test123a' || r.databaseid == 'test123b';
			}).length == 2
		);

		var res = alasql('show databases like "123%"');
		assert(res.length == 2);
		done();
	});

	it('2. SHOW TABLES', function (done) {
		alasql('create table one (a int, b int, c string)');
		alasql('create table two (b int)');
		alasql('create table three (c int)');
		var res = alasql('show tables');
		assert(res.length == 3);
		alasql('use test123b');
		alasql('create table four (a int, b int, c int, d int)');

		var res = alasql('show tables from test123a');
		assert(res.length == 3);

		alasql('use test123a');

		var res = alasql('show tables from test123a like "t%"');
		assert(res.length == 2);

		done();
	});

	it('3. SHOW COLUMNS', function (done) {
		var res = alasql('show columns from one');
		assert(res.length == 3);
		var res = alasql('show columns from four from test123b ');
		assert(res.length == 4);
		done();
	});

	it('4. SHOW CREATE TABLE', function (done) {
		var res = alasql('show create table one');
		assert(res == 'CREATE TABLE one (a INT, b INT, c STRING)');
		var res = alasql('show create table four from test123b');
		assert(res == 'CREATE TABLE four (a INT, b INT, c INT, d INT)');
		done();
	});

	it('5. SHOW INDEX', function (done) {
		alasql('insert into one values (1,1,1), (2,2,2), (4,4,4), (5,5,5), (6,6,6)');
		alasql('insert into two values (1),(2),(3),(6)');

		var res = alasql('show index from one');
		//		console.log(res);

		var res = alasql('select * from one join two using b');
		//		console.log(res);

		var res = alasql('show index from one');
		//		console.log(res);

		alasql('create index twob on two(b)');

		var res = alasql('show index from two');
		//		console.log(res);

		alasql('create unique index onea on one(a)');

		var res = alasql('show index from one');
		//		console.log(res);
		assert(false);
		done();
	});

	it('99.Clear database', function (done) {
		alasql('drop database test123a');
		alasql('drop database test123b');
		done();
	});
});
