/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy alasql */

yy.Update = function (params) {
	return Object.assign(this, params);
};
yy.Update.prototype.toString = function () {
	var s = 'UPDATE ' + this.table.toString();
	if (this.columns) s += ' SET ' + this.columns.toString();
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

yy.SetColumn = function (params) {
	return Object.assign(this, params);
};
yy.SetColumn.prototype.toString = function () {
	return this.column.toString() + '=' + this.expression.toString();
};

yy.Update.prototype.compile = function (databaseid) {
	var self = this;
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
		var updatedRows = [];
		var pkUpdates = []; // Track primary key updates for CASCADE processing
		
		// Determine which columns are being updated
		var updatedColumns = [];
		self.columns.forEach(function(col) {
			updatedColumns.push(col.column.columnid);
		});
		
		// Check if any primary key columns are being updated
		var pkColumnsUpdated = false;
		if (table.pk && table.pk.columns) {
			for (var i = 0; i < table.pk.columns.length; i++) {
				if (updatedColumns.indexOf(table.pk.columns[i]) !== -1) {
					pkColumnsUpdated = true;
					break;
				}
			}
		}
		
		// If PK is being updated, collect old values first and check for RESTRICT
		if (pkColumnsUpdated) {
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				if (!wherefn || wherefn(table.data[i], params, alasql)) {
					var oldPkValues = {};
					table.pk.columns.forEach(function(col) {
						oldPkValues[col] = table.data[i][col];
					});
					
					// Check for RESTRICT constraints BEFORE updating
					for (var childTableId in db.tables) {
						var childTable = db.tables[childTableId];
						if (!childTable.foreignKeys) continue;
						
						childTable.foreignKeys.forEach(function(fk) {
							if (fk.fktable === tableid && fk.fkdatabase === databaseid) {
								if (fk.onupdate === 'RESTRICT' || fk.onupdate === 'NO ACTION') {
									// Check if any child rows reference this parent row
									for (var j = 0; j < childTable.data.length; j++) {
										var childRow = childTable.data[j];
										var matches = true;
										for (var k = 0; k < fk.columns.length; k++) {
											var fkCol = fk.columns[k];
											var parentCol = fk.fkcolumns[k];
											if (childRow[fkCol] !== oldPkValues[parentCol]) {
												matches = false;
												break;
											}
										}
										if (matches) {
											throw new Error('Cannot update primary key in table "' + tableid + '" because it has dependent rows in table "' + childTableId + '"');
										}
									}
								}
							}
						});
					}
				}
			}
		}
		
		for (var i = 0, ilen = table.data.length; i < ilen; i++) {
			if (!wherefn || wherefn(table.data[i], params, alasql)) {
				// Track row state for OUTPUT clause (DELETED.*)
				var oldRow = self.output ? cloneDeep(table.data[i]) : null;
				
				// Store old primary key values if PK is being updated
				var oldPkValues = null;
				if (pkColumnsUpdated && table.pk) {
					oldPkValues = {};
					table.pk.columns.forEach(function(col) {
						oldPkValues[col] = table.data[i][col];
					});
				}

				if (table.update) {
					table.update(assignfn, i, params);
				} else {
					assignfn(table.data[i], params, alasql);
				}
				
				// Track PK update for CASCADE processing
				if (pkColumnsUpdated && table.pk) {
					var newPkValues = {};
					table.pk.columns.forEach(function(col) {
						newPkValues[col] = table.data[i][col];
					});
					
					// Check if PK actually changed
					var pkChanged = false;
					for (var col in oldPkValues) {
						if (oldPkValues[col] !== newPkValues[col]) {
							pkChanged = true;
							break;
						}
					}
					
					if (pkChanged) {
						pkUpdates.push({
							oldValues: oldPkValues,
							newValues: newPkValues
						});
					}
				}

				// Track updated row for OUTPUT clause (INSERTED.*)
				if (self.output) {
					updatedRows.push({
						deleted: oldRow,
						inserted: cloneDeep(table.data[i]),
					});
				}

				numrows++;
			}
		}
		
		// Process CASCADE operations for primary key updates
		if (pkUpdates.length > 0) {
			pkUpdates.forEach(function(update) {
				// Check all child tables that reference this table
				for (var childTableId in db.tables) {
					var childTable = db.tables[childTableId];
					if (!childTable.foreignKeys) continue;
					
					childTable.foreignKeys.forEach(function(fk) {
						// Check if this foreign key references the table we're updating
						if (fk.fktable === tableid && fk.fkdatabase === databaseid) {
							// Skip RESTRICT and NO ACTION - already checked above
							if (fk.onupdate === 'RESTRICT' || fk.onupdate === 'NO ACTION') {
								return;
							}
							
							// Find matching child rows based on old PK values
							var childRowsToProcess = [];
							for (var j = 0; j < childTable.data.length; j++) {
								var childRow = childTable.data[j];
								var matches = true;
								for (var k = 0; k < fk.columns.length; k++) {
									var fkCol = fk.columns[k];
									var parentCol = fk.fkcolumns[k];
									if (childRow[fkCol] !== update.oldValues[parentCol]) {
										matches = false;
										break;
									}
								}
								if (matches) {
									childRowsToProcess.push(j);
								}
							}
							
							// Apply the appropriate action based on onupdate
							if (childRowsToProcess.length > 0) {
								if (fk.onupdate === 'CASCADE') {
									// Update child foreign key columns to new values
									childRowsToProcess.forEach(function(idx) {
										for (var k = 0; k < fk.columns.length; k++) {
											var fkCol = fk.columns[k];
											var parentCol = fk.fkcolumns[k];
											childTable.data[idx][fkCol] = update.newValues[parentCol];
										}
									});
								} else if (fk.onupdate === 'SET NULL') {
									// Set foreign key columns to NULL
									childRowsToProcess.forEach(function(idx) {
										fk.columns.forEach(function(col) {
											var colDef = childTable.xcolumns[col];
											if (colDef && colDef.notnull) {
												throw new Error('Cannot SET NULL on NOT NULL column "' + col + '" in table "' + childTableId + '"');
											}
											childTable.data[idx][col] = null;
										});
									});
								} else if (fk.onupdate === 'SET DEFAULT') {
									// Set foreign key columns to their default values
									childRowsToProcess.forEach(function(idx) {
										fk.columns.forEach(function(col) {
											// Find the column definition to get default value
											var colDef = childTable.xcolumns[col];
											if (colDef && colDef.default !== undefined) {
												childTable.data[idx][col] = colDef.default;
											} else if (colDef && colDef.notnull) {
												throw new Error('Cannot SET DEFAULT to NULL on NOT NULL column "' + col + '" in table "' + childTableId + '" without a DEFAULT value');
											} else {
												childTable.data[idx][col] = null;
											}
										});
									});
								}
							}
						}
					});
				}
			});
		}

		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid, tableid);
		}

		var res = numrows;

		// Handle OUTPUT clause
		if (self.output) {
			var output = [];
			for (var i = 0; i < updatedRows.length; i++) {
				var deleted = updatedRows[i].deleted;
				var inserted = updatedRows[i].inserted;
				var outputRow = {};
				self.output.columns.forEach(function (col) {
					if (col.columnid === '*') {
						// For *, use INSERTED values
						for (var key in inserted) {
							outputRow[key] = inserted[key];
						}
					} else {
						var colname = col.as || col.columnid;
						// Check tableid to determine which version to use
						if (col.tableid === 'DELETED') {
							outputRow[colname] = deleted[col.columnid];
						} else {
							// Default to INSERTED
							outputRow[colname] = inserted[col.columnid];
						}
					}
				});
				output.push(outputRow);
			}
			res = output;
		}

		if (cb) cb(res);
		return res;
	};
	return statement;
};

yy.Update.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
