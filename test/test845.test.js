// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #845
*/

var testId = '845'; // insert test file number

describe('Test ' + testId + ' - use NOW() function', function () {
	test('1a. NOW() as String', function () {
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		assert(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}/.test(res[0].now));
	});

	test('1b. NOW() as Date', function () {
		alasql.options.dateAsString = false;
		var res = alasql('SELECT NOW() AS now');
		//2022-02-25 19:21:27.839
		assert(res[0].now instanceof Date);
	});

	test('2. CONVERT with NOW() as an argument', function () {
		var res = alasql('SELECT CONVERT(STRING,NOW(),1) AS conv');
		//02/25/22
		assert(/\d{2}\/\d{2}\/\d{2}/.test(res[0].conv));
	});
});
