if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #1276

  As reported in issue #1276
  WITH using a CSV source throws Error: Data source number 0 in undefined #1276

  As an example:

  with c as (
  SELECT *
  FROM CSV("https://cdn.rawgit.com/albertyw/avenews/master/old/data/average-latitude-longitude-countries.csv",{headers:true})
  )
  select * from c

*/

describe('Test 1276 - WITH using a CSV source', function () {
	var testid = '1276';

	beforeEach(function () {
		alasql('create database test' + testid);
		alasql('use test' + testid);
	});

	afterEach(function () {
		alasql('drop database test' + testid);
	});

	it('A) SELECT from a local CSV source', function () {
		return alasql
			.promise('SELECT * FROM CSV("./test/test1276.csv",{headers:true})')
			.then(function (res) {
				assert.deepStrictEqual(res, [{x: 4, y: 2}]);
			});
	});

	it('B) WITH using a CSV source works as expected', function () {
		return alasql
			.promise(
				'WITH c AS (SELECT * FROM CSV("./test/test1276.csv",{headers:true})) SELECT * FROM c'
			)
			.then(function (res) {
				assert.deepStrictEqual(res, [{x: 4, y: 2}]);
			});
	});

	it('C) WITH returns the same result as the equivalent SELECT', function () {
		var sql = 'SELECT * FROM CSV("./test/test1276.csv",{headers:true})';
		return alasql.promise('WITH c AS (' + sql + ') SELECT * FROM c').then(function (withRes) {
			return alasql.promise(sql).then(function (plainRes) {
				assert.deepStrictEqual(withRes, plainRes);
			});
		});
	});

	it('D) WITH with several CTEs over a CSV source', function () {
		var sql =
			'WITH a AS (SELECT * FROM CSV("./test/test1276.csv",{headers:true})), ' +
			'b AS (SELECT * FROM a) ' +
			'SELECT * FROM b';
		return alasql.promise(sql).then(function (res) {
			assert.deepStrictEqual(res, [{x: 4, y: 2}]);
		});
	});
});
