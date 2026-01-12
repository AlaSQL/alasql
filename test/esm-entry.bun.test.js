// test/esm-entry.bun.test.js
import {describe, expect, test} from 'bun:test';
import alasql from '../src/alasql.js';

describe('ESM Entry (skeleton)', () => {
	test('alasql is a function', () => {
		expect(typeof alasql).toBe('function');
	});

	test('.use() exists and is chainable', () => {
		const result = alasql.use({});
		expect(result).toBe(alasql);
	});

	test('.use() accepts function plugin', () => {
		const plugin = a => {
			a.testFlag = true;
		};
		alasql.use(plugin);
		expect(alasql.testFlag).toBe(true);
	});

	test('parser is attached', () => {
		expect(alasql.parser).toBeDefined();
		expect(alasql.yy).toBeDefined();
	});
});
