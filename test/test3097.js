if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3097';

describe(`Test ${testId} - IN subquery inside an EXISTS subquery`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql(
			'CREATE TABLE t (id INT, g INT); CREATE TABLE w (wn INT); CREATE TABLE z (zn INT, zg INT)'
		);
		alasql('INSERT INTO t VALUES (1,1),(2,2),(3,3)');
		alasql('INSERT INTO w VALUES (5)');
		alasql('INSERT INTO z VALUES (5,1),(5,2)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Reported query: EXISTS in WHERE with an IN subquery inside', function () {
		assert.deepStrictEqual(
			alasql('SELECT id FROM t WHERE EXISTS (SELECT 1 FROM w WHERE w.wn IN (SELECT z.zn FROM z))'),
			[{id: 1}, {id: 2}, {id: 3}]
		);
	});

	it('B) EXISTS in the select list with an IN subquery inside', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT id, EXISTS (SELECT 1 FROM w WHERE w.wn IN (SELECT z.zn FROM z)) AS e FROM t ORDER BY id'
			),
			[
				{id: 1, e: true},
				{id: 2, e: true},
				{id: 3, e: true},
			]
		);
	});

	it('C) EXISTS in JOIN ... ON with an IN subquery inside', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT t.id FROM t JOIN w ON EXISTS (SELECT 1 FROM z WHERE z.zn IN (SELECT z.zn FROM z))'
			),
			[{id: 1}, {id: 2}, {id: 3}]
		);
	});

	it('D) Correlated variant: the inner subquery reads the outer row', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT id FROM t WHERE EXISTS (SELECT 1 FROM w WHERE w.wn IN (SELECT z.zn FROM z WHERE z.zg = t.g))'
			),
			[{id: 1}, {id: 2}]
		);
	});

	it('E) Doubly nested IN inside EXISTS', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT id FROM t WHERE EXISTS (SELECT 1 FROM w WHERE w.wn IN (SELECT z.zn FROM z WHERE z.zn IN (SELECT z.zn FROM z)))'
			),
			[{id: 1}, {id: 2}, {id: 3}]
		);
	});

	it('F) UNION ALL branch with EXISTS in the select list', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT -1 AS c1, -1 AS c2 UNION ALL SELECT id, EXISTS (SELECT 1 FROM w WHERE w.wn IN (SELECT z.zn FROM z)) FROM t'
			),
			[
				{c1: -1, c2: -1},
				{c1: 1, c2: true},
				{c1: 2, c2: true},
				{c1: 3, c2: true},
			]
		);
	});

	it('G) Plain EXISTS and plain IN still work on their own', function () {
		assert.deepStrictEqual(
			alasql('SELECT id FROM t WHERE EXISTS (SELECT 1 FROM w WHERE w.wn = 5)'),
			[{id: 1}, {id: 2}, {id: 3}]
		);
		assert.deepStrictEqual(alasql('SELECT id FROM t WHERE 5 IN (SELECT z.zn FROM z)'), [
			{id: 1},
			{id: 2},
			{id: 3},
		]);
	});
});
