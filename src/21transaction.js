/*
//
// Transactio class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

Database.prototype.transaction = function (cb) {
	var tx = new alasql.Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};

// Transaction class (for WebSQL compatibility)

/** 
 Transaction class
 @class Transaction
 */

var Transaction = (alasql.Transaction = function (databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false;
	this.dbversion = alasql.databases[databaseid].dbversion;
	//	this.bank = cloneDeep(alasql.databases[databaseid]);
	this.bank = JSON.stringify(alasql.databases[databaseid]);
	// TODO CLone Tables with insertfns
	//	console.log(this);
	return this;
});

// Main class

// Commit

/**
 Commit transaction
 */
Transaction.prototype.commit = function () {
	this.commited = true;
	alasql.databases[this.databaseid].dbversion = Date.now();
	delete this.bank;
};

// Rollback
/**
 Rollback transaction
 */
Transaction.prototype.rollback = function () {
	if (!this.commited) {
		alasql.databases[this.databaseid] = JSON.parse(this.bank);
		// alasql.databases[this.databaseid].tables = this.bank;
		// alasql.databases[this.databaseid].dbversion = this.dbversion;
		delete this.bank;
	} else {
		throw new Error('Transaction already commited');
	}
};

// Transactions stub

/**
 Execute SQL statement
 @param {string} sql SQL statement
 @param {object} params Parameters
 @param {function} cb Callback function 
 @return result
 */
Transaction.prototype.exec = function (sql, params, cb) {
	//	console.log(this.databaseid);
	return alasql.dexec(this.databaseid, sql, params, cb);
};

Transaction.prototype.executeSQL = Transaction.prototype.exec;

/*/*
Transaction.prototype.query = Database.prototype.exec;
Transaction.prototype.run = Database.prototype.exec;
Transaction.prototype.queryArray = function(sql, params, cb) {
	return flatArray(this.exec(sql, params, cb));
}

Transaction.prototype.queryArrayOfArrays = function(sql, params, cb) {
	return arrayOfArrays(this.exec(sql, params, cb));
}

Transaction.prototype.querySingle = function(sql, params, cb) {
	return this.exec(sql, params, cb)[0];
}
Transaction.prototype.queryValue = function(sql, params, cb) {
	var res = this.querySingle(sql, params, cb);
	return res[Object.keys(res)[0]];
}
*/
