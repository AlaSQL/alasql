/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

/* global alasql, yy */

yy.Merge = function (params) {
	return Object.assign(this, params);
};
yy.Merge.prototype.toString = function () {
	let s = `MERGE ${this.into.tableid} `;
	if (this.into.as) s += `AS ${this.into.as} `;
	s += `USING ${this.using.tableid} `;
	if (this.using.as) s += `AS ${this.using.as} `;
	s += `ON ${this.on.toString()} `;

	this.matches.forEach(m => {
		s += 'WHEN ';
		if (!m.matched) s += 'NOT ';
		s += 'MATCHED ';
		if (m.bytarget) s += 'BY TARGET ';
		if (m.bysource) s += 'BY SOURCE ';
		if (m.expr) s += `AND ${m.expr.toString()} `;
		s += 'THEN ';
		if (m.action.delete) s += 'DELETE ';
		if (m.action.insert) {
			s += 'INSERT ';
			if (m.action.columns) s += `(${m.action.columns.toString()}) `;
			if (m.action.values) s += `VALUES (${m.action.values.toString()}) `;
			if (m.action.defaultvalues) s += 'DEFAULT VALUES ';
		}
		if (m.action.update) {
			s += 'UPDATE ';
			s += m.action.update.map(u => u.toString()).join(', ') + ' ';
		}
	});

	return s;
};

yy.Merge.prototype.compile = function (databaseid) {
	var self = this;
	
	// Get database and table IDs
	databaseid = self.into.databaseid || databaseid;
	var db = alasql.databases[databaseid];
	var targettableid = self.into.tableid;
	var sourcetableid = self.using.tableid;
	
	var targetTable = db.tables[targettableid];
	var sourceTable = db.tables[sourcetableid];
	
	if (!targetTable) {
		throw new Error("Target table '" + targettableid + "' not found");
	}
	if (!sourceTable) {
		throw new Error("Source table '" + sourcetableid + "' not found");
	}
	
	// Compile the ON condition
	if (self.exists) {
		self.existsfn = self.exists.map(function (ex) {
			var nq = ex.compile(databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
	if (self.queries) {
		self.queriesfn = self.queries.map(function (q) {
			var nq = q.compile(databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
	
	// Create aliases mapping for ON condition evaluation
	// The ON condition needs to compare target and source rows
	var targetAlias = self.into.as || targettableid;
	var sourceAlias = self.using.as || sourcetableid;
	
	// Build the ON condition function that takes both target and source rows
	// We create a combined record with aliases as property objects
	var onConditionJS = self.on.toJS('rec', '');
	var onConditionFnStr = 'var rec = {' +
		'"' + targetAlias + '": targetRow, ' +
		'"' + sourceAlias + '": sourceRow' +
		'}; return ' + onConditionJS + ';';
	var onConditionFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 'var y;' + onConditionFnStr).bind(self);
	
	// Compile each match clause
	var compiledMatches = self.matches.map(function (match) {
		var result = {
			matched: match.matched,
			bytarget: match.bytarget,
			bysource: match.bysource,
			action: match.action
		};
		
		// Compile condition expression if present
		if (match.expr) {
			var exprJS = match.expr.toJS('rec', '');
			var exprFnStr = 'var rec = {';
			if (match.matched) {
				// For MATCHED: have both target and source
				exprFnStr += '"' + targetAlias + '": targetRow, "' + sourceAlias + '": sourceRow';
			} else if (match.bytarget) {
				// For NOT MATCHED BY TARGET: only source
				exprFnStr += '"' + sourceAlias + '": sourceRow';
			} else if (match.bysource) {
				// For NOT MATCHED BY SOURCE: only target
				exprFnStr += '"' + targetAlias + '": targetRow';
			}
			exprFnStr += '}; return ' + exprJS + ';';
			result.exprFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 'var y;' + exprFnStr).bind(self);
		}
		
		// Compile action (UPDATE, INSERT, or DELETE)
		if (match.action.update) {
			// Compile UPDATE SET clauses
			var updateJS = 'var rec = {' +
				'"' + targetAlias + '": targetRow, ' +
				'"' + sourceAlias + '": sourceRow' +
				'}; ';
			match.action.update.forEach(function (setCol) {
				var exprJS = setCol.expression.toJS('rec', '');
				updateJS += 'targetRow["' + setCol.column.columnid + '"] = ' + exprJS + '; ';
			});
			result.updateFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 'var y;' + updateJS).bind(self);
		} else if (match.action.insert) {
			// Compile INSERT clause
			var insertJS = 'var newRow = {}; ';
			if (match.action.columns && match.action.values && match.action.values[0]) {
				// INSERT with explicit columns
				var values = match.action.values[0];
				insertJS += 'var rec = {"' + sourceAlias + '": sourceRow}; ';
				match.action.columns.forEach(function (col, idx) {
					if (values[idx]) {
						var valueJS = values[idx].toJS('rec', '');
						insertJS += 'newRow["' + col.columnid + '"] = ' + valueJS + '; ';
					}
				});
			} else if (match.action.defaultvalues) {
				// INSERT DEFAULT VALUES
				insertJS += 'newRow = ' + (targetTable.defaultfns ? '{' + targetTable.defaultfns + '}' : '{}') + '; ';
			}
			result.insertFn = new Function('sourceRow', 'params', 'alasql', 'var y;' + insertJS + 'return newRow;').bind(self);
		}
		// DELETE doesn't need compilation, just a flag
		
		return result;
	});
	
	// Main execution statement
	var statement = function (params, cb) {
		var db = alasql.databases[databaseid];
		
		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].loadTableData(databaseid, targettableid);
			alasql.engines[db.engineid].loadTableData(databaseid, sourcetableid);
		}
		
		var targetTable = db.tables[targettableid];
		var sourceTable = db.tables[sourcetableid];
		
		targetTable.dirty = true;
		
		var matchedCount = 0;
		var insertedCount = 0;
		var updatedCount = 0;
		var deletedCount = 0;
		
		// Track which target rows matched
		var matchedTargetIndices = [];
		
		// Process WHEN MATCHED and WHEN NOT MATCHED BY SOURCE
		for (var i = 0; i < targetTable.data.length; i++) {
			var targetRow = targetTable.data[i];
			var matched = false;
			var sourceRow = null;
			
			// Find matching source row
			for (var j = 0; j < sourceTable.data.length; j++) {
				if (onConditionFn(targetRow, sourceTable.data[j], params, alasql)) {
					matched = true;
					sourceRow = sourceTable.data[j];
					matchedTargetIndices.push(i);
					break;
				}
			}
			
			if (matched) {
				// Process WHEN MATCHED clauses
				for (var m = 0; m < compiledMatches.length; m++) {
					var match = compiledMatches[m];
					if (match.matched && !match.bysource) {
						// Check additional condition if present
						if (!match.exprFn || match.exprFn(targetRow, sourceRow, params, alasql)) {
							if (match.action.update) {
								match.updateFn(targetRow, sourceRow, params, alasql);
								updatedCount++;
							} else if (match.action.delete) {
								targetTable.data.splice(i, 1);
								i--; // Adjust index after deletion
								deletedCount++;
							}
							break; // Only first matching clause executes
						}
					}
				}
			} else {
				// Process WHEN NOT MATCHED BY SOURCE clauses
				for (var m = 0; m < compiledMatches.length; m++) {
					var match = compiledMatches[m];
					if (!match.matched && match.bysource) {
						// Check additional condition if present
						if (!match.exprFn || match.exprFn(targetRow, null, params, alasql)) {
							if (match.action.delete) {
								targetTable.data.splice(i, 1);
								i--; // Adjust index after deletion
								deletedCount++;
							} else if (match.action.update) {
								match.updateFn(targetRow, null, params, alasql);
								updatedCount++;
							}
							break; // Only first matching clause executes
						}
					}
				}
			}
		}
		
		// Process WHEN NOT MATCHED (BY TARGET) clauses
		// These are source rows that didn't match any target row
		for (var j = 0; j < sourceTable.data.length; j++) {
			var sourceRow = sourceTable.data[j];
			var matched = false;
			
			// Check if this source row matched any target row
			for (var i = 0; i < targetTable.data.length; i++) {
				if (onConditionFn(targetTable.data[i], sourceRow, params, alasql)) {
					matched = true;
					break;
				}
			}
			
			if (!matched) {
				// Process WHEN NOT MATCHED clauses
				for (var m = 0; m < compiledMatches.length; m++) {
					var match = compiledMatches[m];
					if (!match.matched && match.bytarget) {
						// Check additional condition if present
						if (!match.exprFn || match.exprFn(null, sourceRow, params, alasql)) {
							if (match.action.insert) {
								var newRow = match.insertFn(sourceRow, params, alasql);
								
								// Apply default values if needed
								if (targetTable.defaultfns) {
									var defaultfn = new Function('r,db,params,alasql', 
										'var defaults={' + targetTable.defaultfns + '};' +
										'for(var key in defaults){if(!(key in r)){r[key]=defaults[key]}}return r');
									defaultfn(newRow, db, params, alasql);
								}
								
								if (targetTable.insert) {
									targetTable.insert(newRow, false, false);
								} else {
									targetTable.data.push(newRow);
								}
								insertedCount++;
							}
							break; // Only first matching clause executes
						}
					}
				}
			}
		}
		
		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid, targettableid);
		}
		
		// Return total number of rows affected
		var res = insertedCount + updatedCount + deletedCount;
		
		if (cb) cb(res);
		return res;
	};
	
	return statement;
};

yy.Merge.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
