// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 223 ROLLUP() in GROUP BY', () => {
	var testData = [
		{Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 1', Val: 5},
		{Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 2', Val: 20},
		{Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 1', Val: 25},
		{Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 2', Val: 40},
	];

	test('1. ROLLUP', done => {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY ROLLUP(Phase,Step)',
			[testData]
		);
		expect(res).toEqual([
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	test('2. CUBE', done => {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY CUBE(Phase,Step)',
			[testData]
		);
		//		console.log(res);

		expect(res).toEqual([
			{Phase: null, Step: null, Val: 90},
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: null, Step: 'Step 1', Val: 30},
			{Phase: 'Phase 1', Step: 'Step 1', Val: 5},
			{Phase: null, Step: 'Step 2', Val: 60},
			{Phase: 'Phase 1', Step: 'Step 2', Val: 20},
			{Phase: 'Phase 2', Step: null, Val: 65},
			{Phase: 'Phase 2', Step: 'Step 1', Val: 25},
			{Phase: 'Phase 2', Step: 'Step 2', Val: 40},
		]);
		done();
	});

	test('3. GROUPING SETS', done => {
		var res = alasql(
			'SELECT Phase, Step, SUM(Val) AS Val FROM ? \
			GROUP BY GROUPING SETS(Phase,Step)',
			[testData]
		);
		//		console.log(res);

		expect(res).toEqual([
			{Phase: 'Phase 1', Step: null, Val: 25},
			{Phase: null, Step: 'Step 1', Val: 30},
			{Phase: null, Step: 'Step 2', Val: 60},
			{Phase: 'Phase 2', Step: null, Val: 65},
		]);
		done();
	});
});
