// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 307 special selectors', function () {
	test('0. Create database ', function (done) {
		alasql('CREATE DATABASE test307;USE test307');
		done();
	});

	test('1. SET selector', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('SEARCH / set(b=a*3) FROM ?', [data]);
		// console.log(res);
		// console.log(data);
		assert.deepEqual(res, [
			{a: 1, b: 3},
			{a: 2, b: 6},
		]);
		assert.deepEqual(data, [
			{a: 1, b: 3},
			{a: 2, b: 6},
		]);
		done();
	});

	test('2. SET selector', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('SEARCH / clonedeep() set(b=a*3) FROM ?', [data]);
		// console.log(res);
		// console.log(data);
		assert.deepEqual(res, [
			{a: 1, b: 3},
			{a: 2, b: 6},
		]);
		assert.deepEqual(data, [
			{a: 1, b: 10},
			{a: 2, b: 20},
		]);
		done();
	});

	// test('3. DELETE selector',function(done){
	//   var data = [{a:1,b:10},{a:2,b:20}];
	//   var res = alasql('SEARCH / ok(a=1)  FROM ?',[data]);
	//   console.log(res);
	//   console.log(data);
	//   // assert.deepEqual(res,[ { a: 1, b: 3 }, { a: 2, b: 6 } ]);
	//   // assert.deepEqual(data,[ { a: 1, b: 10 }, { a: 2, b: 20 } ]);
	//   done();
	// });

	test('99. Drop database ', function (done) {
		alasql('DROP DATABASE test307');
		done();
	});
});
