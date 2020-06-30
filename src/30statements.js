/*
//
// Statements class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Statements container
yy.Statements = function (params) {
	return yy.extend(this, params);
};

yy.Statements.prototype.toString = function () {
	return this.statements
		.map(function (st) {
			return st.toString();
		})
		.join('; ');
};

// Compile array of statements into single statement
yy.Statements.prototype.compile = function (db) {
	var statements = this.statements.map(function (st) {
		return st.compile(db);
	});
	if (statements.length === 1) {
		return statements[0];
	} else {
		return function (params, cb) {
			var res = statements.map(function (st) {
				return st(params);
			});
			if (cb) {
				cb(res);
			}
			return res;
		};
	}
};
