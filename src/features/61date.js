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
stdfn.ASCII = function(a) {
	return a.charCodeAt(0);
};

/** 
 Return first non-null argument
 See https://msdn.microsoft.com/en-us/library/ms190349.aspx
*/
stdfn.COALESCE = function(...args) {
	for (var i = 0; i < args.length; i++) {
		if (typeof args[i] === 'undefined') continue;
		if (typeof args[i] === 'number' && isNaN(args[i])) continue;
		return args[i];
	}
	return undefined;
};

stdfn.USER = function() {
	return 'alasql';
};

stdfn.OBJECT_ID = function(objid) {
	return !!alasql.tables[objid];
};

stdfn.DATE = function(d) {
	if (/\d{8}/.test(d)) return new Date(+d.substr(0, 4), +d.substr(4, 2) - 1, +d.substr(6, 2));
	return new Date(d);
};

stdfn.NOW = function() {
	var d = new Date();
	var s =
		d.getFullYear() +
		'.' +
		('0' + (d.getMonth() + 1)).substr(-2) +
		'.' +
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
};

stdfn.GETDATE = stdfn.NOW;
stdfn.CURRENT_TIMESTAMP = stdfn.NOW;

// 	stdfn.GETDATE = function(){
// 		var d = new Date();
// 		var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
// 		return s;
// 	}

stdfn.SECOND = d => (new Date(d)).getSeconds();

stdfn.MINUTE = function(d) {
	var d = new Date(d);
	return d.getMinutes();
};

stdfn.HOUR = d => (new Date(d)).getHours();


stdfn.DAYOFWEEK = d => (new Date(d)).getDay();


stdfn.DAY = stdfn.DAYOFMONTH = d => (new Date(d)).getDate();


stdfn.MONTH = d => (new Date(d)).getMonth();

stdfn.YEAR = d => (new Date(d)).getFullYear();
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

alasql.stdfn.DATEDIFF = function(period, d1, d2) {
	var interval = new Date(d2).getTime() - new Date(d1).getTime();
	return interval / PERIODS[period.toLowerCase()];
};

alasql.stdfn.DATEADD = function(period, interval, d) {
	var nd = new Date(d).getTime() + interval * PERIODS[period.toLowerCase()];
	return new Date(nd);
};

alasql.stdfn.INTERVAL = function(interval, period) {
	return interval * PERIODS[period.toLowerCase()];
};

alasql.stdfn.DATE_ADD = alasql.stdfn.ADDDATE = function(d, interval) {
	var nd = new Date(d).getTime() + interval;
	return new Date(nd);
};

alasql.stdfn.DATE_SUB = alasql.stdfn.SUBDATE = function(d, interval) {
	var nd = new Date(d).getTime() - interval;
	return new Date(nd);
};
