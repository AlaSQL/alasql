/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = 'DROP TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.table.toString();
	return s;
}


// DROP TABLE
yy.DropTable.prototype.execute = function (databaseid) {
	var db = alasql.databases[databaseid];
	var tableid = this.table.tableid;
	if(!this.ifexists || this.ifexists && db.tables[tableid]) {
		if(!db.tables[tableid]) {
			throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
		} else {
			delete db.tables[tableid];
			return 1;
		}
	}
	return 0;
};
