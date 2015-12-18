/*
//
// Commit for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/
//formerly 81commit.js
//yy.BeginTransaction
export function BeginTransaction(params) { return yy.extend(this, params); }
BeginTransaction.prototype.toString = function() {
	return 'BEGIN TRANSACTION';
}

BeginTransaction.prototype.execute = function (databaseid,params, cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].begin(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

//yy.CommitTransaction
export function CommitTransaction (params) { return yy.extend(this, params); }
CommitTransaction.prototype.toString = function() {
	return 'COMMIT TRANSACTION';
}

CommitTransaction.prototype.execute = function (databaseid,params, cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].commit(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

//yy.RollbackTransaction
export function RollbackTransaction (params) { return yy.extend(this, params); }
RollbackTransaction.prototype.toString = function() {
	return 'ROLLBACK TRANSACTION';
}

RollbackTransaction.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[databaseid].engineid].rollback(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};
