// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 204 PRINT', () => {
	test.skip('1. PRINT()', done => {
		// var oldconsolelog = console.log;
		// console.log = function(){
		// 	expect(arguments[0] == '[1).toEqual(4,9,16]');
		// 	console.log = oldconsolelog;
		// 	done();
		// };

		// Please let done() depend on output
		var data = [1, 2, 3, 4];
		alasql('PRINT (SELECT COLUMN _^2 FROM ?)', [data]);
		alasql('PRINT SELECT COLUMN _^2 FROM ?', [data]);
		done();
	});
});
