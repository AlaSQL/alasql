/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Print = function (params) { return yy.extend(this, params); }
yy.Print.prototype.toString = function() {
	var s = K('PRINT');
	if(this.statement) s += ' '+this.statement.toString();
	return s;
}

/**
 Print result of select statement or expression
*/
yy.Print.prototype.execute = function (databaseid,params,cb) {
//	console.log(this.url);
	var res, s;

	if(this.statement) {
		s = this.statement.execute(databaseid,params);
	} else {
		s = '';
	}
	s = JSONtoString(s);

	console.log(s);

	if(cb) res = cb(res);
	return res;
};
