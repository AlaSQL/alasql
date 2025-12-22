if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 942 - Duplicate aggregate functions return different values', function () {
	const test = '942';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Two identical SUM aggregates without rownum should return same value', function () {
		alasql('CREATE TABLE test (population number)');
		alasql('INSERT INTO test VALUES (100), (200), (300)');

		var res = alasql('SELECT sum(population) as val1, sum(population) as val2 FROM test');

		assert.deepEqual(res, [{val1: 600, val2: 600}]);

		alasql('DROP TABLE test');
	});

	it('B) Two identical SUM aggregates with rownum should return same value', function () {
		alasql('CREATE TABLE test (city string, price number, people number, population number)');
		alasql(
			"INSERT INTO test VALUES ('Rome',10,1,2863223),('Paris',20,1,2249975),('Berlin',30,1,3517424), ('Madrid',40,1,3041579)"
		);

		var res = alasql(
			'SELECT sum(population) as val3, sum(population) as val4, rownum() as rownum FROM test'
		);

		assert.deepEqual(res, [{val3: 11672201, val4: 11672201, rownum: 1}]);

		alasql('DROP TABLE test');
	});

	it('C) Multiple identical aggregates in complex query', function () {
		alasql('CREATE TABLE test (city string, price number, people number, population number)');
		alasql(
			"INSERT INTO test VALUES ('Rome',10,1,2863223),('Paris',20,1,2249975),('Berlin',30,1,3517424), ('Madrid',40,1,3041579)"
		);

		var sql =
			'SELECT ' +
			'CASE WHEN sum(people)=0 THEN 0 ELSE (sum(cast(price as float)) / sum(cast(people as float))) END as val1, ' +
			'CASE WHEN sum(population)=0 THEN 0 ELSE (sum(cast(price as float)) / sum(cast(population as float))) END as val2, ' +
			'sum(population) as val3, ' +
			'sum(population) as val4, ' +
			'rownum() as rownum ' +
			'FROM test';

		var res = alasql(sql);

		assert.deepEqual(res, [
			{
				val1: 25,
				val2: 0.000008567364458511296,
				val3: 11672201,
				val4: 11672201,
				rownum: 1,
			},
		]);

		alasql('DROP TABLE test');
	});

	it('D) Mixed aggregates with some duplicates', function () {
		alasql('CREATE TABLE test (a int, b int, c int)');
		alasql('INSERT INTO test VALUES (1,10,100),(2,20,200),(3,30,300)');

		var res = alasql(
			'SELECT sum(a) as sum1, sum(a) as sum2, sum(b) as sum3, count(a) as cnt1, count(b) as cnt2, avg(a) as avg1 FROM test'
		);

		assert.deepEqual(res, [{sum1: 6, sum2: 6, sum3: 60, cnt1: 3, cnt2: 3, avg1: 2}]);

		alasql('DROP TABLE test');
	});

	it('E) Multiple duplicate aggregates with different functions', function () {
		alasql('CREATE TABLE test (x int, y int)');
		alasql('INSERT INTO test VALUES (5,10),(15,20),(25,30)');

		var res = alasql(
			'SELECT sum(x) as s1, sum(x) as s2, sum(y) as s3, sum(y) as s4, min(x) as min1, min(x) as min2, max(y) as max1, max(y) as max2 FROM test'
		);

		assert.deepEqual(res, [{s1: 45, s2: 45, s3: 60, s4: 60, min1: 5, min2: 5, max1: 30, max2: 30}]);

		alasql('DROP TABLE test');
	});

	it('F) Duplicate aggregates in SELECT ROW modifier', function () {
		alasql('CREATE TABLE test (val int)');
		alasql('INSERT INTO test VALUES (1),(2),(3),(4),(5)');

		var res = alasql('SELECT ROW sum(val), sum(val), count(val), count(val) FROM test');

		assert.deepEqual(res, [15, 15, 5, 5]);

		alasql('DROP TABLE test');
	});
});
