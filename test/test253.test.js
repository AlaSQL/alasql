// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 253 Internal (SELECT) with GROUP BY', () => {
	test('1. Test', done => {
		var data = [
			{a: 3.5, b: {c: 'label1'}},
			{a: 0.5, b: {c: 'label1'}},
			{a: 6, b: {c: 'label2'}},
		];

		var res = alasql(
			'SELECT FIRST(b->c) as [b->c], sum(a)/(select sum(a) from ?) \
	   from ? group by b->c',
			[data, data]
		);

		expect(res).toEqual([
			{
				'b->c': 'label1',
				'SUM(a) / SELECT SUM(a) FROM $0 AS default': 0.4,
			},
			{
				'b->c': 'label2',
				'SUM(a) / SELECT SUM(a) FROM $0 AS default': 0.6,
			},
		]);

		done();
	});
});
