/**
 * Deep clone objects
 */
export function cloneDeep(obj) {
	if (null === obj || typeof obj !== 'object') {
		return obj;
	}

	if (obj instanceof Date) {
		return new Date(obj);
	}

	if (obj instanceof String) {
		return obj.toString();
	}

	if (obj instanceof Number) {
		return +obj;
	}

	var temp = new obj.constructor();

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			temp[key] = cloneDeep(obj[key]);
		}
	}
	return temp;
}

// Alias for backwards compatibility
export const clone = cloneDeep;
