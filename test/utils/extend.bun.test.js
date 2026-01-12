import {describe, expect, test} from 'bun:test';
import {extend} from '../../src/utils/extend.js';

describe('extend', () => {
	test('extends object with properties from another object', () => {
		const a = {x: 1};
		const b = {y: 2};
		const result = extend(a, b);
		expect(result).toEqual({x: 1, y: 2});
	});

	test('returns the modified target object', () => {
		const a = {x: 1};
		const b = {y: 2};
		const result = extend(a, b);
		expect(result).toBe(a);
	});

	test('overwrites existing properties', () => {
		const a = {x: 1};
		const b = {x: 2};
		const result = extend(a, b);
		expect(result.x).toBe(2);
	});

	test('handles null/undefined target by creating empty object', () => {
		const b = {y: 2};
		const result = extend(null, b);
		expect(result).toEqual({y: 2});
	});

	test('handles undefined target', () => {
		const b = {y: 2};
		const result = extend(undefined, b);
		expect(result).toEqual({y: 2});
	});

	test('ignores inherited properties', () => {
		const proto = {inherited: true};
		const b = Object.create(proto);
		b.own = 'value';
		const result = extend({}, b);
		expect(result).toEqual({own: 'value'});
		expect(result.inherited).toBeUndefined();
	});

	test('handles empty source object', () => {
		const a = {x: 1};
		const result = extend(a, {});
		expect(result).toEqual({x: 1});
	});
});
