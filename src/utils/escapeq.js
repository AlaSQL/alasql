/**
 * Escape string for use in JavaScript strings
 * Based on joliss/js-string-escape
 * @param {string} s - Source string
 * @return {string} Escaped string
 * @example
 * escapeq("Pit\\er's") => "Pit\\\\er\\'s"
 */
export function escapeq(s) {
	return ('' + s).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
		// Escape all characters not included in SingleStringCharacters and
		// DoubleStringCharacters on
		// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
		switch (character) {
			case '"':
			case "'":
			case '\\':
				return '\\' + character;
			// Four possible LineTerminator characters need to be escaped:
			case '\n':
				return '\\n';
			case '\r':
				return '\\r';
			case '\u2028':
				return '\\u2028';
			case '\u2029':
				return '\\u2029';
		}
	});
}
