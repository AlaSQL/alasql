// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 343 Use params for $variables', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test343;USE test343');
		done();
	});

	test.skip('2. Simple get undefined', done => {
		var res = alasql('=$a');
		expect(res).toEqual(undefined);
		done();
	});

	test.skip('3. Simple get from empty param {}', done => {
		var res = alasql('=$a', {});
		expect(res).toEqual(undefined);
		done();
	});

	test.skip('4. Simple get from empty param {}', done => {
		var params = {a: 123};
		var res = alasql('=$a', params);
		expect(res).toEqual(123);
		done();
	});

	test.skip('5. Simple set to param', done => {
		var params = {a: 123};
		var res = alasql('SET $a = $a + 100', params);
		expect(params.a).toEqual(223);
		done();
	});

	test.skip('6. SELECT INTO $var', done => {
		var params = {};
		params.data = [{v: 1}, {v: 2}, {v: 3}];
		var res = alasql('SELECT * INTO $arr FROM $data', params);
		expect(params.arr).toEqual([{v: 1}, {v: 2}, {v: 3}]);
		done();
	});

	test.skip('6. SEARCH AS $var', done => {
		var params = {};
		params.data = [{v: 1}, {v: 2}, {v: 3}];
		var res = alasql('SEARCH /v AS $vres FROM $data', params);
		expect(params.vres).toEqual(3);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test343');
		done();
	});
});
