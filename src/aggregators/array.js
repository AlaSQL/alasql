/**
 * ARRAY aggregator - collects values into an array
 * @param {object} alasql - The alasql instance
 */
export function array(alasql) {
	alasql.aggr.ARRAY = function (value, accumulator, stage) {
		if (stage === 1) {
			// Initialize
			return [value];
		}
		if (stage === 2) {
			// Accumulate
			accumulator.push(value);
			return accumulator;
		}
		// Stage 3: Finalize
		return accumulator;
	};
}
