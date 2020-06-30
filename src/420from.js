/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy, alasql, Mongo, returnTrue */

yy.Select.prototype.compileFrom = function (query) {
	//	console.log(1);

	var self = this;
	query.sources = [];
	//	var tableid = this.from[0].tableid;
	//	var as = '';
	//	if(self.from[0].as) as = this.from[0].as;
	//console.log(this);
	query.aliases = {};
	if (!self.from) return;

	//console.log(self.from);

	self.from.forEach(function (tq) {
		//console.log(tq);
		//console.log(tq,tq.toJS());
		var ps = '';

		var alias = tq.as || tq.tableid;
		//		console.log(alias);
		if (tq instanceof yy.Table) {
			//			console.log(tq, tq.databaseid, query);
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

		var source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: 'INNER',
			onmiddlefn: returnTrue,
			srcwherefns: '', // for optimization
			srcwherefn: returnTrue,
			//			columns: []
		};

		if (tq instanceof yy.Table) {
			// Get columns from table
			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;
			//			console.log('test',alasql.options.autocommit);
			//				console.log(997,alasql.databases[source.databaseid].engineid);
			// console.log(0,source.databaseid);
			// console.log(1,alasql.databases[source.databaseid]);
			// console.log(2,alasql.databases[source.databaseid].tables[source.tableid].view);
			if (
				alasql.options.autocommit &&
				alasql.databases[source.databaseid].engineid &&
				!alasql.databases[source.databaseid].tables[source.tableid].view
			) {
				//				console.log(997,alasql.databases[source.databaseid].engineid);
				// TODO -- make view for external engine
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
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if (cb) res = cb(res, idx, query);
					return res;
				};
			} else {
				//				console.log('here');
				//				console.log(420,72,alasql.databases[source.databaseid].tables[source.tableid]);
				source.datafn = function (query, params, cb, idx, alasql) {
					/*
				// if(!query) console.log('query');
				// if(!query.database) console.log('query');
				// if(!query.database.tables) console.log('query');
				// if(!source.tableid) console.log('query');
				// if(!query.database.tables[source.tableid]) console.log(query);
				// if(!query.database.tables[source.tableid].data) console.log('query');
*/
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
					//				console.log(500,res);
					if (cb) res = cb(res, idx, query);
					//				console.log(600,res);
					return res;
					//				return alasql.databases[source.databaseid].tables[source.tableid].data;
				};
			}
		} else if (tq instanceof yy.Select) {
			source.subquery = tq.compile(query.database.databaseid);
			if (typeof source.subquery.query.modifier === 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;
			//			console.log(101,source.columns);
			//			tq.columns;

			source.datafn = function (query, params, cb, idx, alasql) {
				//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subquery(query.params, function (data) {
					res = data.data;
					if (cb) res = cb(res, idx, query);
					return res;
					//					return data.data;
				});
				//					console.log(515,res);
				return res;
			};
		} else if (tq instanceof yy.Search) {
			source.subsearch = tq;
			source.columns = [];
			/*/*
			 //.compile(query.database.databaseid);
			// if(typeof source.subquery.query.modifier == 'undefined') {
			// 	source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			// }
			// source.columns = source.subquery.query.columns;
//			console.log(101,source.columns);
//			tq.columns;
*/
			source.datafn = function (query, params, cb, idx, alasql) {
				//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subsearch.execute(query.database.databaseid, query.params, function (data) {
					res = data;
					if (cb) res = cb(res, idx, query);
					return res;
					//					return data.data;
				});
				//					console.log(515,res);
				return res;
			};
		} else if (tq instanceof yy.ParamValue) {
			ps = "var res = alasql.prepareFromData(params['" + tq.param + "']";
			//				console.log(tq);
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq.inserted) {
			ps = 'var res = alasql.prepareFromData(alasql.inserted';
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.Json) {
			ps = 'var res = alasql.prepareFromData(' + tq.toJS();
			//				console.log(tq);
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.VarValue) {
			ps = "var res = alasql.prepareFromData(alasql.vars['" + tq.variable + "']";
			//				console.log(tq);
			if (tq.array) ps += ',true';
			ps += ');if(cb)res=cb(res,idx,query);return res';
			source.datafn = new Function('query,params,cb,idx,alasql', ps);
		} else if (tq instanceof yy.FuncValue) {
			ps = "var res=alasql.from['" + tq.funcid.toUpperCase() + "'](";
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
			ps += 'cb,idx,query';
			ps += ');/*if(cb)res=cb(res,idx,query);*/return res';
			//	console.log(s);
			source.datafn = new Function('query, params, cb, idx, alasql', ps);
		} else if (tq instanceof yy.FromData) {
			source.datafn = function (query, params, cb, idx, alasql) {
				var res = tq.data;
				if (cb) res = cb(res, idx, query);
				return res;
			};
		} else {
			throw new Error('Wrong table at FROM');
		}
		//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
		query.sources.push(source);
	});
	// TODO Add joins
	query.defaultTableid = query.sources[0].alias;
	//console.log(query.defaultTableid);
};

alasql.prepareFromData = function (data, array) {
	//console.log(177,data,array);
	var i, ilen;
	var res = data;
	if (typeof data === 'string') {
		res = data.split(/\r?\n/);
		if (array) {
			for (i = 0, ilen = res.length; i < ilen; i++) {
				res[i] = [res[i]];
			}
		}
	} else if (array) {
		res = [];
		for (i = 0, ilen = data.length; i < ilen; i++) {
			res.push([data[i]]);
		}
		//		console.log(res);
	} else if (typeof data === 'object' && !Array.isArray(data)) {
		//	} else if(typeof data == 'object' && !(typeof data.length == 'undefined')) {
		if (
			typeof Mongo !== 'undefined' &&
			typeof Mongo.Collection !== 'undefined' &&
			data instanceof Mongo.Collection
		) {
			res = data.find().fetch();
		} else {
			res = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) res.push([key, data[key]]);
			}
		}

		//	console.log(res);
	}
	//	console.log(typeof data);
	return res;
};
