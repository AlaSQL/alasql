/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CreateDatabase = function (params) { return yy.extend(this, params); }
yy.CreateDatabase.prototype.toString = function() {
	return 'CREATE DATABASE '+this.databaseid;
}

yy.CreateDatabase.prototype.compile = function (db) {
	var databaseid = this.databaseid;

	return function(params, cb) {
		if(alasql.databases[databaseid]) {
			throw new Error("Database '"+databaseid+"' already exists")
		};
		new alasql.Database(databaseid);
		if(cb) cb(1);
		return 1;
	};
};

yy.UseDatabase = function (params) { return yy.extend(this, params); }
yy.UseDatabase.prototype.toString = function() {
	return 'USE DATABASE '+this.databaseid;
}

yy.UseDatabase.prototype.compile = function (db) {
	var databaseid = this.databaseid;

	return function(params, cb) {
		if(!alasql.databases[databaseid]) {
			throw new Error("Database '"+databaseid+"' does not exist")
		};
		alasql.use(databaseid);
		//console.log(alasql.currentDatabase.databaseid);
		if(cb) cb(1);
		return 1;
	};
};

yy.DropDatabase = function (params) { return yy.extend(this, params); }
yy.DropDatabase.prototype.toString = function() {
	return 'DROP DATABASE '+this.databaseid;
}

yy.DropDatabase.prototype.compile = function (db) {
	var databaseid = this.databaseid;

	return function(params, cb) {
		if(databaseid == 'alasql') {
			throw new Error("Drop 'alasql' dtabase is prohibited");			
		}
		if(!alasql.databases[databaseid]) {
			throw new Error("Database '"+databaseid+"' does not exist");
		};
//		alasql.use('alasql');
		delete alasql.databases[databaseid];
		alasql.currentDatabase = alasql.databases.alasql;
		alasql.tables = alasql.databases.alasql.tables;
		if(cb) cb(1);
		return 1;
	};
};





