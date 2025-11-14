// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 298 PLUG-IN TEST', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test298;USE test298');
		done();
	});

	test('2.REQURE ECHO plugin', function (done) {
		assert.throws(function () {
			var res = alasql('ECHO 1');
			//      console.log(1,res);
		}, Error);

		var res = alasql('REQUIRE ECHO');
		assert.deepEqual(res, 1);
		var res = alasql('ECHO 10');
		assert.deepEqual(res, 10);
		//      console.log(2,res);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test298');
		done();
	});
});
