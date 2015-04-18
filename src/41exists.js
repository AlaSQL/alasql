/*
//
// EXISTS and other subqueries functions  functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ExistsValue = function(params) { return yy.extend(this, params); }
yy.ExistsValue.prototype.toString = function() {
	return 'EXISTS('+this.value.toString()+')';
};

yy.ExistsValue.prototype.toType = function() {
	return 'boolean';
};

yy.ExistsValue.prototype.toJavaScript = function(context,tableid,defcols) {
//	return 'ww=this.existsfn['+this.existsidx+'](params,null,p).length,console.log(ww),ww';
	return 'this.existsfn['+this.existsidx+'](params,null,'+context+').length';
};

yy.Select.prototype.compileWhereExists = function(query) {
	if(!this.exists) return;
	query.existsfn = this.exists.map(function(ex) {
		return ex.compile(query.database.databaseid);
	});
};

yy.Select.prototype.compileQueries = function(query) {
	if(!this.queries) return;
	query.queriesfn = this.queries.map(function(q) {
		return q.compile(query.database.databaseid);
	});
};

alasql.precompile = function(statement,databaseid,params){
//	console.log(statement);
	if(!statement) return;
	statement.params = params;
	if(statement.queries) {	
		statement.queriesfn = statement.queries.map(function(q) {
			return q.compile(databaseid || statement.database.databaseid);
		});
	}
	if(statement.exists) {
		statement.existsfn = statement.exists.map(function(ex) {
			return ex.compile(databaseid || statement.database.databaseid);
		});
	};


}