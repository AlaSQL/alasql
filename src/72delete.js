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

// Helper function to apply CASCADE delete operations recursively
function applyCascadeDeletes(db, databaseid, tableid, row, params, alasql) {
	// Check all child tables that reference this table
	for (var childTableId in db.tables) {
		var childTable = db.tables[childTableId];
		if (!childTable.foreignKeys) continue;
		
		childTable.foreignKeys.forEach(function(fk) {
			// Check if this foreign key references the table we're deleting from
			if (fk.fktable === tableid && fk.fkdatabase === databaseid) {
				// Build the parent key values
				var parentKeyValues = fk.fkcolumns.map(function(col) {
					return row[col];
				});
				
				// Find matching child rows - store row references, not indices
				var childRowsToProcess = [];
				for (var j = 0; j < childTable.data.length; j++) {
					var childRow = childTable.data[j];
					var matches = true;
					for (var k = 0; k < fk.columns.length; k++) {
						if (childRow[fk.columns[k]] !== parentKeyValues[k]) {
							matches = false;
							break;
						}
					}
					if (matches) {
						childRowsToProcess.push(childRow);
					}
				}
				
				// Apply the appropriate action based on ondelete
				if (childRowsToProcess.length > 0) {
					if (fk.ondelete === 'RESTRICT' || fk.ondelete === 'NO ACTION') {
						throw new Error('Cannot delete row from table "' + tableid + '" because it has dependent rows in table "' + childTableId + '"');
					} else if (fk.ondelete === 'CASCADE') {
						// First, recursively cascade delete for each child row
						childRowsToProcess.forEach(function(childRow) {
							applyCascadeDeletes(db, databaseid, childTableId, childRow, params, alasql);
						});
						
						// Then delete child rows - find current index for each row
						childRowsToProcess.forEach(function(childRow) {
							var idx = childTable.data.indexOf(childRow);
							if (idx !== -1) {
								if (childTable.delete) {
									childTable.delete(idx, params, alasql);
								}
								childTable.data.splice(idx, 1);
							}
						});
					} else if (fk.ondelete === 'SET NULL') {
						// Set foreign key columns to NULL
						childRowsToProcess.forEach(function(childRow) {
							fk.columns.forEach(function(col) {
								var colDef = childTable.xcolumns[col];
								if (colDef && colDef.notnull) {
									throw new Error('Cannot SET NULL on NOT NULL column "' + col + '" in table "' + childTableId + '"');
								}
								childRow[col] = null;
							});
						});
					} else if (fk.ondelete === 'SET DEFAULT') {
						// Set foreign key columns to their default values
						childRowsToProcess.forEach(function(childRow) {
							fk.columns.forEach(function(col) {
								// Find the column definition to get default value
								var colDef = childTable.xcolumns[col];
								if (colDef && colDef.default !== undefined) {
									childRow[col] = colDef.default;
								} else if (colDef && colDef.notnull) {
									throw new Error('Cannot SET DEFAULT to NULL on NOT NULL column "' + col + '" in table "' + childTableId + '" without a DEFAULT value');
								} else {
									childRow[col] = null;
								}
							});
						});
					}
				}
			}
		});
	}
}

yy.Delete.prototype.compile = function (databaseid) {
	var self = this;
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
			var rowsToDelete = []; // Track rows to delete for CASCADE processing
			
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				if (wherefn(table.data[i], params, alasql)) {
					rowsToDelete.push(table.data[i]);
					// Track deleted row for OUTPUT clause
					if (self.output) {
						deletedRows.push(cloneDeep(table.data[i]));
					}
				} else {
					newtable.push(table.data[i]);
				}
			}
			
			// Process CASCADE operations before actually deleting
			rowsToDelete.forEach(function(row) {
				applyCascadeDeletes(db, databaseid, tableid, row, params, alasql);
			});
			
			// Call table.delete for each row to update indices (only if indices exist)
			if (table.pk || (table.uk && table.uk.length)) {
				rowsToDelete.forEach(function(row) {
					var idx = table.data.indexOf(row);
					if (idx !== -1 && table.delete) {
						table.delete(idx, params, alasql);
					}
				});
			}
			
			table.data = newtable;

			// Trigger prevent functionality
			for (var tr in table.afterdelete) {
				var trigger = table.afterdelete[tr];
				if (trigger) {
					if (trigger.funcid) {
						alasql.fn[trigger.funcid]();
					} else if (trigger.statement) {
						trigger.statement.execute(databaseid);
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
			
			// Copy all rows to delete
			var rowsToDelete = table.data.slice();
			
			// Process CASCADE operations for all rows before deleting
			rowsToDelete.forEach(function(row) {
				applyCascadeDeletes(db, databaseid, tableid, row, params, alasql);
			});

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
