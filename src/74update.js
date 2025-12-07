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
	if (this.from) {
		s +=
			' FROM ' +
			this.from
				.map(function (f) {
					var ss = f.toString();
					if (f.as) {
						ss += ' AS ' + f.as;
					}
					return ss;
				})
				.join(',');
	}
	if (this.joins) {
		s += this.joins
			.map(function (jn) {
				var ss = ' ';
				if (jn.joinmode) {
					ss += jn.joinmode + ' ';
				}
				ss += 'JOIN ';
				if (jn.table) {
					ss += jn.table.toString();
				}
				if (jn.as) {
					ss += ' AS ' + jn.as;
				}
				if (jn.using) {
					ss += ' USING ' + jn.using.toString();
				}
				if (jn.on) {
					ss += ' ON ' + jn.on.toString();
				}
				return ss;
			})
			.join('');
	}
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

	// Check if we have FROM/JOIN clauses
	var hasJoins = this.from || this.joins;

	if (hasJoins) {
		// Create a query object to use SELECT's FROM/JOIN compilation logic
		var query = {
			database: alasql.databases[databaseid],
			sources: [],
			aliases: {},
			params: {},
		};

		// Compile FROM clause using Select's compileFrom logic
		if (this.from) {
			yy.Select.prototype.compileFrom.call({from: this.from}, query);
		}

		// Compile JOIN clause using Select's compileJoins logic
		if (this.joins) {
			yy.Select.prototype.compileJoins.call({joins: this.joins}, query);
		}

		// Find which source corresponds to the target table
		var targetAlias = null;
		for (var i = 0; i < query.sources.length; i++) {
			if (query.sources[i].tableid === tableid) {
				targetAlias = query.sources[i].alias;
				break;
			}
		}

		if (!targetAlias) {
			throw new Error('Target table "' + tableid + '" not found in FROM clause');
		}

		// Compile WHERE clause with joined context
		var wherefn;
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

			var defaultTableid = query.sources[0].alias;
			wherefn = new Function(
				'p,params,alasql',
				'var y;return ' + this.where.toJS('p', defaultTableid, query.aliases)
			).bind(this);
		}

		// Construct update function with joined context
		var s = alasql.databases[databaseid].tables[tableid].onupdatefns || '';
		s += ';';
		var defaultTableid = query.sources[0].alias;
		this.columns.forEach(function (col) {
			s +=
				"r['" +
				col.column.columnid +
				"']=" +
				col.expression.toJS('p', defaultTableid, query.aliases) +
				';';
		});
		var assignfn = new Function('p,r,params,alasql', 'var y;' + s);

		var statement = function (params, cb) {
			var db = alasql.databases[databaseid];

			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var table = db.tables[tableid];
			if (!table) {
				throw new Error("Table '" + tableid + "' not exists");
			}

			// Load source data for all sources
			query.sources.forEach(function (source) {
				if (source.datafn) {
					source.data = source.datafn(query, params, null, 0, alasql);
				}
			});

			// Build indexes for optimization if needed
			query.sources.forEach(function (source) {
				if (source.optimization === 'ix') {
					source.ix = {};
					var data = source.data;
					for (var i = 0; i < data.length; i++) {
						var p = {};
						p[source.alias] = data[i];
						var key = source.onrightfn(p, params, alasql);
						if (typeof source.ix[key] === 'undefined') {
							source.ix[key] = [];
						}
						source.ix[key].push(data[i]);
					}
				}
			});

			var numrows = 0;
			var updatedRows = [];
			var updatedIndices = new Set();

			// Iterate through joined data
			function processJoin(p, depth) {
				if (depth >= query.sources.length) {
					// Check WHERE condition
					if (!wherefn || wherefn(p, params, alasql)) {
						// Find the actual row in the target table to update
						var targetRow = p[targetAlias];
						if (!targetRow) {
							return; // Skip if target row not in scope
						}

						// Find index in target table
						var rowIndex = table.data.indexOf(targetRow);
						if (rowIndex === -1 || updatedIndices.has(rowIndex)) {
							return; // Skip if not found or already updated
						}

						updatedIndices.add(rowIndex);

						// Track row state for OUTPUT clause
						var oldRow = self.output ? cloneDeep(targetRow) : null;

						// Apply update
						if (table.update) {
							table.update(
								function (r, params, alasql) {
									assignfn(p, r, params, alasql);
								},
								rowIndex,
								params
							);
						} else {
							assignfn(p, targetRow, params, alasql);
						}

						// Track updated row for OUTPUT clause
						if (self.output) {
							updatedRows.push({
								deleted: oldRow,
								inserted: cloneDeep(targetRow),
							});
						}

						numrows++;
					}
				} else {
					var source = query.sources[depth];
					var data = source.data;

					// Handle optimization
					if (depth > 0 && source.optimization === 'ix' && source.onleftfn) {
						var key = source.onleftfn(p, params, alasql);
						data = source.ix[key] || [];
					}

					var pass = false; // Track if any join matched (for LEFT JOIN)

					for (var i = 0; i < data.length; i++) {
						var newP = Object.assign({}, p);
						newP[source.alias] = data[i];

						// Check join conditions
						var passJoin = true;
						if (depth > 0) {
							if (source.onleftfn && source.onrightfn) {
								var left = source.onleftfn(newP, params, alasql);
								var right = source.onrightfn(newP, params, alasql);
								passJoin = left == right;
							}
							if (passJoin && source.onmiddlefn) {
								passJoin = source.onmiddlefn(newP, params, alasql);
							}
						}

						if (passJoin) {
							pass = true;
							processJoin(newP, depth + 1);
						}
					}

					// Handle LEFT/OUTER joins when no match found
					if (
						depth > 0 &&
						!pass &&
						(source.joinmode === 'LEFT' || source.joinmode === 'OUTER')
					) {
						var newP = Object.assign({}, p);
						newP[source.alias] = {};
						processJoin(newP, depth + 1);
					}
				}
			}

			processJoin({}, 0);

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
							for (var key in inserted) {
								outputRow[key] = inserted[key];
							}
						} else {
							var colname = col.as || col.columnid;
							if (col.tableid === 'DELETED') {
								outputRow[colname] = deleted[col.columnid];
							} else {
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
	}

	// Original logic for UPDATE without FROM/JOIN
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
