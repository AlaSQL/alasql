/*
//
// Commit for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/
yy.Begin = function (params) { return yy.extend(this, params); }
yy.Begin.prototype.toString = function() {
	return K('BEGIN');
}

yy.Begin.prototype.execute = function (databaseid,params, cb) {
};

yy.Commit = function (params) { return yy.extend(this, params); }
yy.Commit.prototype.toString = function() {
	return K('COMMIT');
}

yy.Commit.prototype.execute = function (databaseid,params, cb) {
	var res = 1;
	if(alasql.databases[alasql.useid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].commit(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

yy.Rollback = function (params) { return yy.extend(this, params); }
yy.Rollback.prototype.toString = function() {
	return K('ROLLBACK');
}

yy.Rollback.prototype.execute = function (databaseid,params,cb) {
};
