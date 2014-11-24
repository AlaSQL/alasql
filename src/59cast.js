/*
//
// CAST and CONVERT functions
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Cast = function(params) { return yy.extend(this, params); };
yy.Cast.prototype.toString = function() {
	var s = 'CAST(';
	s += this.expression.toString();
	s += ' AS ';
	s += this.dbtypeid;
	if(typeof this.dbsize != 'undefined') {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+dbprecision;
		s += ')';
	}
	s += ')';
	return s;
};
yy.Cast.prototype.toJavaScript = function(context, tableid, defcols) {

	if(this.dbtypeid == 'INT') {
		return '(('+this.expression.toJavaScript(context, tableid, defcols)+')|0)';
	} if(this.dbtypeid == 'STRING') {
		return '(""+'+this.expression.toJavaScript(context, tableid, defcols)+')';
	} if(this.dbtypeid == 'NUMBER') {
		return '(+('+this.expression.toJavaScript(context, tableid, defcols)+'))';
	} if(this.dbtypeid == 'DATE') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJavaScript(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJavaScript(context, tableid, defcols);
		}
	} if(this.dbtypeid == 'DATETIME') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJavaScript(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJavaScript(context, tableid, defcols);
		}
	} else {

	};

	throw new Error('There is not such type conversion for '+this.toString());
};