import {Node} from '../expression/node.js';

export default function install(alasql) {
	var yy = alasql.yy;
	/*
//
// EXISTS and other subqueries functions for AlaSQL.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
// Modified by: Midwayne
//
*/

	yy.ExistsValue = class ExistsValue extends Node {
		toString() {
			return 'EXISTS(' + this.value.toString() + ')';
		}

		toType() {
			return 'boolean';
		}

		toJS(context, tableid, defcols) {
			// Updated to return a boolean value correctly
			const outerContext = context === 'g' ? '(this.groupSources.get(g) || g)' : context;
			return `!!this.queriesfn[${this.value.queriesidx}](params, null, ${outerContext}).data.length`;
		}
	};

	yy.ExistsValue.children = ['value'];

	//
	// Prepare subqueries and EXISTS
	//
	alasql.precompile = function (statement, databaseid, params) {
		if (!statement) return;
		statement.params = params;
		// The subqueries outside any SELECT, as in IF, WHILE and PRINT. A SELECT compiles its own.
		if (statement.queries) {
			statement.queriesfn = statement.queries.map(function (q) {
				var nq = q.compile(databaseid || statement.database.databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
	};
}
