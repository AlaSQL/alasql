// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 617 - Where LTRIM will remove leading whitespace characters in an expression.', () => {
	test('A) Will remove leading whitespace only', () => {
		var sql = "select LTRIM('      Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !');
	});

	test('B) Will NOT trim the trailing whitespace.', () => {
		var sql = "select LTRIM('      Hello World !     ') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !     ');
	});

	test('C) Will change nothing if expression has no whitespace.', () => {
		var sql = "select LTRIM('Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !');
	});

	test('D) Will return undefined if null expression is passed in.', () => {
		var sql = 'select LTRIM(NULL) AS Result';
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual(undefined);
	});
	test('E) Will change nothing if expression is using tabs.', () => {
		// char(9) = tabs;
		var sql = "select LTRIM(char(9) + 'Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('\t' + 'Hello World !');
	});
	test('F) Will remove only leading whitespace in expression and NOT the tabs', () => {
		// char(9) = tabs;
		var sql = "select LTRIM('  ' + char(9) + char(9) + 'Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('\t\t' + 'Hello World !');
	});
	test('G) Will change nothing if expression is using newlines.', () => {
		// char(10) = newline;
		var sql = "select LTRIM( char(10) + 'Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('\n' + 'Hello World !');
	});
	test('H) Will remove only leading whitespace in expression and NOT the newlines', () => {
		// char(10) = newline;
		var sql = "select LTRIM('  ' + char(10) + char(10) + 'Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('\n\n' + 'Hello World !');
	});
});
