/*
//
// ALTER TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// ALTER TABLE table1 RENAME TO table2
yy.AlterTable = function (params) { return yy.extend(this, params); }
yy.AlterTable.prototype.compile = function (db) {
	if(this.newName.value != this.target.value) {
		db.tables[this.newName.value] = db.tables[this.target.value];
		delete db.tables[this.target.value];
	}
	return 1;
};

