if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2859 - BEGIN, COMMIT and ROLLBACK without TRANSACTION, and START TRANSACTION', function () {
	before(function () {
		alasql('CREATE DATABASE test2859; USE test2859');
		alasql('CREATE TABLE t (start INT, a INT); INSERT INTO t VALUES (1, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2859');
	});

	it('A) the short forms parse', function () {
		assert.deepEqual(alasql('BEGIN; COMMIT'), [1, 1]);
		assert.equal(alasql('BEGIN'), 1);
		assert.equal(alasql('ROLLBACK'), 1);
	});

	it('B) START TRANSACTION', function () {
		assert.equal(alasql('START TRANSACTION'), 1);
		assert.equal(alasql('start transaction'), 1);
	});

	it('C) start is still a name', function () {
		assert.deepEqual(alasql('SELECT start FROM t'), [{start: 1}]);
		assert.deepEqual(alasql('SELECT a AS start FROM t'), [{start: 2}]);
	});

	it('D) BEGIN ... END blocks are unchanged', function () {
		assert.deepEqual(alasql('IF TRUE BEGIN SELECT VALUE 1; SELECT VALUE 2 END'), [1, 2]);
	});
});
