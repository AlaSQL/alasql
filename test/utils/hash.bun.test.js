import {describe, expect, test} from 'bun:test';
import {hash} from '../../src/utils/hash.js';

describe('hash', () => {
	test('hashes a string to an integer', () => {
		const result = hash('hello');
		expect(typeof result).toBe('number');
		expect(Number.isInteger(result)).toBe(true);
	});

	test('same string produces same hash', () => {
		expect(hash('test')).toBe(hash('test'));
	});

	test('different strings produce different hashes', () => {
		expect(hash('hello')).not.toBe(hash('world'));
	});

	test('empty string produces a hash', () => {
		const result = hash('');
		expect(typeof result).toBe('number');
	});

	test('handles unicode characters', () => {
		const result = hash('héllo wörld');
		expect(typeof result).toBe('number');
	});

	test('long strings work correctly', () => {
		const longStr = 'a'.repeat(10000);
		const result = hash(longStr);
		expect(typeof result).toBe('number');
	});
});
