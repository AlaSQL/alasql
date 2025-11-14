// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 617 - Where LTRIM will remove leading whitespace characters in an expression.', function () {
	test('A) Will remove leading whitespace only', function () {
		var sql = "select LTRIM('      Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], 'Hello World !');
	});

	test('B) Will NOT trim the trailing whitespace.', function () {
		var sql = "select LTRIM('      Hello World !     ') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], 'Hello World !     ');
	});

	test('C) Will change nothing if expression has no whitespace.', function () {
		var sql = "select LTRIM('Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], 'Hello World !');
	});

	test('D) Will return undefined if null expression is passed in.', function () {
		var sql = 'select LTRIM(NULL) AS Result';
		var res = alasql(sql);
		assert.equal(res[0]['Result'], undefined);
	});
	test('E) Will change nothing if expression is using tabs.', function () {
		// char(9) = tabs;
		var sql = "select LTRIM(char(9) + 'Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], '\t' + 'Hello World !');
	});
	test('F) Will remove only leading whitespace in expression and NOT the tabs', function () {
		// char(9) = tabs;
		var sql = "select LTRIM('  ' + char(9) + char(9) + 'Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], '\t\t' + 'Hello World !');
	});
	test('G) Will change nothing if expression is using newlines.', function () {
		// char(10) = newline;
		var sql = "select LTRIM( char(10) + 'Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], '\n' + 'Hello World !');
	});
	test('H) Will remove only leading whitespace in expression and NOT the newlines', function () {
		// char(10) = newline;
		var sql = "select LTRIM('  ' + char(10) + char(10) + 'Hello World !') AS Result";
		var res = alasql(sql);
		assert.equal(res[0]['Result'], '\n\n' + 'Hello World !');
	});
});
