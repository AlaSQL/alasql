//
// Date functions
//
// (c) 2014, Andrey Gershun
//

/** Standard JavaScript data types */

alasql.fn.Date = Object;
alasql.fn.Date = Date;
alasql.fn.Number = Number;
alasql.fn.String = String;
alasql.fn.Boolean = Boolean;

/** Extend Object with properties */
stdfn.EXTEND = alasql.utils.extend;

stdfn.CHAR = String.fromCharCode.bind(String);
stdfn.ASCII = function (a) {
	return a.charCodeAt(0);
};

/**
 Return first non-null argument
 See https://msdn.microsoft.com/en-us/library/ms190349.aspx
*/
stdfn.COALESCE = function () {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] === null) continue;
		if (typeof arguments[i] == 'undefined') continue;
		if (typeof arguments[i] == 'number' && isNaN(arguments[i])) continue;
		return arguments[i];
	}
	return undefined;
};

stdfn.USER = function () {
	return 'alasql';
};

stdfn.OBJECT_ID = function (objid) {
	return !!alasql.tables[objid];
};

stdfn.DATE = function (d) {
	if (!isNaN(d) && d.length === 8)
		return new Date(+d.substr(0, 4), +d.substr(4, 2) - 1, +d.substr(6, 2));
	return newDate(d);
};

stdfn.NOW = function () {
	if (alasql.options.dateAsString) {
		var d = new Date();
		var s =
			d.getFullYear() +
			'-' +
			('0' + (d.getMonth() + 1)).substr(-2) +
			'-' +
			('0' + d.getDate()).substr(-2);
		s +=
			' ' +
			('0' + d.getHours()).substr(-2) +
			':' +
			('0' + d.getMinutes()).substr(-2) +
			':' +
			('0' + d.getSeconds()).substr(-2);
		s += '.' + ('00' + d.getMilliseconds()).substr(-3);
		return s;
	}
	return new Date();
};

stdfn.GETDATE = stdfn.NOW;
stdfn.CURRENT_TIMESTAMP = stdfn.NOW;

/**
 * Returns the current date, without time component.
 * @returns date object without time component
 */
stdfn.CURDATE = stdfn.CURRENT_DATE = function () {
	var date = new Date();
	date.setHours(0, 0, 0, 0);
	if (alasql.options.dateAsString) {
		var s =
			date.getFullYear() +
			'-' +
			('0' + (date.getMonth() + 1)).substr(-2) +
			'-' +
			('0' + date.getDate()).substr(-2);
		return s;
	}
	return date;
};

// 	stdfn.GETDATE = function(){
// 		var d = new Date();
// 		var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
// 		return s;
// 	}

stdfn.SECOND = function (d) {
	var d = newDate(d);
	return d.getSeconds();
};

stdfn.MINUTE = function (d) {
	var d = newDate(d);
	return d.getMinutes();
};

stdfn.HOUR = function (d) {
	var d = newDate(d);
	return d.getHours();
};

stdfn.DAYOFWEEK = stdfn.WEEKDAY = function (d) {
	var d = newDate(d);
	return d.getDay();
};

stdfn.DAY = stdfn.DAYOFMONTH = function (d) {
	var d = newDate(d);
	return d.getDate();
};

stdfn.MONTH = function (d) {
	var d = newDate(d);
	return d.getMonth() + 1;
};

stdfn.YEAR = function (d) {
	var d = newDate(d);
	return d.getFullYear();
};

var PERIODS = {
	year: 1000 * 3600 * 24 * 365,
	quarter: (1000 * 3600 * 24 * 365) / 4,
	month: 1000 * 3600 * 24 * 30,
	week: 1000 * 3600 * 24 * 7,
	day: 1000 * 3600 * 24,
	dayofyear: 1000 * 3600 * 24,
	weekday: 1000 * 3600 * 24,
	hour: 1000 * 3600,
	minute: 1000 * 60,
	second: 1000,
	millisecond: 1,
	microsecond: 0.001,
};

alasql.stdfn.DATEDIFF = function (period, d1, d2) {
	var interval = newDate(d2).getTime() - newDate(d1).getTime();
	return (interval / PERIODS[period.toLowerCase()]) | 0;
};

alasql.stdfn.DATEADD = function (period, interval, d) {
	var nd = newDate(d);
	var period = period.toLowerCase();

	switch (period) {
		case 'year':
			nd.setFullYear(nd.getFullYear() + interval);
			break;
		case 'quarter':
			nd.setMonth(nd.getMonth() + interval * 3);
			break;
		case 'month':
			nd.setMonth(nd.getMonth() + interval);
			break;
		default:
			nd = new Date(nd.getTime() + interval * PERIODS[period]);
			break;
	}

	return nd;
};

alasql.stdfn.INTERVAL = function (interval, period) {
	return interval * PERIODS[period.toLowerCase()];
};

alasql.stdfn.DATE_ADD = alasql.stdfn.ADDDATE = function (d, interval) {
	var nd = newDate(d).getTime() + interval;
	return new Date(nd);
};

alasql.stdfn.DATE_SUB = alasql.stdfn.SUBDATE = function (d, interval) {
	var nd = newDate(d).getTime() - interval;
	return new Date(nd);
};

var dateRegexp = /^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}/;
function newDate(d) {
	if (typeof d === 'string') {
		if (dateRegexp.test(d)) {
			d = d.replace('.', '-').replace('.', '-');
		}
	}
	return new Date(d);
}
