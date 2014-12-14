
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
	var s = '';
	if(this.explain) s+= K('EXPLAIN')+' ';
	s += K('SELECT')+' ';
	if(this.modifier) s += K(this.modifier)+' ';
	if(this.top) s += K('TOP')+' '+N(this.top.value)+' ';
	s += this.columns.map(function(col){
		var s = col.toString();
//		console.log(col);
		if(typeof col.as != "undefined") s += ' '+K('AS')+' '+L(col.as);
		return s;
	}).join(', ');

	if(this.from) {
		s += NL()+ID()+K('FROM')+' '+this.from.map(function(f){
//			console.log(f);
			var ss = f.toString();
			if(f.as) ss += ' '+K('AS')+' '+f.as;
			return ss;
		}).join(',');
	};

	if(this.joins) {
		s += this.joins.map(function(jn){
			var ss = NL()+ID();
			if(jn.joinmode) ss += K(jn.joinmode)+' ';
			ss += K('JOIN')+' ';
			ss += jn.table.toString();
			if(jn.using) ss += ' '+K('USING')+' '+jn.using.toString();
			if(jn.on) ss += ' '+K('ON')+' '+jn.on.toString();
			return ss;
 		});
	}

	if(this.where) s += NL()+ID()+K('WHERE')+' '+this.where.toString();
	if(this.group) s += NL()+ID()+K('GROUP BY')+' '+this.group.toString();
	if(this.having) s += NL()+ID()+K('HAVING')+' '+this.having.toString();
	if(this.order) s += NL()+ID()+K('ORDER BY')+' '+this.order.toString();
	if(this.limit) s += NL()+ID()+K('LIMIT')+' '+this.limit.value;
	if(this.offset) s += NL()+ID()+K('OFFSET')+' '+this.offset.value;
	if(this.union) s += NL()+K('UNION')+NL()+this.union.toString();
	if(this.unionall) s += NL()+K('UNION ALL')+NL()+this.unionall.toString();
	if(this.except) s += NL()+K('EXCEPT')+NL()+this.except.toString();
	if(this.intersect) s += NL()+K('INTERSECT')+NL()+this.intersect.toString();
	return s;
};

// Compile SELECT statement
yy.Select.prototype.compile = function(databaseid) {
	var db = alasql.databases[databaseid];
	// Create variable for query
	var query = new Query();

	query.explain = this.explain; // Explain
	query.explaination = [];
	query.explid = 1;

	query.modifier = this.modifier;
	
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
		if(this.into instanceof yy.Table) {
			if(alasql.autocommit && alasql.databases[this.into.databaseid||databaseid].engineid) {
				query.intoallfns = 'return alasql.engines["'+alasql.databases[this.into.databaseid||databaseid].engineid+'"]'+
					'.intoTable("'+(this.into.databaseid||databaseid)+'","'+this.into.tableid+'",this.data, columns, cb);';
			} else {
				query.intofns = 
				'alasql.databases[\''+(this.into.databaseid||databaseid)+'\'].tables'+
				'[\''+this.into.tableid+'\'].data.push(r);';
			}
		} else if (this.into instanceof yy.FuncValue) {

/*
			query.intofns = 'alasql.into[\''+this.into.funcid+'\'](';
			var ss = ['r','i'];
			if(this.into.args && this.into.args.length>0 ) 	
				this.into.args.forEach(function(arg){
					ss.push(arg.toJavaScript());
				});
			query.intofns += ss.join(',')+')';	
*/
			var qs = 'alasql.into[\''+this.into.funcid.toUpperCase()+'\'](';
			if(this.into.args && this.into.args.length>0 ) {
				qs += this.into.args[0].toJavaScript()+',';
				if(this.into.args.length > 1) {
					qs += this.into.args[1].toJavaScript()+',';
				} else {
					qs += 'null,';
				}
			} else {
				qs += 'null, null,'
			}
			query.intoallfns = qs+'this.data,columns,cb)';
//console.log('999');		




		} else if (this.into instanceof yy.ParamValue) {
//			console.log(184);
//			query.intofns = 'params[\''+this.into.param+"\'](r)";	
			query.intofns = "params['"+this.into.param+"'].push(r)";

		};
//		console.log(query.intofns);
		if(query.intofns) {
			query.intofn = new Function("r,i,params",query.intofns); 
		};

		if(query.intoallfns) {
//			console.log(query.intoallfns);
			query.intoallfn = new Function("columns,cb",query.intoallfns); 
		}

	}
//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		var res1 = queryfn(query,oldscope,function(res){

//console.log(res[0].schoolid);
//console.log(184,res);
			var res2 = modify(query, res);


			if(cb) cb(res2); 
//console.log(8888,res2);
			return res2;

		}); 
//console.log(9999,res1);

//		if(typeof res1 != 'undefined') res1 =  modify(query,res1);

		return res1;
		
	};

//	statement.dbversion = ;
//	console.log(statement.query);
//console.log(202,statement);
	statement.query = query;
	return statement;
};

function modify(query, res) {
	if(query.modifier == 'VALUE') {
//		console.log(222,res);
		var key = Object.keys(res[0])[0];
		res = res[0][key];
	} if(query.modifier == 'ROW') {
		var a = [];
		for(var key in res[0]) {
			a.push(res[0][key]);
		};
		res = a;
	} if(query.modifier == 'COLUMN') {
		var ar = [];
		if(res.length > 0) {
			var key = Object.keys(res[0])[0];
			for(var i=0, ilen=res.length; i<ilen; i++){
				ar.push(res[i][key]);
			}
		};
		res = ar;
	} if(query.modifier == 'MATRIX') {
		res = arrayOfArrays(res);
	}
	return res;
};



yy.Select.prototype.exec = function(databaseid) {
	throw new Error('Select statement should be precompiled');

};

