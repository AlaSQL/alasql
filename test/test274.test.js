// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 274 Count and other bugs', () => {
	test('2. Select count', done => {
		var res = alasql('SELECT _ AS a FROM RANGE(1,10)');
		/// console.log(res);

		var res = alasql('SELECT * FROM (SELECT _ AS a FROM RANGE(1,10))');
		/// console.log(res);

		var res = alasql('SELECT RECORDSET COUNT(*) FROM RANGE(1,10)');
		/// console.log(res);
		//    var colres = _.pluck(res.columns,'columnid');
		//    expect(colres).toEqual(["a","b"]);
		alasql.options.modifier = undefined;
		done();
	});
});
