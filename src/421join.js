/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT Compile functions

/* global yy, alasql, returnTrue, arrayIntersect */

yy.Select.prototype.compileJoins = function (query) {
	const self = this;

	this.joins.forEach(jn => {
		let tq, ps, source;
		// Test CROSS-JOIN
		if (jn.joinmode === 'CROSS') {
			if (jn.using || jn.on) {
				throw new Error('CROSS JOIN cannot have USING or ON clauses');
			} else {
				jn.joinmode = 'INNER';
			}
		}

		if (jn instanceof yy.Apply) {
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
				let res;
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

			if (!alasql.databases[source.databaseid].tables[source.tableid]) {
				throw new Error(
					"Table '" + source.tableid + "' is not exists in database '" + source.databaseid + "'"
				);
			}

			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;

			if (alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {
				source.datafn = function (query, params, cb, idx, alasql) {
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
					let res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if (cb) res = cb(res, idx, query);
					return res;
				};
			} else {
				source.datafn = function (query, params, cb, idx, alasql) {
					let res = alasql.databases[source.databaseid].tables[source.tableid].data;
					if (cb) res = cb(res, idx, query);
					return res;
				};
			}

			query.aliases[source.alias] = {
				tableid: tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
			};
		} else if (jn.select) {
			tq = jn.select;
			source = {
				alias: jn.as,
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

			source.datafn = function (query, params, cb, idx, alasql) {
				source.data = source.subquery(query.params, null, cb, idx).data;
				let res = source.data;
				// Propogate subquery result
				if (cb) res = cb(res, idx, query);
				return res;
			};
			query.aliases[source.alias] = {type: 'subquery'};
		} else if (jn.param) {
			source = {
				alias: jn.as,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};
			const jnparam = jn.param.param;
			ps = "let res=alasql.prepareFromData(params['" + jnparam + "']";
			if (jn.array) ps += ',true';
			ps += '); if(cb) res=cb(res, idx, query); return res';

			source.datafn = new Function('query,params,cb,idx, alasql', ps);
			query.aliases[source.alias] = {type: 'paramvalue'};
		} else if (jn.variable) {
			source = {
				alias: jn.as,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};
			ps = "let res=alasql.prepareFromData(alasql.vars['" + jn.variable + "']";
			if (jn.array) ps += ', true';
			ps += '); if(cb)res=cb(res, idx, query);return res';

			source.datafn = new Function('query,params,cb,idx, alasql', ps);
			query.aliases[source.alias] = {type: 'varvalue'};
		} else if (jn.func) {
			source = {
				alias: jn.as,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '', // for optimization
				srcwherefn: returnTrue,
			};

			let s = 'let res=alasql.from[' + JSON.stringify(jn.func.funcid.toUpperCase()) + '](';

			const args = jn.func.args;
			if (args && args.length > 0) {
				if (args[0]) {
					s += args[0].toJS('query.oldscope') + ', ';
				} else {
					s += 'null, ';
				}
				if (args[1]) {
					s += args[1].toJS('query.oldscope') + ', ';
				} else {
					s += 'null, ';
				}
			} else {
				s += 'null, null, ';
			}
			s += 'cb, idx, query); return res';
			source.datafn = new Function('query, params, cb, idx, alasql', s);

			query.aliases[source.alias] = {type: 'funcvalue'};
		}

		const alias = source.alias;

		// Test NATURAL-JOIN
		if (jn.natural) {
			if (jn.using || jn.on) {
				throw new Error('NATURAL JOIN cannot have USING or ON clauses');
			} else {
				// source.joinmode == "INNER";
				if (query.sources.length > 0) {
					const prevSource = query.sources[query.sources.length - 1];
					const prevTable = alasql.databases[prevSource.databaseid].tables[prevSource.tableid];
					const table = alasql.databases[source.databaseid].tables[source.tableid];

					if (prevTable && table) {
						const c1 = prevTable.columns.map(col => col.columnid);
						const c2 = table.columns.map(col => col.columnid);
						jn.using = arrayIntersect(c1, c2).map(colid => ({columnid: colid}));
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
			const prevSource = query.sources[query.sources.length - 1];
			source.onleftfns = jn.using
				.map(col => "p['" + (prevSource.alias || prevSource.tableid) + "']['" + col.columnid + "']")
				.join('+"`"+');

			source.onleftfn = new Function('p,params,alasql', 'let y;return ' + source.onleftfns);

			source.onrightfns = jn.using
				.map(col => "p['" + (source.alias || source.tableid) + "']['" + col.columnid + "']")
				.join('+"`"+');
			source.onrightfn = new Function('p,params,alasql', 'let y;return ' + source.onrightfns);
			source.optimization = 'ix';
		} else if (jn.on) {
			if (jn.on instanceof yy.Op && jn.on.op === '=' && !jn.on.allsome) {
				source.optimization = 'ix';
				let lefts = '';
				let rights = '';
				let middles = '';
				let middlef = false;
				// Test right and left sides
				const ls = jn.on.left.toJS('p', query.defaultTableid, query.defcols);
				const rs = jn.on.right.toJS('p', query.defaultTableid, query.defcols);

				if (ls.indexOf("p['" + alias + "']") > -1 && !(rs.indexOf("p['" + alias + "']") > -1)) {
					if ((ls.match(/p\['.*?'\]/g) || []).every(s => s === "p['" + alias + "']")) {
						rights = ls;
					} else {
						middlef = true;
					}
				} else if (
					!(ls.indexOf("p['" + alias + "']") > -1) &&
					rs.indexOf("p['" + alias + "']") > -1
				) {
					if ((rs.match(/p\['.*?'\]/g) || []).every(s => s === "p['" + alias + "']")) {
						lefts = ls;
					} else {
						middlef = true;
					}
				} else {
					middlef = true;
				}

				if (rs.indexOf("p['" + alias + "']") > -1 && !(ls.indexOf("p['" + alias + "']") > -1)) {
					if ((rs.match(/p\['.*?'\]/g) || []).every(s => s === "p['" + alias + "']")) {
						rights = rs;
					} else {
						middlef = true;
					}
				} else if (
					!(rs.indexOf("p['" + alias + "']") > -1) &&
					ls.indexOf("p['" + alias + "']") > -1
				) {
					if ((ls.match(/p\['.*?'\]/g) || []).every(s => s === "p['" + alias + "']")) {
						lefts = rs;
					} else {
						middlef = true;
					}
				} else {
					middlef = true;
				}

				if (middlef) {
					rights = '';
					lefts = '';
					middles = jn.on.toJS('p', query.defaultTableid, query.defcols);
					source.optimization = 'no';
				}

				source.onleftfns = lefts;
				source.onrightfns = rights;
				source.onmiddlefns = middles || 'true';

				source.onleftfn = new Function('p,params,alasql', 'let y;return ' + source.onleftfns);
				source.onrightfn = new Function('p,params,alasql', 'let y;return ' + source.onrightfns);
				source.onmiddlefn = new Function('p,params,alasql', 'let y;return ' + source.onmiddlefns);
			} else {
				source.optimization = 'no';
				source.onmiddlefns = jn.on.toJS('p', query.defaultTableid, query.defcols);
				source.onmiddlefn = new Function(
					'p,params,alasql',
					'let y;return ' + jn.on.toJS('p', query.defaultTableid, query.defcols)
				);
			}
		}

		query.sources.push(source);
	});
};
