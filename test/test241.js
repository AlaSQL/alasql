// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 241 :: type casting operator and Ranges', function () {
	test(':: operator', function (done) {
		var res = alasql('select value 10::string');
		assert(res === '10');
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
