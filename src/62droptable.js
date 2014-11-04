
yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = 'DROP TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.table.toString();
	return s;
}


// DROP TABLE
yy.DropTable.prototype.compile = function (db) {
	if(this.ifExists && db.tables[this.target.value] || !this.ifExists) {
		if(!db.tables[this.target.value]) throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
		delete db.tables[this.target.value];
	}
	return 1;
};
