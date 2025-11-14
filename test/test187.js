// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 187 - Calculation of PI', function () {
	test('1. RANGE()', function (done) {
		var n = 10;
		//      var res = alasql('SELECT COUNT(*) as cnt, VALUE AGGR(cnt/$[0]*4) as pi FROM (SELECT random() as x, random() as y FROM RANGE(1,$[0])) WHERE x*x+y*y<1',
		//          [n]);
		//      console.log(res);

		//var res = alasql('SELECT COUNT(*) as cnt, AGGR(cnt/$[0]*4) as pi, random() as x, random() as y FROM RANGE(1,$[0]) WHERE x*x+y*y<1',
		//          [n]);
		var res = alasql(
			'SELECT * FROM (SELECT random() AS x, random() AS y FROM RANGE(1,10)) WHERE x*x+y*y<1',
			[n]
		);
		//      console.log(res);
		//	assert(res.length == 10);
		done();
	});
});
