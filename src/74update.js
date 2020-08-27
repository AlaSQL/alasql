/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy alasql */

yy.Update = function (params) {
	return yy.extend(this, params);
};
yy.Update.prototype.toString = function () {
	var s = 'UPDATE ' + this.table.toString();
	if (this.columns) s += ' SET ' + this.columns.toString();
	if (this.where) s += ' WHERE ' + this.where.toString();
	return s;
};

yy.SetColumn = function (params) {
	return yy.extend(this, params);
};
yy.SetColumn.prototype.toString = function () {
	return this.column.toString() + '=' + this.expression.toString();
};

yy.Update.prototype.compile = function (databaseid) {
	//	console.log(this);
	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;

	if (this.where) {
		if (this.exists) {
			this.existsfn = this.exists.map(function (ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
		if (this.queries) {
			this.queriesfn = this.queries.map(function (q) {
				var nq = q.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}

		// console.log(73625, this.where.toJS('r', ''));
		var wherefn = new Function('r,params,alasql', 'var y;return ' + this.where.toJS('r', '')).bind(
			this
		);
	}

	// Construct update function
	var s = alasql.databases[databaseid].tables[tableid].onupdatefns || '';
	s += ';';
	this.columns.forEach(function (col) {
		s += "r['" + col.column.columnid + "']=" + col.expression.toJS('r', '') + ';';
	});
	// console.log(423623, s);
	var assignfn = new Function('r,params,alasql', 'var y;' + s);

	var statement = function (params, cb) {
		var db = alasql.databases[databaseid];

		//		console.log(db.engineid);
		//		console.log(db.engineid && alasql.engines[db.engineid].updateTable);
		if (db.engineid && alasql.engines[db.engineid].updateTable) {
			//			console.log('updateTable');
			return alasql.engines[db.engineid].updateTable(
				databaseid,
				tableid,
				assignfn,
				wherefn,
				params,
				cb
			);
		}

		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].loadTableData(databaseid, tableid);
		}

		var table = db.tables[tableid];
		if (!table) {
			throw new Error("Table '" + tableid + "' not exists");
		}
		//		table.dirty = true;
		var numrows = 0;
		for (var i = 0, ilen = table.data.length; i < ilen; i++) {
			if (!wherefn || wherefn(table.data[i], params, alasql)) {
				if (table.update) {
					table.update(assignfn, i, params);
				} else {
					assignfn(table.data[i], params, alasql);
				}
				numrows++;
			}
		}

		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid, tableid);
		}

		if (cb) cb(numrows);
		return numrows;
	};
	return statement;
};

yy.Update.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
