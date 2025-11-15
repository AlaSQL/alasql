// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 175 - JOIN USING TEST', () => {
	test('1. JOIN ON', done => {
		var data = {
			COLORS: [
				[1, 'red'],
				[2, 'yellow'],
				[3, 'orange'],
			],
			FRUITS: [
				[1, 'apple'],
				[2, 'banana'],
				[3, 'orange'],
			],
		};

		data.NEW_FRUITS = alasql(
			'SELECT MATRIX COLORS.[0], COLORS.[1], FRUITS.[1] AS [2] \
			FROM ? AS COLORS JOIN ? AS FRUITS ON COLORS.[0] = FRUITS.[0]',
			[data.COLORS, data.FRUITS]
		);
		expect(data.NEW_FRUITS).toEqual([
			[1, 'red', 'apple'],
			[2, 'yellow', 'banana'],
			[3, 'orange', 'orange'],
		]);
		done();
	});

	test('2. JOIN USING', done => {
		var data = {
			COLORS: [
				[1, 'red'],
				[2, 'yellow'],
				[3, 'orange'],
			],
			FRUITS: [
				[1, 'apple'],
				[2, 'banana'],
				[3, 'orange'],
			],
		};

		data.NEW_FRUITS = alasql(
			'SELECT MATRIX COLORS.[0], COLORS.[1], FRUITS.[1] AS [2] \
			FROM ? AS COLORS JOIN ? AS FRUITS USING [0]',
			[data.COLORS, data.FRUITS]
		);
		//		console.log(data.NEW_FRUITS);
		expect(data.NEW_FRUITS).toEqual([
			[1, 'red', 'apple'],
			[2, 'yellow', 'banana'],
			[3, 'orange', 'orange'],
		]);
		done();
	});
});

//};
