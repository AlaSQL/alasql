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

yy.AlterTable.prototype.execute = function (databaseid, params, cb) {
	var dbid = this.table.databaseid || databaseid;
	let db = alasql.databases[dbid];
	schemaChanged(db);

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

	// A table in a storage engine is loaded before the change and saved after it, as INSERT,
	// UPDATE and DELETE do. Without this the change is lost on the next statement (#1107)
	var tableid = this.table.tableid;
	var engine = alasql.options.autocommit && db.engineid && alasql.engines[db.engineid];
	if (engine && engine.loadTableData) {
		engine.loadTableData(dbid, tableid);
	}
	var res = this.alterColumn(db.tables[tableid], tableid);
	if (engine && engine.saveTableData) {
		engine.saveTableData(dbid, tableid);
	}
	return cb ? cb(res) : res;
};

/**
 Add, modify, rename or drop a column of a table in memory
 @return {number} 1, or the number of rows for RENAME COLUMN and DROP COLUMN
 */
yy.AlterTable.prototype.alterColumn = function (table, tableid) {
	if (this.addcolumn) {
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

		return 1;
	}

	if (this.modifycolumn) {
		var columnid = this.modifycolumn.columnid;

		if (!table.xcolumns[columnid]) {
			throw new Error(
				`Cannot modify column "${columnid}" because it was not found in table "${tableid}"`
			);
		}

		var col = table.xcolumns[columnid];
		col.dbtypeid = this.modifycolumn.dbtypeid;
		col.dbsize = this.modifycolumn.dbsize;
		col.dbprecision = this.modifycolumn.dbprecision;
		col.dbenum = this.modifycolumn.dbenum;

		return 1;
	}

	if (this.renamecolumn) {
		var columnid = this.renamecolumn;
		var tocolumnid = this.to;

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
			delete table.xcolumns[columnid];

			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				table.data[i][tocolumnid] = table.data[i][columnid];
				delete table.data[i][columnid];
			}
			return table.data.length;
		}
		return 0;
	}

	if (this.dropcolumn) {
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

		return table.data.length;
	}

	throw Error('Unknown ALTER TABLE method');
};
