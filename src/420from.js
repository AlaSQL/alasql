/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy, alasql, Mongo, returnTrue */

yy.Select.prototype.compileFrom = function (query) {
	const self = this;
	query.sources = [];
	query.aliases = {};

	if (!self.from) return;

	self.from.forEach(tq => {
		const alias = tq.as || tq.tableid;
		if (tq instanceof yy.Table) {
			query.aliases[alias] = {
				tableid: tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
				type: 'table',
			};
		} else if (tq instanceof yy.Select) {
			query.aliases[alias] = {type: 'subquery'};
		} else if (tq instanceof yy.Search) {
			query.aliases[alias] = {type: 'subsearch'};
		} else if (tq instanceof yy.ParamValue) {
			query.aliases[alias] = {type: 'paramvalue'};
		} else if (tq instanceof yy.FuncValue) {
			query.aliases[alias] = {type: 'funcvalue'};
		} else if (tq instanceof yy.VarValue) {
			query.aliases[alias] = {type: 'varvalue'};
		} else if (tq instanceof yy.FromData) {
			query.aliases[alias] = {type: 'fromdata'};
		} else if (tq instanceof yy.Json) {
			query.aliases[alias] = {type: 'json'};
		} else if (tq.inserted) {
			query.aliases[alias] = {type: 'inserted'};
		} else {
			throw new Error('Wrong table at FROM');
		}

		const source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: 'INNER',
			onmiddlefn: returnTrue,
			srcwherefns: '', // for optimization
			srcwherefn: returnTrue,
		};

		if (tq instanceof yy.Table) {
			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;
			if (
				alasql.options.autocommit &&
				alasql.databases[source.databaseid].engineid &&
				!alasql.databases[source.databaseid].tables[source.tableid].view
			) {
				source.datafn = (query, params, cb, idx, alasql) => {
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid,
						source.tableid,
						cb,
						idx,
						query
					);
				};
			} else if (alasql.databases[source.databaseid].tables[source.tableid].view) {
				source.datafn = (query, params, cb, idx, alasql) => {
					let res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if (cb) res = cb(res, idx, query);
					return res;
				};
			} else {
				source.datafn = (query, params, cb, idx, alasql) => {
					let res = alasql.databases[source.databaseid].tables[source.tableid].data;
					if (cb) res = cb(res, idx, query);
					return res;
				};
			}
		} else if (tq instanceof yy.Select) {
			source.subquery = tq.compile(query.database.databaseid);
			if (typeof source.subquery.query.modifier === 'undefined') {
				source.subquery.query.modifier = 'RECORDSET';
			}
			source.columns = source.subquery.query.columns;

			source.datafn = (query, params, cb, idx, alasql) => {
				let res;
				source.subquery(query.params, data => {
					res = data.data;
					if (cb) res = cb(res, idx, query);
				});
				return res;
			};
		} else if (tq instanceof yy.Search) {
			source.subsearch = tq;
			source.columns = [];
			source.datafn = (query, params, cb, idx, alasql) => {
				let res;
				source.subsearch.execute(query.database.databaseid, query.params, data => {
					res = data;
					if (cb) res = cb(res, idx, query);
				});
				return res;
			};
		} else if (tq instanceof yy.ParamValue) {
			let ps = `var res = alasql.prepareFromData(params['${tq.param}']`;
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq.inserted) {
			let ps = 'var res = alasql.prepareFromData(alasql.inserted';
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.Json) {
			let ps = 'var res = alasql.prepareFromData(' + tq.toJS();
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.VarValue) {
			let ps = `var res = alasql.prepareFromData(alasql.vars['${tq.variable}']`;
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.FuncValue) {
			let ps = 'var res=alasql.from[' + JSON.stringify(tq.funcid.toUpperCase()) + '](';

			if (tq.args && tq.args.length > 0) {
				if (tq.args[0]) {
					ps += tq.args[0].toJS('query.oldscope') + ',';
				} else {
					ps += 'null,';
				}

				if (tq.args[1]) {
					ps += tq.args[1].toJS('query.oldscope') + ',';
				} else {
					ps += 'null,';
				}
			} else {
				ps += 'null,null,';
			}
			ps += 'cb,idx,query); return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.FromData) {
			source.datafn = (query, params, cb, idx, alasql) => {
				let res = tq.data;
				if (cb) res = cb(res, idx, query);
				return res;
			};
		} else {
			throw new Error('Wrong table at FROM');
		}
		query.sources.push(source);
	});
	query.defaultTableid = query.sources[0].alias;
};

alasql.prepareFromData = function (data, array) {
	let res = data;
	if (typeof data === 'string') {
		res = data.split(/\r?\n/);
		if (array) {
			res = res.map(item => [item]);
		}
	} else if (array) {
		res = data.map(item => [item]);
	} else if (typeof data === 'object' && !Array.isArray(data)) {
		if (
			typeof Mongo !== 'undefined' &&
			typeof Mongo.Collection !== 'undefined' &&
			data instanceof Mongo.Collection
		) {
			res = data.find().fetch();
		} else {
			res = [];
			for (const key in data) {
				if (data.hasOwnProperty(key)) res.push([key, data[key]]);
			}
		}
	}
	return res;
};
