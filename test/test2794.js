if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2794 - CREATE VIEW with a column list over SELECT *', function () {
	before(function () {
		alasql('CREATE DATABASE test2794; USE test2794');
		alasql('CREATE TABLE s (a INT, b INT)');
		alasql('INSERT INTO s VALUES (1, 2)');
		alasql('CREATE TABLE u (k INT, c INT)');
		alasql('INSERT INTO u VALUES (1, 9)');
	});

	after(function () {
		alasql('DROP DATABASE test2794');
	});

	it('A) SELECT * gets the names of the column list', function () {
		alasql('CREATE VIEW v (x, y) AS SELECT * FROM s');
		assert.deepEqual(alasql('SELECT * FROM v'), [{x: 1, y: 2}]);
	});

	it('B) t.* next to other columns, and * over a JOIN', function () {
		alasql('CREATE VIEW v3 (p, q, r) AS SELECT u.k, s.* FROM s JOIN u ON s.a = u.k');
		assert.deepEqual(alasql('SELECT * FROM v3'), [{p: 1, q: 1, r: 2}]);
		alasql('CREATE VIEW v4 (p, q, r, t) AS SELECT * FROM s AS z JOIN u ON z.a = u.k');
		assert.deepEqual(alasql('SELECT * FROM v4'), [{p: 1, q: 2, r: 1, t: 9}]);
	});

	it('C) a wrong number of names is refused and creates nothing', function () {
		assert.throws(function () {
			alasql('CREATE VIEW v2 (x) AS SELECT * FROM s');
		}, /column names/);
		assert.throws(function () {
			alasql('CREATE VIEW v6 (m, n) AS SELECT a FROM s');
		}, /column names/);
		alasql('CREATE VIEW v2 (x, y) AS SELECT a, b FROM s');
		assert.deepEqual(alasql('SELECT * FROM v2'), [{x: 1, y: 2}]);
	});

	it('D) a column list over named columns still works', function () {
		alasql('CREATE VIEW v5 (m) AS SELECT a FROM s');
		assert.deepEqual(alasql('SELECT * FROM v5'), [{m: 1}]);
	});
});
