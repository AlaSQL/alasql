/**
 * CSV plugin for AlaSQL
 * Provides CSV import/export functionality
 */

/**
 * Parse CSV text into array of objects
 * @param {string} text - CSV text content
 * @param {string} separator - Field separator
 * @param {boolean} hasHeaders - Whether first row is headers
 * @returns {Array<Object>}
 */
function parseCSV(text, separator, hasHeaders) {
	const lines = text.split(/\r?\n/).filter(l => l.trim());
	if (lines.length === 0) return [];

	const headers = hasHeaders
		? lines[0].split(separator).map(h => h.trim())
		: lines[0].split(separator).map((_, i) => `col${i}`);

	const startLine = hasHeaders ? 1 : 0;
	return lines.slice(startLine).map(line => {
		const values = line.split(separator);
		const row = {};
		headers.forEach((h, i) => {
			row[h] = values[i]?.trim();
		});
		return row;
	});
}

/**
 * Convert data array to CSV string
 * @param {Array<Object>} data - Data to convert
 * @param {Array<string>} columns - Column names
 * @param {string} separator - Field separator
 * @returns {string}
 */
function toCSV(data, columns, separator) {
	if (data.length === 0) return '';

	const headers = columns || Object.keys(data[0]);
	const lines = [headers.join(separator)];

	for (const row of data) {
		const values = headers.map(h => {
			const v = row[h];
			if (v === null || v === undefined) return '';
			if (typeof v === 'string' && v.includes(separator)) {
				return `"${v.replace(/"/g, '""')}"`;
			}
			return String(v);
		});
		lines.push(values.join(separator));
	}

	return lines.join('\n');
}

/**
 * Register CSV plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function csv(alasql) {
	// Ensure from/into objects exist
	if (!alasql.from) alasql.from = {};
	if (!alasql.into) alasql.into = {};

	alasql.from.CSV = function (filename, opts, cb, idx, query) {
		opts = opts || {};
		const separator = opts.separator || ',';
		const headers = opts.headers !== false;

		// Use alasql's file loading if available
		const loadFile = alasql.utils?.loadFile;
		if (!loadFile) {
			throw new Error('CSV plugin requires alasql.utils.loadFile');
		}

		const text = loadFile(filename, false);
		const data = parseCSV(text, separator, headers);

		if (cb) return cb(data, idx, query);
		return data;
	};

	alasql.into.CSV = function (filename, opts, data, columns, cb) {
		opts = opts || {};
		const separator = opts.separator || ',';

		const text = toCSV(data, columns, separator);

		// Use alasql's file saving if available
		const saveFile = alasql.utils?.saveFile;
		if (saveFile) {
			saveFile(filename, text);
		}

		if (cb) return cb(data.length);
		return data.length;
	};

	// Export helper functions for testing
	alasql.csv = {
		parse: parseCSV,
		stringify: toCSV,
	};
}

export {parseCSV, toCSV};
