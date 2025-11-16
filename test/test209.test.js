// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe.todo('Test 209 SELECT FROM @localvar', () => {
	beforeAll(() => {
		alasql('create database test209');
		alasql('use test209');
	});

	afterAll(() => {
		alasql('drop database test209');
	});

	test('1. FROM @localvar', () => {
		alasql('SET @one = @[{a:1},{a:2},{a:3}]');
		const res = alasql('SELECT * FROM @one ORDER BY a DESC');
		expect(res).toEqual([{a: 3}, {a: 2}, {a: 1}]);
	});

	test('2. FROM @localvar', () => {
		alasql('SELECT * INTO @two FROM @one ORDER BY a DESC');
		const res = alasql('SELECT * FROM @two');
		expect(res).toEqual([{a: 3}, {a: 2}, {a: 1}]);
	});
});
