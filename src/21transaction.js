/*
//
// Transaction class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

class Transaction {
	transactionid = Date.now();

	committed = false;

	/** @type {string | undefined} */
	bank;

	constructor(databaseid) {
		this.databaseid = databaseid;
		this.dbversion = alasql.databases[databaseid].dbversion;
		// this.bank = structuredClone(alasql.databases[databaseid]);
		this.bank = JSON.stringify(alasql.databases[databaseid]);
		// TODO CLone Tables with insertfns
	}

	/** Commit transaction */
	commit() {
		this.committed = true;
		alasql.databases[this.databaseid].dbversion = Date.now();
		delete this.bank;
	}

	/** Rollback transaction */
	rollback() {
		if (!this.committed) {
			alasql.databases[this.databaseid] = JSON.parse(this.bank);
			// alasql.databases[this.databaseid].tables = this.bank;
			// alasql.databases[this.databaseid].dbversion = this.dbversion;
			delete this.bank;
		} else {
			throw new Error('Transaction already commited');
		}
	}

	/**
	 * Execute SQL statement
	 * @param {string} sql SQL statement
	 * @param {object} params Parameters
	 * @param {function} cb Callback function
	 * @return result
	 */
	exec(sql, params, cb) {
		return alasql.dexec(this.databaseid, sql, params, cb);
	}

	/*
	queryArray (sql, params, cb) {
		return flatArray(this.exec(sql, params, cb));
	}

	queryArrayOfArrays (sql, params, cb) {
		return arrayOfArrays(this.exec(sql, params, cb));
	}

	querySingle (sql, params, cb) {
		return this.exec(sql, params, cb)[0];
	}

	queryValue (sql, params, cb) {
		var res = this.querySingle(sql, params, cb);
		return res[Object.keys(res)[0]];
	}
	*/
}

Transaction.prototype.executeSQL = Transaction.prototype.exec;

// Transaction.prototype.query = Database.prototype.exec;
// Transaction.prototype.run = Database.prototype.exec;

alasql.Transaction = Transaction;
