/**
 * Database class for AlaSQL
 * Represents a database instance with tables, views, indices, and triggers
 */
export class Database {
	constructor(databaseid) {
		this.databaseid = databaseid;
		this.dbversion = 0;
		this.tables = {};
		this.views = {};
		this.triggers = {};
		this.indices = {};
		this.objects = {};
		this.counter = 0;
		this.sqlCache = {};
		this.sqlCacheSize = 0;
		this.astCache = {};
	}

	/**
	 * Reset SQL statements cache
	 */
	resetSqlCache() {
		this.sqlCache = {};
		this.sqlCacheSize = 0;
		this.astCache = {};
	}

	/**
	 * Run SQL statement on database
	 * This is a placeholder - gets wired up in registerDatabase
	 * @param {string} sql - SQL statement
	 * @param {object} params - Parameters
	 * @param {function} cb - Callback
	 */
	exec(sql, params, cb) {
		throw new Error('Database.exec not initialized - call registerDatabase first');
	}

	/**
	 * Get/set auto-increment value
	 * This is a placeholder - gets wired up in registerDatabase
	 */
	autoval(tablename, colname, getNext) {
		throw new Error('Database.autoval not initialized - call registerDatabase first');
	}

	/**
	 * Create a transaction
	 * This is a placeholder - gets wired up in registerDatabase
	 */
	transaction(cb) {
		throw new Error('Database.transaction not initialized - call registerDatabase first');
	}
}

/**
 * Register Database class with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerDatabase(alasql) {
	alasql.Database = Database;

	// Wire up exec to use alasql
	Database.prototype.exec = function (sql, params, cb) {
		return alasql.dexec(this.databaseid, sql, params, cb);
	};

	// Wire up autoval
	Database.prototype.autoval = function (tablename, colname, getNext) {
		return alasql.autoval(tablename, colname, getNext, this.databaseid);
	};

	// Wire up transaction
	Database.prototype.transaction = function (cb) {
		var tx = new alasql.Transaction(this.databaseid);
		var res = cb(tx);
		return res;
	};
}
