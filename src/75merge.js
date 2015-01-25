/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Merge = function (params) { return yy.extend(this, params); }
yy.Merge.prototype.toString = function() {
	var s = K('MERGE')+' ';
	return s;
}

yy.Merge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(cb) res=cb(res);
	return res;
};

