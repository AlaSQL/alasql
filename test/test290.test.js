// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 290 FROM Json', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test290;USE test290');
		done();
	});

	test.skip('2. SELECT', function (done) {
		var res = alasql('SELECT VALUE @[1,2,3,(b+4)] FROM @[{b:100}]');
		//    console.log(res);
		assert.deepEqual(res, [1, 2, 3, 104]);
		done();
	});

	test.skip('3. JOINed source', function (done) {
		var res = alasql(
			'SELECT * FROM @[{a:1,b:10},{a:2,b:20}] \
      JOIN @[{b:10,c:100},{b:20,c:200},{b:30,c:300},] ON b'
		);
		console.log(res);
		assert.deepEqual(res, [1, 2, 3, 104]);
		done();
	});

	// TODO: Add other operators

	test.skip('3. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test290');
		done();
	});
});
