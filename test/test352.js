// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 352 TEST EQUALITY', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test352;USE test352');
		done();
	});

	test('2. TEST =', function (done) {
		var res = alasql('= 1=1');
		assert.deepEqual(res, true);
		var res = alasql('= 1=NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= NULL=NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= 0=NULL');
		assert.deepEqual(res, undefined);
		done();
	});

	test('3. TEST ==', function (done) {
		var res = alasql('= 1==1');
		assert.deepEqual(res, true);
		var res = alasql('= 1==NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= NULL==NULL');
		assert.deepEqual(res, undefined);
		var res = alasql('= 0==NULL');
		assert.deepEqual(res, undefined);
		done();
	});

	test('4. TEST == deepEqual', function (done) {
		var res = alasql('= {a:1}=={a:1}');
		assert.deepEqual(res, true);
		var res = alasql('= {a:1}=={a:2}');
		assert.deepEqual(res, false);
		done();
	});

	test('3. TEST IS', function (done) {
		var res = alasql('= 1 IS NULL');
		assert.deepEqual(res, false);
		var res = alasql('= NULL IS NULL');
		assert.deepEqual(res, true);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test352');
		done();
	});
});
