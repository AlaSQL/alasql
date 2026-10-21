//
// 93sqlite.js
// SQLite database support
// (c) 2014, Andrey Gershun
//

var SQLITE = (alasql.engines.SQLITE = function () {});

function getSqlJs(cb, errorcb) {
	let sqljs = SQLITE.sqljs;
	let sqljsPromise = SQLITE.sqljsPromise;
	const globalSQL = alasql.utils.global.SQL;

	if (sqljs && sqljs.Database) {
		cb(sqljs);
		return;
	}

	if (globalSQL && globalSQL.Database) {
		SQLITE.sqljs = sqljs = globalSQL;
		cb(sqljs);
		return;
	}

	const initSqlJs = (typeof globalSQL === 'function' && globalSQL) || alasql.utils.global.initSqlJs;

	if (!initSqlJs) {
		const err = new Error('SQL.js library is not loaded');
		if (errorcb) {
			errorcb(err);
			return;
		}
		throw err;
	}

	if (!sqljsPromise) {
		const initResult = initSqlJs();
		const initPromise =
			initResult && typeof initResult.then === 'function'
				? initResult
				: Promise.resolve(initResult);
		SQLITE.sqljsPromise = sqljsPromise = initPromise
			.then(function (sqljsModule) {
				if (!sqljsModule || !sqljsModule.Database) {
					throw new Error('SQL.js library did not expose a Database constructor');
				}
				SQLITE.sqljs = sqljs = sqljsModule;
				return sqljsModule;
			})
			.catch(function (err) {
				SQLITE.sqljs = null;
				SQLITE.sqljsPromise = null;
				throw err;
			});
	}

	sqljsPromise.then(cb, errorcb);
}

SQLITE.createDatabase = function (wdbid, args, ifnotexists, dbid, cb) {
	throw new Error('Connot create SQLITE database in memory. Attach it.');
};

SQLITE.dropDatabase = function (databaseid) {
	throw new Error('This is impossible to drop SQLite database. Detach it.');
};

SQLITE.attachDatabase = function (sqldbid, dbid, args, params, cb) {
	var res = 1;
	if (alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "' + dbid + '" because it already exists');
	}

	if ((args[0] && args[0] instanceof yy.StringValue) || args[0] instanceof yy.ParamValue) {
		let value;
		if (args[0] instanceof yy.StringValue) {
			value = args[0].value;
		} else if (args[0] instanceof yy.ParamValue) {
			value = params[args[0].param];
		}
		alasql.utils.loadBinaryFile(
			value,
			true,
			function (data) {
				getSqlJs(
					function (SQL) {
						const db = new alasql.Database(dbid || sqldbid);
						db.engineid = 'SQLITE';
						db.sqldbid = sqldbid;
						const sqldb = (db.sqldb = new SQL.Database(data));
						db.tables = [];
						const tables = sqldb.exec("SELECT * FROM sqlite_master WHERE type='table'")[0].values;

						tables.forEach(function (tbl) {
							db.tables[tbl[1]] = {};
							const columns = (db.tables[tbl[1]].columns = []);
							const ast = alasql.parse(tbl[4]);
							const coldefs = ast.statements[0].columns;
							if (coldefs && coldefs.length > 0) {
								coldefs.forEach(function (cd) {
									columns.push(cd);
								});
							}
						});

						cb(1);
					},
					function (err) {
						cb(null, err);
					}
				);
			},
			function (err) {
				const fileError = new Error('Cannot open SQLite database file "' + args[0].value + '"');
				fileError.cause = err;
				cb(null, fileError);
			}
		);
		return res;
	} else {
		throw new Error('Cannot attach SQLite database without a file');
	}

	return res;
};

SQLITE.fromTable = function (databaseid, tableid, cb, idx, query) {
	var data = alasql.databases[databaseid].sqldb.exec('SELECT * FROM ' + tableid);
	var columns = (query.sources[idx].columns = []);
	if (data[0].columns.length > 0) {
		data[0].columns.forEach(function (columnid) {
			columns.push({columnid: columnid});
		});
	}

	var res = [];
	if (data[0].values.length > 0) {
		data[0].values.forEach(function (d) {
			var r = {};
			columns.forEach(function (col, idx) {
				r[col.columnid] = d[idx];
			});
			res.push(r);
		});
	}
	if (cb) cb(res, idx, query);
};

SQLITE.intoTable = function (databaseid, tableid, value, columns, cb) {
	var sqldb = alasql.databases[databaseid].sqldb;
	for (var i = 0, ilen = value.length; i < ilen; i++) {
		var s = 'INSERT INTO ' + tableid + ' (';
		var d = value[i];
		var keys = Object.keys(d);
		s += keys.join(',');
		s += ') VALUES (';
		s += keys
			.map(function (k) {
				var v = d[k];
				if (typeof v == 'string') v = "'" + v + "'";
				return v;
			})
			.join(',');
		s += ')';
		sqldb.exec(s);
	}
	var res = ilen;
	if (cb) cb(res);
	return res;
};
