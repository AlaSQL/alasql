import {describe, expect, test} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('SELECT statement', () => {
	test('SELECT literal', () => {
		const res = alasql('SELECT 1 as x');
		expect(res).toStrictEqual([{x: 1}]);
	});

	test('SELECT multiple literals', () => {
		const res = alasql('SELECT 1 as a, 2 as b');
		expect(res).toStrictEqual([{a: 1, b: 2}]);
	});

	test('SELECT from array', () => {
		const data = [{a: 1}, {a: 2}];
		const res = alasql('SELECT * FROM ?', [data]);
		expect(res).toStrictEqual(data);
	});

	test('SELECT specific columns', () => {
		const data = [
			{a: 1, b: 2},
			{a: 3, b: 4},
		];
		const res = alasql('SELECT a FROM ?', [data]);
		expect(res).toStrictEqual([{a: 1}, {a: 3}]);
	});

	test('SELECT with WHERE', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT * FROM ? WHERE x > 1', [data]);
		expect(res).toStrictEqual([{x: 2}, {x: 3}]);
	});

	test('SELECT with ORDER BY', () => {
		const data = [{x: 3}, {x: 1}, {x: 2}];
		const res = alasql('SELECT * FROM ? ORDER BY x', [data]);
		expect(res).toStrictEqual([{x: 1}, {x: 2}, {x: 3}]);
	});

	test('SELECT with ORDER BY DESC', () => {
		const data = [{x: 1}, {x: 3}, {x: 2}];
		const res = alasql('SELECT * FROM ? ORDER BY x DESC', [data]);
		expect(res).toStrictEqual([{x: 3}, {x: 2}, {x: 1}]);
	});

	test('SELECT with LIMIT', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT * FROM ? LIMIT 2', [data]);
		expect(res).toStrictEqual([{x: 1}, {x: 2}]);
	});

	test('SELECT with OFFSET', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT * FROM ? LIMIT 2 OFFSET 1', [data]);
		expect(res).toStrictEqual([{x: 2}, {x: 3}]);
	});

	test('SELECT DISTINCT', () => {
		const data = [{x: 1}, {x: 1}, {x: 2}];
		const res = alasql('SELECT DISTINCT x FROM ?', [data]);
		expect(res).toStrictEqual([{x: 1}, {x: 2}]);
	});

	test('SELECT with GROUP BY', () => {
		const data = [
			{dept: 'A', val: 1},
			{dept: 'A', val: 2},
			{dept: 'B', val: 3},
		];
		const res = alasql('SELECT dept, SUM(val) as s FROM ? GROUP BY dept ORDER BY dept', [data]);
		expect(res).toStrictEqual([
			{dept: 'A', s: 3},
			{dept: 'B', s: 3},
		]);
	});

	test('SELECT with alias', () => {
		const data = [{x: 1}];
		const res = alasql('SELECT x as y FROM ?', [data]);
		expect(res).toStrictEqual([{y: 1}]);
	});
});
