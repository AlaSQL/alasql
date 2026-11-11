/*
//
// Commit for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/
yy.BeginTransaction = function (params) {
	return Object.assign(this, params);
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
	if (cb) res = cb(res);
	return res;
};

yy.CommitTransaction = function (params) {
	return Object.assign(this, params);
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
	alasql.readOnlyTransaction = false;
	if (cb) res = cb(res);
	return res;
};

yy.RollbackTransaction = function (params) {
	return Object.assign(this, params);
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
	alasql.readOnlyTransaction = false;
	if (cb) res = cb(res);
	return res;
};

// SET TRANSACTION and SET SESSION AUTHORIZATION (#2797). AlaSQL runs one statement
// at a time, so the isolation level and the user are accepted and ignored. READ ONLY
// makes INSERT, UPDATE and DELETE fail until COMMIT or ROLLBACK.
yy.SetTransaction = function (params) {
	return Object.assign(this, params);
};
yy.SetTransaction.prototype.toString = function () {
	if (this.authorization) return 'SET SESSION AUTHORIZATION ' + this.authorization.toString();
	return 'SET TRANSACTION ' + this.modes.join(', ');
};

yy.SetTransaction.prototype.execute = function (databaseid, params, cb) {
	(this.modes || []).forEach(function (mode) {
		if (mode === 'READ ONLY') alasql.readOnlyTransaction = true;
		if (mode === 'READ WRITE') alasql.readOnlyTransaction = false;
	});
	var res = 1;
	if (cb) res = cb(res);
	return res;
};

['Insert', 'Update', 'Delete'].forEach(function (name) {
	var compile = yy[name].prototype.compile;
	yy[name].prototype.compile = function () {
		var statement = compile.apply(this, arguments);
		return Object.assign(function () {
			if (alasql.readOnlyTransaction) {
				throw new Error('Cannot change data in a READ ONLY transaction');
			}
			return statement.apply(this, arguments);
		}, statement);
	};
});
