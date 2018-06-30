//
// 91websql.js
// WebSQL database support
// (c) 2014, Andrey Gershun
//

var WEBSQL = (alasql.engines.WEBSQL = function() {});

WEBSQL.createDatabase = function(wdbid, args, dbid, cb) {
	var res = 1;
	var wdb = openDatabase(wdbid, args[0], args[1], args[2]);
	if (this.dbid) {
		var db = alasql.createDatabase(this.dbid);
		db.engineid = 'WEBSQL';
		db.wdbid = wdbid;
		sb.wdb = db;
	}
	if (!wdb) {
		throw new Error('Cannot create WebSQL database "' + databaseid + '"');
	}
	if (cb) cb(res);
	return res;
};

WEBSQL.dropDatabase = function(databaseid) {
	throw new Error('This is impossible to drop WebSQL database.');
};

WEBSQL.attachDatabase = function(databaseid, dbid, args, params, cb) {
	var res = 1;
	if (alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "' + dbid + '" because it already exists');
	}
	alasqlopenDatabase(databaseid, args[0], args[1], args[2]);
	return res;
};
