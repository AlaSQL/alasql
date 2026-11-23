import {Node} from '../expression/node.js';

export default function install(alasql, internal) {
	var yy = alasql.yy;
	var Query = alasql.Query;
	var queryfn = internal.queryfn;
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

	yy.Select = class Select extends Node {
		// The aggregates of a subquery are its own
		collectAggregate() {
			return false;
		}

		// The alias of a column or a source is kept on the node it names, and is part of the select
		sameChildren(other) {
			return (
				super.sameChildren(other) &&
				sameAliases(this.columns, other.columns) &&
				sameAliases(this.from, other.from)
			);
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
			if (this.distinctOn) {
				s += 'DISTINCT ON (' + this.distinctOn.map(e => e.toString()).join(',') + ') ';
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
				s +=
					' UNION ALL ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.unionall.toString();
			}
			if (this.except) {
				s += ' EXCEPT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.except.toString();
			}
			if (this.intersect) {
				s +=
					' INTERSECT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.intersect.toString();
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

		isFromDual(databaseid) {
			if (!this.from || this.from.length !== 1 || this.joins) {
				return false;
			}
			var fr = this.from[0];
			if (!(fr instanceof yy.Table) || fr.tableid.toUpperCase() !== 'DUAL') {
				return false;
			}
			var db = internal.bind.table(fr, databaseid).db;
			return !!db && !Object.keys(db.tables).some(tableid => tableid.toUpperCase() === 'DUAL');
		}

		// Compile SELECT statement
		compile(databaseid, params) {
			var db = alasql.databases[databaseid];

			// FROM DUAL is the same as no FROM, unless the database has a table of that name (#2860)
			if (this.isFromDual(databaseid)) {
				var from = this.from;
				this.from = undefined;
				try {
					return this.compile(databaseid, params);
				} finally {
					this.from = from;
				}
			}
			// The scope of this SELECT for bind.column, while it and its subqueries are compiled
			internal.bind.enter(this, databaseid);
			try {
				return this.compileInScope(databaseid, params, db);
			} finally {
				internal.bind.leave();
			}
		}

		// The errors of a FROM or JOIN that names a table or a database that does not exist, or
		// that is of a kind the compiler does not know. They are thrown here, after the
		// subqueries of WHERE are compiled and before FROM is, as they were when this walk also
		// built the dictionary of default columns.
		checkSources(databaseid) {
			if (this.from) {
				for (const fr of this.from) {
					if (fr instanceof yy.Table) {
						if (internal.bind.table(fr, databaseid).db.tables[fr.tableid] === undefined) {
							throw new Error('Table does not exist: ' + fr.tableid);
						}
					} else if (!(
						fr instanceof yy.Select ||
						fr instanceof yy.Search ||
						fr instanceof yy.ParamValue ||
						fr instanceof yy.VarValue ||
						fr instanceof yy.FuncValue ||
						fr instanceof yy.FromData ||
						fr instanceof yy.Json ||
						fr.inserted
					)) {
						throw new Error('Unknown type of FROM clause');
					}
				}
			}
			if (this.joins) {
				for (const jn of this.joins) {
					// a source without a name and without a table fails here, as it did
					void (jn.as || jn.table.tableid);
					if (jn.table) {
						const ref = internal.bind.table(jn.table, databaseid);
						if (ref.db === undefined) {
							throw new Error('Database does not exist: ' + ref.databaseid);
						}
						if (ref.db.tables[jn.table.tableid] === undefined) {
							throw new Error('Table does not exist: ' + jn.table.tableid);
						}
					} else if (!(jn.select || jn.param || jn.func)) {
						throw new Error('Unknown type of FROM clause');
					}
				}
			}
		}

		compileInScope(databaseid, params, db) {
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
			// The rows of a run are on the copy of that run (#2596). The compiled query shows an
			// empty list, as it did between two runs before, and the list cannot take a row.
			query.data = Object.freeze([]);
			// 0. Precompile whereexists
			this.compileWhereExists(query);

			// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
			this.compileQueries(query);

			this.checkSources(databaseid);

			// What the sources of this SELECT are and which columns they define: the scope that
			// compile() entered. It is passed to every toJS as its third argument.
			query.columnScope = internal.bind.current();

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
			query.distinctOn = !!this.distinctOn;
			if (
				this.distinctOn &&
				(this.group ||
					query.selectGroup.length > 0 ||
					this.union ||
					this.unionall ||
					this.except ||
					this.intersect)
			) {
				throw new Error(
					'DISTINCT ON is not supported with GROUP BY, aggregates, UNION, INTERSECT or EXCEPT'
				);
			}

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

			// 9. Compile ordering function for UNION and UNIONALL
			query.corresponding = this.corresponding; // If CORRESPONDING flag exists
			if (this.union) {
				query.unionfn = this.union.compile(databaseid);
				// ORDER BY is now at the top level, not in the union clause
				if (!query.orderfn && this.union.order) {
					query.orderfn = this.union.compileOrder(query, params);
				}
			} else if (this.unionall) {
				query.unionallfn = this.unionall.compile(databaseid);
				// ORDER BY is now at the top level, not in the unionall clause
				if (!query.orderfn && this.unionall.order) {
					query.orderfn = this.unionall.compileOrder(query, params);
				}
			} else if (this.except) {
				query.exceptfn = this.except.compile(databaseid);
				// ORDER BY is now at the top level, not in the except clause
				if (!query.orderfn && this.except.order) {
					query.orderfn = this.except.compileOrder(query, params);
				}
			} else if (this.intersect) {
				query.intersectfn = this.intersect.compile(databaseid);
				// ORDER BY is now at the top level, not in the intersect clause
				if (!query.orderfn && this.intersect.order) {
					query.orderfn = this.intersect.compileOrder(query, params);
				}
			}

			// SELECT INTO
			if (this.into) {
				if (this.into instanceof yy.Table) {
					const into = internal.bind.table(this.into, databaseid);
					// Save into the table in database
					if (alasql.options.autocommit && into.db.engineid) {
						// For external database when AUTOCOMMIT is ONs
						query.intoallfns = `return alasql
								.engines[${JSON.stringify(into.db.engineid)}]
								.intoTable(
									${JSON.stringify(into.databaseid)},
									${JSON.stringify(this.into.tableid)},
									this.data,
									columns,
									cb
								);`;
					} else {
						// Into AlaSQL tables - convert types based on column definitions
						var dbid = into.databaseid;
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
			// The compiled query is shared by every run of the statement, so a run never writes to it.
			// Each run gets its own copy of it (#2596). state holds what
			// the statement around this one sets for the run (modifier, queriesfn).
			var extra;
			var statement = function (params, cb, oldscope, state) {
				var run = newRun(query, state, extra || (extra = unlisted(query)));
				run.params = params;
				if (typeof run.limitParam !== 'undefined') {
					run.limit = params ? params[run.limitParam] : undefined;
				}
				if (typeof run.offsetParam !== 'undefined') {
					run.offset = params ? params[run.offsetParam] : undefined;
				}
				// Note the callback function has the data and error reversed due to existing code in promiseExec which has the
				// err and data swapped.  This trickles down into alasql.exec and further. Rather than risk breaking the whole thing,
				// the (data, err) standard is maintained here.
				var res1 = queryfn(run, oldscope, function (res, err) {
					if (err) {
						if (cb) {
							return cb(null, err);
						}
						throw err;
					}
					if (run.rownums.length > 0) {
						for (var i = 0, ilen = res.length; i < ilen; i++) {
							for (var j = 0, jlen = run.rownums.length; j < jlen; j++) {
								res[i][run.rownums[j]] = i + 1;
							}
						}
					}

					// Handle GROUP_ROW_NUMBER() and ROW_NUMBER() OVER (PARTITION BY ...) - restart numbering when grouping column(s) change
					if (run.grouprownums && run.grouprownums.length > 0) {
						for (var j = 0, jlen = run.grouprownums.length; j < jlen; j++) {
							var config = run.grouprownums[j];
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
					if (run.windowaggrs && run.windowaggrs.length > 0) {
						for (var j = 0, jlen = run.windowaggrs.length; j < jlen; j++) {
							var config = run.windowaggrs[j];
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

					var res2 = modify(run, res);

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
				// A branch of UNION, EXCEPT or INTERSECT can read the outer row too (#2856).
				// Check it first, as the first branch may have no FROM.
				if (
					['union', 'unionall', 'except', 'intersect'].some(
						key => subquery[key] && isCorrelated(subquery[key], outerQuery)
					)
				) {
					return true;
				}

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

	yy.Select.children = [
		'columns',
		'distinctOn',
		'top',
		'into',
		'from',
		'joins',
		'where',
		'group',
		'having',
		'order',
		'limit',
		'offset',
		'union',
		'unionall',
		'except',
		'intersect',
		'pivot',
		'unpivot',
		'removecolumns',
	];
	yy.Select.fields = ['modifier', 'distinct', 'all', 'percent', 'corresponding', 'explain'];

	function sameAliases(a, b) {
		if (!Array.isArray(a) || !Array.isArray(b)) return (a && a.as) == (b && b.as);
		return a.every((item, i) => (item && item.as) == (b[i] && b[i].as));
	}

	/**
 Modify res according modifier
 @function
 @param {object} query Query object
 @param res {object|number|string|boolean} res Data to be converted
 */
	// The state of one run of a compiled query: a copy of the compiled query and one of each
	// source, one level deep, so the compiled functions are shared and a write lands on the copy.
	// The lists a run adds to are copied too. A copy and not Object.create(compiled): an object
	// per run with the compiled query as its prototype has a shape of its own for every compiled
	// statement, and Node ran a statement that is compiled on every run (a CTE) three times slower.
	//
	// The copy names every field. A correlated subquery runs once per outer row, and a copy
	// field by field in a loop (Object.assign) took a tenth to a third of such a query. A field
	// that is not named here is found at the first run of a statement (unlisted) and copied by
	// name after that, so a new field works without being added here; it is only slower.
	function copyQuery(q) {
		return {
			alasql: q.alasql,
			columns: q.columns,
			xcolumns: q.xcolumns,
			selectGroup: q.selectGroup,
			groupColumns: q.groupColumns,
			removeKeys: q.removeKeys,
			aggrKeys: q.aggrKeys,
			explain: q.explain,
			explaination: q.explaination,
			explid: q.explid,
			modifier: q.modifier,
			database: q.database,
			data: q.data,
			columnScope: q.columnScope,
			queriesfn: q.queriesfn,
			existsfn: q.existsfn,
			sources: q.sources,
			aliases: q.aliases,
			defaultTableid: q.defaultTableid,
			fromfn: q.fromfn,
			rownums: q.rownums,
			grouprownums: q.grouprownums,
			windowaggrs: q.windowaggrs,
			selectColumns: q.selectColumns,
			selectgfns: q.selectgfns,
			groupStar: q.groupStar,
			dirtyColumns: q.dirtyColumns,
			wherefn: q.wherefn,
			intoObject: q.intoObject,
			selectfns: q.selectfns,
			groupSources: q.groupSources,
			wherefns: q.wherefns,
			joinsorted: q.joinsorted,
			groupKeys: q.groupKeys,
			ixsources: q.ixsources,
			selectfn: q.selectfn,
			allgroups: q.allgroups,
			removeLikeKeys: q.removeLikeKeys,
			distinct: q.distinct,
			ingroup: q.ingroup,
			orderfns: q.orderfns,
			distinctOn: q.distinctOn,
			groupfn: q.groupfn,
			orderfn: q.orderfn,
			percent: q.percent,
			orderColumns: q.orderColumns,
			selectgfn: q.selectgfn,
			corresponding: q.corresponding,
			limit: q.limit,
			havingfns: q.havingfns,
			pivotfn: q.pivotfn,
			unionallfn: q.unionallfn,
			unionfn: q.unionfn,
			intersectfn: q.intersectfn,
			exceptfn: q.exceptfn,
			isCorrelated: q.isCorrelated,
			offset: q.offset,
			intofns: q.intofns,
			intoallfns: q.intoallfns,
			havingfn: q.havingfn,
			intofn: q.intofn,
			intoallfn: q.intoallfn,
			limitParam: q.limitParam,
			preserveArrayResult: q.preserveArrayResult,
			offsetParam: q.offsetParam,
		};
	}
	function copySource(s) {
		return {
			alias: s.alias,
			databaseid: s.databaseid,
			joinmode: s.joinmode,
			applymode: s.applymode,
			tableid: s.tableid,
			onmiddlefn: s.onmiddlefn,
			srcwherefns: s.srcwherefns,
			srcwherefn: s.srcwherefn,
			columns: s.columns,
			datafn: s.datafn,
			onleftfns: s.onleftfns,
			optimization: s.optimization,
			subquery: s.subquery,
			applyselect: s.applyselect,
			onleftfn: s.onleftfn,
			onmiddlefns: s.onmiddlefns,
			onrightfns: s.onrightfns,
			onrightfn: s.onrightfn,
			fromidx: s.fromidx,
		};
	}
	function missing(from, copy) {
		return Object.keys(from).filter(key => !(key in copy));
	}
	// The fields of this compiled query and of its sources that the two copies above do not name
	function unlisted(compiled) {
		return {
			query: missing(compiled, copyQuery(compiled)),
			sources: compiled.sources.map(source => missing(source, copySource(source))),
		};
	}
	function newRun(compiled, state, extra) {
		var run = copyQuery(compiled);
		var i, j, keys;
		for (keys = extra.query, i = 0; i < keys.length; i++) run[keys[i]] = compiled[keys[i]];
		var sources = compiled.sources;
		var copy = new Array(sources.length);
		for (i = 0; i < sources.length; i++) {
			copy[i] = copySource(sources[i]);
			for (keys = extra.sources[i], j = 0; j < keys.length; j++)
				copy[i][keys[j]] = sources[i][keys[j]];
		}
		run.sources = copy;
		run.removeKeys = compiled.removeKeys.slice();
		run.columns = compiled.columns.slice();
		run.explaination = compiled.explaination.slice();
		// The outer row of each group, for a subquery in HAVING or in the select list
		if (compiled.groupSources) run.groupSources = new WeakMap();
		if (state) Object.assign(run, state);
		return run;
	}

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
				const keyValue =
					columns && columns.length > 0 ? columns[0].columnid : Object.keys(res[0])[0];
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
				const keyIndex =
					columns && columns.length > 0 ? columns[0].columnid : Object.keys(res[0])[0];
				const valIndex =
					columns && columns.length > 1 ? columns[1].columnid : Object.keys(res[0])[1];
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

	internal.modify = modify;
}
