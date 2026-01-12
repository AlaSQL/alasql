/**
 * JSON plugin for AlaSQL
 * Provides JSON import/export functionality
 */

/**
 * Register JSON plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function json(alasql) {
	// Ensure from/into objects exist
	if (!alasql.from) alasql.from = {};
	if (!alasql.into) alasql.into = {};

	alasql.from.JSON = function (filename, opts, cb, idx, query) {
		opts = opts || {};

		// Use alasql's file loading if available
		const loadFile = alasql.utils?.loadFile;
		if (!loadFile) {
			throw new Error('JSON plugin requires alasql.utils.loadFile');
		}

		const text = loadFile(filename, false);
		let data = JSON.parse(text);

		// Support path option to extract nested data
		if (opts.path) {
			const path = opts.path.split('.');
			for (const key of path) {
				data = data?.[key];
			}
		}

		// Ensure result is array
		if (!Array.isArray(data)) {
			data = [data];
		}

		if (cb) return cb(data, idx, query);
		return data;
	};

	alasql.into.JSON = function (filename, opts, data, columns, cb) {
		opts = opts || {};

		const text = JSON.stringify(data, null, opts.pretty ? 2 : 0);

		// Use alasql's file saving if available
		const saveFile = alasql.utils?.saveFile;
		if (saveFile) {
			saveFile(filename, text);
		}

		if (cb) return cb(data.length);
		return data.length;
	};
}
