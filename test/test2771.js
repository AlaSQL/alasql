if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2771 - expressions inside an IN list', function () {
	before(function () {
		alasql('CREATE DATABASE test2771; USE test2771');
		alasql('CREATE TABLE v (c1 INTEGER, c INTEGER)');
		alasql('INSERT INTO v VALUES (14, -14)');
		alasql('CREATE TABLE t (c0 INT, c1 INT)');
		alasql('INSERT INTO t VALUES (1, 10), (2, 20), (3, 30)');
	});

	after(function () {
		alasql('DROP DATABASE test2771');
	});

	it('A) a column in the list', function () {
		var data = [
			{a: 1, b: 5},
			{a: 5, b: 5},
			{a: 7, b: 3},
		];
		assert.deepEqual(alasql('SELECT a FROM ? WHERE a IN (1, b)', [data]), [{a: 1}, {a: 5}]);
		assert.deepEqual(alasql('SELECT a IN (b) AS v FROM ?', [[{a: 1, b: 1}]]), [{v: true}]);
		var all = [{c0: 1}, {c0: 2}, {c0: 3}];
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 IN (c0)'), all);
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 IN (c0, 99)'), all);
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 IN (c1 / 10)'), all);
	});

	it('B) signs, arithmetic, functions and parentheses in the list', function () {
		['(+ 14)', '(- -14)', '(7 * 2)', '(13 + 1)', '(ABS(-14))', '((14))'].forEach(function (list) {
			assert.deepEqual(alasql('SELECT c1 FROM v WHERE c1 IN ' + list), [{c1: 14}], list);
		});
		assert.deepEqual(alasql('SELECT c FROM v WHERE c IN (-14)'), [{c: -14}]);
	});

	it('C) NOT IN with expressions', function () {
		assert.deepEqual(alasql('SELECT c1 FROM v WHERE c1 NOT IN (+ 14)'), []);
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 NOT IN (c1 / 10, 5)'), []);
	});

	it('D) a list of literals still works', function () {
		assert.deepEqual(alasql('SELECT c1 FROM v WHERE c1 IN (14)'), [{c1: 14}]);
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 IN (1, 3)'), [{c0: 1}, {c0: 3}]);
		assert.deepEqual(alasql('SELECT c0 FROM t WHERE c0 NOT IN (1, 3)'), [{c0: 2}]);
	});
});
