/**
 * COALESCE function - returns first non-null value
 * @param {object} alasql - The alasql instance
 */
export function coalesce(alasql) {
	alasql.stdfn.COALESCE = function (...args) {
		for (const arg of args) {
			if (arg !== null && arg !== undefined) {
				return arg;
			}
		}
		return null;
	};
}
