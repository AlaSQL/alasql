// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 177 - AVG', function () {
	var data = [{a: 1}, {a: 2}, {a: 3}];

	test('1. AVG', function (done) {
		var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm FROM ?', [data]);
		assert(2 == res[0].sm / res[0].cnt);
		done();
	});

	test('2. AVG', function (done) {
		var res = alasql('SELECT VALUE AVG(a) FROM ?', [data]);
		//    console.log(2, res);
		assert(res == 2);
		done();
	});

	if (false) {
		test('3. AGGR', function (done) {
			var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm, AGGR(sm/cnt) AS av FROM ?', [data]);
			//    var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm, AGGR(COUNT(*)/SUM(a)) AS av FROM ?',[data]);
			/// console.log(3, res);
			assert(2 == res[0].av);
			done();
		});
	}
});
