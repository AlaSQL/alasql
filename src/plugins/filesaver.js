/**
 * FileSaver plugin for AlaSQL
 * Provides file download functionality for browser environments
 */

/**
 * Register FileSaver plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function filesaver(alasql) {
	// Ensure utils object exists
	if (!alasql.utils) alasql.utils = {};

	/**
	 * Save content as a file download in browser
	 * @param {string} filename - Name of file to save
	 * @param {string|Blob} data - Content to save
	 * @param {string} mimeType - MIME type of content
	 */
	alasql.utils.saveFile = function (filename, data, mimeType) {
		// Check for external FileSaver library
		const FileSaver = alasql.external?.filesaver;
		if (FileSaver?.saveAs) {
			const blob = data instanceof Blob ? data : new Blob([data], {type: mimeType || 'text/plain'});
			FileSaver.saveAs(blob, filename);
			return;
		}

		// Fallback: browser native download
		if (typeof document !== 'undefined') {
			const blob = data instanceof Blob ? data : new Blob([data], {type: mimeType || 'text/plain'});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			return;
		}

		// Node.js environment - use fs if available
		if (typeof require !== 'undefined') {
			try {
				const fs = require('fs');
				fs.writeFileSync(filename, data);
				return;
			} catch (e) {
				// fs not available
			}
		}

		throw new Error('FileSaver: Unable to save file in current environment');
	};

	/**
	 * Load file content
	 * @param {string} filename - Name of file to load
	 * @param {boolean} async - Whether to load asynchronously
	 * @returns {string|Promise<string>}
	 */
	alasql.utils.loadFile = function (filename, async) {
		// Node.js environment
		if (typeof require !== 'undefined') {
			try {
				const fs = require('fs');
				if (async) {
					return new Promise((resolve, reject) => {
						fs.readFile(filename, 'utf8', (err, data) => {
							if (err) reject(err);
							else resolve(data);
						});
					});
				}
				return fs.readFileSync(filename, 'utf8');
			} catch (e) {
				// fs not available
			}
		}

		// Browser environment - use fetch
		if (typeof fetch !== 'undefined') {
			if (async) {
				return fetch(filename).then(r => r.text());
			}
			// Synchronous fetch not supported in browsers
			throw new Error('Synchronous file loading not supported in browser. Use async.');
		}

		throw new Error('loadFile: Unable to load file in current environment');
	};
}
