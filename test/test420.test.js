// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testNum = 420;

describe('Test ' + testNum + ' Load data from XLSX without extra line', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testNum + ';USE test' + testNum);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testNum);
	});

	test('1. Load XLSX', function (done) {
		alasql(
			'VALUE OF SELECT COUNT(*) FROM XLSX("' + __dirname + '/test420.xlsx")',
			[],
			function (res) {
				assert(res == 4);
				//      console.log(res);
				//       assert.deepEqual(res,
				// 0
				//       );
				done();
			}
		);
	});
});
