/**
 * AlaSQL Plugins barrel export
 * All plugins use dependency injection pattern via alasql.use()
 */

export {csv, parseCSV, toCSV} from './csv.js';
export {xlsx} from './xlsx.js';
export {json} from './json.js';
export {indexeddb} from './indexeddb.js';
export {localstorage} from './localstorage.js';
export {filesaver} from './filesaver.js';

/**
 * Register common plugins (those without external dependencies)
 * @param {object} alasql - The alasql instance
 */
export function registerCommonPlugins(alasql) {
	// Import and register plugins that don't require external libs
	csv(alasql);
	json(alasql);
	filesaver(alasql);
	// Note: xlsx, indexeddb, localstorage require specific environments/dependencies
}

// Re-import for registerCommonPlugins
import {csv} from './csv.js';
import {json} from './json.js';
import {filesaver} from './filesaver.js';
