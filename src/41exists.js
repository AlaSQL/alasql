/*
//
// EXISTS and other subqueries functions for AlaSQL.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
// Modified by: Midwayne
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
		// Updated to return a boolean value correctly
		return `!!this.existsfn[${this.existsidx}](params, null, ${context}).data.length`;
	}
};

//
// Prepare subqueries and EXISTS
//
alasql.precompile = function (statement, databaseid, params) {
	if (!statement) return;
	statement.params = params;
	// For CREATE VIEW statements, move queries to the select object
	// so they can be compiled later when the view is first used
	if (statement.view && statement.select && statement.queries) {
		statement.select.queries = statement.queries;
		return;
	}
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
