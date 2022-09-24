/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropTable = function (params) {
	return yy.extend(this, params);
};
yy.DropTable.prototype.toString = function () {
	var s = 'DROP' + ' ';
	if (this.view) s += 'VIEW';
	else s += 'TABLE';
	if (this.ifexists) s += ' IF EXISTS';
	s += ' ' + this.tables.toString();
	return s;
};

// DROP TABLE
/**
	Drop tables
	@param {string} databaseid Database id
	@param {object} params Parameters
	@param {callback} cb Callback function
	@return Number of dropped tables
	@example
	DROP TABLE one;
	DROP TABLE IF NOT EXISTS two, three;
*/
yy.DropTable.prototype.execute = function (databaseid, params, cb) {
	var ifexists = this.ifexists;
	var res = 0; // No tables removed
	var count = 0;
	var tlen = this.tables.length;

	// For each table in the list
	this.tables.forEach(function (table) {
		var db = alasql.databases[table.databaseid || databaseid];
		var tableid = table.tableid;

		/** @todo Test with AUTOCOMMIT flag is ON */
		/** @todo Test with IndexedDB and multiple tables */

		if (!ifexists || (ifexists && db.tables[tableid])) {
			if (!db.tables[tableid]) {
				if (!alasql.options.dropifnotexists) {
					throw new Error(
						"Can not drop table '" + table.tableid + "', because it does not exist in the database."
					);
				}
			} else {
				if (db.engineid /*&& alasql.options.autocommit*/) {
					alasql.engines[db.engineid].dropTable(
						table.databaseid || databaseid,
						tableid,
						ifexists,
						function (res1) {
							delete db.tables[tableid];
							res += res1;
							count++;
							if (count == tlen && cb) cb(res);
						}
					);
				} else {
					delete db.tables[tableid];
					res++;
					count++;
					if (count == tlen && cb) cb(res);
				}
			}
		} else {
			count++;
			if (count == tlen && cb) cb(res);
		}
	});
	// if(cb) res = cb(res);
	return res;
};

yy.TruncateTable = function (params) {
	return yy.extend(this, params);
};
yy.TruncateTable.prototype.toString = function () {
	var s = 'TRUNCATE TABLE';
	s += ' ' + this.table.toString();
	return s;
};

yy.TruncateTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
	if (db.engineid) {
		return alasql.engines[db.engineid].truncateTable(
			this.table.databaseid || databaseid,
			tableid,
			this.ifexists,
			cb
		);
	}
	if (db.tables[tableid]) {
		db.tables[tableid].data = [];
	} else {
		throw new Error('Cannot truncate table becaues it does not exist');
	}
	return cb ? cb(0) : 0;
};
