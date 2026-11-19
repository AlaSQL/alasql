if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2772 - views and FROM subqueries with options.modifier MATRIX', function () {
	var saved;

	before(function () {
		alasql('CREATE DATABASE test2772; USE test2772');
		alasql('CREATE TABLE t (a INT)');
		alasql('INSERT INTO t VALUES (1)');
		alasql('CREATE VIEW ve AS SELECT a FROM t WHERE a = 2');
		alasql('CREATE VIEW v1 AS SELECT a FROM t WHERE a = 1');
		// Read the view once without the option, so its compiled select is shared
		assert.deepEqual(alasql('SELECT a FROM v1'), [{a: 1}]);
		saved = alasql.options.modifier;
		alasql.options.modifier = 'MATRIX';
	});

	after(function () {
		alasql.options.modifier = saved;
		alasql('DROP DATABASE test2772');
	});

	it('A) a view with rows', function () {
		assert.deepEqual(alasql('SELECT a FROM v1'), [[1]]);
	});

	it('B) an empty view', function () {
		assert.deepEqual(alasql('SELECT a FROM ve'), []);
	});

	it('C) FROM subqueries', function () {
		assert.deepEqual(alasql('SELECT a FROM (SELECT a FROM t WHERE a = 2) AS x'), []);
		assert.deepEqual(alasql('SELECT a FROM (SELECT a FROM t) AS x'), [[1]]);
	});

	it('D) a view in a JOIN', function () {
		assert.deepEqual(alasql('SELECT t.a, v1.a AS b FROM t JOIN v1 ON t.a = v1.a'), [[1, 1]]);
		assert.deepEqual(alasql('SELECT t.a FROM t JOIN ve ON t.a = ve.a'), []);
	});

	it('E) without the option the view still gives objects', function () {
		alasql.options.modifier = saved;
		try {
			assert.deepEqual(alasql('SELECT a FROM v1'), [{a: 1}]);
			assert.deepEqual(alasql('MATRIX OF SELECT a FROM v1'), [[1]]);
		} finally {
			alasql.options.modifier = 'MATRIX';
		}
	});
});
