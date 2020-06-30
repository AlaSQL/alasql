/*
//
// CAST and CONVERT functions
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Convert = function (params) {
	return yy.extend(this, params);
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

/**
 Convert one type to another
 */
alasql.stdfn.CONVERT = function (value, args) {
	var val = value;
	//	console.log(args);
	if (args.style) {
		// TODO 9,109, 20,120,21,121,126,130,131 conversions
		var t;
		if (/\d{8}/.test(val)) {
			t = new Date(+val.substr(0, 4), +val.substr(4, 2) - 1, +val.substr(6, 2));
		} else {
			t = new Date(val);
		}
		switch (args.style) {
			case 1: // mm/dd/yy
				val =
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					('0' + t.getDate()).substr(-2) +
					'/' +
					('0' + t.getYear()).substr(-2);
				break;
			case 2: // yy.mm.dd
				val =
					('0' + t.getYear()).substr(-2) +
					'.' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'.' +
					('0' + t.getDate()).substr(-2);
				break;
			case 3: // dd/mm/yy
				val =
					('0' + t.getDate()).substr(-2) +
					'/' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					('0' + t.getYear()).substr(-2);
				break;
			case 4: // dd.mm.yy
				val =
					('0' + t.getDate()).substr(-2) +
					'.' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'.' +
					('0' + t.getYear()).substr(-2);
				break;
			case 5: // dd-mm-yy
				val =
					('0' + t.getDate()).substr(-2) +
					'-' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'-' +
					('0' + t.getYear()).substr(-2);
				break;
			case 6: // dd mon yy
				val =
					('0' + t.getDate()).substr(-2) +
					' ' +
					t.toString().substr(4, 3).toLowerCase() +
					' ' +
					('0' + t.getYear()).substr(-2);
				break;
			case 7: // Mon dd,yy
				val =
					t.toString().substr(4, 3) +
					' ' +
					('0' + t.getDate()).substr(-2) +
					',' +
					('0' + t.getYear()).substr(-2);
				break;
			case 8: // hh:mm:ss
			case 108: // hh:mm:ss
				val =
					('0' + t.getHours()).substr(-2) +
					':' +
					('0' + t.getMinutes()).substr(-2) +
					':' +
					('0' + t.getSeconds()).substr(-2);
				break;
			case 10: // mm-dd-yy
				val =
					('0' + (t.getMonth() + 1)).substr(-2) +
					'-' +
					('0' + t.getDate()).substr(-2) +
					'-' +
					('0' + t.getYear()).substr(-2);
				break;
			case 11: // yy/mm/dd
				val =
					('0' + t.getYear()).substr(-2) +
					'/' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					('0' + t.getDate()).substr(-2);
				break;
			case 12: // yymmdd
				val =
					('0' + t.getYear()).substr(-2) +
					('0' + (t.getMonth() + 1)).substr(-2) +
					('0' + t.getDate()).substr(-2);
				break;
			case 101: // mm/dd/yyyy
				val =
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					('0' + t.getDate()).substr(-2) +
					'/' +
					t.getFullYear();
				break;
			case 102: // yyyy.mm.dd
				val =
					t.getFullYear() +
					'.' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'.' +
					('0' + t.getDate()).substr(-2);
				break;
			case 103: // dd/mm/yyyy
				val =
					('0' + t.getDate()).substr(-2) +
					'/' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					t.getFullYear();
				break;
			case 104: // dd.mm.yyyy
				val =
					('0' + t.getDate()).substr(-2) +
					'.' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'.' +
					t.getFullYear();
				break;
			case 105: // dd-mm-yyyy
				val =
					('0' + t.getDate()).substr(-2) +
					'-' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'-' +
					t.getFullYear();
				break;
			case 106: // dd mon yyyy
				val =
					('0' + t.getDate()).substr(-2) +
					' ' +
					t.toString().substr(4, 3).toLowerCase() +
					' ' +
					t.getFullYear();
				break;
			case 107: // Mon dd,yyyy
				val =
					t.toString().substr(4, 3) + ' ' + ('0' + t.getDate()).substr(-2) + ',' + t.getFullYear();
				break;
			case 110: // mm-dd-yyyy
				val =
					('0' + (t.getMonth() + 1)).substr(-2) +
					'-' +
					('0' + t.getDate()).substr(-2) +
					'-' +
					t.getFullYear();
				break;
			case 111: // yyyy/mm/dd
				val =
					t.getFullYear() +
					'/' +
					('0' + (t.getMonth() + 1)).substr(-2) +
					'/' +
					('0' + t.getDate()).substr(-2);
				break;

			case 112: // yyyymmdd
				val =
					t.getFullYear() + ('0' + (t.getMonth() + 1)).substr(-2) + ('0' + t.getDate()).substr(-2);
				break;
			default:
				throw new Error('The CONVERT style ' + args.style + ' is not realized yet.');
		}
	}

	var udbtypeid = args.dbtypeid.toUpperCase();

	if (args.dbtypeid == 'Date') {
		return new Date(val);
	} else if (udbtypeid == 'DATE') {
		var d = new Date(val);
		var s =
			d.getFullYear() +
			'.' +
			('0' + (d.getMonth() + 1)).substr(-2) +
			'.' +
			('0' + d.getDate()).substr(-2);
		return s;
	} else if (udbtypeid == 'DATETIME' || udbtypeid == 'DATETIME2') {
		var d = new Date(val);
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
