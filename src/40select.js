
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
	if(this.union) s += ' UNION '+this.union.toString();
	if(this.unionall) s += ' UNION ALL '+this.unionall.toString();
	if(this.except) s += ' EXCEPT '+this.except.toString();
	if(this.intersect) s += ' INTERSECT '+this.intersect.toString();
	return s;
};

// Compile SELECT statement
yy.Select.prototype.compile = function(db) {
	// Create variable for query
	var query = {};

	query.database = db;
	// 0. Precompile whereexists
	this.compileWhereExists(query);

	// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
	this.compileQueries(query);
	
	// 1. Compile FROM clause
	query.fromfn = this.compileFrom(query);
	// 2. Compile JOIN clauses
	if(this.joins) this.compileJoins(query);
	// 3. Compile SELECT clause
	query.selectfn = this.compileSelect(query);
	// 5. Optimize WHERE and JOINS
	if(this.where) this.compileWhereJoins(query);

	// 4. Compile WHERE clause
	query.wherefn = this.compileWhere(query);


	// 6. Compile GROUP BY
	if(this.group) query.groupfn = this.compileGroup(query);
	// 7. Compile DISTINCT, LIMIT and OFFSET
	query.distinct = this.distinct;
	query.limit = this.limit?this.limit.value:undefined;
	query.offset = this.offset?this.offset.value:1;
	// 8. Compile ORDER BY clause
	if(this.order) query.orderfn = this.compileOrder(query);

	// 9. Compile ordering function for UNION and UNIONALL
	if(this.union) {
		query.unionfn = this.union.compile(db);
		if(this.union.order) {
			query.orderfn = this.union.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.unionall) {
		query.unionallfn = this.unionall.compile(db);
		if(this.unionall.order) {
			query.orderfn = this.unionall.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.except) {
		query.exceptfn = this.except.compile(db);
		if(this.except.order) {
			query.orderfn = this.except.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.intersect) {
		query.intersectfn = this.intersect.compile(db);
		if(this.intersect.order) {
			query.intersectfn = this.intersect.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	};

//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	return function(params, cb, oldscope) {
		query.params = params;
		var res = queryfn(query,oldscope); 
		if(cb) cb(res); 
		return res;
	}
};

// Main query procedure
function queryfn(query,oldscope) {

	// Run all subqueries before main statement
	if(query.queriesfn) {
		query.queriesdata = query.queriesfn.map(function(q){return flatArray(q(query.params))});
//		console.log(query.queriesdata[0]);
	}

	var scope;
	if(!oldscope) scope = {};
	else scope = cloneDeep(oldscope);
	query.scope = scope;

	// First - refresh data sources
	query.sources.forEach(function(source){
//		source.data = query.database.tables[source.tableid].data;
		source.data = source.datafn(); 

//
// Ugly hack to use in query.wherefn and source.srcwherefns functions
// constructions like this.queriesdata['test'].
// I can elimite it with source.srcwherefn.bind(this)()
// but it may be slow.
// 
		source.queriesdata = query.queriesdata;  
	});

	// Preindexation of data sources
	if(!oldscope) {
		preIndex(query);
	}

	// Prepare variables
	query.data = [];
	query.xgroups = {};
	query.groups = [];

	// Level of Joins
	var h = 0;

	// Start walking over data
	doJoin(query, scope, h);

	// If groupping, then filter groups with HAVING function
	if(query.groupfn) {
		if(query.havingfn) query.groups = query.groups.filter(query.havingfn)
		query.data = query.groups;
	};

	// Remove distinct values	
	doDistinct(query);	

	// Reduce to limit and offset
	doLimit(query);

	// UNION / UNION ALL
	if(query.unionallfn) {
		query.data = query.data.concat(query.unionallfn(query.params));
	} else if(query.unionfn) {
		query.data = arrayUnionDeep(query.data, query.unionfn(query.params));
	} else if(query.exceptfn) {
		query.data = arrayExceptDeep(query.data, query.exceptfn(query.params));
	} else if(query.intersectfn) {
		query.data = arrayIntersectDeep(query.data, query.intersectfn(query.params));
	};

	// Ordering
	if(query.orderfn) query.data = query.data.sort(query.orderfn);

	// That's all
	return query.data;
};

// Limiting
function doLimit (query) {
	if(query.limit) {
		var offset = ((query.offset|0)-1)||0;
		var limit = (query.limit|0) + offset;
		query.data = query.data.slice(offset,limit);
	}
}

// Distinct
function doDistinct (query) {
	if(query.distinct) {
		var uniq = {};
		// TODO: Speedup, because Object.keys is slow
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k]}).join('`');
			uniq[uix] = query.data[i];
		};
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
};


// Optimization: preliminary indexation of joins
preIndex = function(query) {
//	console.log(query);
	// Loop over all sources
	for(var k=0, klen = query.sources.length;k<klen;k++) {
		var source = query.sources[k];
		// If there is indexation rule
		if(source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
			// If there is no table.indices - create it
			if(!query.database.tables[source.tableid].indices) query.database.tables[source.tableid].indices = {};
				// Check if index already exists
			var ixx = query.database.tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)];
			if( !query.database.tables[source.tableid].dirty && ixx) {
				source.ix = ixx; 
			} else {
				source.ix = {};
				// Walking over source data
				var scope = {};
				for(var i=0, ilen=source.data.length; i<ilen; i++) {
					// Prepare scope for indexation
					scope[source.alias || source.tableid] = source.data[i];

					// Check if it apply to where function 
					if(source.srcwherefn(scope, query.params)) {
						// Create index entry for each address
						var addr = source.onrightfn(scope, query.params);
						var group = source.ix [addr]; 
						if(!group) {
							group = source.ix [addr] = []; 
						}
						group.push(source.data[i]);
					}
				}
				// Save index to original table				
				query.database.tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)] = source.ix;
			}
			// Optimization for WHERE column = expression
		} else if (source.wxleftfns) {
			// Check if index exists
			var ixx = query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`')];
			if( !query.database.tables[source.tableid].dirty && ixx) {
				// Use old index if exists
				source.ix = ixx;
				// Reduce data (apply filter)
				source.data = source.ix[source.wxrightfn(query.params)]; 
			} else {
				// Create new index
				source.ix = {};
				// Prepare scope
				var scope = {};
				// Walking on each source line
				for(var i=0, ilen=source.data.length; i<ilen; i++) {
					scope[source.alias || source.tableid] = source.data[i];
					// Create index entry
					var addr = source.wxleftfn(scope, query.params);
					var group = source.ix [addr]; 
					if(!group) {
						group = source.ix [addr] = []; 
					}
					group.push(source.data[i]);
				}
//					query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`'+source.onwherefns)] = source.ix;
				query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`')] = source.ix;
			}
			// Apply where filter to reduces rows
			if(source.srcwherefns) {
				if(source.data) {
					var scope = {};
					source.data = source.data.filter(function(r) {
						scope[source.alias] = r;
						return source.srcwherefn(scope, query.params);
					});
				} else {
					source.data = [];
				}
			}		

		// If there is no any optimization than apply srcwhere filter
		} else if(source.srcwherefns) {
			if(source.data) {
				var scope = {};
				source.data = source.data.filter(function(r) {
					scope[source.alias] = r;
					return source.srcwherefn(scope, query.params);
				});
			} else {
				source.data = [];
			};
		}			
		// Change this to another place (this is a wrong)
		if(query.database.tables[source.tableid]) {
			query.database.tables[source.tableid].dirty = false;
		} else {
			// this is a subquery?
		}
	}
}

//
// Join all lines over sources 
//

function doJoin (query, scope, h) {
	// Check, if this is a last join?
	if(h>=query.sources.length) {
		// Then apply where and select
		if(query.wherefn(scope,query.params)) {
			var res = query.selectfn(scope, query.params);
			// If there is a GROUP BY then pipe to groupping function
			if(query.groupfn) {
				query.groupfn(res, query.params)
			} else {
				query.data.push(res);
			}	
		}
	} else {
		var source = query.sources[h];
		var tableid = source.alias || source.tableid; 
		var pass = false; // For LEFT JOIN
		var data = source.data;

		// Reduce data for looping if there is optimization hint
		if(source.optimization == 'ix') {
			data = source.ix[ source.onleftfn(scope, query.params) ] || [];
		}

		// Main cycle
		for(var i=0, ilen=data.length; i<ilen; i++) {
			scope[tableid] = data[i];
			// Reduce with ON and USING clause
			if(!source.onleftfn || (source.onleftfn(scope, query.params) == source.onrightfn(scope, query.params))) {
				// For all non-standard JOINs like a-b=0
				if(source.onmiddlefn(scope, query.params)) {
					// Recursively call new join
					doJoin(query, scope, h+1);
					// for LEFT JOIN
					pass = true;
				}
			}
		};

		// Clear the scope after the loop
		scope[tableid] = {};

		// Additional join for LEFT JOINS
		if((source.joinmode == 'LEFT') && !pass) {
			doJoin(query,scope,h+1);
		}	
	}
};

