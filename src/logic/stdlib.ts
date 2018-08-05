import utils from '../utils';

const und = utils.und;

export default mem => {
	const stdlib : {[key: string]: any} = {};

	stdlib.ABS = function (a) {
		return 'Math.abs(' + a + ')';
	};
	stdlib.CLONEDEEP = function (a) {
		return 'alasql.utils.cloneDeep(' + a + ')';
	};

	
	stdlib.EXP = function (a) {
		return 'Math.pow(Math.E,' + a + ')';
	};

	stdlib.IIF = function (a, b, c) {
		if (arguments.length == 3) {
			return '((' + a + ')?(' + b + '):(' + c + '))';
		} else {
			throw new Error('Number of arguments of IFF is not equals to 3');
		}
	};
	stdlib.IFNULL = function (a, b) {
		return '(' + a + '||' + b + ')';
	};
	stdlib.INSTR = function (s, p) {
		return '((' + s + ').indexOf(' + p + ')+1)';
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
		return 'Math.max(' + Array.prototype.join.call(arguments, ',') + ')';
	};

	stdlib.MIN = stdlib.LEAST = function () {
		return 'Math.min(' + Array.prototype.join.call(arguments, ',') + ')';
	};

	stdlib.SUBSTRING = stdlib.SUBSTR = stdlib.MID = function (a, b, c) {
		if (arguments.length == 2) return und(a, 'y.substr(' + b + '-1)');
		else if (arguments.length == 3) return und(a, 'y.substr(' + b + '-1,' + c + ')');
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

	mem.alasql.stdlib = stdlib;
};