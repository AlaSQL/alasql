if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2828 - aggregate FILTER (WHERE ...)', function () {
	before(function () {
		alasql('CREATE DATABASE test2828; USE test2828');
		alasql('CREATE TABLE fl (a INT, filter INT)');
		alasql('INSERT INTO fl VALUES (1, 10), (2, 20), (3, 30), (3, 40)');
	});

	after(function () {
		alasql('DROP DATABASE test2828');
	});

	it('A) COUNT(*) and SUM', function () {
		assert.deepEqual(alasql('SELECT COUNT(*) FILTER (WHERE a > 1) AS n FROM fl'), [{n: 3}]);
		assert.deepEqual(alasql('SELECT SUM(a) FILTER (WHERE a > 1) AS s FROM fl'), [{s: 8}]);
	});

	it('B) next to an aggregate without FILTER, and lower case', function () {
		assert.deepEqual(alasql('SELECT COUNT(a) AS c, COUNT(1) filter(where a = 1) AS f FROM fl'), [
			{c: 4, f: 1},
		]);
	});

	it('C) DISTINCT, AVG and MAX', function () {
		assert.deepEqual(
			alasql(
				'SELECT COUNT(DISTINCT a) FILTER (WHERE a > 1) AS n, AVG(a) FILTER (WHERE a < 3) AS v, MAX(a) FILTER (WHERE a < 3) AS m FROM fl'
			),
			[{n: 2, v: 1.5, m: 2}]
		);
	});

	it('D) with GROUP BY', function () {
		assert.deepEqual(
			alasql('SELECT a, COUNT(*) FILTER (WHERE filter > 15) AS n FROM fl GROUP BY a'),
			[
				{a: 1, n: 0},
				{a: 2, n: 1},
				{a: 3, n: 2},
			]
		);
	});

	it('E) filter is still a name', function () {
		assert.deepEqual(alasql('SELECT filter FROM fl WHERE a = 1'), [{filter: 10}]);
		assert.deepEqual(alasql('SELECT a AS filter FROM fl WHERE a = 1'), [{filter: 1}]);
	});
});
