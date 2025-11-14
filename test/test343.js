// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 343 Use params for $variables', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test343;USE test343');
		done();
	});

	test.skip('2. Simple get undefined', function (done) {
		var res = alasql('=$a');
		assert.deepEqual(res, undefined);
		done();
	});

	test.skip('3. Simple get from empty param {}', function (done) {
		var res = alasql('=$a', {});
		assert.deepEqual(res, undefined);
		done();
	});

	test.skip('4. Simple get from empty param {}', function (done) {
		var params = {a: 123};
		var res = alasql('=$a', params);
		assert.deepEqual(res, 123);
		done();
	});

	test.skip('5. Simple set to param', function (done) {
		var params = {a: 123};
		var res = alasql('SET $a = $a + 100', params);
		assert.deepEqual(params.a, 223);
		done();
	});

	test.skip('6. SELECT INTO $var', function (done) {
		var params = {};
		params.data = [{v: 1}, {v: 2}, {v: 3}];
		var res = alasql('SELECT * INTO $arr FROM $data', params);
		assert.deepEqual(params.arr, [{v: 1}, {v: 2}, {v: 3}]);
		done();
	});

	test.skip('6. SEARCH AS $var', function (done) {
		var params = {};
		params.data = [{v: 1}, {v: 2}, {v: 3}];
		var res = alasql('SEARCH /v AS $vres FROM $data', params);
		assert.deepEqual(params.vres, 3);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test343');
		done();
	});
});
