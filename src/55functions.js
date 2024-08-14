/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.FuncValue = function (params) {
	return Object.assign(this, params);
};

let re_invalidFnNameChars = /[^0-9A-Z_$]+/i;
yy.FuncValue.prototype.toString = function () {
	let s = '';

	if (alasql.fn[this.funcid]) s += this.funcid;
	else if (alasql.aggr[this.funcid]) s += this.funcid;
	else if (alasql.stdlib[this.funcid.toUpperCase()] || alasql.stdfn[this.funcid.toUpperCase()])
		s += this.funcid.toUpperCase().replace(re_invalidFnNameChars, '');

	if (this.funcid !== 'CURRENT_TIMESTAMP') {
		s += '(';
		if (this.args && this.args.length > 0) {
			s += this.args
				.map(function (arg) {
					return arg.toString();
				})
				.join(',');
		}
		s += ')';
	}
	return s;
};

yy.FuncValue.prototype.execute = function (databaseid, params, cb) {
	let res = 1;
	alasql.precompile(this, databaseid, params); // Precompile queries
	//	console.log(34,this.toJS('','',null));
	let expr = new Function('params,alasql', 'var y;return ' + this.toJS('', '', null));
	expr(params, alasql);
	if (cb) res = cb(res);
	return res;
};

yy.FuncValue.prototype.findAggregator = function (query) {
	if (this.args && this.args.length > 0) {
		this.args.forEach(function (arg) {
			if (arg.findAggregator) arg.findAggregator(query);
		});
	}
};

yy.FuncValue.prototype.toJS = function (context, tableid, defcols) {
	var s = '';
	var funcid = this.funcid;
	// IF this is standard compile functions
	if (!alasql.fn[funcid] && alasql.stdlib[funcid.toUpperCase()]) {
		if (this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid.toUpperCase()].apply(
				this,
				this.args.map(function (arg) {
					return arg.toJS(context, tableid);
				})
			);
		} else {
			s += alasql.stdlib[funcid.toUpperCase()]();
		}
	} else if (!alasql.fn[funcid] && alasql.stdfn[funcid.toUpperCase()]) {
		if (this.newid) s += 'new ';
		s += 'alasql.stdfn[' + JSON.stringify(this.funcid.toUpperCase()) + '](';
		if (this.args && this.args.length > 0) {
			s += this.args
				.map(function (arg) {
					return arg.toJS(context, tableid, defcols);
				})
				.join(',');
		}
		s += ')';
	} else {
		// This is user-defined run-time function
		// TODO arguments!!!
		//		var s = '';
		if (this.newid) s += 'new ';
		s += 'alasql.fn[' + JSON.stringify(this.funcid) + '](';
		if (this.args && this.args.length > 0) {
			s += this.args
				.map(function (arg) {
					return arg.toJS(context, tableid, defcols);
				})
				.join(',');
		}
		s += ')';
	}
	return s;
};
/*
//
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

// IMPORTANT: These are compiled functions

//alasql.fn = {}; // Keep for compatibility
//alasql.userlib = alasql.fn;
*/

var stdlib = (alasql.stdlib = {});
var stdfn = (alasql.stdfn = {});

stdlib.ABS = function (a) {
	return 'Math.abs(' + a + ')';
};
stdlib.CLONEDEEP = function (a) {
	return 'alasql.utils.cloneDeep(' + a + ')';
};

stdfn.CONCAT = function () {
	return Array.prototype.slice.call(arguments).join('');
};
stdlib.EXP = function (a) {
	return 'Math.pow(Math.E,' + a + ')';
};

stdlib.IIF = function (a, b, c) {
	if (arguments.length === 3) {
		return `((${a}) ? (${b}) : (${c}))`;
	} else {
		throw new Error('Number of arguments of IFF is not equals to 3');
	}
};
stdlib.IFNULL = function (a, b) {
	return `((typeof ${a} === "undefined" || ${a} === null) ? ${b} : ${a})`;
};
stdlib.INSTR = function (s, p) {
	return `((${s}).indexOf(${p}) + 1)`;
};

//stdlib.LEN = stdlib.LENGTH = function(s) {return '('+s+'+"").length';};

stdlib.LEN = stdlib.LENGTH = function (s) {
	return und(s, 'y.length');
};
//stdlib.LENGTH = function(s) {return '('+s+').length'};

stdlib.LOWER = stdlib.LCASE = function (s) {
	return und(s, 'String(y).toLowerCase()');
};
//stdlib.LCASE = function(s) {return '('+s+').toLowerCase()';}

// Returns a character expression after it removes leading blanks.
// see https://docs.microsoft.com/en-us/sql/t-sql/functions/ltrim-transact-sql
stdlib.LTRIM = function (s) {
	return und(s, 'y.replace(/^[ ]+/,"")');
};

// Returns a character string after truncating all trailing spaces.
// see https://docs.microsoft.com/en-us/sql/t-sql/functions/rtrim-transact-sql
stdlib.RTRIM = function (s) {
	return und(s, 'y.replace(/[ ]+$/,"")');
};

stdlib.MAX = stdlib.GREATEST = function () {
	return (
		'[' +
		Array.prototype.join.call(arguments, ',') +
		'].reduce(function (a, b) { return a > b ? a : b; })'
	);
};

stdlib.MIN = stdlib.LEAST = function () {
	return (
		'[' +
		Array.prototype.join.call(arguments, ',') +
		'].reduce(function (a, b) { return a < b ? a : b; })'
	);
};

stdlib.SUBSTRING =
	stdlib.SUBSTR =
	stdlib.MID =
		function (a, b, c) {
			if (arguments.length == 2) return und(a, 'y.substr(' + b + '-1)');
			else if (arguments.length == 3) return und(a, 'y.substr(' + b + '-1,' + c + ')');
		};

stdfn.REGEXP_LIKE = function (a, b, c) {
	//	console.log(a,b,c);
	return (a || '').search(RegExp(b, c)) > -1;
};

// Here we uses undefined instead of null
stdlib.ISNULL = stdlib.NULLIF = function (a, b) {
	return '(' + a + '==' + b + '?undefined:' + a + ')';
};

stdlib.POWER = function (a, b) {
	return 'Math.pow(' + a + ',' + b + ')';
};

stdlib.RANDOM = function (r) {
	if (arguments.length == 0) {
		return 'Math.random()';
	} else {
		return '(Math.random()*(' + r + ')|0)';
	}
};
stdlib.ROUND = function (s, d) {
	if (arguments.length == 2) {
		return 'Math.round((' + s + ')*Math.pow(10,(' + d + ')))/Math.pow(10,(' + d + '))';
	} else {
		return 'Math.round(' + s + ')';
	}
};
stdlib.CEIL = stdlib.CEILING = function (s) {
	return 'Math.ceil(' + s + ')';
};
stdlib.FLOOR = function (s) {
	return 'Math.floor(' + s + ')';
};

stdlib.ROWNUM = function () {
	return '1';
};
stdlib.ROW_NUMBER = function () {
	return '1';
};

stdlib.SQRT = function (s) {
	return 'Math.sqrt(' + s + ')';
};

stdlib.TRIM = function (s) {
	return und(s, 'y.trim()');
};

stdlib.UPPER = stdlib.UCASE = function (s) {
	return und(s, 'String(y).toUpperCase()');
};

// Concatination of strings
stdfn.CONCAT_WS = function () {
	var args = Array.prototype.slice.call(arguments);
	args = args.filter(x => !(x === null || typeof x === 'undefined'));
	return args.slice(1, args.length).join(args[0] || '');
};

//stdlib.UCASE = function(s) {return '('+s+').toUpperCase()';}
//REPLACE
// RTRIM
// SUBSTR
// TRIM
//REPLACE
// RTRIM
// SUBSTR
// TRIM

// Aggregator for joining strings
alasql.aggr.group_concat = alasql.aggr.GROUP_CONCAT = function (v, s, stage) {
	if (stage === 1) {
		return '' + v;
	} else if (stage === 2) {
		s += ',' + v;
		return s;
	}
	return s;
};

alasql.aggr.median = alasql.aggr.MEDIAN = function (v, s, stage) {
	if (stage === 2) {
		if (v !== null) {
			s.push(v);
		}
		return s;
	}

	if (stage === 1) {
		if (v === null) {
			return [];
		}
		return [v];
	}

	if (!s.length) {
		return null;
	}

	let r = s.sort((a, b) => {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	});

	let middle = (r.length + 1) / 2;
	let middleFloor = middle | 0;
	let el = r[middleFloor - 1];

	if (middle === middleFloor || (typeof el !== 'number' && !(el instanceof Number))) {
		return el;
	} else {
		return (el + r[middleFloor]) / 2;
	}
};

alasql.aggr.QUART = function (v, s, stage, nth) {
	//Quartile (first quartile per default or input param)
	if (stage === 2) {
		if (v !== null) {
			s.push(v);
		}
		return s;
	}

	if (stage === 1) {
		if (v === null) {
			return [];
		}
		return [v];
	}
	if (!s.length) {
		return s;
	}

	nth = !nth ? 1 : nth;
	var r = s.sort(function (a, b) {
		if (a === b) return 0;

		if (a > b) return 1;

		return -1;
	});

	let p = (nth * (r.length + 1)) / 4;

	if (Number.isInteger(p)) {
		return r[p - 1]; //Integer value
	}

	return r[Math.floor(p)]; //Math.ceil -1 or Math.floor
};

alasql.aggr.QUART2 = function (v, s, stage) {
	//Second Quartile
	return alasql.aggr.QUART(v, s, stage, 2);
};
alasql.aggr.QUART3 = function (v, s, stage) {
	//Third Quartile
	return alasql.aggr.QUART(v, s, stage, 3);
};

// Standard deviation
alasql.aggr.VAR = function (v, s, stage) {
	if (stage === 1) {
		// Initialise sum, sum of squares, and count
		return v === null ? {sum: 0, sumSq: 0, count: 0} : {sum: v, sumSq: v * v, count: 1};
	} else if (stage === 2) {
		// Update sum, sum of squares, and count
		if (v !== null) {
			s.sum += v;
			s.sumSq += v * v;
			s.count++;
		}
		return s;
	} else {
		// Calculate variance using the formula: variance = (sumSq - (sum^2 / count)) / (count - 1)
		// This avoids the need to store and iterate over all values
		if (s.count > 1) {
			return (s.sumSq - (s.sum * s.sum) / s.count) / (s.count - 1);
		} else {
			// Handling for cases with less than 2 values (variance is undefined or zero)
			return 0;
		}
	}
};

alasql.aggr.STDEV = function (v, s, stage) {
	if (stage === 1 || stage === 2) {
		return alasql.aggr.VAR(v, s, stage);
	} else {
		return Math.sqrt(alasql.aggr.VAR(v, s, stage));
	}
};

alasql.aggr.STDEV = function (v, s, stage) {
	if (stage === 1 || stage === 2) {
		return alasql.aggr.VAR(v, s, stage);
	} else {
		return Math.sqrt(alasql.aggr.VAR(v, s, stage));
	}
};

alasql.aggr.VARP = function (value, accumulator, stage) {
	if (stage === 1) {
		// Initialise accumulator with count, sum, and sum of squares
		return {count: 1, sum: value, sumSq: value * value};
	} else if (stage === 2) {
		// Update accumulator
		accumulator.count++;
		accumulator.sum += value;
		accumulator.sumSq += value * value;
		return accumulator;
	} else {
		// Final stage: Calculate variance
		if (accumulator.count > 0) {
			const mean = accumulator.sum / accumulator.count;
			const variance = accumulator.sumSq / accumulator.count - mean * mean;
			return variance;
		} else {
			return 0; // Return 0 variance if no values were aggregated
		}
	}
};

alasql.aggr.STD =
	alasql.aggr.STDDEV =
	alasql.aggr.STDEVP =
		function (v, s, stage) {
			if (stage == 1 || stage == 2) {
				return alasql.aggr.VARP(v, s, stage);
			} else {
				return Math.sqrt(alasql.aggr.VARP(v, s, stage));
			}
		};

alasql._aggrOriginal = alasql.aggr;
alasql.aggr = {};
Object.keys(alasql._aggrOriginal).forEach(function (k) {
	alasql.aggr[k] = function (v, s, stage) {
		if (stage === 3 && typeof s === 'undefined') return undefined;
		return alasql._aggrOriginal[k].apply(null, arguments);
	};
});

// String functions
stdfn.REPLACE = function (target, pattern, replacement) {
	return (target || '').split(pattern).join(replacement);
};

// This array is required for fast GUID generation
var lut = [];
for (var i = 0; i < 256; i++) {
	lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}

stdfn.NEWID =
	stdfn.UUID =
	stdfn.GEN_RANDOM_UUID =
		function () {
			var d0 = (Math.random() * 0xffffffff) | 0;
			var d1 = (Math.random() * 0xffffffff) | 0;
			var d2 = (Math.random() * 0xffffffff) | 0;
			var d3 = (Math.random() * 0xffffffff) | 0;
			return (
				lut[d0 & 0xff] +
				lut[(d0 >> 8) & 0xff] +
				lut[(d0 >> 16) & 0xff] +
				lut[(d0 >> 24) & 0xff] +
				'-' +
				lut[d1 & 0xff] +
				lut[(d1 >> 8) & 0xff] +
				'-' +
				lut[((d1 >> 16) & 0x0f) | 0x40] +
				lut[(d1 >> 24) & 0xff] +
				'-' +
				lut[(d2 & 0x3f) | 0x80] +
				lut[(d2 >> 8) & 0xff] +
				'-' +
				lut[(d2 >> 16) & 0xff] +
				lut[(d2 >> 24) & 0xff] +
				lut[d3 & 0xff] +
				lut[(d3 >> 8) & 0xff] +
				lut[(d3 >> 16) & 0xff] +
				lut[(d3 >> 24) & 0xff]
			);
		};
