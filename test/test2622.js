if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2622 - "" in a double-quoted string', function () {
	before(function () {
		alasql('CREATE DATABASE test2622; USE test2622');
		alasql('CREATE TABLE t (a STRING)');
	});

	after(function () {
		alasql('DROP DATABASE test2622');
	});

	it('A) "" becomes one "', function () {
		assert.deepEqual(alasql('SELECT "a""b" AS v'), [{v: 'a"b'}]);
		assert.deepEqual(alasql('SELECT """" AS v'), [{v: '"'}]);
	});

	it('B) in INSERT and WHERE', function () {
		alasql('INSERT INTO t VALUES ("q""q")');
		assert.deepEqual(alasql('SELECT * FROM t WHERE a = "q""q"'), [{a: 'q"q'}]);
	});

	it('C) other quotes are unchanged', function () {
		assert.deepEqual(alasql("SELECT 'a''b' AS v"), [{v: "a'b"}]);
		assert.deepEqual(alasql('SELECT "it\'s" AS v'), [{v: "it's"}]);
		assert.deepEqual(alasql('SELECT \'say "hi"\' AS v'), [{v: 'say "hi"'}]);
	});
});
