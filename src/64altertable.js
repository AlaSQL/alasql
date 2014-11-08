/*
//
// ALTER TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// ALTER TABLE table1 RENAME TO table2
yy.AlterTable = function (params) { return yy.extend(this, params); }
yy.AlterTable.prototype.toString = function() {
	var s = 'ALTER TABLE '+this.table.toString(); 
	if(this.renameto) s += ' RENAME TO '+this.renameto;
	return s;
}

yy.AlterTable.prototype.compile = function (db) {
	var oldtableid = this.table.tableid;
	var newtableid = this.renameto;
	return function(params, cb) {
		var res = 1;
		if(db.tables[newtableid]) {
			throw new Error("Can not rename a table '"+oldtableid+"' to '"
				+newtableid+"', because the table with this name already exists");
		} else if(newtableid == oldtableid) {
			throw new Error("Can not rename a table '"+oldtableid+"' to itself");
		} else {
			db.tables[newtableid] = db.tables[oldtableid];
			delete db.tables[oldtableid];
			res = 1;
		};
		if(cb) cb(res)
		return res;
	}
};

