if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3075';

describe(`Test ${testId} - JOIN index with a parameter is not reused`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE s (g INT); CREATE TABLE w (h INT)');
		alasql.tables.s.data = [{g: 1}, {g: 2}, {g: 3}];
		alasql.tables.w.data = [{h: 1}, {h: 2}, {h: 3}];
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Parameter in the ON condition', function () {
		const q = 'SELECT s.g, w.h FROM s JOIN w ON s.g = w.h + ?';
		assert.deepStrictEqual(alasql(q, [1]), [
			{g: 2, h: 1},
			{g: 3, h: 2},
		]);
		assert.deepStrictEqual(alasql(q, [0]), [
			{g: 1, h: 1},
			{g: 2, h: 2},
			{g: 3, h: 3},
		]);
	});

	it('B) Named parameter in the ON condition', function () {
		const q = 'SELECT s.g, w.h FROM s JOIN w ON s.g = w.h + $d';
		assert.deepStrictEqual(alasql(q, {d: 2}), [{g: 3, h: 1}]);
		assert.deepStrictEqual(alasql(q, {d: 1}), [
			{g: 2, h: 1},
			{g: 3, h: 2},
		]);
	});

	it('C) Parameter in a WHERE join condition', function () {
		const q = 'SELECT s.g, w.h FROM s, w WHERE s.g = w.h + ?';
		assert.deepStrictEqual(alasql(q, [2]), [{g: 3, h: 1}]);
		assert.deepStrictEqual(alasql(q, [0]), [
			{g: 1, h: 1},
			{g: 2, h: 2},
			{g: 3, h: 3},
		]);
	});

	it('D) Index without a parameter is still reused', function () {
		const q = 'SELECT s.g, w.h FROM s JOIN w ON s.g = w.h + 1';
		const before = Object.keys(alasql.tables.w.indices).length;
		alasql(q);
		const after = Object.keys(alasql.tables.w.indices).length;
		assert.strictEqual(after, before + 1);
		assert.deepStrictEqual(alasql(q), [
			{g: 2, h: 1},
			{g: 3, h: 2},
		]);
		assert.strictEqual(Object.keys(alasql.tables.w.indices).length, after);
	});
});
