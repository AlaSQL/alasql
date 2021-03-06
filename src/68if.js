/*
//
// IF for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.If = function (params) {
	return yy.extend(this, params);
};
yy.If.prototype.toString = function () {
	var s = 'IF' + ' ';
	s += this.expression.toString();
	s += ' ' + this.thenstat.toString();
	if (this.elsestat) s += ' ELSE ' + this.thenstat.toString();
	return s;
};

// CREATE TABLE
//  yy.CreateTable.prototype.compile = returnUndefined;
yy.If.prototype.execute = function (databaseid, params, cb) {
	var res;
	//	console.log(this);
	//	console.log(this.expression.toJS('{}','',null));
	//	console.log();
	var fn = new Function(
		'params,alasql,p',
		'var y;return ' + this.expression.toJS('({})', '', null)
	).bind(this);
	//	 var fn = new Function('params,alasql,p','console.log(this.thenstat);return '+this.expression.toJS('({})','',null)).bind(this);
	if (fn(params, alasql)) res = this.thenstat.execute(databaseid, params, cb);
	else {
		if (this.elsestat) res = this.elsestat.execute(databaseid, params, cb);
		else {
			if (cb) res = cb(res);
		}
	}
	//	 else res = this.elsestat.execute(databaseid,params,cb,scope);
	return res;
};
