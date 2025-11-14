// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 789 - convert decimal', function () {
	test('1. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,2),"123.456")', [], function (res) {
			assert(res === 123.46);
			done();
		});
	});

	test('2. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,3),"123.456")', [], function (res) {
			assert(res === 123.456);
			done();
		});
	});

	test('3. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,0),"123.456")', [], function (res) {
			assert(res === 123);
			done();
		});
	});

	test('4. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),123.456)', [], function (res) {
			assert(res === 123);
			done();
		});
	});

	test('5. DECIMAL', function (done) {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),"stuff")', [], function (res) {
			assert(res === undefined);
			done();
		});
	});
});
