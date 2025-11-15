// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testId = '618'; // insert test file number

describe('Test ' +
	testId +
	' - Where RTRIM will remove leading whitespace characters in an expression.', () => {
	test('A) Will remove trailing whitespace only', () => {
		var sql = "select RTRIM('Hello World !      ') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !');
	});

	test('B) Will NOT trim the leading whitespace.', () => {
		var sql = "select RTRIM('      Hello World !     ') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('      Hello World !');
	});

	test('C) Will change nothing if expression has no whitespace.', () => {
		var sql = "select RTRIM('Hello World !') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !');
	});

	test('D) Will return undefined if null expression is passed in.', () => {
		var sql = 'select RTRIM(NULL) AS Result';
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual(undefined);
	});
	test('E) Will change nothing if expression is using tabs.', () => {
		// char(9) = tabs;
		var sql = "select RTRIM('Hello World !' + char(9)) AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !' + '\t');
	});
	test('F) Will remove only trailing whitespace in expression and NOT the tabs', () => {
		// char(9) = tabs;
		var sql = "select RTRIM('Hello World !' + char(9) + char(9) + '  ') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !' + '\t\t');
	});
	test('G) Will change nothing if expression is using newlines.', () => {
		// char(9) = tabs;
		var sql = "select RTRIM('Hello World !' + char(10)) AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !' + '\n');
	});
	test('H) Will remove only trailing whitespace in expression and NOT the newlines', () => {
		// char(9) = tabs;
		var sql = "select RTRIM('Hello World !' + char(10) + char(10) + '  ') AS Result";
		var res = alasql(sql);
		expect(res[0]['Result']).toEqual('Hello World !' + '\n\n');
	});
});
