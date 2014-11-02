//
// alasql.js
// "A la SQL" - Pure JavaScript SQL database
// Date: 01.11.2014
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

// Hash function
// TODO Move it to outside
function hash(str){
    var h = 0;
    if (str.length == 0) return h;
    for (var i = 0; i < str.length; i++) {
        h = ((h<<5)-h)+str.charCodeAt(i);
        h = h & h; 
   	}
    return h;
};



var alasql = {};
	// Initial parameters
alasql.parser = alasqlparser;
alasql.databases = {};
	// Create initial database
alasql.currentDatabase = new Database('dbstart');
alasql.tables = alasql.currentDatabase.tables;


// Database class
function Database(databaseid) {
	alasql.databases[databaseid] = this;
	this.tables = {};
	this.sqlcache = {};
	return this;
};
alasql.Database = Database;

// Database class
function Transaction(database) {
	this.database = database;
	return this;
};
alasql.Transaction = Transaction;

alasql.exec = function (sql) {
	return this.currentDatabase.exec(sql);
}

Database.prototype.exec = function(sql) {
	console.log(sql);
	var tm1 = Date.now();
	var statement = this.compile(sql);
	tm1 = Date.now()-tm1;

//	console.log(statement());
	var tm2 = Date.now();
	var data = statement();
	tm2 = Date.now()-tm2;
	console.log('compile:', tm1,'exec:', tm2);
	return data;
};

// TODO - Replace with normal transactions handling
Transaction.prototype.executeSQL = function(sql) {
	this.database.exec(sql);
};

Database.prototype.compile = function(sql) {
	var h = hash(sql);
	var statement = this.sqlcache[h];
	if(!statement) {
		var ast = alasql.parser.parse(sql);
		statement = this.sqlcache[h]= ast.compile(this);
	};
	return statement;
}

// TODO Create Commit
// Added for compatibility with WebSQL
Database.prototype.transaction = function(callback) {
	var tx = new Transaction(this);
	var res = callback(tx);
	return res;
};

return alasql;
}));