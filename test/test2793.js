if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2793 - CHAR_LENGTH, CHARACTER_LENGTH, OCTET_LENGTH and POSITION', function () {
	before(function () {
		alasql('CREATE DATABASE test2793; USE test2793');
		alasql('CREATE TABLE t (c CHAR(5), position INT)');
		alasql("INSERT INTO t VALUES ('xabc', 7)");
	});

	after(function () {
		alasql('DROP DATABASE test2793');
	});

	it('A) CHAR_LENGTH and CHARACTER_LENGTH', function () {
		assert.deepEqual(alasql("SELECT CHAR_LENGTH('abc') AS n"), [{n: 3}]);
		assert.deepEqual(alasql("SELECT CHARACTER_LENGTH('abc') AS n"), [{n: 3}]);
		assert.deepEqual(alasql('SELECT char_length(c) AS n FROM t'), [{n: 4}]);
	});

	it('B) OCTET_LENGTH counts UTF-8 bytes', function () {
		assert.deepEqual(alasql("SELECT OCTET_LENGTH('abc') AS n"), [{n: 3}]);
		assert.deepEqual(alasql("SELECT OCTET_LENGTH('é') AS n, CHAR_LENGTH('é') AS c"), [
			{n: 2, c: 1},
		]);
	});

	it('C) POSITION(x IN y)', function () {
		assert.deepEqual(alasql("SELECT POSITION('b' IN 'abc') AS p"), [{p: 2}]);
		assert.deepEqual(alasql("SELECT POSITION('z' IN 'abc') AS p"), [{p: 0}]);
		assert.deepEqual(alasql("SELECT POSITION('b' IN c) AS p FROM t"), [{p: 3}]);
	});

	it('D) position still works as a column name', function () {
		assert.deepEqual(alasql('SELECT position FROM t'), [{position: 7}]);
	});
});
