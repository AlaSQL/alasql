/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// The table of a statement, or an error that names the missing database or table (#2790)
function getTable(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	if (!db) {
		throw new Error('Database does not exist: ' + databaseid);
	}
	var table = db.tables[tableid];
	if (!table) {
		throw new Error('Table does not exist: ' + tableid);
	}
	return table;
}

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
				var table = getTable(fr.databaseid || databaseid, fr.tableid);

				if (table.columns) {
					// Kept per source, so an unqualified column is decided by the table definition (#2873)
					if (table.columns.length) {
						defcols['.'][alias] = new Set(table.columns.map(col => col.columnid));
					}
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
				var table = getTable(jn.table.databaseid || databaseid, jn.table.tableid);

				if (table.columns) {
					if (table.columns.length) {
						defcols['.'][alias] = new Set(table.columns.map(col => col.columnid));
					}
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
	// for(var k in defcols) {
	// 	if(defcols[k] == '-') defcols[k] = undefined;
	// }
	//	console.log(89,defcols);
	return defcols;
};
