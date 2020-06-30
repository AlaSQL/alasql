/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT Compile functions

/* global yy, alasql, returnTrue, arrayIntersect */

// Compile JOIN caluese
yy.Select.prototype.compileJoins = function (query) {
	//	console.log(this);
	//	debugger;
	var self = this;

	this.joins.forEach(function (jn) {
		// Test CROSS-JOIN
		var tq, ps, source;
		if (jn.joinmode === 'CROSS') {
			if (jn.using || jn.on) {
				throw new Error('CROSS JOIN cannot have USING or ON clauses');
			} else {
				jn.joinmode = 'INNER';
			}
		}

		if (jn instanceof yy.Apply) {
			//			console.log('APPLY',jn.applymode);
			source = {
				alias: jn.as,
				applymode: jn.applymode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
				columns: [], // TODO check this
			};
			source.applyselect = jn.select.compile(query.database.databaseid);
			source.columns = source.applyselect.query.columns;

			source.datafn = function (query, params, cb, idx, alasql) {
				var res;
				if (cb) res = cb(res, idx, query);
				return res;
			};

			query.sources.push(source);

			return;
		}

		if (jn.table) {
			tq = jn.table;
			source = {
				alias: jn.as || tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
				columns: [],
			};
			//

			//			console.log(source.databaseid, source.tableid);
			if (!alasql.databases[source.databaseid].tables[source.tableid]) {
				throw new Error(
					"Table '" + source.tableid + "' is not exists in database '" + source.databaseid + "'"
				);
			}

			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;

			// source.data = query.database.tables[source.tableid].data;
			if (alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {
				//				console.log(997,alasql.databases[source.databaseid].engineid);
				source.datafn = function (query, params, cb, idx, alasql) {
					//					console.log(777,arguments);
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid,
						source.tableid,
						cb,
						idx,
						query
					);
				};
			} else if (alasql.databases[source.databaseid].tables[source.tableid].view) {
				source.datafn = function (query, params, cb, idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if (cb) res = cb(res, idx, query);
					return res;
				};
			} else {
				source.datafn = function (query, params, cb, idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
					if (cb) res = cb(res, idx, query);
					return res;
				};
			}

			//		var alias = jn.as || tq.tableid;
			//		if(tq) {
			query.aliases[source.alias] = {
				tableid: tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
			};
			//		}
		} else if (jn.select) {
			tq = jn.select;
			source = {
				alias: jn.as,
				//				databaseid: jn.databaseid || query.database.databaseid,
				//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
				columns: [],
			};

			source.subquery = tq.compile(query.database.databaseid);
			if (typeof source.subquery.query.modifier === 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;

			//			if(jn instanceof yy.Apply) {
			source.datafn = function (query, params, cb, idx, alasql) {
				//					return cb(null,idx,alasql);
				return source.subquery(query.params, null, cb, idx).data;
			};
			// } else {
			// 	source.datafn = function(query, params, cb, idx, alasql) {
			// 		return source.subquery(query.params, null, cb, idx);
			// 	}
			// }
			query.aliases[source.alias] = {type: 'subquery'};
		} else if (jn.param) {
			source = {
				alias: jn.as,
				//				databaseid: jn.databaseid || query.database.databaseid,
				//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};
			// source.data = ;
			var jnparam = jn.param.param;
			//			console.log(jn, jnparam);
			ps = "var res=alasql.prepareFromData(params['" + jnparam + "']";
			if (jn.array) ps += ',true';
			ps += ');if(cb)res=cb(res, idx, query);return res';

			source.datafn = new Function('query,params,cb,idx, alasql', ps);
			query.aliases[source.alias] = {type: 'paramvalue'};
		} else if (jn.variable) {
			source = {
				alias: jn.as,
				//				databaseid: jn.databaseid || query.database.databaseid,
				//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};
			// source.data = ;
			//			var jnparam = jn.param.param;
			//			console.log(jn, jnparam);
			ps = "var res=alasql.prepareFromData(alasql.vars['" + jn.variable + "']";
			if (jn.array) ps += ',true';
			ps += ');if(cb)res=cb(res, idx, query);return res';

			source.datafn = new Function('query,params,cb,idx, alasql', ps);
			query.aliases[source.alias] = {type: 'varvalue'};
		} else if (jn.func) {
			source = {
				alias: jn.as,
				//				databaseid: jn.databaseid || query.database.databaseid,
				//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};
			// source.data = ;

			/*/*
		var jnparam = jn.param.param;
		source.datafn = new Function('query,params,cb,idx',
			"var res=alasql.prepareFromData(params['"+jnparam+"']);if(cb)res=cb(res, idx, query);return res");
*/

			var s = "var res=alasql.from['" + jn.func.funcid.toUpperCase() + "'](";
			/*/*
		// if(tq.args && tq.args.length>0) {
		// 	s += tq.args.map(function(arg){
		// 		return arg.toJS();
		// 	}).concat('cb,idx,query').join(',');
		// }
		// if(tq.args && tq.args.length>0) {
		// 	s += tq.args.map(function(arg){
		// 		return arg.toJS();
		// 	}).concat().join(',');
		// }
*/
			var args = jn.func.args;
			if (args && args.length > 0) {
				if (args[0]) {
					s += args[0].toJS('query.oldscope') + ',';
				} else {
					s += 'null,';
				}
				if (args[1]) {
					s += args[1].toJS('query.oldscope') + ',';
				} else {
					s += 'null,';
				}
			} else {
				s += 'null,null,';
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';
			// console.log(234243, s);
			source.datafn = new Function('query, params, cb, idx, alasql', s);

			query.aliases[source.alias] = {type: 'funcvalue'};
		}
		/*/*
	} else if(tq instanceof yy.Select) {
		query.aliases[alias] = {type:'subquery'};
	} else if(tq instanceof yy.ParamValue) {
		query.aliases[alias] = {type:'paramvalue'};
	} else if(tq instanceof yy.FuncValue) {
		query.aliases[alias] = {type:'paramvalue'};
	} else {
		throw new Error('Wrong table at FROM');
	}
*/
		var alias = source.alias;

		// Test NATURAL-JOIN
		if (jn.natural) {
			if (jn.using || jn.on) {
				throw new Error('NATURAL JOIN cannot have USING or ON clauses');
			} else {
				//				source.joinmode == "INNER";
				if (query.sources.length > 0) {
					var prevSource = query.sources[query.sources.length - 1];
					var prevTable = alasql.databases[prevSource.databaseid].tables[prevSource.tableid];
					var table = alasql.databases[source.databaseid].tables[source.tableid];

					if (prevTable && table) {
						var c1 = prevTable.columns.map(function (col) {
							return col.columnid;
						});
						var c2 = table.columns.map(function (col) {
							return col.columnid;
						});
						jn.using = arrayIntersect(c1, c2).map(function (colid) {
							return {columnid: colid};
						});
						//						console.log(jn.using);
					} else {
						throw new Error(
							'In this version of Alasql NATURAL JOIN ' +
								'works for tables with predefined columns only'
						);
					}
				}
			}
		}

		if (jn.using) {
			prevSource = query.sources[query.sources.length - 1];
			//			console.log(query.sources[0],prevSource,source);
			source.onleftfns = jn.using
				.map(function (col) {
					//				console.log(141,colid);
					return "p['" + (prevSource.alias || prevSource.tableid) + "']['" + col.columnid + "']";
				})
				.join('+"`"+');

			// console.log(32343, source.onleftfns);
			source.onleftfn = new Function('p,params,alasql', 'var y;return ' + source.onleftfns);

			source.onrightfns = jn.using
				.map(function (col) {
					return "p['" + (source.alias || source.tableid) + "']['" + col.columnid + "']";
				})
				.join('+"`"+');
			source.onrightfn = new Function('p,params,alasql', 'var y;return ' + source.onrightfns);
			source.optimization = 'ix';
			//			console.log(151,source.onleftfns, source.onrightfns);
			//			console.log(source);
		} else if (jn.on) {
			//console.log(jn.on);
			if (jn.on instanceof yy.Op && jn.on.op === '=' && !jn.on.allsome) {
				//				console.log('ix optimization', jn.on.toJS('p',query.defaultTableid) );
				source.optimization = 'ix';
				/*/*
		// 	source.onleftfns = jn.on.left.toJS('p',query.defaultTableid);
		// 	source.onleftfn = new Function('p', 'return '+source.onleftfns);
		// 	source.onrightfns = jn.on.right.toJS('p',query.defaultTableid);
		// 	source.onrightfn = new Function('p', 'return '+source.onrightfns);
*/
				var lefts = '';
				var rights = '';
				var middles = '';
				var middlef = false;
				// Test right and left sides
				var ls = jn.on.left.toJS('p', query.defaultTableid, query.defcols);
				var rs = jn.on.right.toJS('p', query.defaultTableid, query.defcols);

				if (ls.indexOf("p['" + alias + "']") > -1 && !(rs.indexOf("p['" + alias + "']") > -1)) {
					if (
						(ls.match(/p\['.*?'\]/g) || []).every(function (s) {
							return s === "p['" + alias + "']";
						})
					) {
						rights = ls;
					} else {
						middlef = true;
					}
				} else if (
					!(ls.indexOf("p['" + alias + "']") > -1) &&
					rs.indexOf("p['" + alias + "']") > -1
				) {
					if (
						(rs.match(/p\['.*?'\]/g) || []).every(function (s) {
							return s === "p['" + alias + "']";
						})
					) {
						lefts = ls;
					} else {
						middlef = true;
					}
				} else {
					middlef = true;
				}

				//				console.log(alias, 1,lefts, rights, middlef);

				if (rs.indexOf("p['" + alias + "']") > -1 && !(ls.indexOf("p['" + alias + "']") > -1)) {
					if (
						(rs.match(/p\['.*?'\]/g) || []).every(function (s) {
							return s === "p['" + alias + "']";
						})
					) {
						rights = rs;
					} else {
						middlef = true;
					}
				} else if (
					!(rs.indexOf("p['" + alias + "']") > -1) &&
					ls.indexOf("p['" + alias + "']") > -1
				) {
					if (
						(ls.match(/p\['.*?'\]/g) || []).every(function (s) {
							return s === "p['" + alias + "']";
						})
					) {
						lefts = rs;
					} else {
						middlef = true;
					}
				} else {
					middlef = true;
				}

				//				console.log(alias, 2,lefts, rights, middlef);

				if (middlef) {
					//					middles = jn.on.toJS('p',query.defaultTableid);
					//				} else {
					rights = '';
					lefts = '';
					middles = jn.on.toJS('p', query.defaultTableid, query.defcols);
					source.optimization = 'no';
					// What to here?
				}

				source.onleftfns = lefts;
				source.onrightfns = rights;
				source.onmiddlefns = middles || 'true';
				//			console.log(source.onleftfns, '-',source.onrightfns, '-',source.onmiddlefns);

				source.onleftfn = new Function('p,params,alasql', 'var y;return ' + source.onleftfns);
				source.onrightfn = new Function('p,params,alasql', 'var y;return ' + source.onrightfns);
				source.onmiddlefn = new Function('p,params,alasql', 'var y;return ' + source.onmiddlefns);

				//			} else if(jn.on instanceof yy.Op && jn.on.op == 'AND') {
				//				console.log('join on and ',jn);
			} else {
				//				console.log('no optimization');
				source.optimization = 'no';
				//				source.onleftfn = returnTrue;
				//				source.onleftfns = "true";
				source.onmiddlefns = jn.on.toJS('p', query.defaultTableid, query.defcols);
				source.onmiddlefn = new Function(
					'p,params,alasql',
					'var y;return ' + jn.on.toJS('p', query.defaultTableid, query.defcols)
				);
			}
			//			console.log(source.onleftfns, source.onrightfns, source.onmiddlefns);

			// Optimization function
		}

		//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
		//console.log(source, jn);
		// TODO SubQueries
		/*/*		if(source.joinmode == 'RIGHT') {
		var prevSource = query.sources.pop();
		if(prevSource.joinmode == 'INNER') {
			prevSource.joinmode = 'LEFT';
			var onleftfn = prevSource.onleftfn;
			var onleftfns = prevSource.onleftfns;
			var onrightfn = prevSource.onrightfn;
			var onrightfns = prevSource.onrightfns;
			var optimization = prevSource.optimization;

			prevSource.onleftfn = source.onrightfn;
			prevSource.onleftfns = source.onrightfns;
			prevSource.onrightfn = source.onleftfn;
			prevSource.onrightfns = source.onleftfns;
			prevSource.optimization = source.optimization;

			source.onleftfn = onleftfn;
			source.onleftfns = onleftfns;
			source.onrightfn = onrightfn;
			source.onrightfns = onrightfns;
			source.optimization = optimization;

			source.joinmode = 'INNER';
			query.sources.push(source);
			query.sources.push(prevSource);
		} else {
			throw new Error('Do not know how to process this SQL');
		}
	} else {
		query.sources.push(source);
	}
*/

		query.sources.push(source);
	});
	//	console.log('sources',query.sources);
};
