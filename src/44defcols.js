/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileDefCols = function(query, databaseid) {
	var defcols = {};
	return defcols;
	if(this.from) {
		this.from.forEach(function(fr){
			if(fr instanceof yy.Table) {
				var alias = fr.as || fr.tableid;
				var table = alasql.databases[fr.databaseid || databaseid].tables[fr.tableid];
				table.columns.forEach(function(col){
					if(defcols[col.columnid]) {
						defcols[col.columnid] = '-'; // Ambigous
					} else {
						defcols[col.columnid] = alias;
					}
				});
			} else if(fr instanceof yy.Select) {

			} else if(fr instanceof yy.ParamValue) {

			} else {
				throw new Error('Unknown type of FROM clause');
			};
		});
	};

	if(this.joins) {
		this.joins.forEach(function(jn){
			console.log(jn);
			var alias = jn.table.tableid;
			if(jn.as) alias = jn.as;
			if(jn.table) {
				var alias = jn.as || jn.tableid;
				var table = alasql.databases[jn.databaseid || databaseid].tables[jn.tableid];
				table.columns.forEach(function(col){
					if(defcols[col.columnid]) {
						defcols[col.columnid] = '-'; // Ambigous
					} else {
						defcols[col.columnid] = alias;
					}
				});
			} else if(jn.select) {

			} else if(jn.param) {

			} else {
				throw new Error('Unknown type of FROM clause');
			};
		});
	};
	console.log(defcols);
	return defcols;
}