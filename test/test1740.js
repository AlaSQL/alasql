if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1740 - Parse() then AST.toString() should restore square brackets on column names', function () {
	const test = '1740';

	it('A) Column name with space should preserve square brackets', function () {
		var ast = alasql.parse('SELECT [Foo Bar] FROM tbl');
		var result = ast.toString();
		assert.strictEqual(result, 'SELECT [Foo Bar] FROM tbl');
	});

	it('B) Column name with period should preserve square brackets', function () {
		var ast = alasql.parse('SELECT [Foo.Bar] FROM tbl');
		var result = ast.toString();
		assert.strictEqual(result, 'SELECT [Foo.Bar] FROM tbl');
	});

	it('C) Regular column name should not get square brackets', function () {
		var ast = alasql.parse('SELECT FooBar FROM tbl');
		var result = ast.toString();
		assert.strictEqual(result, 'SELECT FooBar FROM tbl');
	});

	it('D) Multiple bracketed columns should all preserve square brackets', function () {
		var ast = alasql.parse('SELECT [First Name], [Last Name], Age FROM users');
		var result = ast.toString();
		assert.strictEqual(result, 'SELECT [First Name], [Last Name], Age FROM users');
	});

	it('E) Bracketed column with special characters should preserve square brackets', function () {
		var ast = alasql.parse('SELECT [Column!@#] FROM tbl');
		var result = ast.toString();
		assert.strictEqual(result, 'SELECT [Column!@#] FROM tbl');
	});
});
