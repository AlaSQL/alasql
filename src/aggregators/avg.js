/**
 * AVG aggregator - calculates average of numeric values
 * @param {object} alasql - The alasql instance
 */
export function avg(alasql) {
	alasql.aggr.AVG = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			if (value === undefined || value === null) {
				return {sum: 0, count: 0};
			}
			return {sum: value, count: 1};
		}
		if (stage === 2) {
			// Accumulate
			if (value !== undefined && value !== null) {
				return {
					sum: accumulator.sum + value,
					count: accumulator.count + 1,
				};
			}
			return accumulator;
		}
		// Stage 3: Finalize
		if (!accumulator || accumulator.count === 0) {
			return null;
		}
		return accumulator.sum / accumulator.count;
	};
}
