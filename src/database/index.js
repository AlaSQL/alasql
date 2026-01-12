// Barrel export for database module
export {Database, registerDatabase} from './Database.js';
export {Table, registerTable} from './Table.js';
export {View, registerView} from './View.js';

// Import for registration function
import {registerDatabase} from './Database.js';
import {registerTable} from './Table.js';
import {registerView} from './View.js';

/**
 * Register all database classes with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerDatabaseModule(alasql) {
	registerDatabase(alasql);
	registerTable(alasql);
	registerView(alasql);
}
