/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy alasql */

// A subquery in UPDATE or DELETE that reads the changed row by the table name runs again for
// every row, instead of reusing its first result (#2814)
function compileRowSubqueries(queries, databaseid, tableid) {
	return queries.map(function (q) {
		var inner = (q.from || []).some(function (f) {
			return (f.as || f.tableid) === tableid;
		});
		var correlated = !inner && readsTable(q, tableid);
		var nq = q.compile(databaseid);
		nq.query.modifier = 'RECORDSET';
		nq.query.isCorrelated = correlated;
		return nq;
	});
}

function readsTable(node, tableid) {
	if (!node || typeof node !== 'object') return false;
	if (node instanceof yy.Column && node.tableid === tableid) return true;
	return Object.keys(node).some(function (key) {
		return readsTable(node[key], tableid);
	});
}

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

	// Handle ParamValue (anonymous data table) - wrap execution
	if (this.table instanceof yy.ParamValue) {
		return yy.compileParamValue(this.table.param, 'UPDATE', false, databaseid, self, 'table');
	}

	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	// The row is also reached by the table name, so t.u reads the same value as u (#2814)
	var rowScope = 'var y,p={' + JSON.stringify(tableid) + ':r};';

	if (this.where) {
		if (this.exists) {
			this.existsfn = this.exists.map(function (ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
		if (this.queries) {
			this.queriesfn = compileRowSubqueries(this.queries, databaseid, tableid);
		}

		var wherefn = new Function(
			'r,params,alasql',
			rowScope + 'return ' + this.where.toJS('p', tableid)
		).bind(this);
	}

	// Construct update function
	var table = alasql.databases[databaseid].tables[tableid];
	var s = table.onupdatefns || '';
	s += ';';
	this.columns.forEach(function (col) {
		var value = col.expression.toJS('p', tableid);
		if (col.expression instanceof yy.DefaultValue) {
			value = '({' + (table.defaultfns || '') + '})[' + JSON.stringify(col.column.columnid) + ']';
		}
		s += "r['" + col.column.columnid + "']=" + value + ';';
	});
	// console.log(423623, s);
	var assignfn = new Function('r,params,alasql', rowScope + s);

	var statement = function (params, cb) {
		var db = alasql.databases[databaseid];
		self.params = params;

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
		for (var i = 0, ilen = table.data.length; i < ilen; i++) {
			if (!wherefn || wherefn(table.data[i], params, alasql)) {
				// Track row state for OUTPUT clause (DELETED.*)
				var oldRow = self.output ? cloneDeep(table.data[i]) : null;

				if (table.update) {
					table.update(assignfn, i, params);
				} else {
					assignfn(table.data[i], params, alasql);
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
							setOwn(outputRow, key, inserted[key]);
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
