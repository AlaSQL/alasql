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
	return `alasql.stdfn.CONVERT(${this.expression.toJS(context, tableid, defcols)}, {
        dbtypeid: "${this.dbtypeid}",
        dbsize: ${this.dbsize},
        dbprecision: ${this.dbprecision},
        style: ${this.style}
    })`;
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
		month,
		year,
		fullYear,
		date,
		day,
		formattedDate,
		formattedMonth,
		formattedYear,
		formattedHour,
		formattedMinutes,
		formattedSeconds,
		formattedMilliseconds,
	};
}

/**
 Convert one type to another
 */
alasql.stdfn.CONVERT = function (value, args) {
	var val = value;
	var udbtypeid = args.dbtypeid?.toUpperCase();

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

	switch (udbtypeid) {
		case 'DATE':
			return `${s.formattedYear}.${s.formattedMonth}.${s.formattedDate}`;
		case 'DATETIME':
		case 'DATETIME2':
			return `${s.fullYear}.${s.formattedMonth}.${s.formattedDate} ${s.formattedHour}:${s.formattedMinutes}:${s.formattedSeconds}.${s.formattedMilliseconds}`;
		case 'MONEY':
			var m = +val;
			return (m | 0) + ((m * 100) % 100) / 100;
		case 'BOOLEAN':
			return !!val;
		case 'INT':
		case 'INTEGER':
		case 'SMALLINT':
		case 'BIGINT':
		case 'SERIAL':
		case 'SMALLSERIAL':
		case 'BIGSERIAL':
			return val | 0;
		case 'STRING':
		case 'VARCHAR':
		case 'NVARCHAR':
		case 'CHARACTER VARIABLE':
			return args.dbsize ? String(val).substr(0, args.dbsize) : String(val);
		case 'CHAR':
		case 'CHARACTER':
		case 'NCHAR':
			return (val + ' '.repeat(args.dbsize)).substr(0, args.dbsize);
		case 'NUMBER':
		case 'FLOAT':
		case 'DECIMAL':
		case 'NUMERIC':
			var m = +val;
			if (args.dbsize !== undefined) {
				m = parseFloat(m.toPrecision(args.dbsize));
			}
			if (args.dbprecision !== undefined) {
				m = parseFloat(m.toFixed(args.dbprecision));
			}
			return m;
		case 'JSON':
			if (typeof val === 'object') {
				return val;
			}
			try {
				return JSON.parse(val);
			} catch (err) {
				throw new Error('Cannot convert string to JSON');
			}
		case 'Date':
			return val;
		default:
			return val;
	}
};
