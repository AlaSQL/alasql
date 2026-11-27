export default function install(alasql) {
	var yy = alasql.yy;
	/*
//
// IF for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

	// A statement in IF that is not compiled (IF, WHILE, BEGIN ... END, SET) compiles its
	// subqueries first, as alasql.exec does for a statement at the top (#2666)
	function run(statement, databaseid, params, cb) {
		if (!statement.compile) alasql.precompile(statement, databaseid, params);
		return statement.execute(databaseid, params, cb);
	}

	yy.If = function (params) {
		return Object.assign(this, params);
	};
	yy.If.prototype.toString = function () {
		var s = 'IF' + ' ';
		s += this.expression.toString();
		s += ' ' + this.thenstat.toString();
		if (this.elsestat) s += ' ELSE ' + this.elsestat.toString();
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
		if (fn(params, alasql)) res = run(this.thenstat, databaseid, params, cb);
		else {
			if (this.elsestat) res = run(this.elsestat, databaseid, params, cb);
			else {
				if (cb) res = cb(res);
			}
		}
		//	 else res = this.elsestat.execute(databaseid,params,cb,scope);
		return res;
	};
}
