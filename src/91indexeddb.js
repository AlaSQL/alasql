//
// 91indexeddb.js
// AlaSQL IndexedDB module
// Date: 18.04.2015
// (c) Andrey Gershun
//

/* global alasql, yy, utils*/

var IDB = (alasql.engines.INDEXEDDB = function () {
	'';
});

/**
 * @param {string} name
 * @returns {Promise<{name: string, version: number}|0>}
 */
async function _databaseExists(name) {
	const indexedDB = globalThis.indexedDB;

	if (!indexedDB) {
		throw new Error('IndexedDB is not supported in this browser');
	}

	if (indexedDB.databases) {
		const dbs = await indexedDB.databases();
		const db = dbs.find(db => db.name === name);
		// @ts-ignore
		return db || 0;
	}

	// Try if it exist
	const req = indexedDB.open(name);

	return new Promise(function (resolve, reject) {
		req.onsuccess = () => {
			req.result.close();
			resolve({name, version: req.result.version});
		};

		req.onupgradeneeded = evt => {
			evt.target.transaction.abort();
			resolve(0);
		};

		req.onerror = () => {
			reject(new Error('IndexedDB error'));
		};

		req.onblocked = () => {
			resolve({name, version: req.result.version});
		};
	});
}

//
// SHOW DATABASES
// work only in chrome
//
IDB.showDatabases = function (like, cb) {
	if (!indexedDB.databases) {
		cb(null, new Error('SHOW DATABASE is not supported in this browser'));
		return;
	}

	indexedDB.databases().then(dblist => {
		const res = [];
		const relike = like && new RegExp(like.value.replace(/\%/g, '.*'), 'g');

		for (var i = 0; i < dblist.length; i++) {
			if (!like || dblist[i].name.match(relike)) {
				res.push({databaseid: dblist[i].name});
			}
		}

		cb(res);
	});
};

IDB.createDatabase = async function (ixdbid, args, ifnotexists, dbid, cb) {
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) {
			cb(null, err);
			return null;
		}
		throw err;
	});

	if (found === null) {
		return; // Error already handled via callback
	}

	if (found) {
		if (ifnotexists) {
			cb && cb(0);
		} else {
			const err = new Error(
				`IndexedDB: Cannot create new database "${ixdbid}" because it already exists`
			);
			if (cb) {
				cb(null, err);
				return;
			}
			throw err;
		}
	} else {
		const request = indexedDB.open(ixdbid, 1);
		request.onsuccess = () => {
			request.result.close();
			cb(1);
		};
	}
};

IDB.dropDatabase = async function (ixdbid, ifexists, cb) {
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) {
			cb(null, err);
			return null;
		}
		throw err;
	});

	if (found === null) {
		return; // Error already handled via callback
	}

	if (found) {
		const request = indexedDB.deleteDatabase(ixdbid);
		request.onsuccess = () => {
			if (cb) cb(1);
		};
	} else {
		if (ifexists) {
			cb && cb(0);
		} else {
			if (cb) {
				cb(
					null,
					new Error(`IndexedDB: Cannot drop database "${ixdbid}" because it does not exist`)
				);
				return;
			}
			throw new Error(`IndexedDB: Cannot drop database "${ixdbid}" because it does not exist`);
		}
	}
};

IDB.attachDatabase = async function (ixdbid, dbid, args, params, cb) {
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) {
			cb(null, err);
			return null;
		}
		throw err;
	});

	if (found === null) {
		return; // Error already handled via callback
	}

	if (!found) {
		const err = new Error(
			`IndexedDB: Cannot attach database "${ixdbid}" because it does not exist`
		);
		if (cb) {
			cb(null, err);
			return;
		}
		throw err;
	}

	const stores = await new Promise((resolve, reject) => {
		const request = indexedDB.open(ixdbid);
		request.onsuccess = () => {
			resolve(request.result.objectStoreNames);
			request.result.close();
		};
	});

	const db = new alasql.Database(dbid || ixdbid);
	db.engineid = 'INDEXEDDB';
	db.ixdbid = ixdbid;
	db.tables = [];

	for (var i = 0; i < stores.length; i++) {
		db.tables[stores[i]] = {};
	}

	// IF AUTOCOMMIT IS OFF then copy data to memory
	if (!alasql.options.autocommit) {
		if (db.tables) {
			for (var tbid in db.tables) {
				IDB.restoreTable(dbid || ixdbid, tbid);
			}
		}
	}

	if (cb) cb(1);
};

IDB.createTable = async function (databaseid, tableid, ifnotexists, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) {
			cb(null, err);
			return null;
		}
		throw err;
	});

	if (found === null) {
		return; // Error already handled via callback
	}

	if (!found) {
		const err = new Error(
			'IndexedDB: Cannot create table in database "' + ixdbid + '" because it does not exist'
		);
		if (cb) {
			cb(null, err);
			return;
		}
		throw err;
	}

	const request = indexedDB.open(ixdbid, found.version + 1);
	request.onupgradeneeded = function (event) {
		request.result.createObjectStore(tableid, {autoIncrement: true});
	};
	request.onsuccess = function (event) {
		request.result.close();
		if (cb) cb(1);
	};
	request.onerror = evt => {
		cb(null, evt);
	};
	request.onblocked = function (event) {
		cb(
			null,
			new Error(`Cannot create table "${tableid}" because database "${databaseid}"  is blocked`)
		);
	};
};

IDB.dropTable = async function (databaseid, tableid, ifexists, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) {
			cb(null, err);
			return null;
		}
		throw err;
	});

	if (found === null) {
		return; // Error already handled via callback
	}

	if (!found) {
		const err = new Error(
			'IndexedDB: Cannot drop table in database "' + ixdbid + '" because it does not exist'
		);
		if (cb) {
			cb(null, err);
			return;
		}
		throw err;
	}

	const request = indexedDB.open(ixdbid, found.version + 1);

	let err;
	request.onupgradeneeded = function (evt) {
		var ixdb = request.result;
		if (ixdb.objectStoreNames.contains(tableid)) {
			ixdb.deleteObjectStore(tableid);
			delete alasql.databases[databaseid].tables[tableid];
		} else {
			if (!ifexists) {
				err = new Error(`IndexedDB: Cannot drop table "${tableid}" because it does not exist`);
				evt.target.transaction.abort();
			}
		}
	};
	request.onsuccess = function (event) {
		request.result.close();
		if (cb) cb(1);
	};
	request.onerror = function (event) {
		cb && cb(null, err || event);
	};
	request.onblocked = function (event) {
		cb(
			null,
			new Error(`Cannot drop table "${tableid}" because database "${databaseid}" is blocked`)
		);
	};
};

/*/*
// IDB.intoTable = function(databaseid, tableid, value, cb) {
// //	console.log('intoTable',databaseid, tableid, value, cb);
// 	var ixdbid = alasql.databases[databaseid].ixdbid;
// 	var request1 = indexedDB.open(ixdbid);
// 	request1.onsuccess = function(event) {
// 		var ixdb = event.target.result;
// 		var tx = ixdb.transaction([tableid],"readwrite");
// 		var tb = tx.objectStore(tableid);
// 		// console.log(tb.keyPath);
// 		// console.log(tb.indexNames);
// 		// console.log(tb.autoIncrement);
// 		for(var i=0, ilen = value.length;i<ilen;i++) {
// 			tb.add(value[i]);
// 		};
// 		tx.oncomplete = function() {
// 			ixdb.close();
// //			console.log('indexeddb',203,ilen);
// 			cb(ilen);
// 		}
// 	};

// 	// var tb = LS.get(lsdbid+'.'+tableid);
// 	// if(!tb) tb = [];
// 	// tb = tb.concat(value);
// 	// LS.set(lsdbid+'.'+tableid, tb);
// //	console.log(lsdbid+'.'+tableid, tb);
// //	console.log(localStorage[lsdbid+'.'+tableid]);
// 	// if(cb) cb(res);
// 	// return res;
// };
*/

IDB.intoTable = function (databaseid, tableid, value, columns, cb) {
	var db = alasql.databases[databaseid];
	var table = db.tables[tableid];

	// In transaction mode (autocommit OFF), work with in-memory data
	if (!alasql.options.autocommit) {
		// Ensure table data is loaded
		if (!table.data) {
			IDB.restoreTable(databaseid, tableid, () => {
				// After loading, add values
				if (!table.data) table.data = [];
				table.data = table.data.concat(value);

				// Execute triggers
				for (var tr in table.afterinsert) {
					if (table.afterinsert[tr]) {
						var trigger = table.afterinsert[tr];
						if (trigger.funcid) {
							alasql.fn[trigger.funcid](value);
						} else if (trigger.statement) {
							trigger.statement.execute(databaseid);
						}
					}
				}

				if (cb) cb(value.length);
			});
			return;
		}

		// Table already loaded, just add to memory
		if (!table.data) table.data = [];
		table.data = table.data.concat(value);

		// Execute triggers
		for (var tr in table.afterinsert) {
			if (table.afterinsert[tr]) {
				var trigger = table.afterinsert[tr];
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](value);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}

		if (cb) cb(value.length);
		return;
	}

	// In autocommit mode, write directly to IndexedDB
	const ixdbid = db.ixdbid;
	const request = indexedDB.open(ixdbid);

	request.onupgradeneeded = evt => {
		evt.target.transaction.abort();
		const err = new Error(
			`Cannot insert into table "${tableid}" because database "${databaseid}" does not exist`
		);
		if (cb) cb(null, err);
	};

	request.onsuccess = () => {
		var ixdb = request.result;
		var tx = ixdb.transaction([tableid], 'readwrite');
		var tb = tx.objectStore(tableid);
		for (var i = 0, ilen = value.length; i < ilen; i++) {
			tb.add(value[i]);
		}
		tx.oncomplete = function () {
			ixdb.close();
			for (var tr in table.afterinsert) {
				if (table.afterinsert[tr]) {
					var trigger = table.afterinsert[tr];
					if (trigger.funcid) {
						alasql.fn[trigger.funcid](value);
					} else if (trigger.statement) {
						trigger.statement.execute(databaseid);
					}
				}
			}
			if (cb) cb(ilen);
		};
	};
};

IDB.fromTable = function (databaseid, tableid, cb, idx, query) {
	var db = alasql.databases[databaseid];
	var table = db.tables[tableid];

	// In transaction mode (autocommit OFF), read from memory
	if (!alasql.options.autocommit) {
		// Ensure table data is loaded
		if (!table.data) {
			IDB.restoreTable(databaseid, tableid, () => {
				const res = table.data || [];
				if (cb) cb(res, idx, query);
			});
			return;
		}

		const res = table.data || [];
		if (cb) cb(res, idx, query);
		return;
	}

	// In autocommit mode, read directly from IndexedDB
	const ixdbid = db.ixdbid;
	const request = indexedDB.open(ixdbid);

	request.onupgradeneeded = evt => {
		evt.target.transaction.abort();
		const err = new Error(
			`Cannot select from table "${tableid}" because database "${databaseid}" does not exist`
		);
		if (cb) cb(null, err);
	};

	request.onsuccess = () => {
		const res = [];
		const ixdb = request.result;
		const cur = ixdb.transaction([tableid]).objectStore(tableid).openCursor();

		cur.onsuccess = () => {
			const cursor = cur.result;
			if (cursor) {
				// if keyPath(columns) is not present then we take the key and value as object.
				const cursorValue =
					typeof cursor === 'object' ? cursor.value : {[cursor.key]: cursor.value};
				res.push(cursorValue);
				cursor.continue();
			} else {
				ixdb.close();
				if (cb) cb(res, idx, query);
			}
		};
	};
};

IDB.deleteFromTable = function (databaseid, tableid, wherefn, params, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const request = indexedDB.open(ixdbid);

	request.onsuccess = () => {
		const ixdb = request.result;
		const cur = ixdb.transaction([tableid], 'readwrite').objectStore(tableid).openCursor();

		let num = 0;
		cur.onsuccess = () => {
			var cursor = cur.result;
			if (cursor) {
				if (!wherefn || wherefn(cursor.value, params, alasql)) {
					cursor.delete();
					num++;
				}
				cursor.continue();
			} else {
				ixdb.close();
				if (cb) cb(num);
			}
		};
	};
};

IDB.updateTable = function (databaseid, tableid, assignfn, wherefn, params, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const request = indexedDB.open(ixdbid);
	request.onsuccess = function () {
		const ixdb = request.result;
		const cur = ixdb.transaction([tableid], 'readwrite').objectStore(tableid).openCursor();

		let num = 0;
		cur.onsuccess = () => {
			var cursor = cur.result;
			if (cursor) {
				if (!wherefn || wherefn(cursor.value, params)) {
					var r = cursor.value;
					assignfn(r, params);
					cursor.update(r);
					num++;
				}
				cursor.continue();
			} else {
				ixdb.close();
				if (cb) cb(num);
			}
		};
	};
};

/**
 * Store table structure and data into IndexedDB
 * @param databaseid {string} AlaSQL database id
 * @param tableid {string} Table name
 * @param cb {function} Optional callback
 */
IDB.storeTable = function (databaseid, tableid, cb) {
	const db = alasql.databases[databaseid];
	const table = db.tables[tableid];
	const ixdbid = db.ixdbid;

	if (!table || !table.data) {
		if (cb) cb(0);
		return;
	}

	const request = indexedDB.open(ixdbid);

	request.onerror = () => {
		if (cb) cb(null, new Error('Failed to open IndexedDB'));
	};

	request.onsuccess = () => {
		const ixdb = request.result;

		// Clear existing data first
		const clearTx = ixdb.transaction([tableid], 'readwrite');
		const clearStore = clearTx.objectStore(tableid);
		const clearReq = clearStore.clear();

		clearReq.onsuccess = () => {
			// Now add all data
			const tx = ixdb.transaction([tableid], 'readwrite');
			const tb = tx.objectStore(tableid);

			for (let i = 0; i < table.data.length; i++) {
				tb.add(table.data[i]);
			}

			tx.oncomplete = () => {
				ixdb.close();
				if (cb) cb(table.data.length);
			};

			tx.onerror = () => {
				ixdb.close();
				if (cb) cb(null, new Error('Failed to store table data'));
			};
		};

		clearReq.onerror = () => {
			ixdb.close();
			if (cb) cb(null, new Error('Failed to clear table'));
		};
	};
};

/**
 * Restore table structure and data from IndexedDB to memory
 * @param databaseid {string} AlaSQL database id
 * @param tableid {string} Table name
 * @param cb {function} Optional callback
 */
IDB.restoreTable = function (databaseid, tableid, cb) {
	const db = alasql.databases[databaseid];
	const ixdbid = db.ixdbid;

	// Initialize table if it doesn't exist
	if (!db.tables[tableid]) {
		db.tables[tableid] = new alasql.Table();
	}

	const table = db.tables[tableid];

	const request = indexedDB.open(ixdbid);

	request.onerror = () => {
		if (cb) cb(null, new Error('Failed to open IndexedDB'));
	};

	request.onsuccess = () => {
		const ixdb = request.result;
		const tx = ixdb.transaction([tableid]);
		const store = tx.objectStore(tableid);
		const getAllReq = store.getAll();

		getAllReq.onsuccess = () => {
			table.data = getAllReq.result || [];
			ixdb.close();
			if (cb) cb(table.data.length);
		};

		getAllReq.onerror = () => {
			ixdb.close();
			if (cb) cb(null, new Error('Failed to restore table data'));
		};
	};

	return table;
};

/**
 * Begin transaction for IndexedDB
 * Implements transaction state management similar to LOCALSTORAGE
 */
IDB.begin = function (databaseid, cb) {
	const db = alasql.databases[databaseid];

	// Store snapshot of current state for rollback
	if (!db.engineid || db.engineid !== 'INDEXEDDB') {
		return cb ? cb(1) : 1;
	}

	// In autocommit mode, begin just commits current state
	if (alasql.options.autocommit) {
		return IDB.commit(databaseid, cb);
	}

	// In transaction mode, ensure data is loaded in memory
	const tablesToLoad = [];
	for (const tbid in db.tables) {
		if (db.tables[tbid] && !db.tables[tbid].data) {
			tablesToLoad.push(tbid);
		}
	}

	if (tablesToLoad.length === 0) {
		return cb ? cb(1) : 1;
	}

	// Load all tables that aren't already in memory
	let loaded = 0;
	const checkComplete = () => {
		loaded++;
		if (loaded === tablesToLoad.length) {
			if (cb) cb(1);
		}
	};

	tablesToLoad.forEach(tbid => {
		IDB.restoreTable(databaseid, tbid, checkComplete);
	});
};

/**
 * Commit transaction for IndexedDB
 * Persists in-memory data to IndexedDB
 */
IDB.commit = function (databaseid, cb) {
	const db = alasql.databases[databaseid];

	if (!db.engineid || db.engineid !== 'INDEXEDDB') {
		return cb ? cb(1) : 1;
	}

	const tablesToStore = [];
	for (const tbid in db.tables) {
		if (db.tables[tbid] && db.tables[tbid].data) {
			tablesToStore.push(tbid);
		}
	}

	if (tablesToStore.length === 0) {
		return cb ? cb(1) : 1;
	}

	let stored = 0;
	let hasError = false;

	const checkComplete = (res, err) => {
		if (err && !hasError) {
			hasError = true;
			if (cb) cb(null, err);
			return;
		}

		stored++;
		if (stored === tablesToStore.length && !hasError) {
			if (cb) cb(1);
		}
	};

	tablesToStore.forEach(tbid => {
		IDB.storeTable(databaseid, tbid, checkComplete);
	});
};

/**
 * Rollback transaction for IndexedDB
 * Restores data from IndexedDB, discarding in-memory changes
 */
IDB.rollback = function (databaseid, cb) {
	const db = alasql.databases[databaseid];

	if (!db.engineid || db.engineid !== 'INDEXEDDB') {
		return cb ? cb(1) : 1;
	}

	const tablesToRestore = [];
	for (const tbid in db.tables) {
		if (db.tables[tbid]) {
			tablesToRestore.push(tbid);
		}
	}

	if (tablesToRestore.length === 0) {
		return cb ? cb(1) : 1;
	}

	let restored = 0;
	let hasError = false;

	const checkComplete = (res, err) => {
		if (err && !hasError) {
			hasError = true;
			if (cb) cb(null, err);
			return;
		}

		restored++;
		if (restored === tablesToRestore.length && !hasError) {
			if (cb) cb(1);
		}
	};

	tablesToRestore.forEach(tbid => {
		IDB.restoreTable(databaseid, tbid, checkComplete);
	});
};
