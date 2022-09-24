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
	return yy.extend(this, params);
};
yy.AlterTable.prototype.toString = function () {
	var s = 'ALTER TABLE ' + this.table.toString();
	if (this.renameto) s += ' RENAME TO ' + this.renameto;
	return s;
};

yy.AlterTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[databaseid];
	db.dbversion = Date.now();

	if (this.renameto) {
		var oldtableid = this.table.tableid;
		var newtableid = this.renameto;
		var res = 1;
		if (db.tables[newtableid]) {
			throw new Error(
				"Can not rename a table '" +
					oldtableid +
					"' to '" +
					newtableid +
					"', because the table with this name already exists"
			);
		} else if (newtableid === oldtableid) {
			throw new Error("Can not rename a table '" + oldtableid + "' to itself");
		} else {
			db.tables[newtableid] = db.tables[oldtableid];
			delete db.tables[oldtableid];
			res = 1;
		}
		if (cb) cb(res);
		return res;
	} else if (this.addcolumn) {
		db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.addcolumn.columnid;
		if (table.xcolumns[columnid]) {
			throw new Error(
				'Cannot add column "' +
					columnid +
					'", because it already exists in the table "' +
					tableid +
					'"'
			);
		}

		var col = {
			columnid: columnid,
			dbtypeid: this.addcolumn.dbtypeid,
			dbsize: this.dbsize,
			dbprecision: this.dbprecision,
			dbenum: this.dbenum,
			defaultfns: null, // TODO defaultfns!!!
		};

		var defaultfn = function () {};

		table.columns.push(col);
		table.xcolumns[columnid] = col;

		for (var i = 0, ilen = table.data.length; i < ilen; i++) {
			//				console.log(table.data[i][columnid]);
			table.data[i][columnid] = defaultfn();
		}

		// TODO
		return cb ? cb(1) : 1;
	} else if (this.modifycolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.modifycolumn.columnid;

		if (!table.xcolumns[columnid]) {
			throw new Error(
				'Cannot modify column "' +
					columnid +
					'", because it was not found in the table "' +
					tableid +
					'"'
			);
		}

		col = table.xcolumns[columnid];
		col.dbtypeid = this.dbtypeid;
		col.dbsize = this.dbsize;
		col.dbprecision = this.dbprecision;
		col.dbenum = this.dbenum;

		// TODO
		return cb ? cb(1) : 1;
	} else if (this.renamecolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;

		var tableid = this.table.tableid;
		var table = db.tables[tableid];
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
			delete table.xcolumns[columnid];

			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				//				console.log(table.data[i][columnid]);
				table.data[i][tocolumnid] = table.data[i][columnid];
				delete table.data[i][columnid];
			}
			return table.data.length;
		} else {
			return cb ? cb(0) : 0;
		}
	} else if (this.dropcolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
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
				'Cannot drop column "' +
					columnid +
					'", because it was not found in the table "' +
					tableid +
					'"'
			);
		}

		delete table.xcolumns[columnid];

		for (i = 0, ilen = table.data.length; i < ilen; i++) {
			delete table.data[i][columnid];
		}
		return cb ? cb(table.data.length) : table.data.length;
	} else {
		throw Error('Unknown ALTER TABLE method');
	}
};
