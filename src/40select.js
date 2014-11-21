
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
	var s = 'SELECT ';
	if(this.top) s += 'TOP '+this.top.value+' ';
	s += this.columns.map(function(col){
		var s = col.toString();
//		console.log(col);
		if(typeof col.as != "undefined") s += ' AS '+col.as;
		return s;
	}).join(',');

	if(this.from) {
		s += ' FROM '+this.from.map(function(f){
			console.log(f);
			var ss = f.toString();
			if(f.as) ss += ' AS '+f.as;
			return ss;
		}).join(',');
	};

	if(this.joins) {
		s += ' '+this.joins.map(function(jn){
			var ss = jn.joinmode +' JOIN ';
			ss += jn.table.toString();
			if(jn.using) ss += ' USING '+jn.using.toString();
			if(jn.on) ss += ' ON '+jn.on.toString();
			return ss;
 		});
	}

	if(this.where) s += ' WHERE '+this.where.toString();
	if(this.group) s += ' GROUP BY '+this.group.toString();
	if(this.having) s += ' HAVING '+this.having.toString();
	if(this.order) s += ' ORDER BY '+this.order.toString();
	if(this.union) s += ' UNION '+this.union.toString();
	if(this.unionall) s += ' UNION ALL '+this.unionall.toString();
	if(this.except) s += ' EXCEPT '+this.except.toString();
	if(this.intersect) s += ' INTERSECT '+this.intersect.toString();
	if(this.limit) s += ' LIMIT '+this.limit.value;
	if(this.offset) s += ' OFFSET '+this.offset.value;
	return s;
};

// Compile SELECT statement
yy.Select.prototype.compile = function(databaseid) {
	var db = alasql.databases[databaseid];
	// Create variable for query
	var query = new Query();
	
	query.database = db;
	// 0. Precompile whereexists
	this.compileWhereExists(query);

	// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
	this.compileQueries(query);
	
	query.defcols = this.compileDefCols(query, databaseid);

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

	if(this.top) {
		query.limit = this.top.value;
	} else if(this.limit) {
		query.limit = this.limit.value;
		if(this.offset) {
			query.offset = this.offset.value;
		}
	}
	// 8. Compile ORDER BY clause
	if(this.order) query.orderfn = this.compileOrder(query);

	// 9. Compile ordering function for UNION and UNIONALL
	if(this.union) {
		query.unionfn = this.union.compile(databaseid);
		if(this.union.order) {
			query.orderfn = this.union.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.unionall) {
		query.unionallfn = this.unionall.compile(databaseid);
		if(this.unionall.order) {
			query.orderfn = this.unionall.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.except) {
		query.exceptfn = this.except.compile(databaseid);
		if(this.except.order) {
			query.orderfn = this.except.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.intersect) {
		query.intersectfn = this.intersect.compile(databaseid);
		if(this.intersect.order) {
			query.intersectfn = this.intersect.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	};

	// SELECT INTO
//	console.log(this.into);
	if(this.into) {
		query.intofns = 
		'alasql.databases[\''+(this.into.databaseid||databaseid)+'\'].tables'+
		'[\''+this.into.tableid+'\'].data='+
		'alasql.databases[\''+(this.into.databaseid||databaseid)+'\'].tables'+
		'[\''+this.into.tableid+'\'].data.concat(this.data)';
		query.intofn = new Function(query.intofns); 
	}
//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		var res = queryfn(query,oldscope); 
		if(cb) cb(res); 
		return res;
	};

//	statement.dbversion = ;
//	console.log(statement.query);
	return statement;
};

yy.Select.prototype.exec = function(databaseid) {
	throw new Error('Select statement should be precompiled');

};

