// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #845
*/

var testId = '845'; // insert test file number

describe('Test ' + testId + ' - use NOW() function', () => {
	test('1a. NOW() as String', () => {
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		expect(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}/.test(res[0].now)).toBe(true);
	});

	test('1b. NOW() as Date', () => {
		alasql.options.dateAsString = false;
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		expect(res[0].now instanceof Date).toBe(true);
	});

	test('2. CONVERT with NOW() as an argument', () => {
		var res = alasql('SELECT CONVERT(STRING,NOW(),1) AS conv');
		//02/25/22
		expect(/\d{2}\/\d{2}\/\d{2}/.test(res[0].conv)).toBe(true);
	});
});
