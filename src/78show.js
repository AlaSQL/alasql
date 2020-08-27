/*
//
// SHOW for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ShowDatabases = function (params) {
	return yy.extend(this, params);
};
yy.ShowDatabases.prototype.toString = function () {
	var s = 'SHOW DATABASES';
	if (this.like) s += 'LIKE ' + this.like.toString();
	return s;
};
yy.ShowDatabases.prototype.execute = function (databaseid, params, cb) {
	if (this.engineid) {
		return alasql.engines[this.engineid].showDatabases(this.like, cb);
	} else {
		var self = this;
		var res = [];
		for (var dbid in alasql.databases) {
			res.push({databaseid: dbid});
		}
		if (self.like && res && res.length > 0) {
			res = res.filter(function (d) {
				//				return d.databaseid.match(new RegExp((self.like.value||'').replace(/\%/g,'.*').replace(/\?|_/g,'.'),'g'));
				return alasql.utils.like(self.like.value, d.databaseid);
			});
		}
		if (cb) cb(res);
		return res;
	}
};

yy.ShowTables = function (params) {
	return yy.extend(this, params);
};
yy.ShowTables.prototype.toString = function () {
	var s = 'SHOW TABLES';
	if (this.databaseid) s += ' FROM ' + this.databaseid;
	if (this.like) s += ' LIKE ' + this.like.toString();
	return s;
};
yy.ShowTables.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.databaseid || databaseid];

	var self = this;
	var res = [];
	for (var tableid in db.tables) {
		res.push({tableid: tableid});
	}
	if (self.like && res && res.length > 0) {
		res = res.filter(function (d) {
			//return d.tableid.match(new RegExp((self.like.value||'').replace(/\%/g,'.*').replace(/\?|_/g,'.'),'g'));
			return alasql.utils.like(self.like.value, d.tableid);
		});
	}
	if (cb) cb(res);
	return res;
};

yy.ShowColumns = function (params) {
	return yy.extend(this, params);
};
yy.ShowColumns.prototype.toString = function () {
	var s = 'SHOW COLUMNS';
	if (this.table.tableid) s += ' FROM ' + this.table.tableid;
	if (this.databaseid) s += ' FROM ' + this.databaseid;
	return s;
};

yy.ShowColumns.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];

	if (table && table.columns) {
		var res = table.columns.map(function (col) {
			return {columnid: col.columnid, dbtypeid: col.dbtypeid, dbsize: col.dbsize};
		});
		if (cb) cb(res);
		return res;
	} else {
		if (cb) cb([]);
		return [];
	}
};

yy.ShowIndex = function (params) {
	return yy.extend(this, params);
};
yy.ShowIndex.prototype.toString = function () {
	var s = 'SHOW INDEX';
	if (this.table.tableid) s += ' FROM ' + this.table.tableid;
	if (this.databaseid) s += ' FROM ' + this.databaseid;
	return s;
};
yy.ShowIndex.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var res = [];
	if (table && table.indices) {
		for (var ind in table.indices) {
			res.push({hh: ind, len: Object.keys(table.indices[ind]).length});
		}
	}

	if (cb) cb(res);
	return res;
};

yy.ShowCreateTable = function (params) {
	return yy.extend(this, params);
};
yy.ShowCreateTable.prototype.toString = function () {
	var s = 'SHOW CREATE TABLE ' + this.table.tableid;
	if (this.databaseid) s += ' FROM ' + this.databaseid;
	return s;
};
yy.ShowCreateTable.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	if (table) {
		var s = 'CREATE TABLE ' + this.table.tableid + ' (';
		var ss = [];
		if (table.columns) {
			table.columns.forEach(function (col) {
				var a = col.columnid + ' ' + col.dbtypeid;
				if (col.dbsize) a += '(' + col.dbsize + ')';
				if (col.primarykey) a += ' PRIMARY KEY';
				// TODO extend
				ss.push(a);
			});
			s += ss.join(', ');
		}
		s += ')';
		return s;
	} else {
		throw new Error('There is no such table "' + this.table.tableid + '"');
	}
};
