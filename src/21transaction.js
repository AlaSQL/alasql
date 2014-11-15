/*
//
// Transactio class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

Database.prototype.transaction = function(cb) {
	var tx = new alasql.Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};


// Transaction class (for WebSQL compatibility)
function Transaction(databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false; 
	this.dbversion = alasql.databases[databaseid].dbversion;
	this.bank = cloneDeep(alasql.databases[databaseid].tables);
	return this;
};

// Main class 
alasql.Transaction = Transaction;

// Commit
Transaction.prototype.commit = function() {
	this.commited = true;
	alasql.databases[this.databaseid].dbversion = Date.now();
	delete this.bank;
};

// Rollback
Transaction.prototype.rollback = function() {
	if(!this.commited) {
		alasql.databases[this.databaseid].tables = this.bank;
		alasql.databases[databaseid].dbversion = this.dbversion;
		delete this.bank;
	} else {
		throw new Error('Transaction already commited');
	}
};

// Transactions stub
Transaction.prototype.exec = Transaction.prototype.executeSQL = function(sql, params, cb) {
	return alasql.databases[this.databaseid].exec(sql);
};

