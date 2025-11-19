// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 425;

describe('Test ' + testId + ' Arrow and DOT', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. DOT outside SELECT', done => {
		var files = ['home_01.ai', 'home_02.ai', 'home_03.ai', 'imprint_01.ai', 'imprint_02.ai'];

		var res = alasql('COLUMN OF SELECT ARRAY(_) FROM ? GROUP BY _->split("_")->0', [files]);
		expect(res).toEqual([
			['home_01.ai', 'home_02.ai', 'home_03.ai'],
			['imprint_01.ai', 'imprint_02.ai'],
		]);
		done();
	});
});
