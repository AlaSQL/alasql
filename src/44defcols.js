/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileDefCols = function (query, databaseid) {
	//	console.log('defcols');
	var defcols = {'.': {}};
	if (this.from) {
		this.from.forEach(function (fr) {
			defcols['.'][fr.as || fr.tableid] = true;
			if (fr instanceof yy.Table) {
				var alias = fr.as || fr.tableid;
				//				console.log(alasql.databases[fr.databaseid || databaseid]);
				//				console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
				//console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
				//console.log(alasql.databases);
				var table = alasql.databases[fr.databaseid || databaseid].tables[fr.tableid];
				//console.log(table);

				if (undefined === table) {
					throw new Error('Table does not exist: ' + fr.tableid);
				}

				if (table.columns) {
					table.columns.forEach(function (col) {
						if (defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if (fr instanceof yy.Select) {
			} else if (fr instanceof yy.Search) {
			} else if (fr instanceof yy.ParamValue) {
			} else if (fr instanceof yy.VarValue) {
			} else if (fr instanceof yy.FuncValue) {
			} else if (fr instanceof yy.FromData) {
			} else if (fr instanceof yy.Json) {
			} else if (fr.inserted) {
			} else {
				//				console.log(fr);
				throw new Error('Unknown type of FROM clause');
			}
		});
	}

	if (this.joins) {
		this.joins.forEach(function (jn) {
			defcols['.'][jn.as || jn.table.tableid] = true;

			//			console.log(jn);
			if (jn.table) {
				var alias = jn.as || jn.table.tableid;
				var databaseId = jn.table.databaseid || databaseid;
				var database = alasql.databases[databaseId];

				if (database === undefined) {
					throw new Error('Database does not exist: ' + databaseId);
				}

				var table = database.tables[jn.table.tableid];
				//				console.log(jn.table.tableid, jn.table.databaseid);

				if (table === undefined) {
					throw new Error('Table does not exist: ' + jn.table.tableid);
				}

				if (table.columns) {
					table.columns.forEach(function (col) {
						if (defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if (jn.select) {
			} else if (jn.param) {
			} else if (jn.func) {
			} else {
				throw new Error('Unknown type of FROM clause');
			}
		});
	}
	// Subqueries in FROM / JOIN have no table definition, so register the named
	// columns of their SELECT list. Without this, an unqualified column of a joined
	// subquery used in an expression (e.g. c - b) resolves to the first source (#832).
	// Only fill names that are not defined yet, so table columns keep their resolution.
	var addSubqueryColumns = function (select, alias) {
		if (!alias || !select || !select.columns) return;
		select.columns.forEach(function (col) {
			var name = col.as || (col instanceof yy.Column ? col.columnid : undefined);
			if (name && name !== '*' && name !== '_' && !(name in defcols)) {
				defcols[name] = alias;
			}
		});
	};
	if (this.from) {
		this.from.forEach(function (fr) {
			if (fr instanceof yy.Select) addSubqueryColumns(fr, fr.as);
		});
	}
	if (this.joins) {
		this.joins.forEach(function (jn) {
			if (jn.select) addSubqueryColumns(jn.select, jn.as);
		});
	}

	// for(var k in defcols) {
	// 	if(defcols[k] == '-') defcols[k] = undefined;
	// }
	//	console.log(89,defcols);
	return defcols;
};
