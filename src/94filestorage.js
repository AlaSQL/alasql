//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

var FS = (alasql.engines.FILESTORAGE = alasql.engines.FILE = function () {});

FS.createDatabase = function (fsdbid, args, ifnotexists, dbid, cb) {
	var res = 1;
	var filename = args[0].value;
	alasql.utils.fileExists(filename, function (fex) {
		if (fex) {
			if (ifnotexists) {
				res = 0;
				if (cb) res = cb(res);
				return res;
			} else {
				throw new Error('Cannot create new database file, because it already exists');
			}
		} else {
			var data = {tables: {}};
			alasql.utils.saveFile(filename, JSON.stringify(data), function (data) {
				if (cb) res = cb(res);
			});
		}
	});
	return res;
};

FS.dropDatabase = function (fsdbid, ifexists, cb) {
	var res;
	var filename = '';

	if (typeof fsdbid === 'object' && fsdbid.value) {
		// Existing tests (test225.js) had DROP directly without DETACH and
		// without a database id / name. It instead used the filename directly.
		// This block will handle that
		filename = fsdbid.value;
	} else {
		// When a database id / name is specified in DROP, it will be handled by this block.
		// Note: Both DETACH + DROP and direct DROP without DETACH will be handled by this block
		// We will be deleting the database object and the file either way.
		// However, in the future, if we would like to have a stricter implementation
		// where we cannot DROP without DETACHing it first, we can handle that case using
		// the 'isDetached' property of the database object.
		// (i.e) alasql.databases[fsdbid].isDetached will be set if it is
		// has been detached first
		var db = alasql.databases[fsdbid] || {};

		filename = db.filename || '';
		delete alasql.databases[fsdbid];
	}
	alasql.utils.fileExists(filename, function (fex) {
		if (fex) {
			res = 1;
			alasql.utils.deleteFile(filename, function () {
				res = 1;
				if (cb) res = cb(res);
			});
		} else {
			if (!ifexists) {
				throw new Error('Cannot drop database file, because it does not exist');
			}
			res = 0;
			if (cb) res = cb(res);
		}
	});
	return res;
};

FS.attachDatabase = function (fsdbid, dbid, args, params, cb) {
	var res = 1;
	if (alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "' + dbid + '" because it already exists');
	}
	var db = new alasql.Database(dbid || fsdbid);
	db.engineid = 'FILESTORAGE';
	db.filename = args[0].value;
	loadFile(db.filename, !!cb, function (s) {
		try {
			db.data = JSON.parse(s);
		} catch (err) {
			throw new Error('Data in FileStorage database are corrupted');
		}
		db.tables = db.data.tables;
		// IF AUTOCOMMIT IS OFF then copy data to memory
		if (!alasql.options.autocommit) {
			if (db.tables) {
				for (var tbid in db.tables) {
					db.tables[tbid].data = db.data[tbid];
				}
			}
		}
		if (cb) res = cb(res);
	});
	return res;
};

FS.createTable = function (databaseid, tableid, ifnotexists, cb) {
	var db = alasql.databases[databaseid];
	var tb = db.data[tableid];
	var res = 1;

	if (tb && !ifnotexists) {
		throw new Error('Table "' + tableid + '" alsready exists in the database "' + fsdbid + '"');
	}
	var table = alasql.databases[databaseid].tables[tableid];
	db.data.tables[tableid] = {columns: table.columns};
	db.data[tableid] = [];

	FS.updateFile(databaseid);

	if (cb) cb(res);
	return res;
};

FS.updateFile = function (databaseid) {
	var db = alasql.databases[databaseid];
	if (db.issaving) {
		db.postsave = true;
		return;
	}
	db.issaving = true;
	db.postsave = false;
	alasql.utils.saveFile(db.filename, JSON.stringify(db.data), function () {
		db.issaving = false;

		if (db.postsave) {
			setTimeout(function () {
				FS.updateFile(databaseid);
			}, 50); // TODO Test with different timeout parameters
		}
	});
};

FS.dropTable = function (databaseid, tableid, ifexists, cb) {
	var res = 1;
	var db = alasql.databases[databaseid];
	if (!ifexists && !db.tables[tableid]) {
		throw new Error(
			'Cannot drop table "' + tableid + '" in fileStorage, because it does not exist'
		);
	}
	delete db.tables[tableid];
	delete db.data.tables[tableid];
	delete db.data[tableid];
	FS.updateFile(databaseid);
	if (cb) cb(res);
	return res;
};

FS.fromTable = function (databaseid, tableid, cb, idx, query) {
	var db = alasql.databases[databaseid];
	var res = db.data[tableid];
	if (cb) res = cb(res, idx, query);
	return res;
};

FS.intoTable = function (databaseid, tableid, value, columns, cb) {
	var db = alasql.databases[databaseid];
	var res = value.length;
	var tb = db.data[tableid];
	if (!tb) tb = [];
	db.data[tableid] = tb.concat(value);
	FS.updateFile(databaseid);
	if (cb) cb(res);
	return res;
};

FS.loadTableData = function (databaseid, tableid) {
	var db = alasql.databases[databaseid];
	db.tables[tableid].data = db.data[tableid];
};

FS.saveTableData = function (databaseid, tableid) {
	var db = alasql.databases[databaseid];
	db.data[tableid] = db.tables[tableid].data;
	db.tables[tableid].data = null;
	FS.updateFile(databaseid);
};

FS.commit = function (databaseid, cb) {
	var db = alasql.databases[databaseid];
	var fsdb = {tables: {}};
	if (db.tables) {
		for (var tbid in db.tables) {
			db.data.tables[tbid] = {columns: db.tables[tbid].columns};
			db.data[tbid] = db.tables[tbid].data;
		}
	}
	FS.updateFile(databaseid);
	return cb ? cb(1) : 1;
};

FS.begin = FS.commit;

FS.rollback = function (databaseid, cb) {
	var res = 1;
	var db = alasql.databases[databaseid];
	db.dbversion++;
	wait();
	function wait() {
		setTimeout(function () {
			if (db.issaving) {
				return wait();
			} else {
				alasql.loadFile(db.filename, !!cb, function (data) {
					db.data = data;
					db.tables = {};
					for (var tbid in db.data.tables) {
						var tb = new alasql.Table({columns: db.data.tables[tbid].columns});
						extend(tb, db.data.tables[tbid]);
						db.tables[tbid] = tb;
						if (!alasql.options.autocommit) {
							db.tables[tbid].data = db.data[tbid];
						}
						db.tables[tbid].indexColumns();
					}

					delete alasql.databases[databaseid];
					alasql.databases[databaseid] = new alasql.Database(databaseid);
					extend(alasql.databases[databaseid], db);
					alasql.databases[databaseid].engineid = 'FILESTORAGE';
					alasql.databases[databaseid].filename = db.filename;

					if (cb) res = cb(res);
					// Todo: check why no return
				});
			}
		}, 100);
	}
};
