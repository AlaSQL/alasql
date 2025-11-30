if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1173 - Parser should error on column names starting with numbers', function () {
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

	it('C) Should throw error for unquoted column name starting with number', function () {
		var sql = 'SELECT ID, 6minAvgOpac FROM test';
		assert.throws(
			function () {
				alasql.parse(sql);
			},
			function (err) {
				return err instanceof SyntaxError || err instanceof Error;
			},
			'Should throw a SyntaxError for invalid column name starting with number'
		);
	});

	it('D) Should throw error for similar invalid identifier pattern', function () {
		var sql = 'SELECT 123abc FROM test';
		assert.throws(
			function () {
				alasql.parse(sql);
			},
			function (err) {
				return err instanceof SyntaxError || err instanceof Error;
			},
			'Should throw a SyntaxError for invalid identifier 123abc'
		);
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
