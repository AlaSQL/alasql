//
// alasql.js
// Alasql - JavaScript SQL database
// Date: 03.11.2014
// Version: 0.0.6
// (ñ) 2014, Andrey Gershun
//

//  UMD header
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./alasqlparser'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./alaparser'));
    } else {
        root.alasql = factory(root.alasqlparser);
    }
}(this, function (alasqlparser) {

// Fast hash function
function hash(str){
    var h = 0;
    if (str.length == 0) return h;
    for (var i = 0; i < str.length; i++) {
        h = ((h<<5)-h)+str.charCodeAt(i);
        h = h & h; 
   	}
    return h;
};


// Main database variable
var alasql = {};

// Initial parameters
alasql.parser = alasqlparser;
alasql.databases = {};

// Create default database
alasql.currentDatabase = new Database('start');
alasql.tables = alasql.currentDatabase.tables;

// Main Database class
function Database(databaseid) {
	var self = this;
	if(self == alasql) self = new Database(databaseid); // to call without new
	alasql.databases[databaseid] = self;
	self.tables = {};   // Tables
	self.sqlcache = {}; // Cache for compiled SQL statements
	return self;
};

// Start database
alasql.Database = Database;

// Transaction class (for WebSQL compatibility)
function Transaction(database) {
	this.database = database;
	return this;
};

// Main class 
alasql.Transaction = Transaction;

// Default methods to exec SQL statements
alasql.run = alasql.exec = function (sql) {
	return this.currentDatabase.exec(sql);
};

// MSSQL aliases
alasql.query = function (sql) {
	return this.currentDatabase.query(sql);
}
alasql.querySingle = function (sql) {
	return this.currentDatabase.querySingle(sql);
}
alasql.queryValue = function (sql) {
	return this.currentDatabase.queryValue(sql);
}

// Main SQL function
Database.prototype.exec = function(sql, args) {
	// Compile
	var statement = this.compile(sql);
	// Run
	var data = statement(args);
	return data;
};

// Aliases like Microsoft Database
Database.prototype.query = Database.prototype.exec;
Database.prototype.run = Database.prototype.exec;
Database.prototype.querySingle = function(sql) {
	return this.exec(sql)[0];
}
Database.prototype.queryValue = function(sql) {
	var res = this.querySingle(sql);
	return res[Object.keys(res)[0]];
}

// Transactions stub
// TODO: Implement transactions
Transaction.prototype.executeSQL = function(sql) {
	this.database.exec(sql);
};

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
Database.prototype.transaction = function(callback) {
	var tx = new Transaction(this);
	var res = callback(tx);
	return res;
};

// End of module
return alasql;
}));