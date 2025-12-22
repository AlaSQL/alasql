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
		assert.strictEqual(res[0].val1, res[0].val2, 'val1 and val2 should be equal');

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

		assert.strictEqual(res[0].val3, res[0].val4, 'val3 and val4 should be equal');
		assert.strictEqual(res[0].val3, 11672201, 'val3 should be 11672201');
		assert.strictEqual(res[0].val4, 11672201, 'val4 should be 11672201');

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

		assert.strictEqual(res[0].val3, res[0].val4, 'val3 and val4 should be equal');
		assert.strictEqual(res[0].val3, 11672201, 'val3 should be the sum of all populations');

		alasql('DROP TABLE test');
	});
});
