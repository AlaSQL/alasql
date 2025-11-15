// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 789 - convert decimal', () => {
	test('1. DECIMAL', done => {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,2),"123.456")', [], function (res) {
			expect(res === 123.46).toBe(true);
			done();
		});
	});

	test('2. DECIMAL', done => {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,3),"123.456")', [], function (res) {
			expect(res === 123.456).toBe(true);
			done();
		});
	});

	test('3. DECIMAL', done => {
		alasql('SELECT VALUE CONVERT(DECIMAL(10,0),"123.456")', [], function (res) {
			expect(res === 123).toBe(true);
			done();
		});
	});

	test('4. DECIMAL', done => {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),123.456)', [], function (res) {
			expect(res === 123).toBe(true);
			done();
		});
	});

	test('5. DECIMAL', done => {
		alasql('SELECT VALUE CONVERT(DECIMAL(3,0),"stuff")', [], function (res) {
			expect(res === undefined).toBe(true);
			done();
		});
	});
});
