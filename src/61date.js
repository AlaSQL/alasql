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
	if (/^\d{8}$/.test(d.toString()))
		return new Date(+d.substr(0, 4), +d.substr(4, 2) - 1, +d.substr(6, 2));
	return newDate(d);
};

stdfn.NOW = function (param) {
	var d;
	if (param) d = stdfn.DATE(param);
	else d = new Date();
	var separator = alasql.options.nowdateseparator;
	var s =
		d.getFullYear() +
		separator +
		('0' + (d.getMonth() + 1)).substr(-2) +
		separator +
		('0' + d.getDate()).substr(-2);
	s +=
		alasql.options.nowdatetimeseparator +
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
	return interval / PERIODS[period.toLowerCase()];
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

var dateRegexp =
	// /^(?<year>\d{4})[-\.](?<month>\d{1,2})[-\.](?<day>\d{1,2})( (?<hours>\d{2}):(?<minutes>\d{2})(:(?<seconds>\d{2})(\.(?<milliseconds>)\d{3})?)?)?/;
	/^\W*(?<year>\d{4})[-\/\.](?<month>[0-1]?\d)[-\/\.](?<day>[0-3]?\d)([T ](?<hour>[0-2][0-9]):(?<min>[0-5][0-9])(:(?<sec>[0-5][0-9])(\.(?<msec>\d{3}))?\d*)?(?<tz>Z|(?<tz_dir>[-+])(?<tz_HH>\d\d):(?<tz_mm>\d\d))?)?/i;
function newDate(d) {
	// Read https://stackoverflow.com/questions/2587345/why-does-date-parse-give-incorrect-results/20463521#20463521 to understand
	// why we need to rely on our own parsing to ensure consistency across runtimes.
	// Also: YYYY-MM-DD defaults to UTC is required by ECMA-262 but YYYY-MM-DD HH:ss is not.
	// AlaSQL will treat _anything_ with no timezone as local time.

	var date;

	if (typeof d === 'interger') {
		return new Date(d);
	}

	if (typeof d === 'string') {
		const match = d.match(dateRegexp);
		if (match) {
			const {year, month, day, hour, min, sec, msec, tz, tz_dir, tz_HH, tz_mm} = match.groups;

			if (tz) {
				var offset_HH = 0;
				var offset_mm = 0;

				if ('Z' != tz) {
					offset_HH = -1 * +(tz_dir + tz_HH);
					offset_mm = -1 * +(tz_dir + tz_mm);
				}
				date = new Date(
					Date.UTC(+year, +month - 1, +day, +hour + offset_HH, +min + offset_mm, +sec, +msec)
				);
			} else {
				const dateArrguments = [year, month - 1, day];
				if (hour) {
					dateArrguments.push(hour, min, sec || 0, msec || 0);
				}
				date = new Date(...dateArrguments);
			}
		} else {
			date = new Date(Date.parse(d));
		}
	}

	if (isNaN(date)) {
		date = new Date(d);
	}

	// https://github.com/AlaSQL/alasql/pull/1534#discussion_r1051623032
	//if (isNaN(date)) {
	//	throw 'The value could not be converted to a date: ' + JSON.stringify(d);
	//	//console.warn(`d:${d}, date:${date}`)
	//}

	return date;
}
