if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var {compileToJS} = require('../dist/precompile');
}

let testId = '2529';

describe(`Test ${testId} - parameters in TOP and FETCH`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('create table one (a int)');
		alasql('insert into one values (1),(2),(3),(4)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) TOP supports positional and named parameters', function () {
		assert.deepStrictEqual(alasql('SELECT TOP ? a FROM one ORDER BY a ASC', [2]), [{a: 1}, {a: 2}]);
		assert.deepStrictEqual(alasql('SELECT TOP ($lim) a FROM one ORDER BY a ASC', {lim: 3}), [
			{a: 1},
			{a: 2},
			{a: 3},
		]);
	});

	it('B) FETCH supports positional and named parameters', function () {
		assert.deepStrictEqual(
			alasql('SELECT a FROM one ORDER BY a ASC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY', [1, 2]),
			[{a: 2}, {a: 3}]
		);
		assert.deepStrictEqual(
			alasql('SELECT a FROM one ORDER BY a ASC OFFSET $off FETCH $lim', {off: 2, lim: 1}),
			[{a: 3}]
		);
	});

	it('C) Compiled TOP and FETCH statements can be reused', function () {
		var topStmt = alasql.compile('SELECT TOP ? a FROM one ORDER BY a ASC');
		assert.deepStrictEqual(topStmt([1]), [{a: 1}]);
		assert.deepStrictEqual(topStmt([2]), [{a: 1}, {a: 2}]);

		var namedTopStmt = alasql.compile('SELECT TOP $lim a FROM one ORDER BY a ASC');
		assert.deepStrictEqual(namedTopStmt({lim: 3}), [{a: 1}, {a: 2}, {a: 3}]);

		var fetchStmt = alasql.compile(
			'SELECT a FROM one ORDER BY a ASC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY'
		);
		assert.deepStrictEqual(fetchStmt([0, 2]), [{a: 1}, {a: 2}]);
		assert.deepStrictEqual(fetchStmt([2, 2]), [{a: 3}, {a: 4}]);
	});

	it('D) compileToJS preserves parameterized TOP, FETCH, and TOP PERCENT', function () {
		var topJs = compileToJS('SELECT TOP ? a FROM one ORDER BY a ASC');
		var topFn = new Function('return ' + topJs)().bind(alasql);
		assert.deepStrictEqual(topFn([2]), [{a: 1}, {a: 2}]);

		var fetchJs = compileToJS(
			'SELECT a FROM one ORDER BY a ASC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY'
		);
		var fetchFn = new Function('return ' + fetchJs)().bind(alasql);
		assert.deepStrictEqual(fetchFn([1, 2]), [{a: 2}, {a: 3}]);

		var percentJs = compileToJS('SELECT TOP ? PERCENT a FROM one ORDER BY a ASC');
		var percentFn = new Function('return ' + percentJs)().bind(alasql);
		assert.deepStrictEqual(percentFn([50]), [{a: 1}, {a: 2}]);
	});
});
