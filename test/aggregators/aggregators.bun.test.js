import {describe, expect, test} from 'bun:test';
// Use legacy dist for integration testing
import alasql from '../../dist/alasql.fs.js';

describe('SUM aggregator', () => {
	test('sums numbers', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT SUM(x) as s FROM ?', [data]);
		expect(res).toStrictEqual([{s: 6}]);
	});

	test('handles NULL values', () => {
		const data = [{x: 1}, {x: null}, {x: 3}];
		const res = alasql('SELECT SUM(x) as s FROM ?', [data]);
		expect(res).toStrictEqual([{s: 4}]);
	});

	test('works with GROUP BY', () => {
		const data = [
			{dept: 'A', salary: 100},
			{dept: 'A', salary: 200},
			{dept: 'B', salary: 150},
		];
		const res = alasql('SELECT dept, SUM(salary) as s FROM ? GROUP BY dept ORDER BY dept', [data]);
		expect(res).toStrictEqual([
			{dept: 'A', s: 300},
			{dept: 'B', s: 150},
		]);
	});
});

describe('AVG aggregator', () => {
	test('calculates average', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT AVG(x) as a FROM ?', [data]);
		expect(res).toStrictEqual([{a: 2}]);
	});

	test('handles decimals', () => {
		const data = [{x: 1}, {x: 2}];
		const res = alasql('SELECT AVG(x) as a FROM ?', [data]);
		expect(res).toStrictEqual([{a: 1.5}]);
	});
});

describe('COUNT aggregator', () => {
	test('counts rows', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT COUNT(*) as cnt FROM ?', [data]);
		expect(res).toStrictEqual([{cnt: 3}]);
	});

	test('counts non-null values', () => {
		const data = [{x: 1}, {x: null}, {x: 3}];
		const res = alasql('SELECT COUNT(x) as cnt FROM ?', [data]);
		expect(res).toStrictEqual([{cnt: 2}]);
	});
});

describe('MIN aggregator', () => {
	test('finds minimum number', () => {
		const data = [{x: 3}, {x: 1}, {x: 2}];
		const res = alasql('SELECT MIN(x) as m FROM ?', [data]);
		expect(res).toStrictEqual([{m: 1}]);
	});
});

describe('MAX aggregator', () => {
	test('finds maximum number', () => {
		const data = [{x: 3}, {x: 1}, {x: 2}];
		const res = alasql('SELECT MAX(x) as m FROM ?', [data]);
		expect(res).toStrictEqual([{m: 3}]);
	});
});

describe('FIRST aggregator', () => {
	test('returns first value', () => {
		const data = [{x: 'a'}, {x: 'b'}, {x: 'c'}];
		const res = alasql('SELECT FIRST(x) as f FROM ?', [data]);
		expect(res).toStrictEqual([{f: 'a'}]);
	});
});

describe('LAST aggregator', () => {
	test('returns last value', () => {
		const data = [{x: 'a'}, {x: 'b'}, {x: 'c'}];
		const res = alasql('SELECT LAST(x) as l FROM ?', [data]);
		expect(res).toStrictEqual([{l: 'c'}]);
	});
});

describe('ARRAY aggregator', () => {
	test('collects values into array', () => {
		const data = [{x: 1}, {x: 2}, {x: 3}];
		const res = alasql('SELECT ARRAY(x) as arr FROM ?', [data]);
		expect(res[0].arr).toStrictEqual([1, 2, 3]);
	});
});
