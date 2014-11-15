/*
//
// Database class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Main function
alasql = function(sql, params, cb, scope) {
	return alasql.exec(sql, params, cb, scope);
};

// Initial parameters
alasql.parser = parser;
alasql.parse = parser.parse.bind(parser); // Shortcut

// Useful library
alasql.utils = utils;

alasql.databases = {};

// Cache
alasql.MAXSQLCACHESIZE = 10000;

alasql.use = function (databaseid) {
	alasql.useid = databaseid;
	alasql.tables = alasql.currentDatabase.tables;
	alasql.currentDatabase.resetSqlCache();
};

// Run one statement
alasql.exec = function (sql, params, cb) {
	alasql.dexec(alasql.useid, sql, params, cb);
}

alasql.dexec = function (databaseid, sql, params, cb) {
	var db = alasql.databases[databaseid];
	var hh = hash(sql);
	var statement = db.sqlCache[hh];
	if(statement) return statement(params, cb);

	// Create AST
	var ast = alasql.parse(sql);
	if(ast.length == 0) return 0;
	else if(ast.length == 1) {
		var statement = ast[i].compile(databaseid);
		if(statement) {
			// Secure sqlCache size
			if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
				db.resetSqlCache();
			}
			db.sqlCacheSize++;
			db.sqlCache[hh] = statement;
			return statement(params, cb);
		}
		else return ast[i].exec(databaseid, params, cb);		
	}
	return alasql.drun(databaseid, ast, params, cb);
};

// Run multiple statements and return array of results
alasql.drun = function (databaseid, ast, params, cb) {
	var useid = alasql.useid;
	alasql.use(databaseid);
	var res = [];
	for (var i=0, ilen=ast.length; i<ilen; i++) {
		var statement = ast[i].compile(alasql.useid);
		if(statement) {
			res.push(statement(params));
		} else res.push(ast[i].exec());		
	});
	alasql.use(useid);
	if(cb) cb(res);
	return res;
};

// Compiler
alasql.compile = function(sql, databaseid) {
	if(!databaseid) databaseid = alasql.useid;
	var ast = alasql.parse(sql);
	if(ast.length == 1) {
		return ast[0].compile(databaseid);
	} else {
		throw new Error('Number of statments in SQL is not equal to 1');
	}
}

// // Default methods to exec SQL statements
// alasql.run = alasql.exec = function (sql, params, cb) {
// 	return this.currentDatabase.exec(sql, params, cb);
// };

// Promised version of exec
alasql.aexec = function (sql, params) {
	var self = this;
	return new Promise(function(resolve, reject){
		self.exec(sql,params,resolve);
	});
};


// MSSQL-Like aliases
alasql.query = function (sql, params, cb) {
	var res = this.exec(sql, params);
	if(cb) cb(res);
	return res;	
};

alasql.queryArray = function (sql, params, cb) {
	var res = flatArray(this.exec(sql, params));
	if(cb) cb(res);
	return res;
};

alasql.querySingle = function (sql, params, cb) {
	var res = this.exec(sql, params)[0];
	if(cb) cb(res);
	return res;
};

alasql.queryRow = function (sql, params, cb) {
	var res = this.querySingle(sql, params);
	var a = [];
	for(var key in res) {
		a.push(res[key]);
	};
	if(cb) cb(a);
	return a;
};

alasql.queryValue = function (sql, params, cb) {
	var res = this.querySingle(sql, params);
	var val = res[Object.keys(res)[0]];
	if(cb) cb(val);
	return val;
	// TODO Refactor to query.columns
};

alasql.queryArrayOfArrays = function (sql, params, cb) {
	var res = this.queryArrayOfArrays(sql, params);
	if(cb) cb(res);
	return res;
};

alasql.value = alasql.queryValue;
alasql.single = alasql.querySingle;
alasql.row = alasql.queryRow;
alasql.array = alasql.queryArray;
alasql.matrix = alasql.queryArrayOfArrays;

