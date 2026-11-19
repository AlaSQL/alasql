if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2787 - SUBSTRING(x FROM start FOR length)', function () {
	before(function () {
		alasql('CREATE DATABASE test2787; USE test2787');
		alasql('CREATE TABLE t (s STRING, n INT); INSERT INTO t VALUES ("abcdef", 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2787');
	});

	it('A) FROM and FOR', function () {
		assert.deepEqual(alasql("SELECT SUBSTRING('abcdef' FROM 2 FOR 3) AS s"), [{s: 'bcd'}]);
		assert.deepEqual(alasql("SELECT SUBSTRING('abcdef' FROM 2) AS s"), [{s: 'bcdef'}]);
	});

	it('B) the comma form is unchanged', function () {
		assert.deepEqual(alasql("SELECT SUBSTRING('abcdef', 2, 3) AS s"), [{s: 'bcd'}]);
	});

	it('C) with columns, lower case and in WHERE', function () {
		assert.deepEqual(alasql('SELECT substring(s from n for n + 1) AS s FROM t'), [{s: 'bcd'}]);
		assert.deepEqual(alasql("SELECT COUNT(*) AS c FROM t WHERE SUBSTRING(s FROM 1 FOR 2) = 'ab'"), [
			{c: 1},
		]);
	});

	it('D) FROM in another function is an error', function () {
		assert.throws(function () {
			alasql("SELECT LOWER('A' FROM 1) AS s");
		}, /Unexpected FROM/);
	});
});
