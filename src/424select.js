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
						"'" + alias + '_' + escapedColumnId + "':p['" + alias + "']['" + escapedColumnId + "']"
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
					'var w=p["' + escapeq(alias) + '"];for(var k in w){r["' + escapeq(alias) + '_"+k]=w[k]};';
			} else {
				// Default overwrite mode
				sp += 'var w=p["' + escapeq(alias) + '"];for(var k in w){r[k]=w[k]};';
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
				var tbid = col.tableid;
				//				console.log(query.sources);
				var dbid = col.databaseid || query.sources[0].databaseid || query.database.databaseid;
				if (!tbid) tbid = query.defcols[col.columnid];
				if (!tbid) tbid = query.defaultTableid;
				if (col.columnid !== '_') {
					if (false && tbid && !query.defcols['.'][col.tableid] && !query.defcols[col.columnid]) {
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
								!col.tableid &&
								query.sources.length > 1 &&
								(!query.defcols[col.columnid] || query.defcols[col.columnid] === '-');

							if (needsRuntimeResolution) {
								// Try each table until column is found
								var aliases = Object.keys(query.aliases);
								var searchExpr = aliases
									.map(function (alias) {
										return "p['" + alias + "']['" + col.columnid + "']";
									})
									.join(' ?? ');

								ss.push("'" + escapeq(col.as || col.columnid) + "':(" + searchExpr + ')');
							} else {
								ss.push(
									"'" +
										escapeq(col.as || col.columnid) +
										"':p['" +
										tbid +
										"']['" +
										col.columnid +
										"']"
								);
							}
						}
					}
				} else {
					ss.push("'" + escapeq(col.as || col.columnid) + "':p['" + tbid + "']");
				}
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
							n2u(col.expression.toJS('p', query.defaultTableid, query.defcols))
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
				var valueJs = n2u(col.toJS('p', query.defaultTableid, query.defcols));
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
						n2u(col.toJS('p', query.defaultTableid, query.defcols))
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
				s += "r['" + key + "']=" + v.toJS('p', query.defaultTableid, query.defcols) + ';';
			}
			query.removeKeys.push(key);
		});
	}
	return new Function('p,params,alasql', 'var y;' + s + 'return r');
};

yy.Select.prototype.compileSelectGroup0 = function (query) {
	var self = this;
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
				var groupIdx = self.group.findIndex(function (gp) {
					return gp.columnid === col.columnid && gp.tableid === col.tableid;
				});
				if (groupIdx > -1) {
					self.group[groupIdx].nick = colas;
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

			s += 'for(var k in g) {r[k]=g[k]};';
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

			s += n2u(col.toJS('g', '')) + ';';
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

	// Create a lookup map for GROUP BY columns to optimize performance
	var groupColMap = {};
	if (self.group) {
		self.group.forEach(function (gp) {
			var key = (gp.tableid || '') + '\t' + gp.columnid;
			groupColMap[key] = gp;
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
		var isInGroup = groupCol !== null || query.ingroup.indexOf(col.nick) > -1;
		if (isInGroup) {
			// For columns in GROUP BY, use the GROUP BY column's nick if available
			var groupNick = (groupCol && groupCol.nick) || col.nick;
			s += "r['" + (col.as || col.nick) + "']=g['" + groupNick + "'];";
		}
	});

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
			//			console.log(411,v);
			var key = '$$$' + idx;
			//			console.log(427,v,query.groupColumns,query.xgroupColumns);
			// Handle positional column reference (for SELECT * with ORDER BY numeric)
			if (v._useColumnIndex !== undefined) {
				// Use Object.keys to get column names and access by index
				s += "var keys=Object.keys(r);r['" + key + "']=r[keys[" + v.columnIndex + ']];';
			} else if (v instanceof yy.Column && query.groupColumns[v.columnid]) {
				s += "r['" + key + "']=r['" + v.columnid + "'];";
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
