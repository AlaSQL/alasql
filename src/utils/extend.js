/**
 * Extend object a with properties of b
 * @param {object} a - Target object (will be modified)
 * @param {object} b - Source object
 * @return {object} The extended object a
 */
export function extend(a, b) {
	a = a || {};
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}
