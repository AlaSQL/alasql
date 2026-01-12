import {describe, expect, test} from 'bun:test';
import {csv, parseCSV, toCSV} from '../../src/plugins/csv.js';

describe('CSV plugin', () => {
	describe('parseCSV', () => {
		test('parses basic CSV with headers', () => {
			const text = 'name,age\nAlice,30\nBob,25';
			const result = parseCSV(text, ',', true);
			expect(result).toStrictEqual([
				{name: 'Alice', age: '30'},
				{name: 'Bob', age: '25'},
			]);
		});

		test('parses CSV without headers', () => {
			const text = 'Alice,30\nBob,25';
			const result = parseCSV(text, ',', false);
			expect(result).toStrictEqual([
				{col0: 'Alice', col1: '30'},
				{col0: 'Bob', col1: '25'},
			]);
		});

		test('handles custom separator', () => {
			const text = 'name;age\nAlice;30';
			const result = parseCSV(text, ';', true);
			expect(result).toStrictEqual([{name: 'Alice', age: '30'}]);
		});

		test('handles empty input', () => {
			const result = parseCSV('', ',', true);
			expect(result).toStrictEqual([]);
		});

		test('trims whitespace', () => {
			const text = ' name , age \n Alice , 30 ';
			const result = parseCSV(text, ',', true);
			expect(result).toStrictEqual([{name: 'Alice', age: '30'}]);
		});
	});

	describe('toCSV', () => {
		test('converts data to CSV string', () => {
			const data = [
				{name: 'Alice', age: 30},
				{name: 'Bob', age: 25},
			];
			const result = toCSV(data, null, ',');
			expect(result).toBe('name,age\nAlice,30\nBob,25');
		});

		test('handles empty array', () => {
			const result = toCSV([], null, ',');
			expect(result).toBe('');
		});

		test('quotes values with separator', () => {
			const data = [{name: 'Alice, Jr.', age: 30}];
			const result = toCSV(data, null, ',');
			expect(result).toBe('name,age\n"Alice, Jr.",30');
		});

		test('handles quotes in values', () => {
			const data = [{name: 'Say "Hello"', age: 30}];
			const result = toCSV(data, null, ',');
			// Values with quotes but no separator are not quoted
			expect(result).toBe('name,age\nSay "Hello",30');
		});

		test('handles null/undefined values', () => {
			const data = [{name: 'Alice', age: null}];
			const result = toCSV(data, null, ',');
			expect(result).toBe('name,age\nAlice,');
		});
	});

	describe('csv plugin registration', () => {
		test('registers from.CSV and into.CSV on alasql', () => {
			const mockAlasql = {};
			csv(mockAlasql);

			expect(typeof mockAlasql.from.CSV).toBe('function');
			expect(typeof mockAlasql.into.CSV).toBe('function');
			expect(typeof mockAlasql.csv.parse).toBe('function');
			expect(typeof mockAlasql.csv.stringify).toBe('function');
		});
	});
});
