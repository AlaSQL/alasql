/**
 * FIRST aggregator - returns first value encountered
 * @param {object} alasql - The alasql instance
 */
export function first(alasql) {
	alasql.aggr.FIRST = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			return value;
		}
		if (stage === 2) {
			// Accumulate - keep the first value
			return accumulator;
		}
		// Stage 3: Finalize
		return accumulator;
	};
}
