/*
//
// EXISTS and other subqueries functions  functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ExistsValue = class ExistsValue {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		return 'EXISTS(' + this.value.toString() + ')';
	}

	toType() {
		return 'boolean';
	}

	toJS(context, tableid, defcols) {
		return 'this.existsfn[' + this.existsidx + '](params,null,' + context + ').data.length';
	}
};

//
// Prepare subqueries and exists
//
alasql.precompile = function (statement, databaseid, params) {
	if (!statement) return;
	statement.params = params;
	if (statement.queries) {
		statement.queriesfn = statement.queries.map(function (q) {
			var nq = q.compile(databaseid || statement.database.databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
	if (statement.exists) {
		statement.existsfn = statement.exists.map(function (ex) {
			var nq = ex.compile(databaseid || statement.database.databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
};
