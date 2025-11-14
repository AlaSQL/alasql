// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 172 - XLSX to array', function () {
	test.skip('1. Load XLSX file into array', function (done) {
		var data = [];
		alasql(
			'select column * from xlsx("' +
				__dirname +
				'/test168.xlsx", {headers:true, sheetid:"Sheet1", range:"A1:B6"}) order by City',
			[],
			function (res) {
				//			console.log(res);
				assert.deepEqual(res, ['Kyoto', 'Mexico', 'Minsk', 'Moscow', 'Tokyo']);
				done();
			}
		);
	});
});

//};
