import {describe, expect, test} from 'bun:test';
import {clone, cloneDeep} from '../../src/utils/clone.js';

describe('clone', () => {
	test('clones object', () => {
		const obj = {a: 1, b: {c: 2}};
		const cloned = clone(obj);
		expect(cloned).toStrictEqual(obj);
		expect(cloned).not.toBe(obj);
		expect(cloned.b).not.toBe(obj.b);
	});

	test('handles null', () => {
		expect(clone(null)).toBeNull();
	});

	test('handles primitives', () => {
		expect(clone(42)).toBe(42);
		expect(clone('hello')).toBe('hello');
	});

	test('clones arrays', () => {
		const arr = [1, 2, {x: 3}];
		const cloned = clone(arr);
		expect(cloned).toStrictEqual(arr);
		expect(cloned).not.toBe(arr);
	});

	test('clones Date objects', () => {
		const date = new Date('2024-01-01');
		const cloned = clone(date);
		expect(cloned).toStrictEqual(date);
		expect(cloned).not.toBe(date);
	});

	test('cloneDeep is same as clone', () => {
		expect(cloneDeep).toBe(clone);
	});
});
