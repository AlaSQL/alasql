// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testNum = 420;

describe('Test ' + testNum + ' Load data from XLSX without extra line', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testNum + ';USE test' + testNum);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testNum);
	});

	test('1. Load XLSX', done => {
		alasql(
			'VALUE OF SELECT COUNT(*) FROM XLSX("' + __dirname + '/test420.xlsx")',
			[],
			function (res) {
				expect(res == 4).toBe(true);
				//      console.log(res);
				//       expect(res).toEqual(// 0
				//       );
				done();
			}
		);
	});
});
