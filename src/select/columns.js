import {cloneDeep, escapeq, n2u, setOwnJS} from '../utils/helpers.js';

export default function install(alasql, internal) {
	// For a column of the select list whose code is not written from the binding: what bind.column
	// says it refers to, beside the lookup that writes the code. written is the "'name':code"
	// that the lookup wrote for the row p, when it wrote one. This is only worked out when a test
	// sets Column.onBind, which gets both to compare (test/bind/), and what the 4.x rule of the
	// select list makes of the binding (bind.read). An error of bind.column goes to onBind as {error}.
	function bindBeside(col, written) {
		var onBind = alasql.yy.Column.onBind;
		if (!onBind || written === undefined) return;
		var scope = internal.bind.current();
		if (!scope) return;
		var b = internal.bind.beside(col, scope, 'select');
		var js = written.slice(escapeq(col.as || col.columnid).length + 3);
		onBind(col, b.ref, js, undefined, 'p', undefined, undefined, scope, b.read);
	}

	var yy = alasql.yy;

	// The read of a column that stands alone in a select list, written from the binding (#2723):
	// bind.column says what the name refers to, bind.read applies the 4.x rule of the place, and
	// bind.write writes the read. lookup is a function that writes today's code. It stays for
	// what the binding does not write, and for the case that the binding throws: it must not be
	// able to break a query.
	function columnJS(col, place, context, lookup, tableid, defcols) {
		var scope = internal.bind.current();
		var ref, read, written;
		if (scope) {
			try {
				ref = internal.bind.column(col, scope);
				read = internal.bind.read(ref, scope, place, col);
				written = internal.bind.write(read, scope, context, col);
			} catch (err) {
				ref = read = {error: err};
				written = undefined;
			}
		}
		// test mode: the lookup runs beside it, and the check compares the two (test/bind/)
		var onBind = yy.Column.onBind;
		if (onBind && scope) {
			onBind(col, ref, lookup(), undefined, context, tableid, defcols, scope, read, written);
		}
		return written !== undefined ? written : lookup();
	}

	// In the select list of a grouped query. The 4.x rule of this place: a name two tables define
	// is read from the first table of FROM (#2928). With the default columns the lookup finds a
	// bare name in the source that has it (#3110), and without them, for a name two tables
	// define, it reads the first table.
	function groupColumnJS(col, query) {
		var context = '(this.groupSources.get(g) || g)';
		var ambiguous =
			!col.tableid &&
			query.columnScope &&
			internal.bind.owner(query.columnScope, col.columnid) === '-';
		var defcols = ambiguous ? undefined : query.columnScope;
		var tableid = query.defaultTableid;
		return columnJS(
			col,
			'group',
			context,
			function () {
				return col.lookupJS(context, tableid, defcols);
			},
			tableid,
			defcols
		);
	}

	/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

	// yy.Select.prototype.compileSources = function(query) {
	// 	return sources;
	// };

	// Regular expression to match aggregate functions that require expression compilation
	var re_aggrWithExpression = /^(SUM|MAX|MIN|FIRST|LAST|AVG|ARRAY|REDUCE|TOTAL)$/;

	function compileSelectStar(query, aliases, joinstar) {
		var sp = '',
			ss = [],
			columnIds = {};

		aliases.forEach(function (alias) {
			// console.log(query.aliases[alias]);
			//	console.log(query,alias);
			// console.log(query.aliases[alias].tableid);
			//	console.log(42,631,alias);
			//	console.log(query.aliases);
			//	if(!alias) {
			//		sp += 'for(var k1 in p) var w=p[k1];for(var k2 in w){r[k2]=w[k2]};';
			//	} else 	{

			// TODO move this out of this function
			query.ixsources = {};
			query.sources.forEach(function (source) {
				query.ixsources[source.alias] = source;
			});

			// Fixed
			var columns;
			if (query.ixsources[alias]) {
				var columns = query.ixsources[alias].columns;
			}

			//		if(columns.length == 0 && query.aliases[alias].tableid) {
			//			var columns = alasql.databases[query.aliases[alias].databaseid].tables[query.aliases[alias].tableid].columns;
			//		};

			// Check if this is a Table or other
			if (joinstar && alasql.options.joinstar == 'json') {
				sp += "r['" + alias + "']={};";
			}

			if (columns && columns.length > 0) {
				columns.forEach(function (tcol) {
					const escapedColumnId = escapeq(tcol.columnid);
					if (joinstar && alasql.options.joinstar == 'underscore') {
						ss.push(
							"'" +
								alias +
								'_' +
								escapedColumnId +
								"':p['" +
								alias +
								"']['" +
								escapedColumnId +
								"']"
						);
					} else if (joinstar && alasql.options.joinstar == 'json') {
						//				ss.push('\''+alias+'_'+tcol.columnid+'\':p[\''+alias+'\'][\''+tcol.columnid+'\']');
						sp +=
							"r['" +
							alias +
							"']['" +
							escapedColumnId +
							"']=p['" +
							alias +
							"']['" +
							escapedColumnId +
							"'];";
					} else {
						var value = "p['" + alias + "']['" + escapedColumnId + "']";
						if (!columnIds[tcol.columnid]) {
							var key = "'" + escapedColumnId + "':";
							ss.push(key + value);
							columnIds[tcol.columnid] = {
								id: ss.length - 1,
								value: value,
								key: key,
							};
						} else {
							var newValue =
								value + ' !== undefined ? ' + value + ' : ' + columnIds[tcol.columnid].value;
							ss[columnIds[tcol.columnid].id] = columnIds[tcol.columnid].key + newValue;
							columnIds[tcol.columnid].value = newValue;
						}
					}

					query.selectColumns[escapedColumnId] = true;

					//			console.log('ok',tcol);

					var coldef = {
						columnid: tcol.columnid,
						dbtypeid: tcol.dbtypeid,
						dbsize: tcol.dbsize,
						dbprecision: tcol.dbprecision,
						dbenum: tcol.dbenum,
					};
					query.columns.push(coldef);
					query.xcolumns[coldef.columnid] = coldef;
				});
				//console.log(999,columns);
			} else {
				//					console.log(60,alias,columns);

				// If columns are not known (e.g., with inline data using ? placeholders),
				// copy all properties dynamically respecting the joinstar option:
				// - 'json': Nested objects by alias (e.g., {a: {col: val}, b: {col: val}})
				// - 'underscore': Prefix columns with alias (e.g., {a_col: val, b_col: val})
				// - 'overwrite': Later columns overwrite earlier ones (default)
				if (joinstar && alasql.options.joinstar == 'json') {
					// For json mode, create nested object with alias as key
					sp += "r['" + escapeq(alias) + "']=p['" + escapeq(alias) + "'];";
				} else if (joinstar && alasql.options.joinstar == 'underscore') {
					// For underscore mode, prefix each key with alias_
					sp +=
						'var w=p["' +
						escapeq(alias) +
						'"];for(var k in w){r["' +
						escapeq(alias) +
						'_"+k]=w[k]};';
				} else {
					// Default overwrite mode
					sp +=
						'var w=p["' +
						escapeq(alias) +
						'"];for(var k in w){' +
						setOwnJS('r', 'k', 'w[k]') +
						'};';
				}
				//console.log(777, sp);
				query.dirtyColumns = true;
			}
			//	}
			//console.log(87,{s:ss.join(','),sp:sp});
		});

		return {s: ss.join(','), sp: sp};
	}

	// Helper function to check if an expression is an arrow operation and extract its path
	// Returns null if not an arrow op, or an array of path parts if it is
	function getArrowPath(expr) {
		if (!expr || expr.op !== '->') {
			return null;
		}
		var path = [];
		var current = expr;
		while (current && current.op === '->') {
			// The right side is the property name
			if (typeof current.right === 'string') {
				path.unshift(current.right);
			} else if (typeof current.right === 'number') {
				path.unshift(current.right);
			} else {
				// Complex expression on right side, can't extract path
				return null;
			}
			current = current.left;
		}
		// The leftmost should be a column
		if (current && current.columnid) {
			path.unshift(current.columnid);
			return path;
		}
		return null;
	}

	yy.Select.prototype.compileSelect1 = function (query, params) {
		var self = this;
		query.columns = [];
		query.xcolumns = {};
		query.selectColumns = {};
		query.dirtyColumns = false;
		var s = 'var r={';
		var sp = '';
		var ss = [];

		//console.log(42,87,this.columns);

		this.columns.forEach(function (col) {
			if (col instanceof yy.Column) {
				if (col.columnid === '*') {
					if (col.func) {
						sp +=
							"r=params['" + col.param + "'](p['" + query.sources[0].alias + "'],p,params,alasql);";
					} else if (col.tableid) {
						//Copy all
						var ret = compileSelectStar(query, [col.tableid], false);
						if (ret.s) {
							ss = ss.concat(ret.s);
						}
						sp += ret.sp;
					} else {
						//					console.log('aliases', query.aliases);
						var ret = compileSelectStar(query, Object.keys(query.aliases), true); //query.aliases[alias].tableid);
						if (ret.s) {
							ss = ss.concat(ret.s);
						}
						sp += ret.sp;

						// TODO Remove these lines
						// In case of no information
						// sp += 'for(var k1 in p){var w=p[k1];'+
						// 			'for(k2 in w) {r[k2]=w[k2]}}'
					}
				} else {
					// If field, otherwise - expression
					var written = ss.length;
					var fromBinding = false;
					var tbid = col.tableid;
					//				console.log(query.sources);
					var dbid = col.databaseid || query.sources[0].databaseid || query.database.databaseid;
					// the source whose column definitions have the name, for the type of the result
					// column and for the error of a column that the table does not have
					var ownerTbid = col.tableid
						? undefined
						: internal.bind.owner(query.columnScope, col.columnid);
					if (!tbid) tbid = ownerTbid;
					if (!tbid) tbid = query.defaultTableid;
					if (col.columnid !== '_') {
						if (false) {
							ss.push(
								"'" +
									escapeq(col.as || col.columnid) +
									"':p['" +
									query.defaultTableid +
									"']['" +
									col.tableid +
									"']['" +
									col.columnid +
									"']"
							);
						} else {
							// workaround for multisheet xlsx export with custom COLUMNS
							var isMultisheetParam =
								params &&
								params.length > 1 &&
								Array.isArray(params[0]) &&
								params[0].length >= 1 &&
								params[0][0].hasOwnProperty('sheetid');
							if (isMultisheetParam) {
								sp =
									'var r={};var w=p["' +
									tbid +
									'"];' +
									'var cols=[' +
									self.columns
										.map(function (col) {
											return "'" + col.columnid + "'";
										})
										.join(',') +
									'];var colas=[' +
									self.columns
										.map(function (col) {
											return "'" + (col.as || col.columnid) + "'";
										})
										.join(',') +
									'];' +
									"for (var i=0;i<Object.keys(p['" +
									tbid +
									"']).length;i++)" +
									' for(var k=0;k<cols.length;k++){if (!r.hasOwnProperty(i)) r[i]={}; r[i][colas[k]]=w[i][cols[k]];}';
							} else {
								// For JOINs with inline data where column table is unknown, search all tables
								var needsRuntimeResolution =
									!col.tableid && query.sources.length > 1 && (!ownerTbid || ownerTbid === '-');

								// Today's code for the read: asked from the sources per row (#2680), or
								// the column of one source
								var lookup;
								if (needsRuntimeResolution) {
									// An APPLY source has no entry in query.aliases and was not asked, so
									// its bare column came out undefined (#3115). With one in the query
									// every source is asked, in the order of FROM and JOIN.
									var askAliases = Object.keys(query.aliases);
									if (
										query.sources.some(function (src) {
											return src.applyselect;
										})
									) {
										askAliases = query.sources.map(function (src) {
											return src.alias;
										});
									}
									lookup = function () {
										return yy.Column.fromAnySource(
											'p',
											askAliases,
											col.columnid,
											query.columnScope
										);
									};
								} else {
									var lookupTbid = tbid;
									lookup = function () {
										return "p['" + lookupTbid + "']['" + col.columnid + "']";
									};
								}
								// The code is written from the binding, with the 4.x rule of this place:
								// a name two tables define is read from the first source that has it
								// (#2928). What it writes is the same code, so nothing changes at run time.
								ss.push(
									"'" +
										escapeq(col.as || col.columnid) +
										"':" +
										columnJS(col, 'select', 'p', lookup)
								);
								fromBinding = true;
								if (needsRuntimeResolution) {
									// Only check it against the default table if no other source can have it
									var inOtherSource = query.sources.some(
										src =>
											src.alias !== tbid &&
											(!src.columns?.length || src.columns.some(c => c.columnid === col.columnid))
									);
									if (inOtherSource) tbid = undefined;
								}
							}
						}
					} else {
						ss.push("'" + escapeq(col.as || col.columnid) + "':p['" + tbid + "']");
					}
					// Where the code above is not written from the binding (`_`, the multisheet
					// workaround), the binding is still compared with it in the test mode
					if (!fromBinding) bindBeside(col, ss.length > written ? ss[ss.length - 1] : undefined);
					query.selectColumns[escapeq(col.as || col.columnid)] = true;

					if (query.aliases[tbid] && query.aliases[tbid].type === 'table') {
						if (!alasql.databases[dbid].tables[query.aliases[tbid].tableid]) {
							//						console.log(query.database,tbid,query.aliases[tbid].tableid);
							throw new Error("Table '" + tbid + "' does not exist in database");
						}
						var columns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].columns;
						var xcolumns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].xcolumns;
						//console.log(xcolumns, col,123);
						//					console.log(0);
						if (xcolumns && columns.length > 0) {
							//						console.log(1);
							var tcol = xcolumns[col.columnid];

							if (undefined === tcol) {
								throw new Error('Column does not exist: ' + col.columnid);
							}

							var coldef = {
								columnid: col.as || col.columnid,
								dbtypeid: tcol.dbtypeid,
								dbsize: tcol.dbsize,
								dbpecision: tcol.dbprecision,
								dbenum: tcol.dbenum,
							};
							//						console.log(2);
							query.columns.push(coldef);
							query.xcolumns[coldef.columnid] = coldef;
						} else {
							var coldef = {
								columnid: col.as || col.columnid,
								//							dbtypeid:tcol.dbtypeid,
								//							dbsize:tcol.dbsize,
								//							dbpecision:tcol.dbprecision,
								//							dbenum: tcol.dbenum,
							};
							//						console.log(2);
							query.columns.push(coldef);
							query.xcolumns[coldef.columnid] = coldef;

							query.dirtyColumns = true;
						}
					} else {
						var coldef = {
							columnid: col.as || col.columnid,
							//							dbtypeid:tcol.dbtypeid,
							//							dbsize:tcol.dbsize,
							//							dbpecision:tcol.dbprecision,
							//							dbenum: tcol.dbenum,
						};
						//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid] = coldef;
						// This is a subquery?
						// throw new Error('There is now such table \''+col.tableid+'\'');
					}
				}
			} else if (col instanceof yy.AggrValue) {
				// Set alias if not provided
				if (!col.as) col.as = escapeq(col.toString());

				// Check if this aggregate has an OVER clause (window function)
				if (col.over) {
					// Track window aggregate for post-processing
					query.windowaggrs.push({
						as: col.as,
						aggregatorid: col.aggregatorid,
						expression: col.expression,
						partitionColumns: col.over.partition
							? col.over.partition.map(function (p) {
									return p.columnid || p.toString();
								})
							: [],
					});
				} else {
					// Regular aggregate - trigger GROUP BY
					if (!self.group) self.group = [''];

					if (re_aggrWithExpression.test(col.aggregatorid)) {
						ss.push(
							"'" +
								escapeq(col.as) +
								"':" +
								n2u(col.expression.toJS('p', query.defaultTableid, query.columnScope))
						);
					} else if (col.aggregatorid === 'COUNT') {
						ss.push("'" + escapeq(col.as) + "':1");
					}
				}

				// Add column definition for both window and regular aggregates
				var coldef = {
					columnid: col.as || col.columnid || col.toString(),
				};
				query.columns.push(coldef);
				query.xcolumns[coldef.columnid] = coldef;
			} else {
				//			console.log(203,col.as,col.columnid,col.toString());
				// Check if this is an arrow expression and we're outputting to OBJECT
				var arrowPath = query.intoObject && !col.as ? getArrowPath(col) : null;
				if (arrowPath && arrowPath.length > 1) {
					// For arrow expressions in INTO OBJECT(), generate nested object assignment
					// This will be added to sp (post-processing) instead of ss (inline object)
					var valueJs = n2u(col.toJS('p', query.defaultTableid, query.columnScope));
					// Generate code to create nested structure
					// e.g., for path ['details', 'stock']: r['details'] = r['details'] || {}; r['details']['stock'] = value;
					for (var i = 0; i < arrowPath.length - 1; i++) {
						var pathSoFar = arrowPath.slice(0, i + 1);
						var accessor = pathSoFar
							.map(function (p) {
								return "['" + escapeq(p) + "']";
							})
							.join('');
						sp += 'r' + accessor + ' = r' + accessor + ' || {};';
					}
					var fullAccessor = arrowPath
						.map(function (p) {
							return "['" + escapeq(p) + "']";
						})
						.join('');
					sp += 'r' + fullAccessor + ' = ' + valueJs + ';';

					// Use the first part of the path as the column name for metadata
					var colName = arrowPath[0];
					query.selectColumns[escapeq(colName)] = true;
					var coldef = {
						columnid: colName,
					};
					// Only add if not already added
					if (!query.xcolumns[coldef.columnid]) {
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid] = coldef;
					}
				} else {
					ss.push(
						"'" +
							escapeq(col.as || col.columnid || col.toString()) +
							"':" +
							n2u(col.toJS('p', query.defaultTableid, query.columnScope))
					);
					//			ss.push('\''+escapeq(col.toString())+'\':'+col.toJS("p",query.defaultTableid));
					//if(col instanceof yy.Expression) {
					query.selectColumns[escapeq(col.as || col.columnid || col.toString())] = true;

					var coldef = {
						columnid: col.as || col.columnid || col.toString(),
						//							dbtypeid:tcol.dbtypeid,
						//							dbsize:tcol.dbsize,
						//							dbpecision:tcol.dbprecision,
						//							dbenum: tcol.dbenum,
					};
					//						console.log(2);
					query.columns.push(coldef);
					query.xcolumns[coldef.columnid] = coldef;
				}
			}
		});
		s += ss.join(',') + '};' + sp;
		return s;
		//console.log(42,753,query.xcolumns, query.selectColumns);
	};
	yy.Select.prototype.compileSelect2 = function (query, params) {
		var s = query.selectfns;
		// Only add order keys if there's no union operation (otherwise they'll be added later)
		if (
			this.orderColumns &&
			this.orderColumns.length > 0 &&
			!this.union &&
			!this.unionall &&
			!this.except &&
			!this.intersect
		) {
			this.orderColumns.forEach(function (v, idx) {
				var key = '$$$' + idx;
				// Handle positional column reference (for SELECT * with ORDER BY numeric)
				if (v._useColumnIndex !== undefined) {
					// Use Object.keys to get column names and access by index
					s += "var keys=Object.keys(r);r['" + key + "']=r[keys[" + v.columnIndex + ']];';
				} else if (v instanceof yy.Column && query.xcolumns[v.columnid]) {
					s += "r['" + key + "']=r['" + v.columnid + "'];";
				} else if (v instanceof yy.ParamValue && query.xcolumns[params[v.param]]) {
					s += "r['" + key + "']=r['" + params[v.param] + "'];";
				} else {
					s += "r['" + key + "']=" + v.toJS('p', query.defaultTableid, query.columnScope) + ';';
				}
				query.removeKeys.push(key);
			});
		}
		// Like ORDER BY, a name or number refers to an output column, anything else to the source row
		if (this.distinctOn) {
			var exprs = this.distinctOn.map(function (e) {
				if (e instanceof yy.Column && query.xcolumns[e.columnid]) return "r['" + e.columnid + "']";
				if (e instanceof yy.NumValue) return 'r[Object.keys(r)[' + (e.value - 1) + ']]';
				return e.toJS('p', query.defaultTableid, query.columnScope);
			});
			s += "r['$$distinctOn']=JSON.stringify([" + exprs.join(',') + ']);';
			query.removeKeys.push('$$distinctOn');
		}
		return new Function('p,params,alasql', 'var y;' + s + 'return r');
	};

	yy.Select.prototype.compileSelectGroup0 = function (query) {
		var self = this;

		// Optimization: Build lookup structures upfront to avoid O(n*m) complexity in the main loop
		// Only build these if GROUP BY exists, as they're only used for alias resolution
		var groupByAliasMap = null;
		var selectColumnNames = null;

		if (self.group) {
			// Build map of GROUP BY columns that reference aliases (for O(1) lookup)
			groupByAliasMap = {};
			self.group.forEach(function (gp, idx) {
				if (gp instanceof yy.Column && gp.columnid && !gp.tableid) {
					groupByAliasMap[gp.columnid] = idx;
				}
			});

			// Build set of actual column names in SELECT to distinguish pure aliases from column renames
			// This prevents incorrect replacement of "GROUP BY b" when "SELECT a AS b, b AS c" exists
			selectColumnNames = {};
			self.columns.forEach(function (col) {
				if (col instanceof yy.Column && col.columnid) {
					selectColumnNames[col.columnid] = true;
				}
			});
		}

		self.columns.forEach(function (col, idx) {
			if (!(col instanceof yy.Column && col.columnid === '*')) {
				var colas;
				//  = col.as;
				if (col instanceof yy.Column) {
					colas = escapeq(col.columnid);
				} else {
					colas = escapeq(col.toString(true));
					//				console.log(273,colas);
				}
				for (var i = 0; i < idx; i++) {
					if (colas === self.columns[i].nick) {
						colas = self.columns[i].nick + ':' + idx;
						break;
					}
				}
				// }
				col.nick = colas;

				if (self.group) {
					// Match GROUP BY columns to SELECT columns by columnid and tableid (for real columns)
					var groupIdx = self.group.findIndex(function (gp) {
						return gp.columnid === col.columnid && gp.tableid === col.tableid;
					});
					if (groupIdx > -1) {
						self.group[groupIdx].nick = colas;
					}

					// Also match GROUP BY columns that reference SELECT column aliases
					// This handles cases like: SELECT CASE ... END AS age_group ... GROUP BY age_group
					// Only apply if:
					// 1. The SELECT column has an alias
					// 2. That alias matches a GROUP BY column name
					// 3. The alias is NOT an actual column name (pure alias, not renaming)
					if (
						col.as &&
						groupByAliasMap &&
						groupByAliasMap.hasOwnProperty(col.as) &&
						!selectColumnNames[col.as]
					) {
						var aliasGroupIdx = groupByAliasMap[col.as];
						// Replace the GROUP BY column reference with a deep copy of the SELECT expression
						// We use deep cloning to ensure nested objects (like CASE whens/elses) are copied
						var groupExpr = cloneDeep(col);
						// Clear SELECT-specific properties that shouldn't be in GROUP BY
						delete groupExpr.as;
						groupExpr.nick = colas;
						self.group[aliasGroupIdx] = groupExpr;
					}
				}

				if (
					col.funcid &&
					(col.funcid.toUpperCase() === 'ROWNUM' || col.funcid.toUpperCase() === 'ROW_NUMBER')
				) {
					// Check if this has OVER clause with PARTITION BY
					if (col.over && col.over.partition) {
						// Window function with partition - track for post-processing
						query.grouprownums.push({
							as: col.as,
							partitionColumns: col.over.partition.map(function (p) {
								return p.columnid || p.toString();
							}),
						});
					} else {
						// Regular ROW_NUMBER without partition
						query.rownums.push(col.as);
					}
				}
				if (col.funcid && col.funcid.toUpperCase() === 'GROUP_ROW_NUMBER') {
					query.grouprownums.push({as: col.as, columnIndex: 0}); // Track which column to use for grouping
				}
				//				console.log("colas:",colas);
				// }
			} else {
				query.groupStar = col.tableid || 'default';
			}
		});

		this.columns.forEach(function (col) {
			if (col.findAggregator) {
				col.findAggregator(query);
			}
		});

		if (this.having) {
			if (this.having.findAggregator) {
				this.having.findAggregator(query);
			}
		}
	};

	yy.Select.prototype.compileSelectGroup1 = function (query) {
		var self = this;
		var s = 'var r = {};';

		self.columns.forEach(function (col) {
			//		console.log(col);
			if (col instanceof yy.Column && col.columnid === '*') {
				//			s += 'for(var k in g){r[k]=g[k]};';
				//			s += 'for(var k in this.query.groupColumns){r[k]=g[this.query.groupColumns[k]]};';

				s += 'for(var k in g) {' + setOwnJS('r', 'k', 'g[k]') + '};';
				return '';

				//			console.log(query);
			} else {
				// var colas = col.as;
				var colas = col.as;
				if (colas === undefined) {
					if (col instanceof yy.Column) {
						colas = escapeq(col.columnid);
					} else {
						colas = col.nick;
					}
				}
				query.groupColumns[colas] = col.nick;

				/*/*			if(typeof colas == 'undefined') {
				if(col instanceof yy.Column) {
					colas = col.columnid;
				} else {
					colas = col.toString();
					for(var i=0;i<idx;i++) {
						if(colas == self.columns[i].as) {
							colas = self.columns[i].as+':'+idx;
							break;
						}
					}
					col.as = colas;
				}
			}
*/
				//			if(col.as) {
				s += "r['" + colas + "']=";
				//			// } else {
				//			// 	s += 'r[\''+escapeq()+'\']=';
				//			// };
				//			// s += ';';
				//			console.log(col);//,col.toJS('g',''));

				if (col instanceof yy.Column) {
					s += n2u(groupColumnJS(col, query)) + ';';
				} else {
					s += n2u(col.toJS('g', '')) + ';';
				}
				/*/*
			s += 'g[\''+col.nick+'\'];';

* /
			// if(col instanceof yy.Column) {
			// 	s += 'g[\''+col.columnid+'\'];';
			// } else {
//				s += 'g[\''+col.toString()+'\'];';

//				console.log(col);
				// var kg = col.toJS('g','')+';';
				// for(var i=0;i<query.removeKeys.length;i++) {
				// 	// THis part should be intellectual
				// 	if(query.removeKeys[i] == colas) {
				// s += 'g[\''+colas+'\'];';
				// 		break;
				// 	}
				// };
				// s += kg;
//				console.log(s);
			// }
//			s += col.toJS('g','')+';';
*/
				//console.log(colas,query.removeKeys);
				for (var i = 0; i < query.removeKeys.length; i++) {
					// THis part should be intellectual
					if (query.removeKeys[i] === colas) {
						query.removeKeys.splice(i, 1);
						break;
					}
				}
			}
		});
		// return new Function('g,params,alasql',s+'return r');
		return s;
	};

	yy.Select.prototype.compileSelectGroup2 = function (query) {
		var self = this;
		var s = query.selectgfns;
		var hasOrderColumns =
			this.orderColumns &&
			this.orderColumns.length > 0 &&
			!this.union &&
			!this.unionall &&
			!this.except &&
			!this.intersect;
		var needsOrderColumnMaps =
			hasOrderColumns &&
			this.orderColumns.some(function (col) {
				return col instanceof yy.Column;
			});

		// Create a lookup map for GROUP BY columns to optimize performance
		var groupColMap = {};
		var groupProjectedColumnMap = {};
		var projectedSelectColumnMap = {};
		if (self.group) {
			self.group.forEach(function (gp) {
				var key = (gp.tableid || '') + '\t' + gp.columnid;
				groupColMap[key] = gp;
			});
			if (needsOrderColumnMaps) {
				self.columns.forEach(function (col) {
					if (col instanceof yy.Column) {
						var key = (col.tableid || '') + '\t' + col.columnid;
						if (groupColMap[key]) {
							if (!col.as) {
								groupProjectedColumnMap[key] = col.columnid;
							} else if (!groupProjectedColumnMap[key]) {
								groupProjectedColumnMap[key] = col.as;
							}
						}
					}
				});
			}
		}
		if (needsOrderColumnMaps) {
			self.columns.forEach(function (col) {
				if (!(col instanceof yy.Column && col.columnid === '*')) {
					var projectedSelectKey = col.as || (col instanceof yy.Column ? col.columnid : col.nick);
					if (projectedSelectKey) {
						projectedSelectColumnMap[projectedSelectKey] = true;
					}
				}
			});
		}

		self.columns.forEach(function (col) {
			//			 console.log(col);
			// Skip SELECT * columns as they are handled differently
			if (col instanceof yy.Column && col.columnid === '*') {
				return;
			}
			// Check if this column is part of GROUP BY
			// For columns with renamed nicks (e.g., 'x:1'), we need to check the original columnid
			var groupCol = null;
			if (col instanceof yy.Column && self.group) {
				var key = (col.tableid || '') + '\t' + col.columnid;
				groupCol = groupColMap[key];
			}
			// An expression is in GROUP BY when a grouped expression is the same expression, however
			// either is written: (a+1) is a+1 (#2721)
			var groupKey = null;
			if (!groupCol && !(col instanceof yy.Column) && col instanceof yy.Node) {
				groupKey = query.groupKeys.find(function (gk) {
					return gk.node.equals(col);
				});
			}
			var isInGroup =
				(groupCol !== null && groupCol !== undefined) ||
				!!groupKey ||
				(col instanceof yy.Column && query.ingroup.indexOf(col.nick) > -1);
			if (isInGroup) {
				// For columns in GROUP BY, use the GROUP BY column's nick if available
				var groupNick = (groupCol && groupCol.nick) || (groupKey && groupKey.key) || col.nick;
				s += "r['" + (col.as || col.nick) + "']=g['" + groupNick + "'];";
			}
		});

		// Only add order keys if there's no union operation (otherwise they'll be added later)
		if (hasOrderColumns) {
			this.orderColumns.forEach(function (v, idx) {
				//			console.log(411,v);
				var key = '$$$' + idx;
				var groupKey = (v.tableid || '') + '\t' + v.columnid;
				//			console.log(427,v,query.groupColumns,query.xgroupColumns);
				// Handle positional column reference (for SELECT * with ORDER BY numeric)
				if (v._useColumnIndex !== undefined) {
					// Use Object.keys to get column names and access by index
					s += "var keys=Object.keys(r);r['" + key + "']=r[keys[" + v.columnIndex + ']];';
				} else if (v instanceof yy.Column && groupProjectedColumnMap[groupKey]) {
					s += "r['" + key + "']=r['" + groupProjectedColumnMap[groupKey] + "'];";
				} else if (v instanceof yy.Column && projectedSelectColumnMap[v.columnid]) {
					s += "r['" + key + "']=r['" + v.columnid + "'];";
				} else if (v instanceof yy.Column && groupColMap[groupKey]) {
					s += "r['" + key + "']=g['" + groupColMap[groupKey].nick + "'];";
				} else {
					s += "r['" + key + "']=" + v.toJS('g', '') + ';';
				}
				query.removeKeys.push(key);
			});
		}
		//console.log(425,s);
		//	console.log('selectg:',s);
		return new Function('g,params,alasql', 'var y;' + s + 'return r');
	};

	// SELECY * REMOVE [COLUMNS] col-list, LIKE ''
	yy.Select.prototype.compileRemoveColumns = function (query) {
		var self = this;
		if (typeof this.removecolumns !== 'undefined') {
			query.removeKeys = query.removeKeys.concat(
				this.removecolumns
					.filter(function (column) {
						return typeof column.like === 'undefined';
					})
					.map(function (column) {
						return column.columnid;
					})
			);

			//console.log(query.removeKeys,this.removecolumns);
			query.removeLikeKeys = this.removecolumns
				.filter(function (column) {
					return typeof column.like !== 'undefined';
				})
				.map(function (column) {
					//				return new RegExp((column.like.value||'').replace(/\%/g,'.*').replace(/\?|_/g,'.'),'g');
					return column.like.value;
				});
		}
	};
}
