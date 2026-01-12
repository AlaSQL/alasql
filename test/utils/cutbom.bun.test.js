import {describe, expect, test} from 'bun:test';
import {cutbom} from '../../src/utils/cutbom.js';

describe('cutbom', () => {
	test('removes BOM character from start of string', () => {
		const bom = String.fromCharCode(65279);
		const input = bom + 'hello world';
		expect(cutbom(input)).toBe('hello world');
	});

	test('leaves string unchanged if no BOM', () => {
		expect(cutbom('hello world')).toBe('hello world');
	});

	test('handles empty string', () => {
		expect(cutbom('')).toBe('');
	});

	test('only removes BOM from start, not middle', () => {
		const bom = String.fromCharCode(65279);
		const input = 'hello' + bom + 'world';
		expect(cutbom(input)).toBe(input);
	});

	test('handles string that is only BOM', () => {
		const bom = String.fromCharCode(65279);
		expect(cutbom(bom)).toBe('');
	});
});
