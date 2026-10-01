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
	
	if (!db.tables[targettableid]) throw new Error("Target table '" + targettableid + "' not found");
	if (!db.tables[sourcetableid]) throw new Error("Source table '" + sourcetableid + "' not found");
	
	if (self.exists) self.existsfn = self.exists.map(function (ex) {
		var nq = ex.compile(databaseid); nq.query.modifier = 'RECORDSET'; return nq;
	});
	if (self.queries) self.queriesfn = self.queries.map(function (q) {
		var nq = q.compile(databaseid); nq.query.modifier = 'RECORDSET'; return nq;
	});
	
	var targetAlias = self.into.as || targettableid;
	var sourceAlias = self.using.as || sourcetableid;
	
	// Helper to evaluate expressions in context
	var evalInContext = function (expr, targetRow, sourceRow, params) {
		var rec = {};
		if (targetRow) rec[targetAlias] = targetRow;
		if (sourceRow) rec[sourceAlias] = sourceRow;
		return new Function('rec', 'params', 'alasql', 'var y; return ' + expr.toJS('rec', ''))(rec, params, alasql);
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
		var count = 0;
		
		// Check if target and source rows match
		var rowsMatch = function (t, s) {
			return evalInContext(self.on, t, s, params);
		};
		
		// Execute first applicable action for a row
		var executeAction = function (targetRow, sourceRow, isMatched, isBySource) {
			for (var m = 0; m < self.matches.length; m++) {
				var match = self.matches[m];
				if (match.matched !== isMatched) continue;
				if (isMatched && match.bysource) continue;
				if (!isMatched && ((isBySource && !match.bysource) || (!isBySource && !match.bytarget))) continue;
				if (match.expr && !evalInContext(match.expr, targetRow, sourceRow, params)) continue;
				
				var action = match.action;
				if (action.delete) return 'delete';
				if (action.update) {
					var rec = {}; rec[targetAlias] = targetRow; rec[sourceAlias] = sourceRow;
					action.update.forEach(function (set) {
						targetRow[set.column.columnid] = evalInContext(set.expression, targetRow, sourceRow, params);
					});
					return 'update';
				}
				if (action.insert) {
					var newRow = {};
					if (action.columns && action.values && action.values[0]) {
						action.columns.forEach(function (col, i) {
							if (action.values[0][i]) newRow[col.columnid] = evalInContext(action.values[0][i], null, sourceRow, params);
						});
					} else if (action.defaultvalues && targetTable.defaultfns) {
						eval('newRow = {' + targetTable.defaultfns + '}');
					}
					if (targetTable.defaultfns) {
						eval('var defaults = {' + targetTable.defaultfns + '}');
						for (var k in defaults) if (!(k in newRow)) newRow[k] = defaults[k];
					}
					if (targetTable.insert) targetTable.insert(newRow, false, false);
					else targetTable.data.push(newRow);
					return 'insert';
				}
			}
			return null;
		};
		
		// Process target rows
		for (var i = 0; i < targetTable.data.length; i++) {
			var targetRow = targetTable.data[i];
			var sourceRow = sourceTable.data.find(function (s) { return rowsMatch(targetRow, s); });
			var action = executeAction(targetRow, sourceRow, !!sourceRow, !sourceRow);
			if (action === 'delete') { targetTable.data.splice(i--, 1); count++; }
			else if (action === 'update') count++;
		}
		
		// Process unmatched source rows
		for (var j = 0; j < sourceTable.data.length; j++) {
			var sourceRow = sourceTable.data[j];
			if (!targetTable.data.some(function (t) { return rowsMatch(t, sourceRow); })) {
				if (executeAction(null, sourceRow, false, false) === 'insert') count++;
			}
		}
		
		if (alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid, targettableid);
		}
		
		if (cb) cb(count);
		return count;
	};
};

yy.Merge.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
