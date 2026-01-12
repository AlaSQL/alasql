/**
 * MAX aggregator - finds maximum value
 * @param {object} alasql - The alasql instance
 */
export function max(alasql) {
	alasql.aggr.MAX = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			return value;
		}
		if (stage === 2) {
			// Accumulate
			if (accumulator === undefined || accumulator === null) {
				return value;
			}
			if (value === undefined || value === null) {
				return accumulator;
			}
			return value > accumulator ? value : accumulator;
		}
		// Stage 3: Finalize
		return accumulator;
	};
}
