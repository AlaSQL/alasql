/*
//
// Commit for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/
yy.BeginTransaction = function (params) {
	return yy.extend(this, params);
};
yy.BeginTransaction.prototype.toString = function () {
	return 'BEGIN TRANSACTION';
};

yy.BeginTransaction.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	if (alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].begin(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if (cb) cb(res);
	return res;
};

yy.CommitTransaction = function (params) {
	return yy.extend(this, params);
};
yy.CommitTransaction.prototype.toString = function () {
	return 'COMMIT TRANSACTION';
};

yy.CommitTransaction.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	if (alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].commit(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if (cb) cb(res);
	return res;
};

yy.RollbackTransaction = function (params) {
	return yy.extend(this, params);
};
yy.RollbackTransaction.prototype.toString = function () {
	return 'ROLLBACK TRANSACTION';
};

yy.RollbackTransaction.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	if (alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[databaseid].engineid].rollback(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if (cb) cb(res);
	return res;
};
