// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 194 - HAVING with aggregator', function () {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	test('1. HAVING with aggregator', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a FROM ? GROUP BY a HAVING COUNT(*)>1 ORDER BY a', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}]);
		//        console.log('Result:',res);
		done();
	});
	/*    
    test("2. GROUP BY formula", function(done) {
        var data = [{a:1},{a:1},{a:2},{a:3},{a:1},{a:2}];
        var res = alasql('SELECT a FROM ? GROUP BY CUBE(a,a%2)',[data]);
/// console.log(res);
        done();
    });
*/
});
