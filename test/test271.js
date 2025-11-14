// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 271 RECORDSET and Excel tests', function () {
	test('1. Open Excel and columns', function (done) {
		var res = alasql(
			'SELECT RECORDSET * FROM XLSX("' + __dirname + '/test168.xlsx",{headers:true})',
			[],
			function (res) {
				var colres = res.columns.map(col => col.columnid);
				assert.deepEqual(colres, ['City', 'Population']);
				done();
			}
		);
	});
});
