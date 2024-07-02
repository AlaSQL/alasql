// Main query procedure
function queryfn(query, oldscope, cb, A, B) {
	query.sourceslen = query.sources.length;
	let slen = query.sourceslen;
	query.query = query; // TODO Remove to prevent memory leaks
	query.A = A;
	query.B = B;
	query.cb = cb;
	query.oldscope = oldscope;

	// Run all subqueries before main statement
	if (query.queriesfn) {
		query.sourceslen += query.queriesfn.length;
		slen += query.queriesfn.length;

		query.queriesdata = [];

		query.queriesfn.forEach(function (q, idx) {
			q.query.params = query.params;
			queryfn2([], -idx - 1, query);
		});
	}

	query.scope = oldscope ? cloneDeep(oldscope) : {};

	// First - refresh data sources

	let result;
	query.sources.forEach(function (source, idx) {
		source.query = query;
		var rs = source.datafn(query, query.params, queryfn2, idx, alasql);
		if (typeof rs !== 'undefined') {
			// TODO - this is a hack: check if result is array - check all cases and make it more logical
			if ((query.intofn || query.intoallfn) && Array.isArray(rs)) {
				rs = rs.length;
			}
			result = rs;
		}
		//
		// Ugly hack to use in query.wherefn and source.srcwherefns functions
		// constructions like this.queriesdata['test'].
		// We can elimite it with source.srcwherefn.bind(this)()
		// but it may be slow.
		//
		source.queriesdata = query.queriesdata;
	});

	if (query.sources.length == 0 || 0 === slen) {
		try {
			result = queryfn3(query);
		} catch (e) {
			if (cb) return cb(null, e);
			else throw e;
		}
	}
	//	console.log(82,aaa,slen,query.sourceslen, query.sources.length);
	return result;
}
function queryfn2(data, idx, query) {
	if (idx >= 0) {
		let source = query.sources[idx];
		source.data = data;
		if (typeof source.data === 'function') {
			source.getfn = source.data;
			source.dontcache = source.getfn.dontcache;
			if (['OUTER', 'RIGHT', 'ANTI'].includes(source.joinmode)) {
				source.dontcache = false;
			}
			source.data = {};
		}
	} else {
		query.queriesdata[-idx - 1] = flatArray(data);
	}

	query.sourceslen--;
	if (query.sourceslen > 0) return;

	return queryfn3(query);
}

function queryfn3(query) {
	var scope = query.scope,
		jlen;

	// Preindexation of data sources
	preIndex(query);

	// Prepare variables
	query.data = [];
	query.xgroups = {};
	query.groups = [];

	// Level of Joins
	var h = 0;

	// Start walking over data
	doJoin(query, scope, h);

	// If grouping, then filter groups with HAVING function
	if (query.groupfn) {
		query.data = [];
		if (query.groups.length === 0 && query.allgroups.length === 0) {
			var g = {};
			if (query.selectGroup.length > 0) {
				query.selectGroup.forEach(function (sg) {
					if (
						sg.aggregatorid == 'COUNT' ||
						sg.aggregatorid == 'SUM' ||
						sg.aggregatorid == 'TOTAL'
					) {
						g[sg.nick] = 0;
					} else {
						g[sg.nick] = undefined;
					}
				});
			}
			query.groups = [g];
		}

		if (query.aggrKeys.length > 0) {
			var gfns = '';
			query.aggrKeys.forEach(function (col) {
				gfns += `
				g[${JSON.stringify(col.nick)}] = alasql.aggr[${JSON.stringify(
					col.funcid
				)}](undefined,g[${JSON.stringify(col.nick)}],3); `;
			});
			var gfn = new Function('g,params,alasql', 'var y;' + gfns);
		}

		for (var i = 0, ilen = query.groups.length; i < ilen; i++) {
			var g = query.groups[i];

			if (gfn) gfn(g, query.params, alasql);

			if (!query.havingfn || query.havingfn(g, query.params, alasql)) {
				var d = query.selectgfn(g, query.params, alasql);

				for (const key in query.groupColumns) {
					// ony remove columns where the alias is also not a column in the result
					if (
						query.groupColumns[key] !== key &&
						d[query.groupColumns[key]] &&
						!query.groupColumns[query.groupColumns[key]]
					) {
						delete d[query.groupColumns[key]];
					}
				}
				query.data.push(d);
			}
		}
	}
	// Remove distinct values
	doDistinct(query);

	// UNION / UNION ALL
	if (query.unionallfn) {
		// TODO Simplify this part of program
		var ud, nd;
		if (query.corresponding) {
			if (!query.unionallfn.query.modifier) query.unionallfn.query.modifier = undefined;
			ud = query.unionallfn(query.params);
		} else {
			if (!query.unionallfn.query.modifier) query.unionallfn.query.modifier = 'RECORDSET';
			nd = query.unionallfn(query.params);
			ud = [];
			ilen = nd.data.length;
			for (var i = 0; i < ilen; i++) {
				var r = {};
				if (query.columns.length) {
					jlen = Math.min(query.columns.length, nd.columns.length);
					for (var j = 0; j < jlen; j++) {
						r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
					}
				} else {
					jlen = nd.columns.length;
					for (var j = 0; j < jlen; j++) {
						r[nd.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
					}
				}
				ud.push(r);
			}
		}
		query.data = query.data.concat(ud);
	} else if (query.unionfn) {
		if (query.corresponding) {
			if (!query.unionfn.query.modifier) query.unionfn.query.modifier = 'ARRAY';
			ud = query.unionfn(query.params);
		} else {
			if (!query.unionfn.query.modifier) query.unionfn.query.modifier = 'RECORDSET';
			nd = query.unionfn(query.params);
			ud = [];
			ilen = nd.data.length;
			for (var i = 0; i < ilen; i++) {
				r = {};
				if (query.columns.length) {
					jlen = Math.min(query.columns.length, nd.columns.length);
					for (var j = 0; j < jlen; j++) {
						r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
					}
				} else {
					jlen = nd.columns.length;
					for (var j = 0; j < jlen; j++) {
						r[nd.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
					}
				}
				ud.push(r);
			}
		}

		query.data = arrayUnionDeep(query.data, ud);
	} else if (query.exceptfn) {
		if (query.corresponding) {
			if (!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'ARRAY';
			var ud = query.exceptfn(query.params);
		} else {
			if (!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'RECORDSET';
			var nd = query.exceptfn(query.params);
			var ud = [];
			for (var i = 0, ilen = nd.data.length; i < ilen; i++) {
				var r = {};
				for (var j = Math.min(query.columns.length, nd.columns.length) - 1; 0 <= j; j--) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}

		query.data = arrayExceptDeep(query.data, ud);
	} else if (query.intersectfn) {
		if (query.corresponding) {
			if (!query.intersectfn.query.modifier) query.intersectfn.query.modifier = undefined;
			ud = query.intersectfn(query.params);
		} else {
			if (!query.intersectfn.query.modifier) query.intersectfn.query.modifier = 'RECORDSET';
			nd = query.intersectfn(query.params);
			ud = [];
			ilen = nd.data.length;
			for (i = 0; i < ilen; i++) {
				r = {};
				jlen = Math.min(query.columns.length, nd.columns.length);
				for (j = 0; j < jlen; j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}

		query.data = arrayIntersectDeep(query.data, ud);
	}

	// Ordering
	if (query.orderfn) {
		if (query.explain) var ms = Date.now();
		query.data = query.data.sort(query.orderfn);
		if (query.explain) {
			query.explaination.push({
				explid: query.explid++,
				description: 'QUERY BY',
				ms: Date.now() - ms,
			});
		}
	}

	// Reduce to limit and offset
	doLimit(query);

	// TODO: Check what artefacts rest from Angular.js
	if (typeof angular != 'undefined') {
		query.removeKeys.push('$$hashKey');
	}

	if (query.removeKeys.length > 0) {
		var removeKeys = query.removeKeys;

		// Remove from data
		jlen = removeKeys.length;
		if (jlen > 0) {
			ilen = query.data.length;
			for (i = 0; i < ilen; i++) {
				for (j = 0; j < jlen; j++) {
					delete query.data[i][removeKeys[j]];
				}
			}
		}

		// Remove from columns list
		if (query.columns.length > 0) {
			query.columns = query.columns.filter(function (column) {
				var found = false;
				removeKeys.forEach(function (key) {
					if (column.columnid == key) found = true;
				});
				return !found;
			});
		}
	}

	if (typeof query.removeLikeKeys != 'undefined' && query.removeLikeKeys.length > 0) {
		var removeLikeKeys = query.removeLikeKeys;

		// Remove unused columns
		// SELECT * REMOVE COLUMNS LIKE "%b"
		for (var i = 0, ilen = query.data.length; i < ilen; i++) {
			r = query.data[i];
			for (var k in r) {
				for (j = 0; j < query.removeLikeKeys.length; j++) {
					if (alasql.utils.like(query.removeLikeKeys[j], k)) {
						delete r[k];
					}
				}
			}
		}

		if (query.columns.length > 0) {
			query.columns = query.columns.filter(function (column) {
				var found = false;
				removeLikeKeys.forEach(function (key) {
					if (alasql.utils.like(key, column.columnid)) {
						found = true;
					}
				});
				return !found;
			});
		}
	}

	if (query.pivotfn) query.pivotfn();

	if (query.unpivotfn) query.unpivotfn();

	if (query.intoallfn) {
		var res = query.intoallfn(query.columns, query.cb, query.params, query.alasql);
		return res;
	}

	if (query.intofn) {
		ilen = query.data.length;
		for (i = 0; i < ilen; i++) {
			query.intofn(query.data[i], i, query.params, query.alasql);
		}
		if (query.cb) query.cb(query.data.length, query.A, query.B);
		return query.data.length;
	}
	res = query.data;
	if (query.cb) res = query.cb(query.data, query.A, query.B);
	return res;
}

// Limiting
function doLimit(query) {
	//	console.log(query.limit, query.offset)
	if (query.limit) {
		var offset = 0;
		if (query.offset) {
			offset = query.offset | 0 || 0;
			offset = offset < 0 ? 0 : offset;
		}
		var limit;
		if (query.percent) {
			limit = (((query.data.length * query.limit) / 100) | 0) + offset;
		} else {
			limit = (query.limit | 0) + offset;
		}
		query.data = query.data.slice(offset, limit);
	}
}

// Distinct
function doDistinct(query) {
	if (query.distinct) {
		var uniq = {};
		// TODO: Speedup, because Object.keys is slow**
		// TODO: Problem with DISTINCT on objects
		var keys = Object.keys(query.data[0] || []);
		for (var i = 0, ilen = query.data.length; i < ilen; i++) {
			var uix = keys
				.map(function (k) {
					return query.data[i][k];
				})
				.join('`');
			uniq[uix] = query.data[i];
		}
		query.data = [];
		for (var key in uniq) {
			query.data.push(uniq[key]);
		}
	}
}

// Optimization: preliminary indexation of joins
var preIndex = function (query) {
	//	console.log(query);
	// Loop over all sources
	// Todo: make this loop smaller and more graspable
	for (var k = 0, klen = query.sources.length; k < klen; k++) {
		var source = query.sources[k];
		delete source.ix;
		// If there is indexation rule
		if (k > 0 && source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
			// If there is no table.indices - create it
			if (source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
				if (!alasql.databases[source.databaseid].tables[source.tableid].indices)
					query.database.tables[source.tableid].indices = {};
				// Check if index already exists
				let ixx =
					alasql.databases[source.databaseid].tables[source.tableid].indices[
						hash(source.onrightfns + '`' + source.srcwherefns)
					];
				if (!alasql.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					source.ix = ixx;
				}
			}

			if (!source.ix) {
				source.ix = {};
				// Walking over source data
				let scope = {};
				let i = 0;
				let ilen = source.data.length;
				let dataw;
				//				while(source.getfn i<ilen) {

				while (
					(dataw = source.data[i]) ||
					(source.getfn && (dataw = source.getfn(i))) ||
					i < ilen
				) {
					if (source.getfn && !source.dontcache) source.data[i] = dataw;

					// Prepare scope for indexation
					scope[source.alias || source.tableid] = dataw;

					// Check if it apply to where function
					if (source.srcwherefn(scope, query.params, alasql)) {
						// Create index entry for each address
						var addr = source.onrightfn(scope, query.params, alasql);
						var group = source.ix[addr];
						if (!group) {
							group = source.ix[addr] = [];
						}
						group.push(dataw);
					}
					i++;
				}

				if (source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
					// Save index to original table
					alasql.databases[source.databaseid].tables[source.tableid].indices[
						hash(source.onrightfns + '`' + source.srcwherefns)
					] = source.ix;
				}
			}

			// Optimization for WHERE column = expression
		} else if (source.wxleftfn) {
			if (!alasql.databases[source.databaseid].engineid) {
				// Check if index exists
				ixx =
					alasql.databases[source.databaseid].tables[source.tableid].indices[
						hash(source.wxleftfns + '`')
					];
			}
			if (!alasql.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
				// Use old index if exists
				source.ix = ixx;
				// Reduce data (apply filter)
				source.data = source.ix[source.wxrightfn(null, query.params, alasql)];
			} else {
				// Create new index
				source.ix = {};
				// Prepare scope
				scope = {};
				// Walking on each source line
				i = 0;
				ilen = source.data.length;
				dataw;
				//				while(source.getfn i<ilen) {

				while (
					(dataw = source.data[i]) ||
					(source.getfn && (dataw = source.getfn(i))) ||
					i < ilen
				) {
					if (source.getfn && !source.dontcache) source.data[i] = dataw;
					//					for(var i=0, ilen=source.data.length; i<ilen; i++) {
					scope[source.alias || source.tableid] = source.data[i];
					// Create index entry
					addr = source.wxleftfn(scope, query.params, alasql);
					group = source.ix[addr];
					if (!group) {
						group = source.ix[addr] = [];
					}
					group.push(source.data[i]);
					i++;
				}
				if (!alasql.databases[source.databaseid].engineid) {
					alasql.databases[source.databaseid].tables[source.tableid].indices[
						hash(source.wxleftfns + '`')
					] = source.ix;
				}
			}
			// Apply where filter to reduces rows
			if (source.srcwherefns) {
				if (source.data) {
					scope = {};
					source.data = source.data.filter(function (r) {
						scope[source.alias] = r;
						return source.srcwherefn(scope, query.params, alasql);
					});
				} else {
					source.data = [];
				}
			}
			// If there is no any optimization than apply srcwhere filter
		} else if (source.srcwherefns && !source.dontcache) {
			if (source.data) {
				var scope = {};
				// TODO!!!!! Data as Function

				source.data = source.data.filter(function (r) {
					scope[source.alias] = r;
					return source.srcwherefn(scope, query.params, alasql);
				});

				scope = {};
				i = 0;
				ilen = source.data.length;
				let res = [];

				while (
					(dataw = source.data[i]) ||
					(source.getfn && (dataw = source.getfn(i))) ||
					i < ilen
				) {
					if (source.getfn && !source.dontcache) source.data[i] = dataw;
					scope[source.alias] = dataw;
					if (source.srcwherefn(scope, query.params, alasql)) res.push(dataw);
					i++;
				}
				source.data = res;
			} else {
				source.data = [];
			}
		}
		// Change this to another place (this is a wrong)
		if (source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
		} else {
			// this is a subquery?
		}
	}
};
