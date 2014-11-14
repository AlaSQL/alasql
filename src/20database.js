/*
//
// Database class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Main database variable
var alasql = function(sql, params, cb) {
	return alasql.currentDatabase.exec(sql, params, cb);
};

// Initial parameters
alasql.parser = parser;
alasql.parse = parser.parse.bind(parser); // Shortcut

// Useful library
alasql.utils = utils;

alasql.databases = {};


alasql.MAXSQLCACHESIZE = 10000;

alasql.use = function (databaseid) {
	alasql.currentDatabase = alasql.databases[databaseid];
	alasql.tables = alasql.currentDatabase.tables;
	alasql.currentDatabase.resetSqlCache();
};

// Main Database class
function Database(databaseid) {
	var self = this;
	if(self === alasql) self = new Database(databaseid); // to call without new
	if(!databaseid) {
		databaseid = "db"+Date.now(); // Random name
	};
	self.databaseid = databaseid;
	alasql.databases[databaseid] = self;
	self.tables = [];
	self.indices = {};
	self.resetSqlCache();
	return self;
};

// Start database
alasql.Database = Database;

Database.prototype.resetSqlCache = function () {
	this.sqlcache = {}; // Cache for compiled SQL statements
	this.sqlcachesize = 0;	
}


// Compiler
alasql.compile = function(sql) {
	return this.currentDatabase.compile(sql);
}

// Default methods to exec SQL statements
alasql.run = alasql.exec = function (sql, params, cb) {
	return this.currentDatabase.exec(sql, params, cb);
};

// Promised version of exec
alasql.aexec = function (sql, params) {
	return this.currentDatabase.aexec(sql, params);
};


// MSSQL-Like aliases
alasql.query = function (sql, params, cb) {
	return this.currentDatabase.query(sql, params.cb);
}
alasql.queryArray = function (sql, params, cb) {
	return this.currentDatabase.queryArray(sql, params.cb);
}
alasql.querySingle = function (sql, params, cb) {
	return this.currentDatabase.querySingle(sql, params, cb);
}
alasql.queryValue = function (sql, params, cb) {
	return this.currentDatabase.queryValue(sql, params, cb);
}


alasql.queryArray = function (sql, params, cb) {
	return this.currentDatabase.queryArray(sql, params, cb);
}
alasql.queryArrayOfArrays = function (sql, params, cb) {
	return this.currentDatabase.queryArrayOfArrays(sql, params, cb);
}

alasql.value = alasql.queryValue;
alasql.row = alasql.querySingle;
alasql.array = alasql.queryArray;
alasql.matrix = alasql.queryArrayOfArrays;


alasql.indexColumns = function(tableid) {
	this.currentDatabase.indexColumns(tableid);
}

// Main SQL function
Database.prototype.exec = function(sql, params, cb) {
	// Compile
	var statement = this.compile(sql);
	// Run
	if(statement) {
		var data = statement(params, cb);
		return data;
	}
	return;
};

// Async version of exec
Database.prototype.aexec = function(sql, params) {
	var self = this;
	return new Promise(function(resolve, reject){
		self.exec(sql,params,resolve);
	});
};


// Aliases like MS SQL
Database.prototype.query = Database.prototype.exec;
Database.prototype.run = Database.prototype.exec;
Database.prototype.queryArray = function(sql, params, cb) {
	return flatArray(this.exec(sql, params, cb));
}

Database.prototype.queryArrayOfArrays = function(sql, params, cb) {
	return arrayOfArrays(this.exec(sql, params, cb));
}

Database.prototype.querySingle = function(sql, params, cb) {
	return this.exec(sql, params, cb)[0];
}
Database.prototype.queryValue = function(sql, params, cb) {
	var res = this.querySingle(sql, params, cb);
	return res[Object.keys(res)[0]];
}

Database.prototype.value  = Database.prototype.queryValue;
Database.prototype.row    = Database.prototype.querySingle;
Database.prototype.array  = Database.prototype.queryArray;
Database.prototype.matrix = Database.prototype.queryArrayOfArrays;


// Compile statements
Database.prototype.compile = function(sql) {

	var self = this;
	var hh = hash(sql);

	// Check cache with hash of SQL statement
	var statement = this.sqlcache[hh];
	if(!statement) {

		// If not fount, then compile it
		var ast = alasql.parse(sql);
		// Save to cache

		statement = this.sqlcache[hh]= ast.compile(self);

		// Memory leak prevention 
		this.sqlcachesize++;
		if(this.sqlcachesize > alasql.MAXSQLCACHESIZE) {
			this.resetSqlCache();
		}
	};
	return statement;
}

// SQL.js compatibility method
Database.prototype.prepare = Database.prototype.compile;

// Added for compatibility with WebSQL
Database.prototype.transaction = function(cb) {
	var tx = new alasql.Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};

// Index columns in table utility
Database.prototype.indexColumns = function(tableid) {
	var table = this.tables[tableid];
	table.xcolumns = {};
	table.columns.forEach(function(col){
		table.xcolumns[col.columnid] = col;
	});	
}
