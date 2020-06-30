/*
//
// EXISTS and other subqueries functions  functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ExistsValue = function (params) {
	return yy.extend(this, params);
};
yy.ExistsValue.prototype.toString = function () {
	return 'EXISTS(' + this.value.toString() + ')';
};

yy.ExistsValue.prototype.toType = function () {
	return 'boolean';
};

yy.ExistsValue.prototype.toJS = function (context, tableid, defcols) {
	//	return 'ww=this.existsfn['+this.existsidx+'](params,null,p),console.log(ww),ww.length';

	return 'this.existsfn[' + this.existsidx + '](params,null,' + context + ').data.length';
};

yy.Select.prototype.compileWhereExists = function (query) {
	if (!this.exists) return;
	query.existsfn = this.exists.map(function (ex) {
		var nq = ex.compile(query.database.databaseid);
		//		console.log(nq);
		//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		nq.query.modifier = 'RECORDSET';
		return nq;
	});
};

yy.Select.prototype.compileQueries = function (query) {
	if (!this.queries) return;
	query.queriesfn = this.queries.map(function (q) {
		var nq = q.compile(query.database.databaseid);
		//		console.log(nq);
		//	if(!nq.query) nq.query = {};
		nq.query.modifier = 'RECORDSET';
		//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		return nq;
	});
};

//
// Prepare subqueries and exists
//
alasql.precompile = function (statement, databaseid, params) {
	//	console.log(statement);
	if (!statement) return;
	statement.params = params;
	if (statement.queries) {
		//console.log(52,statement.queries[0]);
		statement.queriesfn = statement.queries.map(function (q) {
			var nq = q.compile(databaseid || statement.database.databaseid);
			//			console.log(nq);
			//			 nq.query.modifier = undefined;
			//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
	if (statement.exists) {
		//console.log(62,statement.exists);
		statement.existsfn = statement.exists.map(function (ex) {
			var nq = ex.compile(databaseid || statement.database.databaseid);
			//			console.log(nq.query.modifier);
			//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
			//			 if(!nq.query.modifier) nq.query.modifier = 'ARRAY';
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
};
