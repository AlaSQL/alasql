if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 20 - User-defined functions', function () {
	it('User-defined functions', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int)');
		db.exec('INSERT INTO test1 VALUES (1)');
		db.exec('INSERT INTO test1 VALUES (2)');
		db.exec('INSERT INTO test1 VALUES (3)');
		db.exec('INSERT INTO test1 VALUES (4)');
		db.exec('INSERT INTO test1 VALUES (5)');
		db.exec('INSERT INTO test1 VALUES (6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (1, 1)');
		db.exec('INSERT INTO test2 VALUES (1, 2)');
		db.exec('INSERT INTO test2 VALUES (1, 3)');
		db.exec('INSERT INTO test2 VALUES (2, 4)');

		alasql.fn.double = function (x) {
			return x * 2;
		};
		alasql.fn.cubic = function (x) {
			return x * x * x;
		};

		var res = db.exec('SELECT a, double(a) AS b, cubic(a) AS c FROM test1 WHERE a = 2');
		assert.deepEqual([{a: 2, b: 4, c: 8}], res);
		done();
	});

	it('2 - User-defined functions + compilation', function (done) {
		alasql.fn.cubic3 = function (x) {
			return x * x * x;
		};
		var cub = alasql.compile('SELECT VALUE cubic3(?)');
		//		console.log(36,cub());
		//		console.log(37,cub([1]));
		//		console.log(38,cub([2]));
		assert(8 == cub([2]));
		done();
	});

	it("3 - Database's user-defined functions + compilation", function (done) {
		alasql('create database test20;use test20');
		alasql('create table one (a int)');
		alasql('insert into one values (10), (20), (30)');

		var num = 0;
		alasql.fn.spy = function (x) {
			//		alasql.fn.spy = function(x) {
			num++;
			return num;
		};
		var runspy = alasql.compile('select column spy(a) from one');
		var res = runspy();
		assert.deepEqual(res, [1, 2, 3]);

		num = 0;
		var runspy2 = alasql.compile('select value max(spy(a)) from one');
		var res = runspy2();
		assert.deepEqual(res, 3);

		alasql('drop database test20');
		done();
	});

	it("4 - Database's specific user-defined functions", function (done) {
		alasql('create database test20a;use test20a');
		alasql('create table one (a int)');
		alasql('insert into one values (10), (20), (30)');

		alasql.fn.myfun = function (x) {
			return x + 1;
		};

		var res = alasql('select COLUMN myfun(a) from one');
		assert.deepEqual(res, [11, 21, 31]);

		alasql('create database test20b;use test20b');
		alasql('create table one (a int)');
		alasql('insert into one values (10), (20), (30)');

		alasql.fn.myfun = function (x) {
			return x + 2;
		};

		var res = alasql('select column myfun(a) from one');
		assert.deepEqual(res, [12, 22, 32]);

		// alasql('use test20a');
		// var res = alasql.array('select myfun(a) from one');
		// assert.deepEqual(res,[11,21,31]);

		alasql('drop database test20a');
		alasql('drop database test20b');
		done();
	});
});
