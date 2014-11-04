
yy.ColumnDef = function (params) { return yy.extend(this, params); }
yy.ColumnDef.prototype.toString = function() {
	var s =  this.columnid;
	if(this.dbtypeid) s += ' '+this.dbtypeid;
	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+this.dbprecision;
		s += ')';
	};
	if(this.primarykey) s += ' PRIMARY KEY';
	if(this.notnull) s += ' NOT NULL';
	return s;
}

yy.CreateTable = function (params) { return yy.extend(this, params); }
yy.CreateTable.prototype.toString = function() {
	var s = 'CREATE';
	if(this.temporary) s+=' TEMPORARY';
	s += ' TABLE';
	if(this.ifnotexists) s += ' IF NOT EXISTS';
	s += ' '+this.table.toString();
	if(this.as) s += ' AS '+this.as;
	else { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+ss.join(',')+')';
	}
	return s;
}

yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = 'DROP TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.table.toString();
	return s;
}


// CREATE TABLE
nodes.CreateTable.prototype.exec = function (db) {

	if(this.ifNotExists && !db.tables[this.target.value] || !this.ifNotExists) {

		if(db.tables[this.target.value]) throw new Error('Can not create table \''+this.target.value+'\', because it already exists in the database.');

		var table = db.tables[this.target.value] = {};
		var flds = table.flds = [];
		this.fieldDef.forEach(function(fd) {
			flds.push({
				fldid: fd.field.value.toLowerCase(),
				dbtypeid: fd.type.value.toUpperCase() // TODO: Add types table
			});
		});

		// Index fields definitions
		table.xflds = {};
		table.flds.forEach(function(fld){
			table.xflds[fld.fldid] = fld;
		});

		table.recs = [];
	};
	return 1;
};

// DROP TABLE
nodes.DropTable.prototype.exec = function (db) {
	if(this.ifExists && db.tables[this.target.value] || !this.ifExists) {
		if(!db.tables[this.target.value]) throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
		delete db.tables[this.target.value];
	}
	return 1;
};

// ALTER TABLE table1 RENAME TO table2
nodes.AlterTable.prototype.exec = function (db) {
	if(this.newName.value != this.target.value) {
		db.tables[this.newName.value] = db.tables[this.target.value];
		delete db.tables[this.target.value];
	}
	return 1;
};

