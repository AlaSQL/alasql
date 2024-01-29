/**
	Database class for Alasql.js
*/

// Initial parameters

/**
	Jison parser
*/
alasql.parser = alasqlparser;

/*/* This is not working :-/ */
alasql.parser.parseError = function (str, hash) {
	throw new Error('Have you used a reserved keyword without `escaping` it?\n' + str);
};

/**
	  Jison parser
	  @param {string} sql SQL statement
	  @return {object} AST (Abstract Syntax Tree)

	  @todo Create class AST
	  @todo Add other parsers

	  @example
	  alasql.parse = function(sql) {
		// My own parser here
	  }
 */
alasql.parse = function (sql) {
	return alasqlparser.parse(alasql.utils.uncomment(sql));
};

/**
	  List of engines of external databases
	  @type {object}
	  @todo Create collection type
 */
alasql.engines = {};

/**
	  List of databases
	  @type {object}
 */
alasql.databases = {};

/**
	Number of databases
	@type {number}
*/
alasql.databasenum = 0;

/**
	  Alasql options object
 */
alasql.options = {
	/** Log or throw error */
	errorlog: false,

	/** Use valueof in orderfn */
	valueof: true,

	/** DROP database in any case */
	dropifnotexists: false,

	/** How to handle DATE and DATETIME types */
	datetimeformat: 'sql',

	/** Table and column names are case sensitive and converted to lower-case */
	casesensitive: true,

	/** target for log. Values: 'console', 'output', 'id' of html tag */
	logtarget: 'output',

	/** Print SQL at log */
	logprompt: true,

	/** Callback for async queries progress */
	progress: false,

	/**
	 * Default modifier
	 * values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
	 * @type {'RECORDSET'|'VALUE'|'ROW'|'COLUMN'|'MATRIX'|'TEXTSTRING'|'INDEX'|undefined}
	 */
	modifier: undefined,

	/** How many rows to lookup to define columns */
	columnlookup: 10,

	/** Create vertex if not found */
	autovertex: true,

	/** Use dbo as current database (for partial T-SQL comaptibility) */
	usedbo: true,

	/** AUTOCOMMIT ON | OFF */
	autocommit: true,

	/** Use cache */
	cache: true,

	/** Compatibility flags */
	tsql: true,

	mysql: true,

	postgres: true,

	oracle: true,

	sqlite: true,

	orientdb: true,

	/** for SET NOCOUNT OFF */
	nocount: false,

	/** Check for NaN and convert it to undefined */
	nan: false,

	excel: {cellDates: true},

	/** Option for SELECT * FROM a,b */
	joinstar: 'overwrite',

	loopbreak: 100000,

	/** Whether GETDATE() and NOW() return dates as string. If false, then a Date object is returned */
	dateAsString: true,
};

//alasql.options.worker = false;

// Variables
alasql.vars = {};

alasql.declares = {};

alasql.prompthistory = [];

alasql.plugins = {}; // If plugin already loaded

alasql.from = {}; // FROM functions

alasql.into = {}; // INTO functions

alasql.fn = {};

alasql.aggr = {};

alasql.busy = 0;

// Cache
alasql.MAXSQLCACHESIZE = 10000;
alasql.DEFAULTDATABASEID = 'alasql';

/* WebWorker */
alasql.lastid = 0;

alasql.buffer = {};

alasql.private = {
	externalXlsxLib: null,
};

alasql.setXLSX = function (XLSX) {
	alasql.private.externalXlsxLib = XLSX;
};

/**
  Select current database
  @param {string} databaseid Selected database identificator
 */
alasql.use = function (databaseid) {
	if (!databaseid) {
		databaseid = alasql.DEFAULTDATABASEID;
	}

	if (alasql.useid === databaseid) {
		return;
	}

	if (alasql.databases[databaseid] !== undefined) {
		alasql.useid = databaseid;
		let db = alasql.databases[alasql.useid];
		alasql.tables = db.tables;
		db.resetSqlCache();
		if (alasql.options.usedbo) {
			alasql.databases.dbo = db;
		}
	} else {
		throw Error('Database does not exist: ' + databaseid);
	}
};

alasql.autoval = function (tablename, colname, getNext, databaseid) {
	var db = databaseid ? alasql.databases[databaseid] : alasql.databases[alasql.useid];

	if (!db.tables[tablename]) {
		throw new Error('Tablename not found: ' + tablename);
	}

	if (!db.tables[tablename].identities[colname]) {
		throw new Error('Colname not found: ' + colname);
	}

	if (getNext) {
		return db.tables[tablename].identities[colname].value || null;
	}

	return (
		db.tables[tablename].identities[colname].value -
			db.tables[tablename].identities[colname].step || null
	);
};

/**
 Run single SQL statement on current database
 */
alasql.exec = function (sql, params, cb, scope) {
	// Avoid setting params if not needed even with callback
	if (typeof params === 'function') {
		scope = cb;
		cb = params;
		params = {};
	}

	delete alasql.error;

	params = params || {};

	if (alasql.options.errorlog) {
		try {
			return alasql.dexec(alasql.useid, sql, params, cb, scope);
		} catch (err) {
			alasql.error = err;
			if (cb) {
				cb(null, alasql.error);
			}
		}
	} else {
		return alasql.dexec(alasql.useid, sql, params, cb, scope);
	}
};

/**
 Run SQL statement on specific database
 */
alasql.dexec = function (databaseid, sql, params, cb, scope) {
	var db = alasql.databases[databaseid];
	//	if(db.databaseid != databaseid) console.trace('got!');
	//	console.log(3,db.databaseid,databaseid);

	var hh = hash(sql);

	// Create hash
	if (alasql.options.cache) {
		let statement = db.sqlCache[hh];
		// If database structure was not changed since last time return cache
		if (statement && db.dbversion === statement.dbversion) {
			return statement(params, cb);
		}
	}

	let ast = db.astCache[hh];
	if (alasql.options.cache && !ast) {
		// Create AST cache
		ast = alasql.parse(sql);
		if (ast) {
			// add to AST cache
			db.astCache[hh] = ast;
		}
	} else {
		ast = alasql.parse(sql);
	}

	if (!ast.statements) {
		return;
	}

	if (0 === ast.statements.length) {
		return 0;
	}

	if (1 === ast.statements.length) {
		if (ast.statements[0].compile) {
			// Compile and Execute
			var statement = ast.statements[0].compile(databaseid, params);
			if (!statement) {
				return;
			}
			statement.sql = sql;
			statement.dbversion = db.dbversion;

			if (alasql.options.cache) {
				// Secure sqlCache size
				if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
					db.resetSqlCache();
				}
				db.sqlCacheSize++;
				db.sqlCache[hh] = statement;
			}
			var res = (alasql.res = statement(params, cb, scope));
			return res;
		}
		alasql.precompile(ast.statements[0], alasql.useid, params);
		var res = (alasql.res = ast.statements[0].execute(databaseid, params, cb, scope));
		return res;
	}

	if (cb) {
		alasql.adrun(databaseid, ast, params, cb, scope);
		return;
	}

	return alasql.drun(databaseid, ast, params, cb, scope);
};

/**
  Run multiple statements and return array of results sync
 */
alasql.drun = function (databaseid, ast, params, cb, scope) {
	var useid = alasql.useid;

	if (useid !== databaseid) {
		alasql.use(databaseid);
	}

	var res = [];
	for (var i = 0, ilen = ast.statements.length; i < ilen; i++) {
		if (ast.statements[i]) {
			if (ast.statements[i].compile) {
				var statement = ast.statements[i].compile(alasql.useid);
				res.push((alasql.res = statement(params, null, scope)));
			} else {
				alasql.precompile(ast.statements[i], alasql.useid, params);
				res.push((alasql.res = ast.statements[i].execute(alasql.useid, params)));
			}
		}
	}
	if (useid !== databaseid) {
		alasql.use(useid);
	}

	if (cb) {
		cb(res);
	}

	alasql.res = res;

	return res;
};

/**
  Run multiple statements and return array of results async
 */
alasql.adrun = function (databaseid, ast, params, cb, scope) {
	var idx = 0;
	var noqueries = ast.statements.length;
	if (alasql.options.progress !== false) {
		alasql.options.progress(noqueries, idx++);
	}

	//	alasql.busy++;
	var useid = alasql.useid;
	if (useid !== databaseid) {
		alasql.use(databaseid);
	}
	var res = [];

	function adrunone(data) {
		if (data !== undefined) {
			res.push(data);
		}

		var astatement = ast.statements.shift();
		if (!astatement) {
			if (useid !== databaseid) {
				alasql.use(useid);
			}
			cb(res);
			return;
		}

		if (astatement.compile) {
			var statement = astatement.compile(alasql.useid);
			statement(params, adrunone, scope);
			if (alasql.options.progress !== false) {
				alasql.options.progress(noqueries, idx++);
			}
			return;
		}

		alasql.precompile(ast.statements[0], alasql.useid, params);
		astatement.execute(alasql.useid, params, adrunone);

		if (alasql.options.progress !== false) {
			alasql.options.progress(noqueries, idx++);
		}
	}

	adrunone(); /** @todo Check, why data is empty here */
};

/**
 Compile statement to JavaScript function
 @param {string} sql SQL statement
 @param {string} databaseid Database identificator
 @return {functions} Compiled statement functions
*/
alasql.compile = function (sql, databaseid) {
	databaseid = databaseid || alasql.useid;

	let ast = alasql.parse(sql); // Create AST

	if (1 !== ast.statements.length)
		throw new Error('Cannot compile, because number of statements in SQL is not equal to 1');

	var statement = ast.statements[0].compile(databaseid);

	statement.promise = function (params) {
		return new Promise(function (resolve, reject) {
			statement(params, function (data, err) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	};

	return statement;
};
