import {describe, expect, test} from 'bun:test';
import {json} from '../../src/plugins/json.js';

describe('JSON plugin', () => {
	test('registers from.JSON and into.JSON on alasql', () => {
		const mockAlasql = {};
		json(mockAlasql);

		expect(typeof mockAlasql.from.JSON).toBe('function');
		expect(typeof mockAlasql.into.JSON).toBe('function');
	});

	test('from.JSON parses JSON array', () => {
		const mockAlasql = {
			utils: {
				loadFile: () => '[{"a":1},{"a":2}]',
			},
		};
		json(mockAlasql);

		const result = mockAlasql.from.JSON('test.json');
		expect(result).toStrictEqual([{a: 1}, {a: 2}]);
	});

	test('from.JSON wraps single object in array', () => {
		const mockAlasql = {
			utils: {
				loadFile: () => '{"a":1}',
			},
		};
		json(mockAlasql);

		const result = mockAlasql.from.JSON('test.json');
		expect(result).toStrictEqual([{a: 1}]);
	});

	test('from.JSON supports path option', () => {
		const mockAlasql = {
			utils: {
				loadFile: () => '{"data":{"items":[{"a":1}]}}',
			},
		};
		json(mockAlasql);

		const result = mockAlasql.from.JSON('test.json', {path: 'data.items'});
		expect(result).toStrictEqual([{a: 1}]);
	});

	test('into.JSON converts to JSON string', () => {
		let savedContent = null;
		const mockAlasql = {
			utils: {
				saveFile: (filename, content) => {
					savedContent = content;
				},
			},
		};
		json(mockAlasql);

		const data = [{a: 1}, {a: 2}];
		const result = mockAlasql.into.JSON('output.json', {}, data);

		expect(result).toBe(2);
		expect(savedContent).toBe('[{"a":1},{"a":2}]');
	});

	test('into.JSON supports pretty option', () => {
		let savedContent = null;
		const mockAlasql = {
			utils: {
				saveFile: (filename, content) => {
					savedContent = content;
				},
			},
		};
		json(mockAlasql);

		const data = [{a: 1}];
		mockAlasql.into.JSON('output.json', {pretty: true}, data);

		expect(savedContent).toContain('\n');
		expect(savedContent).toContain('  ');
	});
});
