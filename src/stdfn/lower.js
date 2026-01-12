/**
 * LOWER function - converts string to lowercase
 * @param {object} alasql - The alasql instance
 */
export function lower(alasql) {
	alasql.stdfn.LOWER = function (s) {
		return s === null ? null : String(s).toLowerCase();
	};
}
