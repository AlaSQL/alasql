import {describe, expect, test} from 'bun:test';
import {escapeq} from '../../src/utils/escapeq.js';

describe('escapeq', () => {
	test('escapes double quotes', () => {
		expect(escapeq('hello "world"')).toBe('hello \\"world\\"');
	});

	test('escapes single quotes', () => {
		expect(escapeq("hello 'world'")).toBe("hello \\'world\\'");
	});

	test('escapes backslashes', () => {
		expect(escapeq('hello\\world')).toBe('hello\\\\world');
	});

	test('escapes newlines', () => {
		expect(escapeq('hello\nworld')).toBe('hello\\nworld');
	});

	test('escapes carriage returns', () => {
		expect(escapeq('hello\rworld')).toBe('hello\\rworld');
	});

	test('escapes line separator (U+2028)', () => {
		expect(escapeq('hello\u2028world')).toBe('hello\\u2028world');
	});

	test('escapes paragraph separator (U+2029)', () => {
		expect(escapeq('hello\u2029world')).toBe('hello\\u2029world');
	});

	test('handles plain strings unchanged', () => {
		expect(escapeq('hello world')).toBe('hello world');
	});

	test('converts non-strings to strings', () => {
		expect(escapeq(123)).toBe('123');
	});

	test('handles multiple special characters', () => {
		expect(escapeq('It\'s a "test"\nwith\\special')).toBe('It\\\'s a \\"test\\"\\nwith\\\\special');
	});
});
