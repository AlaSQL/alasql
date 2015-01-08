/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Declare = function (params) { return yy.extend(this, params); }
yy.Declare.prototype.toString = function() {
	var s = K('DECLARE')+' '+'@'+L(this.variable)+' ';
	s += L(this.dbtypeid);
	if(this.dbsize) s += '('+N(this.dbsize);
	if(this.dbprecision) s+= ','+N(this.dbprecision);
	s += ')';
	return s;
}

yy.Declare.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	var dbtypeid = this.dbtypeid;
	if(!alasql.fn[dbtypeid]) dbtypeid = dbtypeid.toUpperCase();

	alasql.declares[this.variable] = {dbtypeid:dbtypeid,
		dbsize:this.dbsize, dbprecision:this.dbprecision};
	if(cb) res=cb(res);
	return res;
};

