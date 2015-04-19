/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Declare = function (params) { return yy.extend(this, params); }
yy.Declare.prototype.toString = function() {
	var s = K('DECLARE')+' ';
	if(this.declares && this.declares.length > 0) {
		s = this.declares.map(function(declare){
			var s = '';
			s += '@'+L(declare.variable)+' ';
			s += declare.dbtypeid;
			if(this.dbsize) s += '('+N(this.dbsize);
			if(this.dbprecision) s+= ','+N(this.dbprecision);
			s += ')';
			if(declare.expression) s += ' = '+declare.expression.toString();
			return s;
		}).join(',');
	}
	return s;
}

yy.Declare.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(this.declares && this.declares.length > 0) {
		this.declares.map(function(declare){
			var dbtypeid = declare.dbtypeid;
			if(!alasql.fn[dbtypeid]) dbtypeid = dbtypeid.toUpperCase();

			alasql.declares[declare.variable] = {dbtypeid:dbtypeid,
				dbsize:declare.dbsize, dbprecision:declare.dbprecision};

			// Set value
			if(declare.expression) {
	//		console.log(this.expression.toJavaScript('','', null));
				alasql.vars[declare.variable] = new Function("params,alasql","return "
					+declare.expression.toJavaScript('({})','', null))(params,alasql);
				if(alasql.declares[declare.variable]) {
					alasql.vars[declare.variable] = alasql.stdfn.CONVERT(alasql.vars[declare.variable],alasql.declares[declare.variable]);
				}
			};
		});
	};
	if(cb) res=cb(res);
	return res;
};

