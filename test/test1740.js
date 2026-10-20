if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #1740 - Parse() then AST.toString() doesn't restore square brackets on column name
  https://github.com/AlaSQL/alasql/issues/1740
  
  If a column name requires square brackets (e.g. due to a space or a period in the column name),
  toString() on the AST should preserve the brackets.
*/

describe('Test 1740 - AST.toString() preserves square brackets on column names', function () {
	it('A) Column with space in name', function () {
		var sql = 'SELECT [Foo Bar] FROM tbl';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), sql);
	});

	it('B) Column with dot in name', function () {
		var sql = 'SELECT [Foo.Bar] FROM tbl';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), sql);
	});

	it('C) Column with hyphen in name', function () {
		var sql = 'SELECT [Foo-Bar] FROM tbl';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), sql);
	});

	it('D) Numeric column index preserves brackets', function () {
		var sql = 'SELECT [1] FROM tbl';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), sql);
	});

	it('E) Table.column with bracket notation (dot omitted for numeric index)', function () {
		// When using table alias with numeric column index, the dot is omitted in toString()
		// Input: d.[1] -> Output: d[1]
		var sql = 'SELECT d.[1] FROM tbl AS d';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), 'SELECT d[1] FROM tbl AS d');
	});

	it('F) Normal column names without special characters', function () {
		var sql = 'SELECT normalColumn FROM tbl';
		var ast = alasql.parse(sql);
		assert.equal(ast.toString(), sql);
	});
});
