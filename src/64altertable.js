/*
//
// ALTER TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/
/* global alasql yy */

// ALTER TABLE table1 RENAME TO table2
yy.AlterTable = function (params) {
	return Object.assign(this, params);
};
yy.AlterTable.prototype.toString = function () {
	let s = 'ALTER TABLE ' + this.table.toString();
	if (this.renameto) s += ' RENAME TO ' + this.renameto;
	return s;
};

/**
 * Load a table object for ALTER, restoring from the storage engine when needed.
 * With engines like LOCALSTORAGE + autocommit, db.tables[tableid] may only be a stub,
 * or schema may remain in memory while table.data was cleared after saveTableData().
 */
function getTableForAlter(db, databaseid, tableid) {
	var table = db.tables[tableid];
	var engine = db.engineid && alasql.engines[db.engineid] ? alasql.engines[db.engineid] : null;
	var needsRestore =
		!table || table === true || !Array.isArray(table.columns) || !Array.isArray(table.data);

	if (engine && needsRestore) {
		if (typeof engine.restoreTable === 'function') {
			// LOCALSTORAGE: restore full schema + data from storage
			table = engine.restoreTable(databaseid, tableid);
		} else if (typeof engine.loadTableData === 'function') {
			// FILESTORAGE and similar: ensure a real Table and load row data
			if (!table || table === true || !Array.isArray(table.columns)) {
				var stored =
					db.data && db.data.tables && db.data.tables[tableid] ? db.data.tables[tableid] : null;
				if (!stored || !Array.isArray(stored.columns)) {
					throw new Error('Table "' + tableid + '" could not be found');
				}
				table = db.tables[tableid] = new alasql.Table({
					columns: stored.columns.slice(),
					defaultfns: stored.defaultfns,
					onupdatefns: stored.onupdatefns,
				});
				table.indexColumns();
			}
			engine.loadTableData(databaseid, tableid);
			table = db.tables[tableid];
		}
	}

	if (!table || table === true || !Array.isArray(table.columns)) {
		throw new Error('Table "' + tableid + '" could not be found');
	}
	if (!table.xcolumns) {
		if (typeof table.indexColumns === 'function') {
			table.indexColumns();
		} else {
			// Plain schema object without Table methods
			table.xcolumns = {};
			table.columns.forEach(function (col) {
				table.xcolumns[col.columnid] = col;
			});
		}
	}
	if (!Array.isArray(table.data)) {
		// Prefer loading over silently treating as empty (would wipe storage on persist)
		if (engine && typeof engine.loadTableData === 'function') {
			engine.loadTableData(databaseid, tableid);
		}
		if (!Array.isArray(table.data)) {
			table.data = [];
		}
	}
	return table;
}

/**
 * Persist table schema and data after ALTER when using an external storage engine.
 */
function persistTableAfterAlter(db, databaseid, tableid) {
	if (!db.engineid || !alasql.engines[db.engineid]) {
		return;
	}
	var engine = alasql.engines[db.engineid];
	if (typeof engine.storeTable === 'function') {
		engine.storeTable(databaseid, tableid);
	} else if (typeof engine.commit === 'function') {
		// Fallback for engines that only expose commit
		engine.commit(databaseid);
	}
}

yy.AlterTable.prototype.execute = function (databaseid, params, cb) {
	let db = alasql.databases[databaseid];
	db.dbversion = Date.now();

	if (this.renameto) {
		var oldtableid = this.table.tableid;
		var newtableid = this.renameto;
		var res = 1;
		if (db.tables[newtableid]) {
			throw new Error(
				`Can not rename a table "${oldtableid}" to "${newtableid}" because the table with this name already exists`
			);
		} else if (newtableid === oldtableid) {
			throw new Error(`Can not rename a table "${oldtableid}" to itself`);
		} else {
			db.tables[newtableid] = db.tables[oldtableid];
			delete db.tables[oldtableid];
			res = 1;
		}
		if (cb) cb(res);
		return res;
	}

	if (this.addcolumn) {
		db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = getTableForAlter(db, this.table.databaseid || databaseid, tableid);
		var columnid = this.addcolumn.columnid;
		if (table.xcolumns[columnid]) {
			throw new Error(
				`Cannot add column "${columnid}" because it already exists in table "${tableid}"`
			);
		}

		var col = {
			columnid: columnid,
			dbtypeid: this.addcolumn.dbtypeid,
			dbsize: this.addcolumn.dbsize,
			dbprecision: this.addcolumn.dbprecision,
			dbenum: this.addcolumn.dbenum,
			defaultfns: null, // TODO defaultfns!!!
		};

		var defaultfn = function () {};

		table.columns.push(col);
		table.xcolumns[columnid] = col;

		for (let i = 0, ilen = table.data.length; i < ilen; i++) {
			table.data[i][columnid] = defaultfn();
		}

		persistTableAfterAlter(db, this.table.databaseid || databaseid, tableid);

		return cb ? cb(1) : 1;
	}

	if (this.modifycolumn) {
		db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = getTableForAlter(db, this.table.databaseid || databaseid, tableid);
		var columnid = this.modifycolumn.columnid;

		if (!table.xcolumns[columnid]) {
			throw new Error(
				`Cannot modify column "${columnid}" because it was not found in table "${tableid}"`
			);
		}

		col = table.xcolumns[columnid];
		col.dbtypeid = this.modifycolumn.dbtypeid;
		col.dbsize = this.modifycolumn.dbsize;
		col.dbprecision = this.modifycolumn.dbprecision;
		col.dbenum = this.modifycolumn.dbenum;

		persistTableAfterAlter(db, this.table.databaseid || databaseid, tableid);

		return cb ? cb(1) : 1;
	}

	if (this.renamecolumn) {
		db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;

		var tableid = this.table.tableid;
		var table = getTableForAlter(db, this.table.databaseid || databaseid, tableid);
		var columnid = this.renamecolumn;
		var tocolumnid = this.to;

		var col;
		if (!table.xcolumns[columnid]) {
			throw new Error('Column "' + columnid + '" is not found in the table "' + tableid + '"');
		}
		if (table.xcolumns[tocolumnid]) {
			throw new Error('Column "' + tocolumnid + '" already exists in the table "' + tableid + '"');
		}

		if (columnid != tocolumnid) {
			for (var j = 0; j < table.columns.length; j++) {
				if (table.columns[j].columnid == columnid) {
					table.columns[j].columnid = tocolumnid;
				}
			}

			table.xcolumns[tocolumnid] = table.xcolumns[columnid];
			table.xcolumns[tocolumnid].columnid = tocolumnid;
			delete table.xcolumns[columnid];

			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				table.data[i][tocolumnid] = table.data[i][columnid];
				delete table.data[i][columnid];
			}

			persistTableAfterAlter(db, this.table.databaseid || databaseid, tableid);

			return cb ? cb(table.data.length) : table.data.length;
		}
		return cb ? cb(0) : 0;
	}

	if (this.dropcolumn) {
		db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = getTableForAlter(db, this.table.databaseid || databaseid, tableid);
		var columnid = this.dropcolumn;

		var found = false;
		for (var j = 0; j < table.columns.length; j++) {
			if (table.columns[j].columnid == columnid) {
				found = true;
				table.columns.splice(j, 1);
				break;
			}
		}

		if (!found) {
			throw new Error(
				`Cannot drop column "${columnid}" because it was not found in the table ${tableid}"`
			);
		}

		delete table.xcolumns[columnid];

		for (i = 0, ilen = table.data.length; i < ilen; i++) {
			delete table.data[i][columnid];
		}

		persistTableAfterAlter(db, this.table.databaseid || databaseid, tableid);

		return cb ? cb(table.data.length) : table.data.length;
	}

	throw Error('Unknown ALTER TABLE method');
};
