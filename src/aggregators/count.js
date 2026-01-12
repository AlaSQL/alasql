/**
 * COUNT aggregator - counts rows/values
 * @param {object} alasql - The alasql instance
 */
export function count(alasql) {
	alasql.aggr.COUNT = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			return value !== null && value !== undefined ? 1 : 0;
		}
		if (stage === 2) {
			// Accumulate
			return accumulator + (value !== null && value !== undefined ? 1 : 0);
		}
		// Stage 3: Finalize
		return accumulator || 0;
	};
}
