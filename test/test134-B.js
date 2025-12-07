if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 134-B - Escape sequences in strings', function () {
	const test = '134B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Tab escape sequence', function () {
		var res = alasql("SELECT 'hello\\tworld' AS result");
		assert.deepEqual(res, [{result: 'hello\tworld'}]);
	});

	it('B) Newline escape sequence', function () {
		var res = alasql("SELECT 'line1\\nline2' AS result");
		assert.deepEqual(res, [{result: 'line1\nline2'}]);
	});

	it('C) Carriage return escape sequence', function () {
		var res = alasql("SELECT 'text\\rmore' AS result");
		assert.deepEqual(res, [{result: 'text\rmore'}]);
	});

	it('D) Backslash escape sequence', function () {
		var res = alasql("SELECT 'back\\\\slash' AS result");
		assert.deepEqual(res, [{result: 'back\\slash'}]);
	});

	it('E) Double quote escape sequence', function () {
		var res = alasql('SELECT "quote\\"here" AS result');
		assert.deepEqual(res, [{result: 'quote"here'}]);
	});

	it('F) Mixed escape sequences', function () {
		var res = alasql("SELECT 'Line 1\\nLine 2\\tTabbed\\rCarriage' AS result");
		assert.deepEqual(res, [{result: 'Line 1\nLine 2\tTabbed\rCarriage'}]);
	});

	it('G) Escape sequence in WHERE clause', function () {
		alasql('CREATE TABLE test_escapes (id INT, text STRING)');
		alasql("INSERT INTO test_escapes VALUES (1, 'hello\\tworld')");
		alasql("INSERT INTO test_escapes VALUES (2, 'no tabs here')");

		var res = alasql("SELECT * FROM test_escapes WHERE text = 'hello\\tworld'");
		assert.deepEqual(res, [{id: 1, text: 'hello\tworld'}]);
	});

	it('H) Single quote still works', function () {
		var res = alasql("SELECT 'Cote d\\'Ivoir' AS result");
		assert.deepEqual(res, [{result: "Cote d'Ivoir"}]);

		var res2 = alasql("SELECT 'Cote d''Ivoir' AS result");
		assert.deepEqual(res2, [{result: "Cote d'Ivoir"}]);
	});
});
