// Main database variable
var alasql = {};

// Initial parameters
alasql.parser = parser;
alasql.databases = {};

// Create default database
alasql.currentDatabase = new Database();
alasql.tables = alasql.currentDatabase.tables;

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
	return self;
};

// Start database
alasql.Database = Database;


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


// MSSQL aliases
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

Database.prototype.aexec = function(sql, params) {
	var self = this;
	return new Promise(function(resolve, reject){
		self.exec(sql,params,resolve);
	});
};


// Aliases like Microsoft Database
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
		var ast = alasql.parser.parse(sql);
		// Save to cache
		statement = this.sqlcache[hh]= ast.compile(this);
	};
	return statement;
}

// SQL.js compatibility method
Database.prototype.prepare = Database.prototype.compile;

// Added for compatibility with WebSQL
// TODO Create Commit
Database.prototype.transaction = function(cb) {
	var tx = new alasql.Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};

// Index columns
Database.prototype.indexColumns = function(tableid) {
	var table = this.tables[tableid];
	table.xcolumns = {};
	table.columns.forEach(function(col){
		table.xcolumns[col.columnid] = col;
	});	
}
