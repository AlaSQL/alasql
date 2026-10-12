if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1173 - Parser behavior for identifiers with special patterns', function () {
	const test = '1173';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Should parse correctly when column name is properly quoted with []', function () {
		var sql = 'SELECT ID, [6minAvgOpac] FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 2);
		assert.equal(ast.statements[0].columns[0].columnid, 'ID');
		assert.equal(ast.statements[0].columns[1].columnid, '6minAvgOpac');
	});

	it('B) Should parse correctly when column name is properly quoted with backticks', function () {
		var sql = 'SELECT ID, `6minAvgOpac` FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 2);
		assert.equal(ast.statements[0].columns[0].columnid, 'ID');
		assert.equal(ast.statements[0].columns[1].columnid, '6minAvgOpac');
	});

	it('C) Should now parse unquoted column name starting with number (behavior changed in #1185)', function () {
		// After fix for #1185, identifiers starting with numbers are now allowed
		var sql = 'SELECT ID, 6minAvgOpac FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 2);
		assert.equal(ast.statements[0].columns[0].columnid, 'ID');
		assert.equal(ast.statements[0].columns[1].columnid, '6minAvgOpac');
	});

	it('D) Should now parse identifiers like 123abc (behavior changed in #1185)', function () {
		// After fix for #1185, identifiers starting with numbers are now allowed
		var sql = 'SELECT 123abc FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 1);
		assert.equal(ast.statements[0].columns[0].columnid, '123abc');
	});

	it('E) Valid number literals followed by proper aliases should still work', function () {
		var sql = 'SELECT 6 AS minAvgOpac FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 1);
		assert.equal(ast.statements[0].columns[0].value, 6);
		assert.equal(ast.statements[0].columns[0].as, 'minAvgOpac');
	});

	it('F) Number followed by space then literal alias (without AS) should still work', function () {
		// This is valid SQL: SELECT 6 minAvgOpac means SELECT 6 AS minAvgOpac
		var sql = 'SELECT 6 minAvgOpac FROM test';
		var ast = alasql.parse(sql);
		assert.equal(ast.statements[0].columns.length, 1);
		assert.equal(ast.statements[0].columns[0].value, 6);
		assert.equal(ast.statements[0].columns[0].as, 'minAvgOpac');
	});
});
