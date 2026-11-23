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
	var ast = alasqlparser.parse(alasql.utils.uncomment(sql));
	checkSqlNames(ast);
	return ast;
};

/*
  A name from the SQL text is pasted into generated code between single quotes, so a name that
  holds a quote, a backslash or a line break would end the string and make the rest code
  (GHSA-67vj-hh8j-j94f). Such a name is refused here, once, after parsing. A name is a table,
  column, database, view, index, trigger or CTE name, a variable (and the keys of its path) and a
  table alias. The alias of a column in the select list is not a name: it is a key of the result,
  and the code that writes it escapes it. Strings, numbers, parameters, JavaScript and the keys
  of a JSON value are data, not names.
 */
var checkSqlNames = (function () {
	var hasOwn = Object.prototype.hasOwnProperty;
	var badName = /['\\\n\r\u2028\u2029]/;
	var nameKeys = {
		as: 1,
		columnid: 1,
		tableid: 1,
		databaseid: 1,
		viewid: 1,
		indexid: 1,
		trigger: 1,
		variable: 1,
		dropcolumn: 1,
		renamecolumn: 1,
		renameto: 1,
		to: 1,
		tocolumnid: 1,
		forcolumnid: 1,
	};
	var nameListKeys = {columns: 1, fkcolumns: 1, props: 1};

	function checkName(name) {
		if (badName.test(name)) throw new SyntaxError('Not a valid name: ' + name);
	}

	// ORDER BY: a name that equals an alias of the select list is that alias and is allowed (the code
	// escapes it), anything else is checked. (In this version a string in ORDER BY is a constant.)
	function checkOrder(columns, order) {
		var aliases = {};
		(columns || []).forEach(function (col) {
			if (col && typeof col.as === 'string') aliases[col.as] = true;
		});
		order.forEach(function (ord) {
			var e = ord && ord.expression;
			var name;
			if (e instanceof alasql.yy.Column && !e.tableid) name = e.columnid;
			if (typeof name === 'string') {
				if (!hasOwn.call(aliases, name)) checkName(name);
				return;
			}
			checkNames(ord, false, false);
		});
	}

	// The alias of an entry of the select list, of SEARCH RETURNS and of CREATE GRAPH is a key of
	// the result or a variable and is allowed. The name of an entry of WITH is a table name; in a
	// graph item, name is data.
	function entryOf(node, key) {
		var yy = alasql.yy;
		if (
			(node instanceof yy.Select && key === 'columns') ||
			(node instanceof yy.CreateGraph && key === 'graph') ||
			(node.srchid === 'RETURN' && key === 'args')
		)
			return 'alias';
		if (node instanceof yy.WithSelect && key === 'withs') return 'with';
		return '';
	}

	// Names that never reach generated code: they are used only at run time, as the key of a
	// database, a table, an index, a trigger or a variable, so the walk leaves them alone and such a
	// name keeps working. freeKeys are names of the node itself, freeChild are children whose own
	// names are free (what they hold is still walked), and skipChild are children that are not
	// walked at all (PIVOT and UNPIVOT work on the result and build no code).
	var varValueFree = true;
	var intoVarFree = true;
	var freeKeys = [
		['CreateIndex', {indexid: 1}],
		['DropIndex', {indexid: 1}],
		['Reindex', {indexid: 1}],
		['CreateTrigger', {trigger: 1}],
		['DropTrigger', {trigger: 1}],
		['CreateDatabase', {databaseid: 1, as: 1}],
		['AttachDatabase', {databaseid: 1, as: 1}],
		['DetachDatabase', {databaseid: 1}],
		['DropDatabase', {databaseid: 1}],
		['ShowTables', {databaseid: 1}],
		['ShowColumns', {databaseid: 1}],
		['ShowIndex', {databaseid: 1}],
		['ShowCreateTable', {databaseid: 1}],
		['AlterTable', {renameto: 1, renamecolumn: 1, dropcolumn: 1}],
	];
	var freeChild = [
		['CreateTable', {table: 1}],
		['DropTable', {tables: 1}],
		['TruncateTable', {table: 1}],
		['AlterTable', {table: 1}],
		['ShowColumns', {table: 1}],
		['ShowIndex', {table: 1}],
		['ShowCreateTable', {table: 1}],
		['CreateIndex', {table: 1}],
		['CreateTrigger', {table: 1}],
		['Declare', {declares: 1}],
	];
	var skipChild = [['Select', {pivot: 1, unpivot: 1}]];

	function freeOf(list, node) {
		var yy = alasql.yy;
		for (var i = 0; i < list.length; i++) {
			var cls = yy[list[i][0]];
			if (cls && node instanceof cls) return list[i][1];
		}
		return null;
	}

	// An @variable: an expression pastes it escaped where varValueFree is true, FROM @x pastes it
	// raw, and SELECT INTO @x pastes it raw where intoVarFree is false.
	function freeVar(node, key, entry) {
		var yy = alasql.yy;
		if (key !== 'variable' || !(node instanceof yy.VarValue)) return false;
		if (entry === 'source') return false;
		if (entry === 'into') return intoVarFree;
		return varValueFree;
	}

	// SET @x = value without a path is a run-time assignment; with a path the name is pasted
	function freeSet(node, key) {
		var yy = alasql.yy;
		return (
			key === 'variable' &&
			yy.SetVariable &&
			node instanceof yy.SetVariable &&
			!(node.props && node.props.length)
		);
	}

	// data is true inside a JSON value, where a plain object is data and only a node is looked at.
	// entry is what entryOf says about the node as an entry of its parent, or 'free' when its own
	// names never reach generated code.
	function checkNames(node, data, entry) {
		if (node === null || typeof node !== 'object') return;
		var i;
		if (Array.isArray(node)) {
			for (i = 0; i < node.length; i++) checkNames(node[i], data, false);
			return;
		}
		var isNode = Object.getPrototypeOf(node) !== Object.prototype;
		if (data && !isNode) {
			for (i in node) if (hasOwn.call(node, i)) checkNames(node[i], true, false);
			return;
		}
		var yy = alasql.yy;
		if (node instanceof yy.Json) {
			checkNames(node.value, true, false);
			return;
		}
		var fk = freeOf(freeKeys, node);
		var fc = freeOf(freeChild, node);
		var sc = freeOf(skipChild, node);
		for (var key in node) {
			if (!hasOwn.call(node, key)) continue;
			var value = node[key];
			if (sc && sc[key] === 1) continue;
			if (key === 'order' && node instanceof yy.Select && Array.isArray(value)) {
				checkOrder(node.columns, value);
				continue;
			}
			// the column list of a WITH entry renames the result at run time
			var child = (fc && fc[key] === 1) || (entry === 'with' && key === 'columns') ? 'free' : '';
			if (!child && node instanceof yy.Select)
				child = key === 'from' ? 'source' : key === 'into' ? 'into' : '';
			if (typeof value === 'string') {
				if (
					entry === 'free' ||
					(fk && fk[key] === 1) ||
					freeSet(node, key) ||
					freeVar(node, key, entry)
				)
					continue;
				if (
					key === 'name'
						? entry === 'with'
						: nameKeys[key] === 1 && !(entry === 'alias' && key === 'as')
				)
					checkName(value);
			} else if (value !== null && typeof value === 'object') {
				if (Array.isArray(value)) {
					for (i = 0; i < value.length; i++) {
						if (typeof value[i] === 'string') {
							if (nameListKeys[key] === 1 && entry !== 'free' && child !== 'free')
								checkName(value[i]);
						} else {
							checkNames(value[i], false, child || entryOf(node, key));
						}
					}
				} else {
					checkNames(value, false, child);
				}
			}
		}
	}

	return function (ast) {
		checkNames(ast, false, false);
	};
})();

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
	Schema version of all databases. Every schema change in any database increases it, so
	cached statements, statements from alasql.compile() and views are compiled again
	@type {number}
*/
alasql.schemaVersion = 0;

/**
	Record a schema change. All compiled code (the statement cache of every database, statements
	from alasql.compile() and views) is compiled again on its next use. db.dbversion is still
	increased for the database that changed, as user code reads and increases it too.
	@param {object} [db] The database that changed, if it still exists
*/
function schemaChanged(db) {
	if (db) db.dbversion++;
	alasql.schemaVersion++;
}

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

	/** Maximum iterations for recursive CTEs to prevent infinite loops */
	maxCteIterations: 1000,

	/** Whether GETDATE() and NOW() return dates as string. If false, then a Date object is returned */
	dateAsString: true,

	/** Automatically convert string values to numbers when reading from CSV files. Set to false to preserve string types */
	csvStringToNumber: true,
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
 * Clears any unneeded properties from a given AST statement closure used for caching
 * @param {Object} statement the statement to cleanup
 */
// Run a compiled statement and mark it as running until it has finished, also when it
// finishes later through the callback. The cached result data is cleaned up then.
function runStatement(statement, params, cb, scope) {
	statement.running = (statement.running || 0) + 1;
	var finished = false;
	var finish = function () {
		if (!finished) {
			finished = true;
			statement.running--;
			cleanupCache(statement);
		}
	};
	var done = cb
		? function (res, err) {
				finish();
				return cb(res, err);
			}
		: cb;
	try {
		return statement(params, done, scope);
	} catch (err) {
		finish();
		throw err;
	} finally {
		if (!cb) {
			finish();
		}
	}
}

function cleanupCache(statement) {
	if (!statement) {
		return;
	}
	if (!alasql.options.cache) {
		return;
	}
	// cleanup the table data to prevent storing this information in the SQL cache
	if (statement && statement.query && statement.query.data) {
		statement.query.data = [];
	}
}

/**
 Run SQL statement on specific database
 */
alasql.dexec = function (databaseid, sql, params, cb, scope) {
	var db = alasql.databases[databaseid];
	//	if(db.databaseid != databaseid) console.trace('got!');
	//	console.log(3,db.databaseid,databaseid);

	// Include joinstar option in cache key because it affects how SELECT * compiles
	// Without this, changing joinstar would use stale cached queries compiled with old option
	// The key is the text itself, a hash of it can collide and return another query's statement
	var hh = sql + '|joinstar:' + alasql.options.joinstar;

	// Create hash
	if (alasql.options.cache) {
		let statement = db.sqlCache[hh];
		// If database structure was not changed since last time return cache
		if (
			statement &&
			db.dbversion === statement.dbversion &&
			statement.schemaVersion === alasql.schemaVersion
		) {
			// A compiled statement keeps the state of one run. While a run of it is still
			// going (a nested call or an unfinished asynchronous run), this call compiles
			// its own copy instead of sharing it (#1953)
			if (!statement.running) {
				return runStatement(statement, params, cb);
			}
			var inUse = true;
		}
	}

	let ast = inUse ? undefined : db.astCache[hh];
	if (inUse) {
		ast = alasql.parse(sql);
	} else if (alasql.options.cache && !ast) {
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
			statement.schemaVersion = alasql.schemaVersion;

			if (alasql.options.cache && !inUse) {
				// Secure sqlCache size
				if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
					db.resetSqlCache();
				}
				db.sqlCacheSize++;
				db.sqlCache[hh] = statement;
			}
			return (alasql.res = runStatement(statement, params, cb, scope));
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

	var compiled = ast.statements[0].compile(databaseid);
	var schemaVersion = alasql.schemaVersion;

	// Compile again when the schema of any database changed since the last compile
	var statement = function (params, cb) {
		if (schemaVersion !== alasql.schemaVersion) {
			compiled = ast.statements[0].compile(databaseid);
			schemaVersion = alasql.schemaVersion;
			Object.assign(statement, compiled);
		}
		// While a run of this statement is still going (a nested call or an unfinished
		// asynchronous run), this call gets its own copy, as in alasql.dexec (#1953, #2596)
		if (compiled.running) {
			return runStatement(alasql.parse(sql).statements[0].compile(databaseid), params, cb);
		}
		return runStatement(compiled, params, cb);
	};
	// Keep the properties of the compiled statement on the returned function, also after a recompile
	Object.assign(statement, compiled);

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
