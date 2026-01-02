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
	databaseid = self.into.databaseid || databaseid;
	var db = alasql.databases[databaseid];
	var targettableid = self.into.tableid;
	var sourcetableid = self.using.tableid;
	var targetTable = db.tables[targettableid];
	var sourceTable = db.tables[sourcetableid];
	
	if (!targetTable) throw new Error("Target table '" + targettableid + "' not found");
	if (!sourceTable) throw new Error("Source table '" + sourcetableid + "' not found");
	
	// Compile exists/queries if present
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
	
	var targetAlias = self.into.as || targettableid;
	var sourceAlias = self.using.as || sourcetableid;
	
	// Helper to build context record
	var buildContext = function (includeTarget, includeSource) {
		var parts = [];
		if (includeTarget) parts.push('"' + targetAlias + '": targetRow');
		if (includeSource) parts.push('"' + sourceAlias + '": sourceRow');
		return 'var rec = {' + parts.join(', ') + '};';
	};
	
	// Compile ON condition
	var onConditionFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 
		'var y;' + buildContext(true, true) + ' return ' + self.on.toJS('rec', '') + ';').bind(self);
	
	// Compile match clauses
	var compiledMatches = self.matches.map(function (match) {
		var result = {
			matched: match.matched,
			bytarget: match.bytarget,
			bysource: match.bysource,
			action: match.action
		};
		
		// Compile condition expression
		if (match.expr) {
			var ctx = buildContext(match.matched || match.bysource, match.matched || match.bytarget);
			result.exprFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 
				'var y;' + ctx + ' return ' + match.expr.toJS('rec', '') + ';').bind(self);
		}
		
		// Compile actions
		if (match.action.update) {
			var updateJS = buildContext(true, true);
			match.action.update.forEach(function (setCol) {
				updateJS += 'targetRow["' + setCol.column.columnid + '"] = ' + setCol.expression.toJS('rec', '') + '; ';
			});
			result.updateFn = new Function('targetRow', 'sourceRow', 'params', 'alasql', 'var y;' + updateJS).bind(self);
		} else if (match.action.insert) {
			var insertJS = 'var newRow = {}; ';
			if (match.action.columns && match.action.values && match.action.values[0]) {
				insertJS += buildContext(false, true);
				match.action.columns.forEach(function (col, idx) {
					if (match.action.values[0][idx]) {
						insertJS += 'newRow["' + col.columnid + '"] = ' + match.action.values[0][idx].toJS('rec', '') + '; ';
					}
				});
			} else if (match.action.defaultvalues) {
				insertJS += 'newRow = ' + (targetTable.defaultfns ? '{' + targetTable.defaultfns + '}' : '{}') + '; ';
			}
			result.insertFn = new Function('sourceRow', 'params', 'alasql', 'var y;' + insertJS + 'return newRow;').bind(self);
		}
		
		return result;
	});
	
	// Helper to execute first matching clause
	var executeMatch = function (matches, targetRow, sourceRow, params) {
		for (var m = 0; m < matches.length; m++) {
			var match = matches[m];
			if (match.exprFn && !match.exprFn(targetRow, sourceRow, params, alasql)) continue;
			
			if (match.action.update) {
				match.updateFn(targetRow, sourceRow, params, alasql);
				return {type: 'update'};
			} else if (match.action.delete) {
				return {type: 'delete'};
			} else if (match.action.insert) {
				return {type: 'insert', row: match.insertFn(sourceRow, params, alasql)};
			}
		}
		return null;
	};
	
	return function (params, cb) {
		var db = alasql.databases[databaseid];
		
		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].loadTableData(databaseid, targettableid);
			alasql.engines[db.engineid].loadTableData(databaseid, sourcetableid);
		}
		
		var targetTable = db.tables[targettableid];
		var sourceTable = db.tables[sourcetableid];
		targetTable.dirty = true;
		
		var counts = {insert: 0, update: 0, delete: 0};
		
		// Process target rows (MATCHED and NOT MATCHED BY SOURCE)
		for (var i = 0; i < targetTable.data.length; i++) {
			var targetRow = targetTable.data[i];
			var sourceRow = sourceTable.data.find(function (s) {
				return onConditionFn(targetRow, s, params, alasql);
			});
			
			var matchType = sourceRow ? 'matched' : 'bysource';
			var matches = compiledMatches.filter(function (m) {
				return sourceRow ? (m.matched && !m.bysource) : (!m.matched && m.bysource);
			});
			
			var result = executeMatch(matches, targetRow, sourceRow, params);
			if (result) {
				if (result.type === 'delete') {
					targetTable.data.splice(i--, 1);
					counts.delete++;
				} else if (result.type === 'update') {
					counts.update++;
				}
			}
		}
		
		// Process source rows (NOT MATCHED BY TARGET)
		for (var j = 0; j < sourceTable.data.length; j++) {
			var sourceRow = sourceTable.data[j];
			var hasMatch = targetTable.data.some(function (t) {
				return onConditionFn(t, sourceRow, params, alasql);
			});
			
			if (!hasMatch) {
				var matches = compiledMatches.filter(function (m) {
					return !m.matched && m.bytarget;
				});
				
				var result = executeMatch(matches, null, sourceRow, params);
				if (result && result.type === 'insert') {
					var newRow = result.row;
					if (targetTable.defaultfns) {
						var defaults = new Function('r,db,params,alasql', 
							'var defaults={' + targetTable.defaultfns + '};' +
							'for(var key in defaults){if(!(key in r)){r[key]=defaults[key]}}return r');
						defaults(newRow, db, params, alasql);
					}
					if (targetTable.insert) {
						targetTable.insert(newRow, false, false);
					} else {
						targetTable.data.push(newRow);
					}
					counts.insert++;
				}
			}
		}
		
		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid, targettableid);
		}
		
		var res = counts.insert + counts.update + counts.delete;
		if (cb) cb(res);
		return res;
	};
};

yy.Merge.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
