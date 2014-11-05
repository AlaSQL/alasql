// Transaction class (for WebSQL compatibility)
function Transaction(databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false; // 0 - opened, 1 - commited
	//alasql.store(databaseid, this.transactionid);
	this.bank = JSON.stringify(alasql.databases[databaseid].tables);
	return this;
};

// Main class 
alasql.Transaction = Transaction;


Transaction.prototype.commit = function() {
	this.commited = true;
	delete this.bank;
//	alasql.wipe(this.databaseid, this.transactionid);
};

Transaction.prototype.rollback = function() {
	alasql.databases[this.databaseid].tables = JSON.parse(this.bank);
//	alasql.restore(this.databaseid, this.transactionid);
//	alasql.wipe(this.databaseid, this.transactionid);
};


// Transactions stub
// TODO: Implement transactions
Transaction.prototype.exec = Transaction.prototype.executeSQL = function(sql, params, cb) {
	return alasql.databases[this.databaseid].exec(sql);
};

