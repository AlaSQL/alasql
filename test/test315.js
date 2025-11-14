// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 315a Brackets for SEARCH', function () {
	var data = {a: 10, b: 100, c: {d: 5, e: 6}};

	test('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH a FROM ?', [data]);
		assert(res[0] == 10);
		done();
	});

	test('2. Simple Brackets', function (done) {
		var res = alasql('SEARCH (a) FROM ?', [data]);
		assert(res[0] == 10);
		done();
	});

	test('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH WITH(c d) FROM ?', [data]);
		assert(res[0] == 5);

		done();
	});

	test('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH c WITH(d) FROM ?', [data]);
		assert(res[0] == 5);

		done();
	});

	test('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH WITH(c) d FROM ?', [data]);
		//    console.log(43,res);
		assert(res[0] == 5);

		done();
	});

	test('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH with(c) with(d) FROM ?', [data]);
		//    console.log(51,res);
		assert(res[0] == 5);
		done();
	});
});
describe('Test 315b Brackets for SEARCH', function () {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	test('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH / / a FROM ?', [data]);
		assert(res == 2);
		done();
	});

	test('2. Simple Brackets', function (done) {
		var res = alasql('SEARCH / a FROM ?', [data]);
		assert.deepEqual(res, [1]);
		done();
	});

	test('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH (/)+ a FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH ((/)+ (a)) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH (/)? a FROM ?', [data]);
		assert.deepEqual(res, [1]);
		//    console.log(res);
		done();
	});
});

describe('Test 315c Brackets for SEARCH', function () {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	test('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH /+ a FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);

		done();
	});
	test('2. Simple Brackets', function (done) {
		var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		done();
	});
	test('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH / + FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}, 1, {a: 2}, 2, 3, 2]);
		done();
	});

	test('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH ((/+) a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(ASC) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});
	test('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
	test('7. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL(/+a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
	test('8. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL(/ *a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
});
