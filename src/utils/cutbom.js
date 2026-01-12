/**
 * Cut BOM first character for UTF-8 files (for merging two files)
 * @param {string} s - Source string
 * @return {string} String with BOM removed if present
 */
export function cutbom(s) {
	if (s[0] === String.fromCharCode(65279)) {
		s = s.substr(1);
	}
	return s;
}
