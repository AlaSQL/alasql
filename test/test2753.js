if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2753 - IN list with columns and expressions', function () {
	before(function () {
		alasql('CREATE DATABASE test2753; USE test2753');
		alasql('CREATE TABLE t (a STRING, b INT)');
		alasql("INSERT INTO t VALUES ('a', 2), ('z', 5)");
	});

	after(function () {
		alasql('DROP DATABASE test2753');
	});

	it('reads a column in the list', function () {
		assert.deepEqual(alasql("SELECT VALUE 'a' IN (a) FROM t"), true);
		assert.deepEqual(alasql("SELECT COLUMN 'a' IN (a, 'x') FROM t"), [true, false]);
		assert.deepEqual(alasql("SELECT COLUMN 'a' NOT IN (a) FROM t"), [false, true]);
	});

	it('computes an expression in the list', function () {
		assert.equal(alasql('SELECT VALUE 2 IN (1+1)'), true);
		assert.equal(alasql('SELECT VALUE 2 NOT IN (1+1)'), false);
		assert.deepEqual(alasql('SELECT COLUMN 3 IN (b+1) FROM t'), [true, false]);
	});

	it('constant lists still work', function () {
		assert.equal(alasql("SELECT VALUE '1' IN ('1')"), true);
		assert.equal(alasql('SELECT VALUE 1 IN (1)'), true);
		assert.equal(alasql("SELECT VALUE 'a' IN ('a','b')"), true);
		assert.equal(alasql("SELECT VALUE 'a,b' IN ('a','b')"), false);
		assert.deepEqual(alasql("SELECT a FROM t WHERE a IN ('z')"), [{a: 'z'}]);
	});
});
