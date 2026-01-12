/**
 * UPPER function - converts string to uppercase
 * @param {object} alasql - The alasql instance
 */
export function upper(alasql) {
	alasql.stdfn.UPPER = function (s) {
		return s === null ? null : String(s).toUpperCase();
	};
}
