// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 251 Overwrite XLSX file', function () {
	test('1. Overwrite', function (done) {
		alasql('SELECT * INTO XLSX("' + __dirname + '/test251.xlsx", {headers:true}) from ?', [
			{a: 1, b: 2},
		]);

		alasql(
			'SELECT HOUR(NOW()), MINUTE(NOW()), SECOND(NOW()) \
        INTO XLSX("' +
				__dirname.toString().replace(/\\/g, '/') +
				'/restest251.xlsx",{sourcefilename:"' +
				__dirname.toString().replace(/\\/g, '/') +
				'/test251.xlsx' +
				'", \
          sheetid:"test2", range:"B3"})',
			[],
			function (res) {
				assert(res == 1);
				done();
			}
		);
	});
});
