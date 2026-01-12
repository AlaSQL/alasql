// Barrel export for standard functions
export {upper} from './upper.js';
export {lower} from './lower.js';
export {abs} from './abs.js';
export {round} from './round.js';
export {coalesce} from './coalesce.js';

// Import for registration
import {upper} from './upper.js';
import {lower} from './lower.js';
import {abs} from './abs.js';
import {round} from './round.js';
import {coalesce} from './coalesce.js';

/**
 * Register all standard functions with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerStandardFunctions(alasql) {
	// Ensure stdfn object exists
	if (!alasql.stdfn) {
		alasql.stdfn = {};
	}

	upper(alasql);
	lower(alasql);
	abs(alasql);
	round(alasql);
	coalesce(alasql);
}
