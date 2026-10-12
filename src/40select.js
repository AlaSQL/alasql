/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//
// Main part of SELECT procedure
//

/* global yy */

/*
 Set operations (UNION, UNION ALL, EXCEPT, INTERSECT) of a SELECT (#202).
 The parser nests a chain to the right: A op1 B op2 C gives A.op1 = B and B.op2 = C.
 The helpers below flatten it, so the chain is evaluated left to right with INTERSECT
 binding tighter than UNION and EXCEPT, as in SQL. A parenthesized operand
 (parenthesizedOperand) keeps its own set operations as a group.
*/
const SET_OP_KINDS = ['union', 'unionall', 'except', 'intersect'];

// The set operation of a SELECT (or of a parsed UNION clause) and its right operand
const setOpOf = sel => {
	const kind = SET_OP_KINDS.find(k => sel[k]);
	return kind && {kind, select: sel[kind], corresponding: !!sel.corresponding};
};

// The set operations of a chain, in order, up to a parenthesized operand
const setOpChain = sel => {
	const list = [];
	for (let op = setOpOf(sel); op;) {
		list.push(op);
		op = op.select.parenthesizedOperand ? undefined : setOpOf(op.select);
	}
	return list;
};

// An operand without the set operations that belong to the enclosing chain
const setOpOperand = sel => {
	if (sel.parenthesizedOperand || !setOpOf(sel)) return sel;
	const operand = new yy.Select(Object.assign({}, sel));
	SET_OP_KINDS.forEach(k => delete operand[k]);
	delete operand.corresponding;
	return operand;
};

// INTERSECT binds tighter: it joins the right operand of the preceding UNION or EXCEPT
const bindIntersects = list => {
	const out = [];
	let last;
	list.forEach(op => {
		if (op.kind === 'intersect' && last) {
			last.intersects.push(op);
		} else if (op.kind === 'intersect') {
			out.push(op);
		} else {
			last = {...op, intersects: []};
			out.push(last);
		}
	});
	return out;
};

yy.Select = class Select {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		var s;
		s = '';
		if (this.explain) {
			s += 'EXPLAIN ';
		}
		s += 'SELECT ';
		if (this.modifier) {
			s += this.modifier + ' ';
		}
		if (this.distinct) {
			s += 'DISTINCT ';
		}
		if (this.top) {
			s += 'TOP ' + this.top.toString() + ' ';
			if (this.percent) {
				s += 'PERCENT ';
			}
		}
		s += this.columns
			.map(function (col) {
				var s;
				s = col.toString();
				if (typeof col.as !== 'undefined') {
					s += ' AS ' + col.as;
				}
				return s;
			})
			.join(', ');
		if (this.from) {
			s +=
				' FROM ' +
				this.from
					.map(function (f) {
						var ss;
						ss = f.toString();
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
					var ss;
					ss = ' ';
					if (jn.joinmode) {
						ss += jn.joinmode + ' ';
					}
					if (jn.table) {
						ss += 'JOIN ' + jn.table.toString();
					} else if (jn.select) {
						ss += 'JOIN (' + jn.select.toString() + ')';
					} else if (jn instanceof alasql.yy.Apply) {
						ss += jn.toString();
					} else {
						throw new Error('Wrong type in JOIN mode');
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
		if (this.where) {
			s += ' WHERE ' + this.where.toString();
		}
		if (this.group && this.group.length > 0) {
			s +=
				' GROUP BY ' +
				this.group
					.map(function (grp) {
						return grp.toString();
					})
					.join(', ');
		}
		if (this.having) {
			s += ' HAVING ' + this.having.toString();
		}
		if (this.order && this.order.length > 0) {
			s +=
				' ORDER BY ' +
				this.order
					.map(function (ord) {
						return ord.toString();
					})
					.join(', ');
		}
		if (this.limit) {
			s += ' LIMIT ' + this.limit.toString();
		}
		if (this.offset) {
			s += ' OFFSET ' + this.offset.toString();
		}
		if (this.union) {
			s += ' UNION ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.union.toString();
		}
		if (this.unionall) {
			s += ' UNION ALL ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.unionall.toString();
		}
		if (this.except) {
			s += ' EXCEPT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.except.toString();
		}
		if (this.intersect) {
			s += ' INTERSECT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.intersect.toString();
		}
		return s;
	}

	/**
	 Select statement in expression
	 */
	toJS(context) {
		let outerContext = context === 'g' ? '(this.groupSources.get(g) || g)' : context;
		let s =
			'alasql.utils.flatArray(this.queriesfn[' +
			(this.queriesidx - 1) +
			'](this.params,null,' +
			outerContext +
			'))[0]';

		//	let s = '(ee=alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')),console.log(999,ee),ee[0])';
		return s;
	}

	// Compile SELECT statement
	/**
	 Compile the set operations of this SELECT into a list of {kind, corresponding, fn},
	 applied to its result from left to right (#202)
	 */
	compileSetOps(databaseid) {
		// A parenthesized SELECT can carry outer set operations, as in (A EXCEPT B) UNION C,
		// and an operand grouped by INTERSECT carries the INTERSECTs bound to it
		const levels = [setOpChain(this)];
		(this.outerSetOps || []).forEach(clause => levels.push(setOpChain(clause)));
		if (this.extraSetOps) levels.push(this.extraSetOps);

		const setops = [];
		levels.forEach(level => {
			bindIntersects(level).forEach(op => {
				let operand = setOpOperand(op.select);
				if (op.intersects && op.intersects.length) {
					operand = new yy.Select(Object.assign({}, operand));
					operand.extraSetOps = op.intersects;
				}
				setops.push({
					kind: op.kind,
					corresponding: op.corresponding,
					fn: operand.compile(databaseid),
				});
			});
		});
		return setops;
	}

	compile(databaseid, params) {
		var db = alasql.databases[databaseid];
		// Create variable for query
		var query = new Query();

		// Array with columns to be removed
		query.removeKeys = [];
		query.aggrKeys = [];

		query.explain = this.explain; // Explain
		query.explaination = [];
		query.explid = 1;
		query.modifier = this.modifier;

		query.database = db;
		// 0. Precompile whereexists
		this.compileWhereExists(query);

		// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
		this.compileQueries(query);

		query.defcols = this.compileDefCols(query, databaseid);

		// 1. Compile FROM clause
		query.fromfn = this.compileFrom(query);

		// 2. Compile JOIN clauses
		if (this.joins) {
			this.compileJoins(query);
		}

		// todo?: 3. Compile SELECT clause
		// For ROWNUM()
		query.rownums = [];
		query.grouprownums = [];
		query.windowaggrs = []; // For window aggregate functions (COUNT/MAX/MIN/SUM/AVG with OVER)

		// Check if INTO OBJECT() is used - this affects how arrow expressions are compiled
		if (this.into instanceof yy.FuncValue && this.into.funcid.toUpperCase() === 'OBJECT') {
			query.intoObject = true;
		}

		this.compileSelectGroup0(query);

		if (this.group || query.selectGroup.length > 0) {
			query.selectgfns = this.compileSelectGroup1(query);
		} else {
			query.selectfns = this.compileSelect1(query, params);
		}

		// Remove columns clause
		this.compileRemoveColumns(query);

		// 5. Optimize WHERE and JOINS
		if (this.where) {
			this.compileWhereJoins(query);
		}

		// 4. Compile WHERE clause
		query.wherefn = this.compileWhere(query);

		// 6. Compile GROUP BY
		if (this.group || query.selectGroup.length > 0) {
			query.groupfn = this.compileGroup(query);
		}

		// 6. Compile HAVING
		if (this.having) {
			query.havingfn = this.compileHaving(query);
		}

		// 8. Compile ORDER BY clause
		if (this.order) {
			query.orderfn = this.compileOrder(query, params);
			// Copy orderColumns to query for union handling
			query.orderColumns = this.orderColumns;
		}

		if (this.group || query.selectGroup.length > 0) {
			query.selectgfn = this.compileSelectGroup2(query);
		} else {
			query.selectfn = this.compileSelect2(query, params);
		}

		// 7. Compile DISTINCT, LIMIT and OFFSET
		query.distinct = this.distinct;

		// 9. Compile PIVOT clause
		if (this.pivot) query.pivotfn = this.compilePivot(query);
		if (this.unpivot) query.pivotfn = this.compileUnpivot(query);

		// 10. Compile TOP/LIMIT/OFFSET/FETCH clause
		if (this.top) {
			if (this.top instanceof yy.ParamValue) {
				query.limitParam = this.top.param;
			} else {
				query.limit = this.top.value;
			}
		} else if (this.limit) {
			if (this.limit instanceof yy.ParamValue) {
				query.limitParam = this.limit.param;
			} else {
				query.limit = this.limit.value;
			}
			if (this.offset) {
				if (this.offset instanceof yy.ParamValue) {
					query.offsetParam = this.offset.param;
				} else {
					query.offset = this.offset.value;
				}
			}
		}

		query.percent = this.percent;

		// 9. Compile set operations (UNION, UNION ALL, EXCEPT, INTERSECT)
		query.corresponding = this.corresponding; // If CORRESPONDING flag exists
		query.setops = this.compileSetOps(databaseid);
		// With (A op B) op C ... the ORDER BY / LIMIT after the chain is for the whole result
		query.hasOuterSetOps = !!(this.outerSetOps && this.outerSetOps.length);
		// ORDER BY of the right operand is used at the top level when the query has none
		const setOpRight = this.union || this.unionall || this.except || this.intersect;
		if (setOpRight && !query.orderfn && setOpRight.order) {
			query.orderfn = setOpRight.compileOrder(query, params);
		}

		// SELECT INTO
		if (this.into) {
			if (this.into instanceof yy.Table) {
				// Save into the table in database
				if (
					alasql.options.autocommit &&
					alasql.databases[this.into.databaseid || databaseid].engineid
				) {
					// For external database when AUTOCOMMIT is ONs
					query.intoallfns = `return alasql
								.engines[${JSON.stringify(alasql.databases[this.into.databaseid || databaseid].engineid)}]
								.intoTable(
									${JSON.stringify(this.into.databaseid || databaseid)},
									${JSON.stringify(this.into.tableid)},
									this.data,
									columns,
									cb
								);`;
				} else {
					// Into AlaSQL tables - convert types based on column definitions
					var dbid = this.into.databaseid || databaseid;
					var tblid = this.into.tableid;
					query.intofns = `
						var db = alasql.databases[${JSON.stringify(dbid)}];
						var table = db.tables[${JSON.stringify(tblid)}];
						var converted = {};
						for (var key in r) {
							var colDef = table.xcolumns && table.xcolumns[key];
							converted[key] = alasql.utils.typeConverter(r[key], colDef ? colDef.dbtypeid : null);
						}
						table.data.push(converted);
					`;
				}
			} else if (this.into instanceof yy.VarValue) {
				//
				// Save into local variable
				// SELECT * INTO @VAR1 FROM ?
				//
				query.intoallfns = `
					alasql.vars[${JSON.stringify(this.into.variable)}]=this.data;
					res=this.data.length;
					if(cb) res = cb(res);
					return res;
				`;
			} else if (this.into instanceof yy.FuncValue) {
				//
				// If this is INTO() function, then call it
				// with one or two parameters
				//
				var funcid = this.into.funcid.toUpperCase();
				var qs = 'return alasql.into[' + JSON.stringify(funcid) + '](';
				if (this.into.args && this.into.args.length > 0) {
					qs += this.into.args[0].toJS() + ',';
					if (this.into.args.length > 1) {
						qs += this.into.args[1].toJS() + ',';
					} else {
						qs += 'undefined,';
					}
				} else {
					qs += 'undefined, undefined,';
				}
				query.intoallfns = qs + 'this.data,columns,cb)';
				// Mark that OBJECT should preserve array results
				if (funcid === 'OBJECT') {
					query.preserveArrayResult = true;
				}
			} else if (this.into instanceof yy.ParamValue) {
				//
				// Save data into parameters array
				// like alasql('SELECT * INTO ? FROM ?',[outdata,srcdata]);
				// or SELECT * INTO $variable FROM ?
				//
				// Distinguish between ? (numeric param - push to array) and $variable (string param - replace array)
				if (typeof this.into.param === 'string') {
					// $variable syntax - replace the array
					query.intoallfns = `
						if(!params[${JSON.stringify(this.into.param)}]) params[${JSON.stringify(this.into.param)}]=[];
						params[${JSON.stringify(this.into.param)}]=this.data;
						res=this.data.length;
						if(cb) res = cb(res);
						return res;
					`;
				} else {
					// ? syntax - push to existing array
					query.intofns = `params[${JSON.stringify(this.into.param)}].push(r)`;
				}
			}

			if (query.intofns) {
				// Create intofn function
				query.intofn = new Function('r,i,params,alasql', 'var y;' + query.intofns);
			} else if (query.intoallfns) {
				// Create intoallfn function
				query.intoallfn = new Function('columns,cb,params,alasql', 'var y;' + query.intoallfns);
			}
		}
		// Now, compile all togeather into one function with query object in scope
		var statement = function (params, cb, oldscope) {
			query.params = params;
			if (typeof query.limitParam !== 'undefined') {
				query.limit = params ? params[query.limitParam] : undefined;
			}
			if (typeof query.offsetParam !== 'undefined') {
				query.offset = params ? params[query.offsetParam] : undefined;
			}
			// Note the callback function has the data and error reversed due to existing code in promiseExec which has the
			// err and data swapped.  This trickles down into alasql.exec and further. Rather than risk breaking the whole thing,
			// the (data, err) standard is maintained here.
			var res1 = queryfn(query, oldscope, function (res, err) {
				if (err) {
					if (cb) {
						return cb(null, err);
					}
					throw err;
				}
				if (query.rownums.length > 0) {
					for (var i = 0, ilen = res.length; i < ilen; i++) {
						for (var j = 0, jlen = query.rownums.length; j < jlen; j++) {
							res[i][query.rownums[j]] = i + 1;
						}
					}
				}

				// Handle GROUP_ROW_NUMBER() and ROW_NUMBER() OVER (PARTITION BY ...) - restart numbering when grouping column(s) change
				if (query.grouprownums && query.grouprownums.length > 0) {
					for (var j = 0, jlen = query.grouprownums.length; j < jlen; j++) {
						var config = query.grouprownums[j];
						var partitionColumns;

						// Determine which columns to partition by
						if (config.partitionColumns && config.partitionColumns.length > 0) {
							// Use explicit PARTITION BY columns
							partitionColumns = config.partitionColumns;
						} else {
							// Fall back to first column for GROUP_ROW_NUMBER()
							var columnKeys = Object.keys(res[0] || {});
							partitionColumns = [columnKeys[0]];
						}

						var prevValues = null;
						var rowNum = 0;

						for (var i = 0, ilen = res.length; i < ilen; i++) {
							// Get current partition key (combination of all partition columns)
							var currentValues = partitionColumns
								.map(function (col) {
									return res[i][col];
								})
								.join('|');

							// Reset counter when partition changes
							if (i === 0 || currentValues !== prevValues) {
								rowNum = 1;
							} else {
								rowNum++;
							}

							res[i][config.as] = rowNum;
							prevValues = currentValues;
						}
					}
				}

				// Handle window aggregate functions - COUNT/MAX/MIN/SUM/AVG with OVER (PARTITION BY ...)
				if (query.windowaggrs && query.windowaggrs.length > 0) {
					for (var j = 0, jlen = query.windowaggrs.length; j < jlen; j++) {
						var config = query.windowaggrs[j];
						var partitions = {};

						// Group rows by partition
						for (var i = 0, ilen = res.length; i < ilen; i++) {
							var partitionKey =
								config.partitionColumns && config.partitionColumns.length > 0
									? config.partitionColumns
											.map(function (col) {
												return res[i][col];
											})
											.join('|')
									: '__all__';

							if (!partitions[partitionKey]) partitions[partitionKey] = [];
							partitions[partitionKey].push(i);
						}

						// Calculate and assign aggregate for each partition
						for (var partitionKey in partitions) {
							var rowIndices = partitions[partitionKey];
							var values = [];
							var colId = config.expression && config.expression.columnid;

							// Collect values from partition rows
							if (config.aggregatorid !== 'COUNT' || (colId && colId !== '*')) {
								for (var k = 0; k < rowIndices.length; k++) {
									var val = res[rowIndices[k]][colId];
									if (val != null) values.push(val);
								}
							}

							// Calculate aggregate
							var aggregateValue;
							switch (config.aggregatorid) {
								case 'COUNT':
									aggregateValue = colId && colId !== '*' ? values.length : rowIndices.length;
									break;
								case 'SUM':
									aggregateValue = values.reduce(function (sum, v) {
										return sum + v;
									}, 0);
									break;
								case 'AVG':
									aggregateValue =
										values.length > 0
											? values.reduce(function (sum, v) {
													return sum + v;
												}, 0) / values.length
											: null;
									break;
								case 'MAX':
									aggregateValue = values.length > 0 ? Math.max.apply(null, values) : null;
									break;
								case 'MIN':
									aggregateValue = values.length > 0 ? Math.min.apply(null, values) : null;
									break;
							}

							// Assign aggregate value to all rows in partition
							for (var k = 0; k < rowIndices.length; k++) {
								res[rowIndices[k]][config.as] = aggregateValue;
							}
						}
					}
				}

				var res2 = modify(query, res);

				if (cb) {
					cb(res2);
				}
				return res2;
			});
			return res1;
		};

		statement.query = query;
		return statement;
	}

	execute(databaseid, params, cb) {
		return this.compile(databaseid)(params, cb);
		//	throw new Error('Insert statement is should be compiled')
	}

	compileWhereExists(query) {
		if (!this.exists) return;
		query.existsfn = this.exists.map(function (ex) {
			var nq = ex.compile(query.database.databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}

	compileQueries(query) {
		if (!this.queries) return;

		// Helper function to detect if a subquery might be correlated
		// A subquery is correlated if it references tables not in its own FROM clause
		const isCorrelated = (subquery, outerQuery) => {
			if (!subquery.from) return false;

			// Get table names from subquery's FROM clause
			const subqueryTables = new Set();
			subquery.from.forEach(f => {
				if (f.tableid) subqueryTables.add(f.tableid);
				if (f.as) subqueryTables.add(f.as);
			});

			// Check if WHERE clause references tables not in subquery's FROM
			const referencesExternal = node => {
				if (!node) return false;

				// Check Column nodes for tableid using instanceof
				if (node instanceof yy.Column) {
					if (node.tableid && !subqueryTables.has(node.tableid)) {
						return true;
					}
				}

				// Recursively check own properties only (not inherited)
				for (let key of Object.keys(node)) {
					if (node[key] && typeof node[key] === 'object') {
						if (referencesExternal(node[key])) return true;
					}
				}
				return false;
			};

			return referencesExternal(subquery.where) || referencesExternal(subquery.columns);
		};

		// Compile each subquery. Nested scalar subqueries such as
		// SELECT (SELECT (SELECT 1 AS c) AS b) AS a share one statement-level
		// queries list (see #1025), so every compiled subquery must be able to
		// resolve queriesidx against the same queriesfn array at runtime.
		query.queriesfn = this.queries.map(function (q) {
			var nq = q.compile(query.database.databaseid);
			nq.query.modifier = 'RECORDSET';

			// Mark as correlated if it references external tables
			nq.query.isCorrelated = isCorrelated(q, query);

			// If the nested query has its own queries, ensure they're compiled too
			// (e.g. IN/ALL/ANY subqueries that captured a nested queries list)
			if (q.queries && q.queries.length > 0 && !nq.query.queriesfn) {
				nq.query.queriesfn = q.queries.map(function (qq) {
					var nnq = qq.compile(query.database.databaseid);
					nnq.query.modifier = 'RECORDSET';
					return nnq;
				});
			}
			return nq;
		});

		// Share compiled subquery functions down the tree. Without this,
		// multi-level scalar subqueries fail with
		// "Cannot read properties of undefined (reading '0')" when the
		// inner select expression evaluates this.queriesfn[queriesidx-1].
		(function shareQueriesfn(queriesfn) {
			if (!queriesfn) return;
			queriesfn.forEach(function (nq) {
				if (!nq.query.queriesfn) {
					nq.query.queriesfn = queriesfn;
				} else if (nq.query.queriesfn !== queriesfn) {
					shareQueriesfn(nq.query.queriesfn);
				}
			});
		})(query.queriesfn);
	}
};

/**
 Modify res according modifier
 @function
 @param {object} query Query object
 @param res {object|number|string|boolean} res Data to be converted
 */
function modify(query, res) {
	// jshint ignore:line

	/* If source is a primitive value then return it */
	if (
		typeof res === 'undefined' ||
		typeof res === 'number' ||
		typeof res === 'string' ||
		typeof res === 'boolean'
	) {
		return res;
	}

	var modifier = query.modifier || alasql.options.modifier;
	var columns = query.columns;

	// If dirtyColumns is true, we need to merge columns from data with existing columns
	// This happens when SELECT * is used with dynamic data sources (like parameters)
	if (query.dirtyColumns && res.length > 0) {
		var allcol = {};
		// First, scan the data to find all column names
		for (var i = Math.min(res.length, alasql.options.columnlookup || 10) - 1; 0 <= i; i--) {
			for (var key in res[i]) {
				allcol[key] = true;
			}
		}

		// Create columns from data
		var dataColumns = Object.keys(allcol).map(function (columnid) {
			return {columnid: columnid};
		});

		// If we don't have any columns yet, just use the data columns
		if (!columns || columns.length === 0) {
			columns = dataColumns;
		} else {
			// We have some columns (e.g., from explicit column expressions),
			// merge them with data columns, avoiding duplicates
			var existingColumnIds = {};
			columns.forEach(function (col) {
				existingColumnIds[col.columnid] = true;
			});

			// Add data columns that aren't already in the list
			dataColumns.forEach(function (col) {
				if (!existingColumnIds[col.columnid]) {
					columns.push(col);
				}
			});
		}
	} else if (typeof columns === 'undefined' || columns.length === 0) {
		// Try to create columns
		if (res.length > 0) {
			var allcol = {};
			for (var i = Math.min(res.length, alasql.options.columnlookup || 10) - 1; 0 <= i; i--) {
				for (var key in res[i]) {
					allcol[key] = true;
				}
			}

			columns = Object.keys(allcol).map(function (columnid) {
				return {columnid: columnid};
			});
		} else {
			// Cannot recognize columns
			columns = [];
			if (query && query.sources) {
				query.sources.forEach(source => {
					if (source && source.columns && Array.isArray(source.columns)) {
						columns = columns.concat(source.columns);
					}
				});
			}
		}
	}

	switch (modifier) {
		case 'VALUE':
			if (res.length === 0) return undefined;
			const keyValue = columns && columns.length > 0 ? columns[0].columnid : Object.keys(res[0])[0];
			return res[0][keyValue];

		case 'ROW':
			if (res.length === 0) return undefined;
			return Object.values(res[0]);

		case 'COLUMN':
			if (res.length === 0) return [];

			let key;
			if (columns && columns.length > 0) {
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}

			let ar = [];
			for (var i = 0, ilen = res.length; i < ilen; i++) {
				ar.push(res[i][key]);
			}

			// Apply DISTINCT if specified
			if (query.distinct) {
				ar = alasql.utils.distinctArray(ar);
			}

			return ar;

		case 'MATRIX':
			if (res.length === 0) return undefined;
			return res.map(row => columns.map(col => row[col.columnid]));

		case 'INDEX':
			if (res.length === 0) return undefined;
			const keyIndex = columns && columns.length > 0 ? columns[0].columnid : Object.keys(res[0])[0];
			const valIndex = columns && columns.length > 1 ? columns[1].columnid : Object.keys(res[0])[1];
			return res.reduce((acc, row) => ({...acc, [row[keyIndex]]: row[valIndex]}), {});

		case 'RECORDSET':
			// Assuming alasql.Recordset is available in the scope
			return new alasql.Recordset({columns: columns, data: res});

		case 'TEXTSTRING':
			if (res.length === 0) return undefined;
			const keyTextString =
				columns && columns.length > 0 ? columns[0].columnid : Object.keys(res[0])[0];
			return res.map(row => row[keyTextString]).join('\n');

		case 'ALASQL_DETAILS':
			// Returns both data and column metadata in a structured format
			// Useful for internal operations that need both data and column info in one call
			return {
				data: res,
				columns: columns,
				length: res.length,
			};
	}
	return res;
}
