/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.SetVariable = function (params) { return yy.extend(this, params); }
yy.SetVariable.prototype.toString = function() {
	var s = K('SET')+' ';
	if(typeof this.autocommit != 'undefined') {
		s += K('AUTOCOMMIT')+' '+(this.autocommit?'ON':'OFF');
	};
	return s;
}

yy.SetVariable.prototype.execute = function (databaseid,cb) {
	if(typeof this.autocommit != 'undefined') {
		alasql.autocommit = this.autocommit;
	}

};

