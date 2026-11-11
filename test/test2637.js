if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2637 - qualified columns in grouped expressions read their own table', function () {
	before(function () {
		alasql('CREATE DATABASE test2637; USE test2637');
		alasql('CREATE TABLE a (id INT, k INT); INSERT INTO a VALUES (1, 1), (2, 2)');
		alasql('CREATE TABLE b (id INT, k INT); INSERT INTO b VALUES (10, 1), (20, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2637');
	});

	it('A) GROUP BY a.id, b.id with both columns in expressions', function () {
		var res = alasql(
			'SELECT a.id + 1 AS x, b.id + 1 AS y FROM a JOIN b ON a.k = b.k GROUP BY a.id, b.id'
		);
		assert.deepEqual(res, [
			{x: 2, y: 11},
			{x: 3, y: 21},
		]);
	});

	it('B) only one column in an expression', function () {
		var res = alasql(
			'SELECT a.id + 1 AS x, b.id AS y FROM a JOIN b ON a.k = b.k GROUP BY a.id, b.id'
		);
		assert.deepEqual(res, [
			{x: 2, y: 10},
			{x: 3, y: 20},
		]);
	});

	it('C) in HAVING', function () {
		var res = alasql(
			'SELECT a.id AS x, b.id AS y FROM a JOIN b ON a.k = b.k GROUP BY a.id, b.id HAVING a.id + 1 = 2'
		);
		assert.deepEqual(res, [{x: 1, y: 10}]);
	});

	it('D) ROLLUP subtotal stays null', function () {
		var res = alasql(
			'SELECT a.id + 1 AS x, COUNT(*) AS c FROM a JOIN b ON a.k = b.k GROUP BY ROLLUP(a.id)'
		);
		assert.deepEqual(res, [{c: 2}, {x: 2, c: 1}, {x: 3, c: 1}]);
	});
});
