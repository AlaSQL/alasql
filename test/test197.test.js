// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 197 - Expression in expression', () => {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	test('1. MAX', done => {
		// var ast = alasql.parse('SELECT (SELECT MAX(a) FROM ?) FROM RANGE(1,2)');
		// console.log(ast.toString());
		// console.log(ast);

		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT (SELECT * FROM ?)+1 FROM RANGE(1,2)', [data]);
		//console.log(res);
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
