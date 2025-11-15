// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 203 REQUIRE ASYNC', () => {
	test('1. REQUIRE() ASYN', done => {
		var data = [1, 2, 3, 4];
		alasql(
			'REQUIRE "' + __dirname + '/test203myfn.js1","' + __dirname + '/test203myfn2.js1"',
			[],
			() => {
				var res = alasql('SELECT COLUMN myfn(_)+myfn2(_) FROM ?', [data]);
				//        console.log(res);
				expect(res).toEqual([2, 12, 36, 80]);
				done();
			}
		);
		//        console.log(alasql.fn);
	});
	test('2. REQUIRE SYNC', done => {
		var data = [1, 2, 3, 4];
		alasql.fn = {};
		//console.log(alasql.fn);
		alasql('REQUIRE "' + __dirname + '/test203myfn.js1","' + __dirname + '/test203myfn2.js1"');
		//        console.log(alasql.fn);
		var res = alasql('SELECT COLUMN myfn(_)+myfn2(_) FROM ?', [data]);
		//        var res = alasql('SELECT COLUMN myfn(_) FROM ?',[data]);
		//        console.log(res);
		expect(res).toEqual([2, 12, 36, 80]);
		done();
		//        console.log(alasql.fn);
	});
});
