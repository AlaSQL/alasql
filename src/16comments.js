/**
	  Strip all comments.
	  @function
	  @param {string} str
	  @return {string}
	  Based om the https://github.com/lehni/uncomment.js/blob/master/uncomment.js
	  I just replaced JavaScript's '//' to SQL's '--' and remove other stuff

	  @todo Fixed [aaa/*bbb] for column names
	  @todo Bug if -- comments in the last line
	@todo Check if it possible to model it with Jison parser
	@todo Remove unused code
 */

/* global alasql */

alasql.utils.uncomment = function (str) {
	// Add some padding so we can always look ahead and behind by two chars
	str = ('__' + str + '__').split('');
	var quote = false,
		quoteSign,
		// regularExpression = false,
		// characterClass = false,
		blockComment = false,
		lineComment = false;
	// preserveComment = false;

	for (var i = 0, l = str.length; i < l; i++) {
		// When checking for quote escaping, we also need to check that the
		// escape sign itself is not escaped, as otherwise '\\' would cause
		// the wrong impression of an unclosed string:
		var unescaped = str[i - 1] !== '\\' || str[i - 2] === '\\';

		if (quote) {
			if (str[i] === quoteSign && unescaped) {
				quote = false;
			}
		} else if (blockComment) {
			// Is the block comment closing?
			if (str[i] === '*' && str[i + 1] === '/') {
				// if (!preserveComment)
				str[i] = str[i + 1] = '';
				blockComment /* = preserveComment*/ = false;
				// Increase by 1 to skip closing '/', as it would be mistaken
				// for a regexp otherwise
				i++;
			} else {
				//if (!preserveComment) {
				str[i] = '';
			}
		} else if (lineComment) {
			// One-line comments end with the line-break
			if (str[i + 1] === '\n' || str[i + 1] === '\r' || str.length - 2 === i) {
				lineComment = false;
			}
			str[i] = '';
		} else {
			if (str[i] === '"' || str[i] === "'") {
				quote = true;
				quoteSign = str[i];
			} else if (str[i] === '[' && str[i - 1] !== '@') {
				quote = true;
				quoteSign = ']';
			} else if (str[i] === '-' && str[i + 1] === '-') {
				str[i] = '';
				lineComment = true;
			} else if (str[i] === '/' && str[i + 1] === '*') {
				// Do not filter out conditional comments /*@ ... */
				// and comments marked as protected /*! ... */
				//					preserveComment = /[@!]/.test(str[i + 2]);
				//					if (!preserveComment)
				str[i] = '';
				blockComment = true;
			}
		}
	}
	// Remove padding again.
	str = str.join('').slice(2, -2);

	return str;
};
