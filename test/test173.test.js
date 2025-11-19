// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 173 - SELECT Short Syntax', () => {
	if (false) {
		test('1. FROM without select', done => {
			var data = [{a: 1}, {a: 2}, {a: 3}];
			alasql('FROM ?', [data], function (res) {
				/// console.log(res);
				expect(res).toEqual([{a: 1}, {a: 2}, {a: 3}]);
				done();
			});
		});
	}
});

//};
