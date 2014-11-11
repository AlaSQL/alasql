/*
//
// Transactio class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Transaction class (for WebSQL compatibility)
function Transaction(databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false; 
	this.bank = cloneDeep(alasql.databases[databaseid].tables);
	return this;
};

// Main class 
alasql.Transaction = Transaction;

// Commit
Transaction.prototype.commit = function() {
	this.commited = true;
	delete this.bank;
};

// Rollback
Transaction.prototype.rollback = function() {
	if(!this.commited) {
		alasql.databases[this.databaseid].tables = this.bank;
		delete this.bank;
	} else {
		throw new Error('Transaction already commited');
	}
};

// Transactions stub
Transaction.prototype.exec = Transaction.prototype.executeSQL = function(sql, params, cb) {
	return alasql.databases[this.databaseid].exec(sql);
};

// MSSQL-Like aliases
Transaction.prototype.query = function (sql, params, cb) {
	return alasql.databases[this.databaseid].query(sql, params.cb);
}
Transaction.prototype.querySingle = function (sql, params, cb) {
	return alasql.databases[this.databaseid].querySingle(sql, params, cb);
}
Transaction.prototype.queryValue = function (sql, params, cb) {
	return alasql.databases[this.databaseid].queryValue(sql, params, cb);
}
Transaction.prototype.queryArray = function (sql, params, cb) {
	return alasql.databases[this.databaseid].queryArray(sql, params, cb);
}
Transaction.prototype.queryArrayOfArrays = function (sql, params, cb) {
	return alasql.databases[this.databaseid].queryArrayOfArrays(sql, params, cb);
}
