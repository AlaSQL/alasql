// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 426;

describe('Test ' + testId + ' Binary operators', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. ^', done => {
		var res = alasql('= 60^13');
		expect(res).toEqual(49);
		done();
	});

	test('2. ~', done => {
		var res = alasql('= ~60');
		expect(res == -61).toBe(true);
		done();
	});

	test('3. POWER', done => {
		var res = alasql('= POWER(2,3)');
		expect(res == 8).toBe(true);
		done();
	});

	test('4. EXP', done => {
		var res = alasql('= EXP(1)');
		expect(res == 2.718281828459045).toBe(true);
		done();
	});
});
