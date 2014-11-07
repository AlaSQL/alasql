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
	this.bank = JSON.stringify(alasql.databases[databaseid].tables);
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
	alasql.databases[this.databaseid].tables = JSON.parse(this.bank);
};

// Transactions stub
Transaction.prototype.exec = Transaction.prototype.executeSQL = function(sql, params, cb) {
	return alasql.databases[this.databaseid].exec(sql);
};

