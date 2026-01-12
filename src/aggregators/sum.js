/**
 * SUM aggregator - sums numeric values
 * @param {object} alasql - The alasql instance
 */
export function sum(alasql) {
	alasql.aggr.SUM = function (value, accumulator, stage) {
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
			// Handle BigInt
			if (typeof accumulator === 'bigint' || typeof value === 'bigint') {
				return BigInt(accumulator) + BigInt(value);
			}
			return accumulator + value;
		}
		// Stage 3: Finalize
		return accumulator;
	};
}
