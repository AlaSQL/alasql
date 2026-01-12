/**
 * ROUND function - rounds number to specified precision
 * @param {object} alasql - The alasql instance
 */
export function round(alasql) {
	alasql.stdfn.ROUND = function (n, precision) {
		if (n === null) return null;
		if (precision === undefined) precision = 0;
		const factor = Math.pow(10, precision);
		return Math.round(n * factor) / factor;
	};
}
