import {describe, expect, test} from 'bun:test';
import {localstorage} from '../../src/plugins/localstorage.js';
import {indexeddb} from '../../src/plugins/indexeddb.js';
import {filesaver} from '../../src/plugins/filesaver.js';

describe('LocalStorage plugin', () => {
	test('skips registration when localStorage is undefined', () => {
		// In Node/Bun environment, localStorage is undefined
		const mockAlasql = {engines: {}};
		localstorage(mockAlasql);

		// Should not register since we're not in browser
		expect(mockAlasql.engines.LOCALSTORAGE).toBeUndefined();
	});
});

describe('IndexedDB plugin', () => {
	test('skips registration when indexedDB is undefined', () => {
		// In Node/Bun environment, indexedDB is undefined
		const mockAlasql = {engines: {}};
		indexeddb(mockAlasql);

		// Should not register since we're not in browser
		expect(mockAlasql.engines.INDEXEDDB).toBeUndefined();
	});
});

describe('FileSaver plugin', () => {
	test('registers utils.saveFile and utils.loadFile', () => {
		const mockAlasql = {};
		filesaver(mockAlasql);

		expect(typeof mockAlasql.utils.saveFile).toBe('function');
		expect(typeof mockAlasql.utils.loadFile).toBe('function');
	});
});
