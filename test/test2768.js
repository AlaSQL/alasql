if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2768 - NOT binds looser than IN and BETWEEN', function () {
	before(function () {
		alasql('CREATE DATABASE test2768; USE test2768');
		alasql('CREATE TABLE u (x INT)');
		alasql('INSERT INTO u VALUES (5), (0)');
		alasql('CREATE TABLE t (c0 INT)');
		alasql('INSERT INTO t VALUES (1), (2), (3)');
	});

	after(function () {
		alasql('DROP DATABASE test2768');
	});

	it('NOT x IN (...)', function () {
		assert.deepEqual(alasql('SELECT COLUMN x FROM u WHERE NOT x IN (32)'), [5, 0]);
		assert.deepEqual(alasql('SELECT COLUMN x FROM u WHERE NOT x IN (5)'), [0]);
		assert.deepEqual(alasql('SELECT COLUMN c0 FROM t WHERE NOT (c0) IN (2)'), [1, 3]);
		assert.equal(alasql('SELECT VALUE NOT 5 IN (32)'), true);
		assert.equal(alasql('SELECT VALUE NOT 0 IN (1)'), true);
		assert.equal(alasql('SELECT VALUE NOT 5 NOT IN (5)'), true);
		assert.equal(alasql('SELECT VALUE NOT NOT 5 IN (5)'), true);
		assert.deepEqual(alasql('SELECT COLUMN x FROM u WHERE NOT x IN (SELECT 5)'), [0]);
	});

	it('NOT x BETWEEN ... AND ...', function () {
		assert.deepEqual(alasql('SELECT COLUMN x FROM u WHERE NOT x BETWEEN 1 AND 3'), [5, 0]);
		assert.deepEqual(alasql('SELECT COLUMN c0 FROM t WHERE NOT ( c0 ) BETWEEN 2 AND 3'), [1]);
		assert.equal(alasql('SELECT VALUE NOT 5 BETWEEN 1 AND 3'), true);
		assert.equal(alasql('SELECT VALUE NOT -48 NOT BETWEEN -53 AND 29'), true);
		assert.deepEqual(
			alasql('SELECT COLUMN c0 FROM t WHERE c0 > 1 AND NOT c0 BETWEEN 3 AND 4'),
			[2]
		);
	});

	it('brackets around NOT keep their meaning', function () {
		assert.equal(alasql('SELECT VALUE (NOT 5) IN (false)'), true);
		assert.deepEqual(alasql('SELECT COLUMN x FROM u WHERE NOT (x IN (32))'), [5, 0]);
	});

	it('toString parses back to the same query', function () {
		var sql = alasql.parse('SELECT x FROM u WHERE NOT x IN (5)').toString();
		assert.deepEqual(alasql(sql), [{x: 0}]);
	});
});
