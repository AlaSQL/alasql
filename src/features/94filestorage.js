//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

var FS = (alasql.engines.FILESTORAGE = alasql.engines.FILE = function() {});

/*/*
FS.get = function(key) {
	var s = localStorage.getItem(key);
	if(typeof s == "undefined") return;
	var v = undefined;
	try {
		v = JSON.parse(s); 
	} catch(err) {
		throw new Error('Cannot parse JSON '+s);
	}
	return v;
};

LS.set = function(key, value){
	if(typeof value == 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key,JSON.stringify(value)); 
}
*/

FS.createDatabase = function(fsdbid, args, ifnotexists, dbid, cb) {
	//	console.log(arguments);
	var res = 1;
	var filename = args[0].value;
	//	console.log('filename',filename);
	alasql.utils.fileExists(filename, function(fex) {
		// console.log('fex:',arguments);
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
			alasql.utils.saveFile(filename, JSON.stringify(data), function(data) {
				if (cb) res = cb(res);
			});
		}
	});
	return res;
};

FS.dropDatabase = function(fsdbid, ifexists, cb) {
	var res;
	var filename = fsdbid.value;
	//	console.log('filename',filename);
	alasql.utils.fileExists(filename, function(fex) {
		if (fex) {
			res = 1;
			alasql.utils.deleteFile(filename, function() {
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

FS.attachDatabase = function(fsdbid, dbid, args, params, cb) {
	//	console.log(arguments);
	var res = 1;
	if (alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "' + dbid + '" because it already exists');
	}
	var db = new alasql.Database(dbid || fsdbid);
	db.engineid = 'FILESTORAGE';
	//	db.fsdbid = fsdbid;
	db.filename = args[0].value;
	loadFile(db.filename, !!cb, function(s) {
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

/*/*
FS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(like) {
		var relike = new RegExp(like.value.replace(/\%/g,'.*'),'g');
	}
	if(ls && ls.databases) {
		for(var dbid in ls.databases) {
			res.push({databaseid: dbid});
		};
		if(like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(relike);
			});
		}		
	};
	if(cb) cb(res);
	return res;
};
*/

FS.createTable = function(databaseid, tableid, ifnotexists, cb) {
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

FS.updateFile = function(databaseid) {
	//	console.log('update start');
	var db = alasql.databases[databaseid];
	if (db.issaving) {
		db.postsave = true;
		return;
	}
	db.issaving = true;
	db.postsave = false;
	alasql.utils.saveFile(db.filename, JSON.stringify(db.data), function() {
		db.issaving = false;
		//		console.log('update finish');

		if (db.postsave) {
			setTimeout(function() {
				FS.updateFile(databaseid);
			}, 50); // TODO Test with different timeout parameters
		}
	});
};

FS.dropTable = function(databaseid, tableid, ifexists, cb) {
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

FS.fromTable = function(databaseid, tableid, cb, idx, query) {
	//	console.log(998, databaseid, tableid, cb);
	var db = alasql.databases[databaseid];
	var res = db.data[tableid];
	if (cb) res = cb(res, idx, query);
	return res;
};

FS.intoTable = function(databaseid, tableid, value, columns, cb) {
	var db = alasql.databases[databaseid];
	var res = value.length;
	var tb = db.data[tableid];
	if (!tb) tb = [];
	db.data[tableid] = tb.concat(value);
	FS.updateFile(databaseid);
	if (cb) cb(res);
	return res;
};

FS.loadTableData = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	db.tables[tableid].data = db.data[tableid];
};

FS.saveTableData = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	db.data[tableid] = db.tables[tableid].data;
	db.tables[tableid].data = null;
	FS.updateFile(databaseid);
};

FS.commit = function(databaseid, cb) {
	//	console.log('COMMIT');
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

FS.rollback = function(databaseid, cb) {
	var res = 1;
	var db = alasql.databases[databaseid];
	db.dbversion++;
	//	console.log(db.dbversion)
	//	var lsdbid = alasql.databases[databaseid].lsdbid;
	//	lsdb = LS.get(lsdbid);
	wait();
	function wait() {
		setTimeout(function() {
			if (db.issaving) {
				return wait();
			} else {
				alasql.loadFile(db.filename, !!cb, function(data) {
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

						// index columns
						// convert types
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

	//	 if(!alasql.options.autocommit) {
	/*/*		if(lsdb.tables){
			for(var tbid in lsdb.tables) {
				var tb = new alasql.Table({columns: db.tables[tbid].columns});
				extend(tb,lsdb.tables[tbid]);
				lsdb.tables[tbid] = tb;
				if(!alasql.options.autocommit) {
					lsdb.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
				}
				lsdb.tables[tbid].indexColumns();

				// index columns
				// convert types
			}
		}
//	}
*/
	//console.log(999, alasql.databases[databaseid]);
};
