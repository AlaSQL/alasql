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
		return (this.unique ? 'UNIQUE(' : 'EXISTS(') + this.value.toString() + ')';
	}

	toType() {
		return 'boolean';
	}

	toJS(context, tableid, defcols) {
		// Updated to return a boolean value correctly
		const outerContext = context === 'g' ? '(this.groupSources.get(g) || g)' : context;
		const result = `this.existsfn[${this.existsidx}](params, null, ${outerContext})`;
		if (this.unique) return `alasql.utils.noEqualRows(${result})`;
		return `!!${result}.data.length`;
	}
};

// UNIQUE (subquery): true when no two rows are equal. Rows with a NULL never count as equal.
alasql.utils.noEqualRows = function ({columns, data}) {
	const seen = new Set();
	for (const row of data) {
		// Read by column, as a NULL can be missing from the row object
		const values = columns.map(col => row[col.columnid]);
		if (values.some(v => v == null || (typeof v === 'number' && isNaN(v)))) continue;
		const key = JSON.stringify(values);
		if (seen.has(key)) return false;
		seen.add(key);
	}
	return true;
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
