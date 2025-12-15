/*
//
// DELETE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Delete = function (params) {
	return Object.assign(this, params);
};
yy.Delete.prototype.toString = function () {
	var s = 'DELETE FROM ' + this.table.toString();
	if (this.where) s += ' WHERE ' + this.where.toString();
	if (this.output) {
		s += ' OUTPUT ';
		s += this.output.columns.map(col => col.toString()).join(', ');
		if (this.output.intovar) {
			s += ' INTO ' + this.output.method + this.output.intovar;
		} else if (this.output.intotable) {
			s += ' INTO ' + this.output.intotable.toString();
			if (this.output.intocolumns) {
				s += '(' + this.output.intocolumns.map(col => col.toString()).join(', ') + ')';
			}
		}
	}
	return s;
};

yy.Delete.prototype.compile = function (databaseid) {
	var self = this;

	// Handle ParamValue (anonymous data table) - wrap execution
	if (this.table instanceof yy.ParamValue) {
		return yy.compileParamValue(this.table.param, 'DELETE', true, databaseid, self, 'table');
	}

	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	var statement;
	var db = alasql.databases[databaseid];

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

		var wherefn = new Function(
			'r,params,alasql',
			'var y;return (' + this.where.toJS('r', '') + ')'
		).bind(this);

		statement = function (params, cb) {
			if (db.engineid && alasql.engines[db.engineid].deleteFromTable) {
				return alasql.engines[db.engineid].deleteFromTable(
					databaseid,
					tableid,
					wherefn,
					params,
					cb
				);
			}

			if (
				alasql.options.autocommit &&
				db.engineid &&
				(db.engineid == 'LOCALSTORAGE' || db.engineid == 'FILESTORAGE')
			) {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var table = db.tables[tableid];
			var orignum = table.data.length;

			var newtable = [];
			var deletedRows = [];
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				if (wherefn(table.data[i], params, alasql)) {
					// Track deleted row for OUTPUT clause and AFTER DELETE trigger
					if (self.output || table.afterdelete) {
						deletedRows.push(cloneDeep(table.data[i]));
					}
					// Check for transaction - if it is not possible then return all back
					if (table.delete) {
						table.delete(i, params, alasql);
					} else {
						// Simply do not push
					}
				} else {
					newtable.push(table.data[i]);
				}
			}
			table.data = newtable;

			// AFTER DELETE triggers - call for each deleted row
			// Note: Triggers are called once per row per trigger (row-level triggers)
			// For N deleted rows and M triggers, this results in N×M trigger calls
			if (table.afterdelete) {
				for (var i = 0; i < deletedRows.length; i++) {
					for (var tr in table.afterdelete) {
						var trigger = table.afterdelete[tr];
						if (trigger) {
							alasql.executeTrigger(trigger, databaseid, deletedRows[i]);
						}
					}
				}
			}

			var res = orignum - table.data.length;

			// Handle OUTPUT clause
			if (self.output) {
				var output = [];
				for (var i = 0; i < deletedRows.length; i++) {
					var r = deletedRows[i];
					var outputRow = {};
					self.output.columns.forEach(function (col) {
						if (col.columnid === '*') {
							// For *, expand all properties
							for (var key in r) {
								outputRow[key] = r[key];
							}
						} else {
							var colname = col.as || col.columnid;
							// Direct property access
							outputRow[colname] = r[col.columnid];
						}
					});
					output.push(outputRow);
				}
				res = output;
			}

			if (
				alasql.options.autocommit &&
				db.engineid &&
				(db.engineid == 'LOCALSTORAGE' || db.engineid == 'FILESTORAGE')
			) {
				alasql.engines[db.engineid].saveTableData(databaseid, tableid);
			}

			if (cb) res = cb(res);

			return res;
		};
	} else {
		statement = function (params, cb) {
			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var table = db.tables[tableid];
			table.dirty = true;
			var orignum = db.tables[tableid].data.length;

			// Track deleted rows for OUTPUT clause
			var deletedRows = [];
			if (self.output) {
				deletedRows = table.data.map(function (row) {
					return cloneDeep(row);
				});
			}

			// Delete all records from the array
			db.tables[tableid].data.length = 0;

			// Reset PRIMARY KEY and indexes
			for (var ix in db.tables[tableid].uniqs) {
				db.tables[tableid].uniqs[ix] = {};
			}

			for (var ix in db.tables[tableid].indices) {
				db.tables[tableid].indices[ix] = {};
			}

			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].saveTableData(databaseid, tableid);
			}

			var res = orignum;

			// Handle OUTPUT clause
			if (self.output) {
				var output = [];
				for (var i = 0; i < deletedRows.length; i++) {
					var r = deletedRows[i];
					var outputRow = {};
					self.output.columns.forEach(function (col) {
						if (col.columnid === '*') {
							// For *, expand all properties
							for (var key in r) {
								outputRow[key] = r[key];
							}
						} else {
							var colname = col.as || col.columnid;
							// Direct property access
							outputRow[colname] = r[col.columnid];
						}
					});
					output.push(outputRow);
				}
				res = output;
			}

			if (cb) cb(res);
			return res;
		};
	}

	return statement;
};

yy.Delete.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
