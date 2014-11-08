/*
//
// Database class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Main database variable
var alasql = {};

// Initial parameters
alasql.parser = parser;
alasql.parse = parser.parse.bind(parser); // Shortcut
alasql.databases = {};

// Create default database
alasql.currentDatabase = new Database();
alasql.tables = alasql.currentDatabase.tables;

alasql.MAXSQLCACHESIZE = 10000;

// Main Database class
function Database(databaseid) {
	var self = this;
	if(self == alasql) self = new Database(databaseid); // to call without new
	if(!databaseid) {
		databaseid = +Date.now()+""; // Random name
	}
	self.databaseid = databaseid;
	alasql.databases[databaseid] = self;
	self.tables = {};   // Tables
	self.sqlcache = {}; // Cache for compiled SQL statements
	self.sqlcachesize = 0;
	return self;
};

// Start database
alasql.Database = Database;

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
alasql.querySingle = function (sql, params, cb) {
	return this.currentDatabase.querySingle(sql, params, cb);
}
alasql.queryValue = function (sql, params, cb) {
	return this.currentDatabase.queryValue(sql, params, cb);
}

alasql.indexColumns = function(tableid) {
	this.currentDatabase.indexColumns(tableid);
}

// Main SQL function
Database.prototype.exec = function(sql, params, cb) {
	// Compile
	var statement = this.compile(sql);
	// Run
	var data = statement(params, cb);
	return data;
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
Database.prototype.querySingle = function(sql, params, cb) {
	return this.exec(sql, params, cb)[0];
}
Database.prototype.queryValue = function(sql, params, cb) {
	var res = this.querySingle(sql, params, cb);
	return res[Object.keys(res)[0]];
}


// Compile statements
Database.prototype.compile = function(sql) {
	var hh = hash(sql);

	// Check cache with hash of SQL statement
	var statement = this.sqlcache[hh];
	if(!statement) {
		// If not fount, then compile it
		var ast = alasql.parse(sql);
		// Save to cache
		statement = this.sqlcache[hh]= ast.compile(this);

		// Memory leak prevention 
		this.sqlcachesize++;
		if(this.sqlcachesize > alasql.MAXSQLCACHESIZE) {
			delete this.sqlcache;
			this.sqlcachesize = 0;
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
