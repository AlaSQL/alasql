import {describe, expect, test} from 'bun:test';
import {xlsx} from '../../src/plugins/xlsx.js';

describe('XLSX plugin', () => {
	test('registers from.XLSX and into.XLSX on alasql', () => {
		const mockAlasql = {};
		xlsx(mockAlasql);

		expect(typeof mockAlasql.from.XLSX).toBe('function');
		expect(typeof mockAlasql.into.XLSX).toBe('function');
	});

	test('from.XLSX throws when XLSX library not provided', () => {
		const mockAlasql = {};
		xlsx(mockAlasql);

		expect(() => {
			mockAlasql.from.XLSX('test.xlsx');
		}).toThrow('XLSX library not provided');
	});

	test('into.XLSX throws when XLSX library not provided', () => {
		const mockAlasql = {};
		xlsx(mockAlasql);

		expect(() => {
			mockAlasql.into.XLSX('test.xlsx', {}, [{a: 1}]);
		}).toThrow('XLSX library not provided');
	});

	test('from.XLSX works with mock XLSX library', () => {
		const mockXLSX = {
			readFile: () => ({
				SheetNames: ['Data'],
				Sheets: {Data: {}},
			}),
			utils: {
				sheet_to_json: () => [{a: 1}, {a: 2}],
			},
		};

		const mockAlasql = {
			external: {xlsx: mockXLSX},
		};
		xlsx(mockAlasql);

		const result = mockAlasql.from.XLSX('test.xlsx');
		expect(result).toStrictEqual([{a: 1}, {a: 2}]);
	});

	test('into.XLSX works with mock XLSX library', () => {
		let writtenFile = null;
		const mockXLSX = {
			utils: {
				json_to_sheet: data => ({data}),
				book_new: () => ({sheets: {}}),
				book_append_sheet: (wb, ws, name) => {
					wb.sheets[name] = ws;
				},
			},
			writeFile: (wb, filename) => {
				writtenFile = {wb, filename};
			},
		};

		const mockAlasql = {
			external: {xlsx: mockXLSX},
		};
		xlsx(mockAlasql);

		const data = [{a: 1}, {a: 2}];
		const result = mockAlasql.into.XLSX('output.xlsx', {}, data);

		expect(result).toBe(2);
		expect(writtenFile.filename).toBe('output.xlsx');
	});
});
