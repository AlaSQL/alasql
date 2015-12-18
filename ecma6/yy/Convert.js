/*
//
// CAST and CONVERT functions
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
formerly 59convert.js
yy.Convert
**/
import {extend} from "../utils/object.js";

function Convert(params) { return yy.extend(this, params); };
Convert.prototype.toString = function() {
	var s = 'CONVERT(';
	s += this.dbtypeid;
	if(typeof this.dbsize != 'undefined') {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+dbprecision;
		s += ')';
	}
	s += ','+this.expression.toString();
	if(this.style) s += ','+this.style;
	s += ')';
	return s;
};
Convert.prototype.toJS = function(context, tableid, defcols) {

//	if(this.style) {
	return 'alasql.stdfn.CONVERT('+this.expression.toJS(context, tableid, defcols)
		+',{dbtypeid:"'+this.dbtypeid+'",dbsize:'+this.dbsize+',style:'+
		this.style+'})';
//	}
	throw new Error('There is not such type conversion for '+this.toString());
};


