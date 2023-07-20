/*
//
// CAST and CONVERT functions
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Convert = function (params) {
	return Object.assign(this, params);
};
yy.Convert.prototype.toString = function () {
	var s = 'CONVERT(';
	s += this.dbtypeid;
	if (typeof this.dbsize != 'undefined') {
		s += '(' + this.dbsize;
		if (this.dbprecision) s += ',' + this.dbprecision;
		s += ')';
	}
	s += ',' + this.expression.toString();
	if (this.style) s += ',' + this.style;
	s += ')';
	return s;
};
yy.Convert.prototype.toJS = function (context, tableid, defcols) {
	//	if(this.style) {
	return (
		'alasql.stdfn.CONVERT(' +
		this.expression.toJS(context, tableid, defcols) +
		',{dbtypeid:"' +
		this.dbtypeid +
		'",dbsize:' +
		this.dbsize +
		',dbprecision:' +
		this.dbprecision +
		',style:' +
		this.style +
		'})'
	);
	//	}
	/*/*
	if(this.dbtypeid == 'INT') {
		return '(('+this.expression.toJS(context, tableid, defcols)+')|0)';
	} if(this.dbtypeid == 'STRING') {
		return '(""+'+this.expression.toJS(context, tableid, defcols)+')';
	} if(this.dbtypeid == 'NUMBER') {
		return '(+('+this.expression.toJS(context, tableid, defcols)+'))';
	} if(this.dbtypeid == 'DATE') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJS(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJS(context, tableid, defcols);
		}
	} if(this.dbtypeid == 'DATETIME') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJS(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJS(context, tableid, defcols);
		}
	} else {

	};
*/
	throw new Error('There is not such type conversion for ' + this.toString());
};

function structuredDate(unFormattedDate) {
	var month = unFormattedDate.getMonth() + 1;
	var year = unFormattedDate.getYear();
	var fullYear = unFormattedDate.getFullYear();
	var date = unFormattedDate.getDate();
	var day = unFormattedDate.toString().substr(4, 3);
	var formattedDate = ('0' + date).substr(-2);
	var formattedMonth = ('0' + month).substr(-2);
	var formattedYear = ('0' + year).substr(-2);
	var formattedHour = ('0' + unFormattedDate.getHours()).substr(-2);
	var formattedMinutes = ('0' + unFormattedDate.getMinutes()).substr(-2);
	var formattedSeconds = ('0' + unFormattedDate.getSeconds()).substr(-2);
	var formattedMilliseconds = ('00' + unFormattedDate.getMilliseconds()).substr(-3);
	return {
		month: month,
		year: year,
		fullYear: fullYear,
		date: date,
		day: day,
		formattedDate: formattedDate,
		formattedMonth: formattedMonth,
		formattedYear: formattedYear,
		formattedHour: formattedHour,
		formattedMinutes: formattedMinutes,
		formattedSeconds: formattedSeconds,
		formattedMilliseconds: formattedMilliseconds,
	};
}

/**
 Convert one type to another
 */
alasql.stdfn.CONVERT = function (value, args) {
	var val = value;
	var udbtypeid = args.dbtypeid.toUpperCase();

	var t;
	var s;
	if (
		args.style ||
		args.dbtypeid == 'Date' ||
		['DATE', 'DATETIME', 'DATETIME2'].indexOf(udbtypeid) > -1
	) {
		if (/\d{8}/.test(val)) {
			t = new Date(+val.substr(0, 4), +val.substr(4, 2) - 1, +val.substr(6, 2));
		} else {
			t = newDate(val);
		}
		s = structuredDate(t);
	}

	if (args.style) {
		// TODO 9,109, 20,120,21,121,126,130,131 conversions
		switch (args.style) {
			case 1: // mm/dd/yy
				val = s.formattedMonth + '/' + s.formattedDate + '/' + s.formattedYear;
				break;
			case 2: // yy.mm.dd
				val = s.formattedYear + '.' + s.formattedMonth + '.' + s.formattedDate;
				break;
			case 3: // dd/mm/yy
				val = s.formattedDate + '/' + s.formattedMonth + '/' + s.formattedYear;
				break;
			case 4: // dd.mm.yy
				val = s.formattedDate + '.' + s.formattedMonth + '.' + s.formattedYear;
				break;
			case 5: // dd-mm-yy
				val = s.formattedDate + '-' + s.formattedMonth + '-' + s.formattedYear;
				break;
			case 6: // dd mon yy
				val = s.formattedDate + ' ' + s.day.toLowerCase() + ' ' + s.formattedYear;
				break;
			case 7: // Mon dd,yy
				val = s.day + ' ' + s.formattedDate + ',' + s.formattedYear;
				break;
			case 8: // hh:mm:ss
			case 108: // hh:mm:ss
				val = s.formattedHour + ':' + s.formattedMinutes + ':' + s.formattedSeconds;
				break;
			case 10: // mm-dd-yy
				val = s.formattedMonth + '-' + s.formattedDate + '-' + s.formattedYear;
				break;
			case 11: // yy/mm/dd
				val = s.formattedYear + '/' + s.formattedMonth + '/' + s.formattedDate;
				break;
			case 12: // yymmdd
				val = s.formattedYear + s.formattedMonth + s.formattedDate;
				break;
			case 101: // mm/dd/yyyy
				val = s.formattedMonth + '/' + s.formattedDate + '/' + s.fullYear;
				break;
			case 102: // yyyy.mm.dd
				val = s.fullYear + '.' + s.formattedMonth + '.' + s.formattedDate;
				break;
			case 103: // dd/mm/yyyy
				val = s.formattedDate + '/' + s.formattedMonth + '/' + s.fullYear;
				break;
			case 104: // dd.mm.yyyy
				val = s.formattedDate + '.' + s.formattedMonth + '.' + s.fullYear;
				break;
			case 105: // dd-mm-yyyy
				val = s.formattedDate + '-' + s.formattedMonth + '-' + s.fullYear;
				break;
			case 106: // dd mon yyyy
				val = s.formattedDate + ' ' + s.day.toLowerCase() + ' ' + s.fullYear;
				break;
			case 107: // Mon dd,yyyy
				val = s.day + ' ' + s.formattedDate + ',' + s.fullYear;
				break;
			case 110: // mm-dd-yyyy
				val = s.formattedMonth + '-' + s.formattedDate + '-' + s.fullYear;
				break;
			case 111: // yyyy/mm/dd
				val = s.fullYear + '/' + s.formattedMonth + '/' + s.formattedDate;
				break;

			case 112: // yyyymmdd
				val = s.fullYear + s.formattedMonth + s.formattedDate;
				break;
			default:
				throw new Error('The CONVERT style ' + args.style + ' is not realized yet.');
		}
	}

	if (args.dbtypeid == 'Date') {
		return t;
	} else if (udbtypeid == 'DATE') {
		return s.formattedYear + '.' + s.formattedMonth + '.' + s.formattedDate;
	} else if (udbtypeid == 'DATETIME' || udbtypeid == 'DATETIME2') {
		var f = s.fullYear + '.' + s.formattedMonth + '.' + s.formattedDate;
		f += ' ' + s.formattedHour + ':' + s.formattedMinutes + ':' + s.formattedSeconds;
		f += '.' + s.formattedMilliseconds;
		return f;
	} else if (['MONEY'].indexOf(udbtypeid) > -1) {
		var m = +val;
		return (m | 0) + ((m * 100) % 100) / 100;
	} else if (['BOOLEAN'].indexOf(udbtypeid) > -1) {
		return !!val;
	} else if (
		['INT', 'INTEGER', 'SMALLINT', 'BIGINT', 'SERIAL', 'SMALLSERIAL', 'BIGSERIAL'].indexOf(
			args.dbtypeid.toUpperCase()
		) > -1
	) {
		return val | 0;
	} else if (
		['STRING', 'VARCHAR', 'NVARCHAR', 'CHARACTER VARIABLE'].indexOf(args.dbtypeid.toUpperCase()) >
		-1
	) {
		if (args.dbsize) return ('' + val).substr(0, args.dbsize);
		else return '' + val;
	} else if (['CHAR', 'CHARACTER', 'NCHAR'].indexOf(udbtypeid) > -1) {
		return (val + new Array(args.dbsize + 1).join(' ')).substr(0, args.dbsize);
		//else return ""+val.substr(0,1);
	} else if (['NUMBER', 'FLOAT', 'DECIMAL', 'NUMERIC'].indexOf(udbtypeid) > -1) {
		var m = +val;
		//toPrecision sets the number of numbers total in the result
		m = args.dbsize !== undefined ? parseFloat(m.toPrecision(args.dbsize)) : m;
		//toFixed sets the number of numbers to the right of the decimal
		m = args.dbprecision !== undefined ? parseFloat(m.toFixed(args.dbprecision)) : m;
		return m;
	} else if (['JSON'].indexOf(udbtypeid) > -1) {
		if (typeof val == 'object') return val;
		try {
			return JSON.parse(val);
		} catch (err) {
			throw new Error('Cannot convert string to JSON');
		}
	}
	return val;
};
