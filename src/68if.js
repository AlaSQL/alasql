/*
//
// CREATE VIEW for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.If = function (params) { return yy.extend(this, params); }
yy.If.prototype.toString = function() {
	var s = 'IF ';
	s += this.expression.toString();
	s += ' '+this.thenstat.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.If.prototype.execute = function (databaseid,params,cb,scope) {
	var res = 1;
	console.log(this.expression.toJavaScript());
	var fn = new Function('params,alasql','return '+this.expression.toJavaScript());
	var res = fn(params,alasql);
	if(res) res = this.thenstat.execute(databaseid,params,cb,scope);
//	else res = this.elsestat.execute(databaseid,params,cb,scope);
	return res;
};


