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
yy.DropTable.prototype.compile = function (db) {
	var ifexists = this.ifexists;
	var tableid = this.table.tableid;
	return function() {
		if(!ifexists || ifexists && db.tables[tableid]) {
			if(!db.tables[tableid]) throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
			delete db.tables[tableid];
		}
		return 1;
	}
};
