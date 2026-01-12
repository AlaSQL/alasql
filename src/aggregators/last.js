/**
 * LAST aggregator - returns last value encountered
 * @param {object} alasql - The alasql instance
 */
export function last(alasql) {
	alasql.aggr.LAST = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			return value;
		}
		if (stage === 2) {
			// Accumulate - always update to new value
			return value;
		}
		// Stage 3: Finalize
		return accumulator;
	};
}
