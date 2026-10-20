if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1381';

describe(`Test ${testId} - LIMIT and OFFSET with ? parameters`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	var data = [
		{id: 1, key: 'test'},
		{id: 2, key: 'test'},
		{id: 3, key: 'test'},
		{id: 4, key: 'other'},
	];

	it('A) LIMIT with a number still works', function () {
		var res = alasql('SELECT id FROM ? ORDER BY id ASC LIMIT 2', [data]);
		assert.deepStrictEqual(res, [{id: 1}, {id: 2}]);
	});

	it('B) LIMIT ?', function () {
		var res = alasql('SELECT id FROM ? ORDER BY id ASC LIMIT ?', [data, 2]);
		assert.deepStrictEqual(res, [{id: 1}, {id: 2}]);
	});

	it('C) LIMIT ? OFFSET ?', function () {
		var res = alasql('SELECT id, `key` FROM ? WHERE `key` = ? ORDER BY id ASC LIMIT ? OFFSET ?', [
			data,
			'test',
			1,
			0,
		]);
		assert.deepStrictEqual(res, [{id: 1, key: 'test'}]);
	});

	it('D) OFFSET ? alone after LIMIT ?', function () {
		var res = alasql('SELECT id FROM ? ORDER BY id ASC LIMIT ? OFFSET ?', [data, 2, 1]);
		assert.deepStrictEqual(res, [{id: 2}, {id: 3}]);
	});

	it('E) Compiled statement can be reused with different limits', function () {
		alasql('create table one (a int)');
		alasql('insert into one values (1),(2),(3),(4)');
		var stmt = alasql.compile('SELECT a FROM one ORDER BY a ASC LIMIT ? OFFSET ?');
		assert.deepStrictEqual(stmt([2, 1]), [{a: 2}, {a: 3}]);
		assert.deepStrictEqual(stmt([3, 0]), [{a: 1}, {a: 2}, {a: 3}]);
	});

	it('F) LIMIT with a named parameter', function () {
		var res = alasql('SELECT a FROM one ORDER BY a ASC LIMIT $lim', {lim: 2});
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
	});
});
