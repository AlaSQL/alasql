// SELECT
yy.Select = function (params) { return yy.extend(this, params); }
yy.Select.prototype.toString = function() {
	var s = 'SELECT '+this.columns.map(function(col){
		var s = col.toString();
	//	console.log(col);
		if(col.as) s += ' AS '+col.as;
		return s;
	}).join(',');
	s += ' FROM '+this.from.map(function(f){return f.toString()}).join(',');

	if(this.where) s += ' WHERE '+this.where.toString();
	if(this.group) s += ' GROUP BY '+this.group.toString();
	if(this.having) s += ' HAVING '+this.having.toString();
	if(this.order) s += ' ORDER BY '+this.order.toString();
	return s;
}

yy.Select.prototype.compile = function(db) {
	var query = {};
	query.database = db;
//	query.databaseid = db.databaseid;
	this.compileFrom(query);
	if(this.joins) this.compileJoins(query);
	query.selectfn = this.compileSelect(query);
	query.wherefn = this.compileWhere(query);
	if(this.where) this.compileWhereJoins(query);

	if(this.group) query.groupfn = this.compileGroup(query);
	query.distinct = this.distinct;
	query.limit = this.limit?this.limit.value:undefined;
	query.offset = this.offset?this.offset.value:1;
//	console.log(query.offset,query.limit);
	if(this.order) query.orderfn = this.compileOrder(query);

//	query.sources = this.compileSources(query);
//	select.selectfn = function(scope){return {a:1}}; // TODO Remove stub
	// Compile where
//	console.log(this);
//	if(this.where) select.wherefn = this.where.compile('scope.','STUB');
//console.log(query);
	// TODO Remove debug
//	window.q = query;
	return function(params, cb) {
		query.params = params;
		var res = queryfn(query); 
		if(cb) cb(res); 
		return res;
	}
};


function queryfn(query) {

// First - refresh data sources
// TODO SubQueries
	query.sources.forEach(function(source){
		source.data = query.database.tables[source.tableid].data;
	});

//		query.data = query.database.tables[query.defaultTableid].data.filter(query.wherefn);
//		query.data = query.database.tables[query.defaultTableid].data;
//	var query = this;
	preIndex(query);
	query.data = [];
	query.xgroups = {};
	query.groups = [];
	var scope = query.scope = {};


	var h = 0;

//	var tm = Date.now();

	doJoin(query, scope, h);

//	console.log('join', Date.now()-tm);

	if(query.groupfn) {
		if(query.havingfn) query.groups = query.groups.filter(query.havingfn)
		query.data = query.groups;
	}

	// delete query.groups;
	// delete query.xgroups;

//	
	doDistinct(query);	
	doLimit(query);
	if(query.orderfn) query.data = query.data.sort(query.orderfn);
//		query.data = data;

	return query.data;
};

function doLimit (query) {
	if(query.limit) {
		var offset = ((query.offset|0)-1)||0;
		var limit = (query.limit|0) + offset;
		console.log(offset, limit);
		query.data = query.data.slice(offset,limit);
	}
}

function doDistinct (query) {
	if(query.distinct) {
//		console.log('distinct');
		var uniq = {};
		// TODO: Speedup
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k]}).join('`');

			// for(var key in query.data[i]) {
			// 	uix += '`'+query.data[i][key];
			// }
			uniq[uix] = query.data[i];
		};
//		console.log(uniq);
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
};


preIndex = function(query) {
//	console.log('preIndex', query.sources[0].wherefns);
//	var tm = Date.now();
	// if(query.joins && self.joins.length>0) {
		for(var k=0, klen = query.sources.length;k<klen;k++) {
//			console.log('klen',klen);
			var source = query.sources[k];
//					console.log(source.wherefns);
			if(source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
//				var h = console.log(hash(source.onrightfn));
				if(!query.database.tables[source.tableid].indices) query.database.tables[source.tableid].indices = {};
				var ixx = query.database.tables[source.tableid].indices[hash(source.onrightfns+'`'+source.wherefns)];
				if( !query.database.tables[source.tableid].dirty
					&& ixx) {
					source.ix = ixx; 
				} else {
				// TODO Check if table index exists
//				if(/*!join.ix || */ join.dirty) {
					source.ix = {};
//					join.dirty = false;
					// Если есть группировка
					var scope = {};
//					console.log('join.recs.length',join.recs, join.recs.length);
					for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
//						console.log('preIndex:scope',scope.alias, source.wherefns);
						if(source.wherefn(scope, query.params)) {
							var group = source.ix [ source.onrightfn(scope, query.params) ]; 
							if(!group) {
								group = source.ix [ source.onrightfn(scope, query.params) ] = []; 
							}
							group.push(source.data[i]);
						}
					}
				
					query.database.tables[source.tableid].indices[hash(source.onrightfns+'`'+source.wherefns)] = source.ix;
				}
				// TODO - Save index to original table	
//				}

			} else if (true && source.wxleftfns) {

//				console.log("wx", source.wxleftfns);
//				var ixx = query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`'+source.onwherefns)];
				var ixx = query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`')];
				if( !query.database.tables[source.tableid].dirty
					&& ixx) {
//					console.log('ues old',ixx);
					source.ix = ixx;
					source.data = source.ix[source.wxrightfn(query.params)]; 
//					console.log(source.data.length);
				} else {
//					console.log('create new', ixx);
					source.ix = {};

					var scope = {};
					for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
//						console.log('preIndex:scope',scope.alias, source.wherefns);
//						if(source.wherefn(scope, query.params)) {
							var group = source.ix [ source.wxleftfn(scope, query.params) ]; 
							if(!group) {
								group = source.ix [ source.wxleftfn(scope, query.params) ] = []; 
							}
							group.push(source.data[i]);
//						}
					}
					query.database.tables[source.tableid].dirty = false;
//					query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`'+source.onwherefns)] = source.ix;
					query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`')] = source.ix;
				}

				if(source.wherefns) {
					var scope = {};
					source.data = source.data.filter(function(r) {
						scope[source.alias] = r;
						return source.wherefn(scope, query.params);
					});
				}		

			} else if(source.wherefns) {
				var scope = {};
				source.data = source.data.filter(function(r) {
					scope[source.alias] = r;
					return source.wherefn(scope, query.params);
				});
			}			
		}
//	}
//				console.log('preIndex',Date.now()-tm);
}



function doJoin (query, scope, h) {
	if(h>=query.sources.length) {

		if(query.wherefn(scope,query.params)) {
			var res = query.selectfn(scope, query.params);
			if(query.groupfn) {
				query.groupfn(res, query.params)
			} else {
				query.data.push(res);
			}	
		}
	} else {
//		console.log(query.sources, h);
		var source = query.sources[h];
//		var nextjointype = query.sources[h+1] ? query.sources[h+1].jointype: undefined;
		var tableid =source.tableid; 
		var pass = false;
		var data = source.data;

		if(source.optimization == 'ix') {
//			console.log('join.ix', source.ix)
			data = source.ix[ source.onleftfn(scope, query.params) ] || [];
		}


		// Main cycle
		for(var i=0, ilen=data.length; i<ilen; i++) {
			scope[tableid] = data[i];
//			if(source.wherefn(scope)) {
				if(!source.onleftfn || (source.onleftfn(scope, query.params) == source.onrightfn(scope, query.params))) {
	//				console.log(source, source.jointype);
//	console.log(source.onmiddlefn(scope), source);
					if(source.onmiddlefn(scope, query.params)) {
						doJoin(query, scope, h+1);
						pass = true;
					}
				}
//			}
		};

//		console.log("out",h,i,pass, source.joinmode );

		// Additional for LEFT JOINS
		if((source.joinmode == 'LEFT') && !pass) {
			scope[tableid] = {};
			doJoin(query,scope,h+1);
		}	

	}
};

