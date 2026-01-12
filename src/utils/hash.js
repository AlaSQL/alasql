/**
 * Hash a string to signed integer
 * FNV-1a inspired hashing
 * @param {string} str - Source string
 * @return {number} Hash number
 */
export function hash(str) {
	var hash = 0x811c9dc5,
		i = str.length;
	while (i) {
		hash ^= str.charCodeAt(--i);
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}
	return hash;
}
