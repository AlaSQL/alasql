// Barrel export for aggregators
export {sum} from './sum.js';
export {avg} from './avg.js';
export {count} from './count.js';
export {min} from './min.js';
export {max} from './max.js';
export {first} from './first.js';
export {last} from './last.js';
export {array} from './array.js';

// Import for registration
import {sum} from './sum.js';
import {avg} from './avg.js';
import {count} from './count.js';
import {min} from './min.js';
import {max} from './max.js';
import {first} from './first.js';
import {last} from './last.js';
import {array} from './array.js';

/**
 * Register all standard aggregators with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerAggregators(alasql) {
	// Ensure aggr object exists
	if (!alasql.aggr) {
		alasql.aggr = {};
	}

	sum(alasql);
	avg(alasql);
	count(alasql);
	min(alasql);
	max(alasql);
	first(alasql);
	last(alasql);
	array(alasql);
}
