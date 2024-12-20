// Project: https://github.com/alasql/alasql

declare module 'alasql' {
	import * as xlsx from 'xlsx';

	// Callback with error-first convention and optional data
	interface AlaSQLCallback<T = unknown> {
		(err: Error | null, data?: T): void;
	}

	interface AlaSQLOptions {
		errorlog: boolean;
		valueof: boolean;
		dropifnotexists: boolean; // drop database in any case
		datetimeformat: string; // how to handle DATE and DATETIME types
		casesensitive: boolean; // table and column names are case sensitive and converted to lower-case
		logtarget: string; // target for log. Values: 'console', 'output', 'id' of html tag
		logprompt: boolean; // print SQL at log
		modifier?: 'RECORDSET' | 'VALUE' | 'ROW' | 'COLUMN' | 'MATRIX' | 'TEXTSTRING' | 'INDEX';
		columnlookup: number; // how many rows to lookup to define columns
		autovertex: boolean; // create vertex if not found
		usedbo: boolean; // use dbo as current database (for partial T-SQL comaptibility)
		autocommit: boolean; // the AUTOCOMMIT ON | OFF
		cache: boolean; // use cache
		nocount: boolean; // for SET NOCOUNT OFF
		nan: boolean; // check for NaN and convert it to undefined
		angularjs: boolean;
		tsql: boolean;
		mysql: boolean;
		postgres: boolean;
		oracle: boolean;
		sqlite: boolean;
		orientdb: boolean;
		excel?: xlsx.WorkBook; // now typed
	}

	// compiled Statement
	interface AlaSQLStatement {
		<T = unknown>(params?: Record<string, unknown>, cb?: AlaSQLCallback<T>, scope?: unknown): T;
	}

	// abstract Syntax Tree
	interface AlaSQLAST {
		compile(databaseid: string): AlaSQLStatement;
	}

	// see https://github.com/alasql/alasql/wiki/User%20Defined%20Functions
	interface userDefinedFunction {
		(...x: unknown[]): unknown;
	}

	interface userDefinedFunctionLookUp {
		[x: string]: userDefinedFunction;
	}

	// see https://github.com/alasql/alasql/wiki/User%20Defined%20Functions
	interface userAggregator {
		(value: unknown, accumulator: unknown, stage: number): unknown;
	}

	interface userAggregatorLookUp {
		[x: string]: userAggregator;
	}

	interface userFromFunction {
		(
			dataReference: unknown,
			options: unknown,
			callback: (res: unknown) => void,
			index: unknown,
			query: unknown
		): void;
	}

	interface userFromFunctionLookUp {
		[x: string]: userFromFunction;
	}

	/**
	 * AlaSQL database object. This is a lightweight implimentation
	 *
	 * @interface database
	 */
	interface database {
		/**
		 * The database ID.
		 *
		 * @type {string}
		 * @memberof database
		 */
		databaseid: string;

		/**
		 * The collection of tables in the database.
		 *
		 * @type {tableLookUp}
		 * @memberof database
		 */
		tables: tableLookUp;
	}

	/**
	 * AlaSQL table object. This is a lightweight implimentation
	 *
	 * @interface table
	 */
	interface table {
		/**
		 * The array of data stored in the table which can be queried
		 *
		 * @type {any[]}
		 * @memberof table
		 */
		data: unknown[];
	}

	/**
	 * AlaSQL database dictionary
	 *
	 * @interface databaseLookUp
	 */
	interface databaseLookUp {
		[databaseName: string]: database;
	}

	/**
	 * AlaSQL table dictionary
	 *
	 * @interface tableLookUp
	 */
	interface tableLookUp {
		[tableName: string]: table;
	}

	interface Database {
		new (databaseid?: string): Database;
		databaseid: string;
		dbversion: number;
		tables: {[key: string]: unknown};
		views: {[key: string]: unknown};
		triggers: {[key: string]: unknown};
		indices: {[key: string]: unknown};
		objects: {[key: string]: unknown};
		counter: number;
		sqlCache: {[key: string]: unknown};
		sqlCacheSize: number;
		astCache: {[key: string]: unknown};
		resetSqlCache(): void;
		exec<T = unknown>(sql: string, params?: Record<string, unknown>, cb?: AlaSQLCallback<T>): T;
		autoval(tablename: string, colname: string, getNext: boolean): unknown;
	}

	interface AlaSQL {
		options: AlaSQLOptions;
		error: Error;
		<T = unknown>(
			sql: string,
			params?: Record<string, unknown>,
			cb?: AlaSQLCallback<T>,
			scope?: unknown
		): T;
		parse(sql: string): AlaSQLAST;
		promise<T = unknown>(sql: string, params?: Record<string, unknown>): Promise<T>;
		fn: userDefinedFunctionLookUp;
		from: userFromFunctionLookUp;
		aggr: userAggregatorLookUp;
		autoval(tablename: string, colname: string, getNext?: boolean): number;
		yy: {};
		setXLSX(xlsxlib: typeof xlsx): void;
		Database: {
			new (databaseid?: string): Database;
		};

		/**
		 * Array of databases in the AlaSQL object.
		 *
		 * @type {databaseLookUp}
		 * @memberof AlaSQL
		 */
		databases: databaseLookUp;

		/**
		 * Equivalent to alasql('USE '+databaseid). This will change the current
		 * database to the one specified. This will update the useid property and
		 * the tables property.
		 *
		 * @param {string} databaseid
		 * @memberof AlaSQL
		 */
		use(databaseid: string): void;

		/**
		 * The current database ID. If no database is selected, this is the
		 * default database ID (called alasql).
		 *
		 * @type {string}
		 * @memberof AlaSQL
		 */
		useid: string;

		/**
		 * Array of the tables in the default database (called alasql). If
		 * the database is changed via a USE statement or the use method, this
		 * becomes the tables in the new database.
		 *
		 * @type {tableLookUp}
		 * @memberof AlaSQL
		 */
		tables: tableLookUp;
	}

	const alasql: AlaSQL;

	export = alasql;
}
