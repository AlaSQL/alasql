/**
 * XLSX plugin for AlaSQL
 * Provides Excel import/export functionality via xlsx library
 */

/**
 * Register XLSX plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function xlsx(alasql) {
	// Ensure from/into objects exist
	if (!alasql.from) alasql.from = {};
	if (!alasql.into) alasql.into = {};

	alasql.from.XLSX = function (filename, opts, cb, idx, query) {
		const XLSX = alasql.external?.xlsx;
		if (!XLSX) {
			throw new Error(
				'XLSX library not provided.\n' +
					'Usage:\n' +
					'  import * as XLSX from "xlsx";\n' +
					'  alasql.use({ xlsx: XLSX });'
			);
		}

		opts = opts || {};
		const workbook = XLSX.readFile(filename);
		const sheetName = opts.sheet || workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const data = XLSX.utils.sheet_to_json(sheet, opts);

		if (cb) return cb(data, idx, query);
		return data;
	};

	alasql.into.XLSX = function (filename, opts, data, columns, cb) {
		const XLSX = alasql.external?.xlsx;
		if (!XLSX) {
			throw new Error('XLSX library not provided');
		}

		opts = opts || {};
		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, opts.sheet || 'Sheet1');
		XLSX.writeFile(wb, filename);

		if (cb) return cb(data.length);
		return data.length;
	};
}
