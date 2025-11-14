// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 235 SELECT INSIDE IF', function () {
	test('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test235; USE test235;');
		done();
	});

	test('2. Throw error', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 2) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		assert(res == 1);
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 3) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		assert(res == 2);
		//        console.log(res);
		done();
	});

	test('99. DROP', function (done) {
		alasql('DROP DATABASE test235');
		done();
	});
});
