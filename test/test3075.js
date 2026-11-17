const alasql = require('../');
const assert = require('assert');

describe('Test 3075 - a parameter in a JOIN ON condition must not reuse the index built with the first value', function () {
	var prevAutocommit;

	before(function () {
		prevAutocommit = alasql.options.autocommit;
		alasql('CREATE DATABASE test3075; USE test3075;');
	});

	after(function () {
		alasql('DROP DATABASE test3075;');
		alasql.options.autocommit = prevAutocommit;
	});

	beforeEach(function () {
		// Fill the tables through .data, as in the report: INSERT marks the
		// table dirty and hides the stale-index reuse
		alasql.options.autocommit = true;
		alasql('USE test3075');
		alasql('CREATE TABLE s (g INT); CREATE TABLE w (h INT)');
		alasql.tables.s.data = [{g: 1}, {g: 2}, {g: 3}];
		alasql.tables.w.data = [{h: 1}, {h: 2}, {h: 3}];
	});

	afterEach(function () {
		alasql('DROP TABLE s; DROP TABLE w;');
	});

	it('1. the second run with a different parameter value gives the right result', function () {
		var q = 'SELECT s.g, w.h FROM s JOIN w ON s.g = w.h + ?';
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

	it('2. each parameter value gives the right result when run first', function () {
		var q = 'SELECT s.g, w.h FROM s JOIN w ON s.g = w.h + ?';
		assert.deepStrictEqual(alasql(q, [0]), [
			{g: 1, h: 1},
			{g: 2, h: 2},
			{g: 3, h: 3},
		]);
		assert.deepStrictEqual(alasql(q, [1]), [
			{g: 2, h: 1},
			{g: 3, h: 2},
		]);
	});

	it('3. the same holds for a comma join with the condition in WHERE', function () {
		var q = 'SELECT s.g, w.h FROM s, w WHERE s.g = w.h + ?';
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
});
