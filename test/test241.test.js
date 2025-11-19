// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 241 :: type casting operator and Ranges', () => {
	test(':: operator', done => {
		var res = alasql('select value 10::string');
		expect(res === '10').toBe(true);
		done();
	});

	// 1::INT

	// Ranges

	// select '[1,2)'::range
	// select 1 in '[1,2)'::range

	// {
	//   ubopen:true,
	//   ubvalue:,
	//   lbopen:true,
	//   lbvalue:
	// }

	// a @&& a
	// a @* a
});
