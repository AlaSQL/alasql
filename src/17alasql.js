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
alasql.options = {};
alasql.options.errorlog = false; // Log or throw error
alasql.options.valueof = false; // Use valueof in orderfn
alasql.options.dropifnotexists = false; // DROP database in any case
alasql.options.datetimeformat = 'sql'; // How to handle DATE and DATETIME types
// Another value is 'javascript'
alasql.options.casesensitive = true; // Table and column names are case sensitive and converted to lower-case
alasql.options.logtarget = 'output'; // target for log. Values: 'console', 'output', 'id' of html tag
alasql.options.logprompt = true; // Print SQL at log

alasql.options.progress = false; // Callback for async queries progress

// Default modifier
// values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
alasql.options.modifier = undefined;
// How many rows to lookup to define columns
alasql.options.columnlookup = 10;
// Create vertex if not found
alasql.options.autovertex = true;

// Use dbo as current database (for partial T-SQL comaptibility)
alasql.options.usedbo = true;

// AUTOCOMMIT ON | OFF
alasql.options.autocommit = true;

// Use cache
alasql.options.cache = true;

// Compatibility flags
alasql.options.tsql = true;

alasql.options.mysql = true;

alasql.options.postgres = true;

alasql.options.oracle = true;

alasql.options.sqlite = true;

alasql.options.orientdb = true;

// for SET NOCOUNT OFF
alasql.options.nocount = false;

// Check for NaN and convert it to undefined
alasql.options.nan = false;

alasql.options.joinstar = 'overwrite'; // Option for SELECT * FROM a,b

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
		var db = alasql.databases[alasql.useid];
		alasql.tables = db.tables;
		//	alasql.fn = db.fn;
		db.resetSqlCache();
		if (alasql.options.usedbo) {
			alasql.databases.dbo = db; // Operator???
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

	var hh;
	// Create hash
	if (alasql.options.cache) {
		hh = hash(sql);
		var statement = db.sqlCache[hh];
		// If database structure was not changed since last time return cache
		if (statement && db.dbversion === statement.dbversion) {
			return statement(params, cb);
		}
	}

	// Create AST
	var ast = alasql.parse(sql);
	if (!ast.statements) {
		return;
	}
	if (0 === ast.statements.length) {
		return 0;
	} else if (1 === ast.statements.length) {
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
		} else {
			//			console.log(ast.statements[0]);
			alasql.precompile(ast.statements[0], alasql.useid, params);
			var res = (alasql.res = ast.statements[0].execute(databaseid, params, cb, scope));
			return res;
		}
	} else {
		// Multiple statements
		if (cb) {
			alasql.adrun(databaseid, ast, params, cb, scope);
		} else {
			return alasql.drun(databaseid, ast, params, cb, scope);
		}
	}
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
			//			alasql.busy--;
			//			if(alasql.busy<0) alasql.busy = 0;
		} else {
			if (astatement.compile) {
				var statement = astatement.compile(alasql.useid);
				statement(params, adrunone, scope);
				if (alasql.options.progress !== false) {
					alasql.options.progress(noqueries, idx++);
				}
			} else {
				alasql.precompile(ast.statements[0], alasql.useid, params);
				astatement.execute(alasql.useid, params, adrunone);
				if (alasql.options.progress !== false) {
					alasql.options.progress(noqueries, idx++);
				}
			}
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

	var ast = alasql.parse(sql); // Create AST

	if (1 === ast.statements.length) {
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
		/*/*
		if(kind == 'value') {
			return function(params,cb) {
				var res = statementfn(params);
				var key = Object.keys(res[0])[0];
				if(cb) cb(res[0][key]);
				return res[0][key];
			};
		} else  if(kind == 'single') {
			return function(params,cb) {
				var res = statementfn(params);
				if(cb) cb(res[0]);
				return res[0];
			}
		} else  if(kind == 'row') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				var a = [];
				for(var key in res[0]) {
					a.push(res[0][key]);
				};
				if(cb) cb(a);
				return a;
			}
		} else  if(kind == 'column') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				var ar = [];
				var key = Object.keys(res)[0];
				for(var i=0, ilen=res.length; i<ilen; i++){
					ar.push(res[i][key]);
				}
				if(cb) cb(ar);
				return ar;
			}
		} else if(kind == 'array') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				res = flatArray(res);
				if(cb) cb(res);
				return res;
			};
		} else if(kind == 'matrix') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				res = arrayOfArrays(res);
				if(cb) cb(res);
				return res;
			};
		} else if(kind == 'collection') {
			return statementfn;
		} else {
			return statementfn;
		}
*/
	} else {
		throw new Error('Cannot compile, because number of statements in SQL is not equal to 1');
	}
};

/*/*
// // Default methods to exec SQL statements
// alasql.run = alasql.exec = function (sql, params, cb) {
// 	return this.currentDatabase.exec(sql, params, cb);
// };

// Promised version of exec
// alasql.aexec = function (sql, params) {
// 	var self = this;
// 	return new Promise(function(resolve, reject){
// 		self.exec(sql,params,resolve);
// 	});
// };
*/

/*/*
// MSSQL-Like aliases
alasql.query = function (sql, params, cb) {
	var res = this.exec(sql, params);
	if(cb) cb(res);
	return res;
};

alasql.queryArray = function (sql, params, cb) {
	var res = flatArray(this.exec(sql, params));
	if(cb) cb(res);
	return res;
};

alasql.querySingle = function (sql, params, cb) {
	var res = this.exec(sql, params)[0];
	if(cb) cb(res);
	return res;
};

alasql.queryRow = function (sql, params, cb) {
	var res = this.querySingle(sql, params);
	var a = [];
	for(var key in res) {
		a.push(res[key]);
	};
	if(cb) cb(a);
	return a;
};

alasql.queryValue = function (sql, params, cb) {
	var res = this.exec(sql, params)[0];
	var val = res[Object.keys(res)[0]];
	if(cb) cb(val);
	return val;
	// TODO Refactor to query.columns
};

alasql.queryArrayOfArrays = function (sql, params, cb) {
	var res = this.exec(sql, params);
	var keys = Object.keys(res[0]);
	var klen = keys.length;
	var aa = [];
	for(var i=0, ilen=res.length;i<ilen;i++) {
		var r = res[i];
		var a = [];
		for(var k=0; k<klen;k++){
			a.push(r[keys[k]]);
		}
		aa.push(a);
	}

	if(cb) cb(aa);
	return aa;
};
*/
/*/*alasql.queryColumn = function (sql, params, cb) {
	var res = this.exec(sql, params);
	var keys = Object.keys(res[0]);
	var klen = keys.length;
	var aa = [];
	for(var i=0, ilen=res.length;i<ilen;i++) {
		var r = res[i];
		var a = [];
		for(var k=0; k<klen;k++){
			a.push(r[keys[k]]);
		}
		aa.push(a);
	}

	if(cb) cb(aa);
	return aa;
};
*/
/*/*
alasql.value = alasql.queryValue;
alasql.single = alasql.querySingle;
alasql.row = alasql.queryRow;
alasql.column = alasql.queryArray;
alasql.array = alasql.queryArray;
alasql.matrix = alasql.queryArrayOfArrays;
*/
