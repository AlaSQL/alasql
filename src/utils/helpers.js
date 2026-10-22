// Stateless helpers, exported for plain imports; install() also puts them on alasql.utils.

export var hash = function (str) {
	var hash = 0x811c9dc5,
		i = str.length;
	while (i) {
		hash ^= str.charCodeAt(--i);
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}
	return hash;
};

/**
  Arrays deep union (with records)
  */
export var arrayUnionDeep = function (a, b) {
	var r = b.slice(0);
	a.forEach(function (ai) {
		var found = false;

		r.forEach(function (ri) {
			//            found = found || equalDeep(ai, ri, true);
			found = found || deepEqual(ai, ri);
		});

		if (!found) {
			r.push(ai);
		}
	});
	return r;
};

/**
  Arrays deep union (with records)
  */
export var arrayExceptDeep = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			//            found = found || equalDeep(ai, bi, true);
			found = found || deepEqual(ai, bi);
		});

		if (!found) {
			r.push(ai);
		}
	});
	return r;
};

/**
  Arrays deep intersect (with records)
  */
export var arrayIntersectDeep = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			//            found = found || equalDeep(ai, bi, true);
			found = found || deepEqual(ai, bi, true);
		});

		if (found) {
			r.push(ai);
		}
	});
	return r;
};

/**
  Deep clone objects
  */
export var cloneDeep = function cloneDeep(obj) {
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

	var temp = new obj.constructor(); // changed

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			temp[key] = cloneDeep(obj[key]);
		}
	}
	return temp;
};

/**
  Compare two objects in deep
  */
export var deepEqual = function (x, y) {
	if (x === y) {
		return true;
	}

	if (typeof x === 'object' && null !== x && typeof y === 'object' && null !== y) {
		if (Object.keys(x).length !== Object.keys(y).length) {
			return false;
		}
		for (var prop in x) {
			if (!deepEqual(x[prop], y[prop])) {
				return false;
			}
		}
		return true;
	}

	return false;
};

// Stateless, exported for plain imports (context/roadmap-phase-1.md); install() puts what was on utils back on utils.

/**
  Convert NaN to undefined
  @function
  @param {string} s JavaScript string to be modified
  @return {string} Covered expression

  @example

  123         => 123
  undefined   => undefined
  NaN         => undefined

  */
export function nanToUndefined(s) {
	//rename for clarity.
	return '(y=' + s + ',y===y?y:undefined)';
}

export var n2u = nanToUndefined; // Alias for backward compatibility

/**
  Return undefined if s undefined
  @param {string} s JavaScript string to be modified
  @return {string} Covered expression

  @example

  123,a       => a
  undefined,a => undefined
  NaN,a       => undefined

  */
export function undefinedOrValue(s, r) {
	//rename for clarity
	return '(y=' + s + ',typeof y=="undefined"?undefined:' + r + ')';
}

export var und = undefinedOrValue; // Alias for backward compatibility

/**
  Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
  @function
  @return {boolean} Always true
  */
export function returnTrue() {
	return true;
}

/**
  Return undefined. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
  @function
  @return {undefined} Always undefined
  */
export function returnUndefined() {}

export var escapeq = function (s) {
	//    console.log(s);
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
};

// Stateless, exported for plain imports (context/roadmap-phase-1.md); install() puts what was on utils back on utils.

/**
  Union arrays
  @function
  @param {array} a
  @param {array} b
  @return {array}
  */
export var arrayUnion = function (a, b) {
	var r = b.slice(0);
	a.forEach(function (i) {
		if (r.indexOf(i) < 0) {
			r.push(i);
		}
	});
	return r;
};

/**
  Array Difference
  */
export var arrayDiff = function (a, b) {
	return a.filter(function (i) {
		return b.indexOf(i) < 0;
	});
};

/**
  Arrays deep intersect (with records)
  */
export var arrayIntersect = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			found = found || ai === bi;
		});

		if (found) {
			r.push(ai);
		}
	});
	return r;
};

// Stateless, exported for plain imports (context/roadmap-phase-1.md); install() puts what was on utils back on utils.

/**
  Array with distinct records
  @param {array} data
  @return {array}
  */
export var distinctArray = function (data) {
	var uniq = {};
	// TODO: Speedup, because Object.keys is slow
	for (var i = 0, ilen = data.length; i < ilen; i++) {
		var uix;
		if (typeof data[i] === 'object') {
			uix = Object.keys(data[i])
				.sort()
				.map(function (k) {
					return k + '`' + data[i][k];
				})
				.join('`');
		} else {
			uix = data[i];
		}
		uniq[uix] = data[i];
	}
	var res = [];
	for (var key in uniq) {
		res.push(uniq[key]);
	}
	return res;
};

/**
  Extend object a with properties of b
  @function
  @param {object} a
  @param {object} b
  @return {object}
  */
export var extend = function extend(a, b) {
	a = a || {};
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
};

/**
  Double quotes for SQL statements
  @param {string} s Source string
  @return {string} Escaped string

  @example

  Piter's => Piter''s

  */
export var escapeqq = function (s) {
	return s.replace(/(\')/g, "''");
};

export default function install(alasql) {
	/*jshint unused:false*/
	/*
	Utilities for Alasql.js

	@todo Review the list of utilities
	@todo Find more effective utilities
*/

	/**
 Alasql utility functions
 @type {object}
 */
	var utils = (alasql.utils = {});
	utils.extend = extend;
	utils.distinctArray = distinctArray;
	utils.undoubleq = escapeqq;
	utils.arrayUnion = arrayUnion;
	utils.arrayDiff = arrayDiff;
	utils.arrayIntersect = arrayIntersect;
	utils.escapeq = escapeq;
	utils.hash = hash;
	utils.arrayUnionDeep = arrayUnionDeep;
	utils.arrayExceptDeep = arrayExceptDeep;
	utils.arrayIntersectDeep = arrayIntersectDeep;
	utils.cloneDeep = cloneDeep;
	utils.deepEqual = deepEqual;

	/**
  Escape string
  @function
  @param {string} s Source string
  @return {string} Escaped string
  @example

  Pit\er's => Pit\\er\'s

  */
	// based on joliss/js-string-escape

	/**
  Replace double quotes with single quote
  @param {string} s Source string
  @return {string} Replaced string
  @example

  Piter''s => Piter's

  */
	var doubleq = (utils.doubleq = function (s) {
		return s.replace(/(\'\')/g, "\\'");
	});

	/**
  Replace single quote with escaped single quote
  @param {string} s Source string
  @return {string} Replaced string

  @todo Check this function
*/
	var doubleqq = (utils.doubleqq = function (s) {
		return s.replace(/'/g, "\\'");
	});

	/**
  @function Hash a string to signed integer
  @param {string} source string
  @return {integer} hash number
  */

	// FNV-1a inspired hashing

	/**
  Check equality of objects
  */

	/*/*
 var equalDeep = utils.equalDeep = function equalDeep (x, y, deep) {
	 if (deep) {
		 if (x === y){
			 return true;
		 }

		 var p;
		 for (p in y) {
			 if (typeof (x[p]) === 'undefined') { return false; }
		 }

		 for (p in y) {
			 if (y[p]) {
				 switch (typeof (y[p])) {
					 case 'object':
						 if (!equalDeep(y[p],x[p])) { return false; } break;
					 case 'function':
						 if (
								 typeof (x[p]) === 'undefined' ||
								 (p !== 'equals' && y[p].toString() !== x[p].toString())
							 ){
								 return false;
							 }
						 break;
					 default:
						 if (y[p] !== x[p]) { return false; }
				 }
			 } else {
				 if (x[p]){
					 return false;
				 }
			 }
		 }

		 for (p in x) {
			 if (typeof (y[p]) === 'undefined') { return false; }
		 }

		 return true;
	 }
	 return x === y;
 };
 */

	/**
	 * Extracts the primitive data
	 */
	var getValueOf = (utils.getValueOf = function (val) {
		return typeof val === 'object' && (val instanceof String || val instanceof Number)
			? val.valueOf()
			: val;
	});

	/**
  Flat array by first row
  */
	var flatArray = (utils.flatArray = function (a) {
		//console.log(684,a);
		if (!a || 0 === a.length) {
			return [];
		}

		// For recordsets
		if (typeof a === 'object' && a instanceof alasql.Recordset) {
			return a.data.map(function (ai) {
				return getValueOf(ai[a.columns[0].columnid]);
			});
		}
		// Else for other arrays
		var key = Object.keys(a[0])[0];
		if (key === undefined) {
			return [];
		}
		return a.map(function (ai) {
			return ai[key];
		});
	});

	/**
  Convert array of objects to array of arrays
  */
	var arrayOfArrays = (utils.arrayOfArrays = function (a) {
		return a.map(function (aa) {
			var ar = [];
			for (var key in aa) {
				ar.push(aa[key]);
			}
			return ar;
		});
	});

	if (!Array.isArray) {
		Array.isArray = function (arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}

	/**
  Excel:convert number to Excel column, like 1 => 'A'
  @param {integer} i Column number, starting with 0
  @return {string} Column name, starting with 'A'
  */

	var xlsnc = (utils.xlsnc = function (i) {
		var first = '';
		if (i > 701) {
			let x = (((i - 26) / (26 * 26)) | 0) - 1;
			first = String.fromCharCode(65 + (x % 26));
			i = i % (26 * 26);
		}
		var addr = String.fromCharCode(65 + (i % 26));
		if (i >= 26) {
			i = ((i / 26) | 0) - 1;
			addr = String.fromCharCode(65 + (i % 26)) + addr;
			if (i > 26) {
				i = ((i / 26) | 0) - 1;
				addr = String.fromCharCode(65 + (i % 26)) + addr;
			}
		}
		return first + addr;
	});

	/**
  Excel:conver Excel column name to number
  @param {string} s Column number, like 'A' or 'BE'
  @return {string} Column name, starting with 0
  */
	var xlscn = (utils.xlscn = function (s) {
		var n = s.charCodeAt(0) - 65;
		if (s.length > 1) {
			n = (n + 1) * 26 + s.charCodeAt(1) - 65;
			//        console.log(n, s.charCodeAt(0)-65, s.charCodeAt(1)-65);
			if (s.length > 2) {
				n = (n + 1) * 26 + s.charCodeAt(2) - 65;
			}
		}
		return n;
	});

	var domEmptyChildren = (utils.domEmptyChildren = function (container) {
		var len = container.childNodes.length;
		while (len--) {
			container.removeChild(container.lastChild);
		}
	});

	/**
  SQL LIKE emulation
  @parameter {string} pattern Search pattern
  @parameter {string} value Searched value
  @parameter {string} escape Escape character (optional)
  @return {boolean} If value LIKE pattern ESCAPE escape
  */

	/* * Tests if a given value matches a pattern with optional escape character.
	 * Supports SQL-like syntax with % and _ as wildcards and custom escape character.
	 */
	var patternCache = new Map(); // escape character -> pattern -> RegExp
	var like = (utils.like = function (pattern, value, escape = '') {
		var cache = patternCache.get(escape);
		if (!cache) patternCache.set(escape, (cache = new Map()));
		var re = cache.get(pattern);
		if (!re) {
			var regexStr = '^'; // Start regex pattern to match from the beginning.
			var i = 0; // Index for traversing the pattern string.

			while (i < pattern.length) {
				var currentChar = pattern[i];
				var nextChar = i < pattern.length - 1 ? pattern[i + 1] : '';

				// Handle escape character.
				if (currentChar === escape) {
					regexStr += '\\' + nextChar;
					i++; // Skip next character as it's escaped.
				}
				// Handle negation within character classes.
				else if (currentChar === '[' && nextChar === '^') {
					regexStr += '[^';
					i++; // Include '^' as part of the set.
				}
				// Directly append square brackets.
				else if (currentChar === '[' || currentChar === ']') {
					regexStr += currentChar;
				}
				// Replace '%' with regex to match any character sequence.
				else if (currentChar === '%') {
					regexStr += '[\\s\\S]*';
				}
				// Replace '_' with regex to match any single character.
				else if (currentChar === '_') {
					regexStr += '.';
				}
				// Escape special regex characters.
				else if ('/.*+?|(){}'.indexOf(currentChar) > -1) {
					regexStr += '\\' + currentChar;
				}
				// Append literal characters.
				else {
					regexStr += currentChar;
				}
				i++;
			}

			regexStr += '$'; // End regex pattern to match until the end.
			// Compile and cache the regex pattern for future use.
			re = RegExp(regexStr, 'i');
			cache.set(pattern, re);
		}

		// Convert value to string (handling null/undefined) and test against compiled pattern.
		return ('' + (value ?? '')).search(re) > -1;
	});

	/**
	 * Tests if a given value matches a glob pattern.
	 * The function supports '*', '?' as wildcards where '*' matches any sequence of characters,
	 * and '?' matches any single character. Square brackets can be used for character sets and ranges.
	 *
	 * @param {string} value - The string value to test against the glob pattern.
	 * @param {string} pattern - The glob pattern to match the value against.
	 * @returns {boolean} - True if the value matches the pattern, false otherwise.
	 */
	utils.glob = function (value, pattern) {
		var currentIndex = 0; // Index for traversing the pattern string.
		var regexPattern = '^'; // Start regex pattern to match from the beginning.

		while (currentIndex < pattern.length) {
			var currentChar = pattern[currentIndex];
			var nextChar = currentIndex < pattern.length - 1 ? pattern[currentIndex + 1] : '';

			// Handle character sets and negation within them.
			if (currentChar === '[' && nextChar === '^') {
				regexPattern += '[^';
				currentIndex++; // Include '^' as part of the set.
			} else if (currentChar === '[' || currentChar === ']') {
				// Directly append square brackets.
				regexPattern += currentChar;
			} else if (currentChar === '*') {
				// Replace '*' with regex to match any character sequence.
				regexPattern += '.*';
			} else if (currentChar === '?') {
				// Replace '?' with regex to match any single character.
				regexPattern += '.';
			} else if ('/.*+?|(){}'.indexOf(currentChar) > -1) {
				// Escape special regex characters.
				regexPattern += '\\' + currentChar;
			} else {
				// Append literal characters.
				regexPattern += currentChar;
			}
			currentIndex++;
		}

		regexPattern += '$'; // End regex pattern to match until the end.

		// Convert value to uppercase, compile the regex pattern in uppercase to perform a case-insensitive match.
		return ('' + (value || '')).toUpperCase().search(RegExp(regexPattern.toUpperCase())) > -1;
	};

	/**
	 * Type converter regex patterns
	 */
	var reTypeConverter = {
		str: /string|char$|text/i,
		int: /^int|int$/i,
		num: /float|double|real|^num|decimal|money/i,
		bool: /^bool/i,
		date: /^date|^time/i,
	};

	/**
	 * Convert a value to the appropriate type based on column definition
	 * @param {*} value - The value to convert
	 * @param {string} dbtypeid - The database type (INT, FLOAT, STRING, etc.)
	 * @return {*} The converted value
	 */
	utils.typeConverter = function (value, dbtypeid) {
		// If value is null or undefined, return as is
		if (value === null || value === undefined) {
			return value;
		}

		// If no type specified, try to auto-convert if it looks like a number
		if (!dbtypeid) {
			if (alasql.options.csvStringToNumber && typeof value === 'string' && value.length > 0) {
				if (value == +value) {
					return +value;
				}
			}
			return value;
		}

		// Check type using regex patterns
		if (reTypeConverter.str.test(dbtypeid)) {
			return String(value);
		}
		if (reTypeConverter.int.test(dbtypeid)) {
			var intVal = parseInt(value, 10);
			return isNaN(intVal) ? value : intVal;
		}
		if (reTypeConverter.num.test(dbtypeid)) {
			var numVal = parseFloat(value);
			return isNaN(numVal) ? value : numVal;
		}
		if (reTypeConverter.bool.test(dbtypeid)) {
			if (typeof value === 'string') {
				return /^(true|1|yes)$/i.test(value);
			}
			return Boolean(value);
		}
		if (reTypeConverter.date.test(dbtypeid)) {
			return value instanceof Date ? value : new Date(value);
		}

		// Unknown type, return as is
		return value;
	};
}
