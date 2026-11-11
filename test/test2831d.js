if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2831 - PostgreSQL aggregates', function () {
	before(function () {
		alasql('CREATE DATABASE test2831d; USE test2831d');
		alasql('CREATE TABLE t (g STRING, s STRING, b BOOLEAN)');
		alasql(
			"INSERT INTO t VALUES ('x', 'a', TRUE), ('x', 'b', FALSE), ('y', 'c', TRUE), ('y', NULL, NULL), ('z', NULL, NULL)"
		);
	});

	after(function () {
		alasql('DROP DATABASE test2831d');
	});

	it('STRING_AGG', function () {
		assert.deepEqual(alasql("SELECT g, STRING_AGG(s, ', ') AS r FROM t GROUP BY g"), [
			{g: 'x', r: 'a, b'},
			{g: 'y', r: 'c'},
			{g: 'z', r: undefined},
		]);
		assert.equal(alasql("SELECT VALUE string_agg(s, '-') FROM t"), 'a-b-c');
	});

	it('ARRAY_AGG keeps NULL', function () {
		assert.deepEqual(alasql('SELECT g, ARRAY_AGG(s) AS r FROM t GROUP BY g'), [
			{g: 'x', r: ['a', 'b']},
			{g: 'y', r: ['c', undefined]},
			{g: 'z', r: [undefined]},
		]);
	});

	it('BOOL_AND, EVERY and BOOL_OR skip NULL', function () {
		assert.deepEqual(
			alasql('SELECT g, BOOL_AND(b) AS a, EVERY(b) AS e, BOOL_OR(b) AS o FROM t GROUP BY g'),
			[
				{g: 'x', a: false, e: false, o: true},
				{g: 'y', a: true, e: true, o: true},
				{g: 'z', a: undefined, e: undefined, o: undefined},
			]
		);
	});
});
