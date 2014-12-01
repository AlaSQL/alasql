/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = K('DROP')+' '+K('TABLE');
	if(this.ifexists) s += ' '+K('IF')+' '+K('EXISTS');
	s += ' '+this.table.toString();
	return s;
}


// DROP TABLE
yy.DropTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
	console.log(db, this.table.databaseid );
	if(db.engineid) {
		return alasql.engines[db.engineid].dropTable(this.table.databaseid || databaseid,tableid, this.ifexists, cb);
	}
	if(!this.ifexists || this.ifexists && db.tables[tableid]) {
		if(!db.tables[tableid]) {
			if(!alasql.options.dropifnotexists) {
				throw new Error('Can not drop table \''+this.table.tableid+'\', because it does not exist in the database.');
			}
		} else {
			delete db.tables[tableid];
			return 1;
		}
	}
	return 0;
};
