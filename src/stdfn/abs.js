/**
 * ABS function - returns absolute value
 * @param {object} alasql - The alasql instance
 */
export function abs(alasql) {
	alasql.stdfn.ABS = function (n) {
		return n === null ? null : Math.abs(n);
	};
}
