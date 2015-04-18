/*
//
// SHOW for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ShowDatabases = function (params) { return yy.extend(this, params); }
yy.ShowDatabases.prototype.toString = function() {
	var s = K('SHOW')+' '+K('DATABASES');
	if(this.like) s += 'LIKE '+this.like.toString();
	return s;
}
yy.ShowDatabases.prototype.execute = function (databaseid, params, cb) {
	if(this.engineid) {
		return alasql.engines[this.engineid].showDatabases(this.like, cb);
	} else {
		var self = this;
		var res = [];
		for(dbid in alasql.databases) {
			res.push({databaseid: dbid});
		};
		if(self.like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(new RegExp((self.like.value).replace(/\%/g,'.*'),'g'));
			});
		}
		if(cb) cb(res);
		return res;
	};

};


yy.ShowTables = function (params) { return yy.extend(this, params); }
yy.ShowTables.prototype.toString = function() {
	var s = K('SHOW')+' '+K('TABLES');
	if(this.databaseid) s += ' FROM '+this.databaseid;
	if(this.like) s += ' '+K('LIKE')+' '+this.like.toString();
	return s;
}
yy.ShowTables.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.databaseid || databaseid];

	var self = this;
	var res = [];
	for(tableid in db.tables) {
		res.push({tableid: tableid});
	};
	if(self.like && res && res.length > 0) {
		res = res.filter(function(d){
			return d.tableid.match(new RegExp((self.like.value).replace(/\%/g,'.*'),'g'));
		});
	};
	if(cb) cb(res);
	return res;
};

yy.ShowColumns = function (params) { return yy.extend(this, params); }
yy.ShowColumns.prototype.toString = function() {
	var s = K('SHOW')+' '+K('COLUMNS');
	if(this.table.tableid) s += ' '+K('FROM')+' '+this.table.tableid;
	if(this.databaseid) s += ' '+K('FROM')+' '+this.databaseid;
	return s;
};

yy.ShowColumns.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	if(table && table.columns) {
		var res = table.columns.map(function(col){
			return {columnid: col.columnid, dbtypeid: col.dbtypeid, dbsize: col.dbsize};
		});
		return res;
	} else {
		return [];
	}
};

yy.ShowIndex = function (params) { return yy.extend(this, params); }
yy.ShowIndex.prototype.toString = function() {
	var s = K('SHOW')+' '+K('INDEX');
	if(this.table.tableid) s += ' '+K('FROM')+' '+this.table.tableid;
	if(this.databaseid) s += ' '+K('FROM')+' '+this.databaseid;
	return s;
}
yy.ShowIndex.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	var res = [];
	if(table && table.indices) {
		for(var ind in table.indices) {
			res.push({hh:ind, len:Object.keys(table.indices[ind]).length});
		}
	}
	return res;
};

yy.ShowCreateTable = function (params) { return yy.extend(this, params); }
yy.ShowCreateTable.prototype.toString = function() {
	var s = K('SHOW')+' '+K('CREATE')+' '+K('TABLE')+' '+L(this.table.tableid);
	if(this.databaseid) s += ' '+K('FROM')+' '+L(this.databaseid);
	return s;
}
yy.ShowCreateTable.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	if(table) {
		var s = K('CREATE')+' '+K('TABLE')+' '+L(this.table.tableid)+' (';
		var ss = [];
		if(table.columns) {
			table.columns.forEach(function(col){
				var a = L(col.columnid)+' '+K(col.dbtypeid);
				if(col.dbsize) a += '('+N(col.dbsize)+')';
				if(col.primarykey) a += ' '+K('PRIMARY')+' '+K('KEY');
				// TODO extend
				ss.push(a); 
			});
			s += ss.join(', ');
		};
		s += ')';
		return s;
	} else {
		throw new Error('There is no such table "'+this.table.tableid+'"');
	}
};
