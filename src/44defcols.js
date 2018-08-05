/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileDefCols = function(query, databaseid) {
	//	console.log('defcols');
	var defcols = {'.': {}};
	if (this.from) {
		this.from.forEach(function(fr) {
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
					table.columns.forEach(function(col) {
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
		this.joins.forEach(function(jn) {
			defcols['.'][jn.as || jn.table.tableid] = true;

			//			console.log(jn);
			if (jn.table) {
				var alias = jn.table.tableid;
				if (jn.as) alias = jn.as;
				var alias = jn.as || jn.table.tableid;
				var table =
					alasql.databases[jn.table.databaseid || databaseid].tables[jn.table.tableid];
				//				console.log(jn.table.tableid, jn.table.databaseid);
				if (table.columns) {
					table.columns.forEach(function(col) {
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
