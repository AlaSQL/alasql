/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* globals: alasql, yy */

/**
	Print statement 
	@class
	@param {object} params Initial setup properties
*/

/* global alasql, yy */

yy.Print = function (params) {
	return yy.extend(this, params);
};

/** 
	Generate SQL string 
	@this Print statement object
*/
yy.Print.prototype.toString = function () {
	var s = 'PRINT';
	if (this.statement) s += ' ' + this.statement.toString();
	return s;
};

/**
 	Print result of select statement or expression
 	@param {string} databaseid Database identificator
 	@param {object} params Query parameters
 	@param {statement-callback} cb Callback function 
	@this Print statement object
*/
yy.Print.prototype.execute = function (databaseid, params, cb) {
	//	console.log(this.url);
	var self = this;
	var res = 1;
	//console.log(this);
	alasql.precompile(this, databaseid, params); /** @todo Change from alasql to this */

	if (this.exprs && this.exprs.length > 0) {
		var rs = this.exprs.map(function (expr) {
			// console.log(48748747654, 'var y;return ' + expr.toJS('({})', '', null));
			var exprfn = new Function(
				'params,alasql,p',
				'var y;return ' + expr.toJS('({})', '', null)
			).bind(self);
			var r = exprfn(params, alasql);
			return JSONtoString(r);
		});
		console.log.apply(console, rs);
	} else if (this.select) {
		var r = this.select.execute(databaseid, params);
		console.log(JSONtoString(r));
	} else {
		console.log();
	}

	if (cb) res = cb(res);
	return res;
};
