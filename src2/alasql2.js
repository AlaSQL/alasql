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

var Alasql = function(){
	// Initial parameters
	this.parser = alasqlparser;
	this.databases = {};
	// Create initial database
	this.currentDatabase = this.createDatabase('dbstart');
	this.tables = this.currentDatabase.tables;
	return this;
};

// Database class
Alasql.Database = function() {
	var self = this;
	if(this == Alasql) self = new this(); // TODO Think about it
	self.engine = this; // Может быть и не так?
	self.tables = {};
	return self;
};

Alasql.Database.prototype.exec = function(sql) {
	return this.compile(sql)();
};

Alasql.Database.prototype.compile = function(sql) {
	var ast = alasqlparser.parse(sql);
	return ast.compile(this);
}

Alasql.prototype.createDatabase = function (databaseid) {
	var db = this.databases[databaseid] = new Alasql.Database();
	return db;
};

Alasql.prototype.exec = function (sql) {
	return this.currentDatabase.exec(sql);
}

return new Alasql;
}));