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
		if (cb) cb(null, err);
		throw err;
	});

	if (found) {
		if (ifnotexists) {
			cb && cb(0);
		} else {
			const err = new Error(
				`IndexedDB: Cannot create new database "${ixdbid}" because it already exists`
			);
			if (cb) cb(null, err);
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
		if (cb) cb(null, err);
		throw err;
	});

	if (found) {
		const request = indexedDB.deleteDatabase(ixdbid);
		request.onsuccess = () => {
			if (cb) cb(1);
		};
	} else {
		if (ifexists) {
			cb && cb(0);
		} else {
			cb &&
				cb(
					null,
					new Error(`IndexedDB: Cannot drop new database "${ixdbid}" because it does not exist'`)
				);
		}
	}
};

IDB.attachDatabase = async function (ixdbid, dbid, args, params, cb) {
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) cb(null, err);
		throw err;
	});

	if (!found) {
		const err = new Error(
			`IndexedDB: Cannot attach database "${ixdbid}" because it does not exist`
		);
		if (cb) cb(null, err);
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

	/*/*
		if (!alasql.options.autocommit) {
			if (db.tables) {
				for(var tbid in db.tables) {
					db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
				}
			}
		}
	*/

	if (cb) cb(1);
};

IDB.createTable = async function (databaseid, tableid, ifnotexists, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const found = await _databaseExists(ixdbid).catch(err => {
		if (cb) cb(null, err);
		throw err;
	});

	if (!found) {
		const err = new Error(
			'IndexedDB: Cannot create table in database "' + ixdbid + '" because it does not exist'
		);
		if (cb) cb(null, err);
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
		if (cb) cb(null, err);
		throw err;
	});

	if (!found) {
		const err = new Error(
			'IndexedDB: Cannot drop table in database "' + ixdbid + '" because it does not exist'
		);
		if (cb) cb(null, err);
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

IDB.begin = async function (databaseid) {
	const db = alasql.databases[databaseid];
	
	// Add a timeout wrapper to prevent hanging
	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => reject(new Error('IndexedDB transaction timeout')), 3000);
	});
	
	const beginPromise = (async () => {
		if (!db.idbdb) {
			db.idbdb = await new Promise((resolve, reject) => {
				const req = indexedDB.open(db.ixdbid);
				req.onsuccess = () => resolve(req.result);
				req.onerror = () => reject(req.error);
				// Add timeout to prevent hanging
				setTimeout(() => reject(new Error('IndexedDB open timeout')), 5000);
			});
		}
		
		// If there's already a transaction, we should handle it properly
		if (db.transaction) {
			// For now, we'll just create a new transaction
			// In a more sophisticated implementation, we might want to support nested transactions
			console.warn('Transaction already exists, creating new transaction');
		}
		
		// Create transaction with all object stores
		const objectStoreNames = Array.from(db.idbdb.objectStoreNames);
		if (objectStoreNames.length === 0) {
			// If no object stores exist, we can't create a transaction
			// This might happen if the database is empty
			// For now, we'll create a transaction anyway and let it fail gracefully
			console.warn('No object stores found, creating empty transaction');
			db.transaction = null;
			return Promise.resolve();
		}
		
		db.transaction = db.idbdb.transaction(objectStoreNames, 'readwrite');
		
		// Initialize transaction tracking for rollback support
		db.transactionChanges = {
			inserts: [],
			updates: [],
			deletes: []
		};
		
		// Set up transaction event handlers with timeout
		const transactionTimeout = setTimeout(() => {
			if (db.transaction) {
				console.error('IndexedDB transaction timeout - aborting');
				db.transaction.abort();
			}
		}, 10000); // 10 second timeout
		
		// Set up transaction event handlers
		db.transaction.oncomplete = () => {
			clearTimeout(transactionTimeout);
			// Transaction completed successfully
		};
		db.transaction.onerror = (event) => {
			clearTimeout(transactionTimeout);
			console.error('IndexedDB transaction error:', event.target.error);
		};
		db.transaction.onabort = () => {
			clearTimeout(transactionTimeout);
			// Transaction was aborted
		};
		
		return Promise.resolve();
	})();
	
	// Race between the actual operation and the timeout
	return Promise.race([beginPromise, timeoutPromise]);
};

IDB.commit = async function (databaseid) {
	const db = alasql.databases[databaseid];
	return new Promise((resolve, reject) => {
		if (!db.transaction) {
			console.warn('No transaction to commit');
			return resolve();
		}
		
		// Set up one-time event handlers for this commit
		const onComplete = () => {
			db.transaction = null;
			db.transactionChanges = null;
			resolve();
		};
		const onError = (e) => {
			db.transaction = null;
			db.transactionChanges = null;
			reject(e);
		};
		
		db.transaction.addEventListener('complete', onComplete, { once: true });
		db.transaction.addEventListener('error', onError, { once: true });
		
		// Note: IndexedDB transactions are automatically committed when they complete
		// We don't need to call commit() explicitly
		// The transaction will complete when all operations are done
	});
};

IDB.rollback = async function (databaseid) {
	const db = alasql.databases[databaseid];
	return new Promise((resolve, reject) => {
		if (!db.transaction) {
			console.warn('No transaction to rollback');
			return resolve();
		}
		
		// Set up one-time event handlers for this rollback
		const onAbort = () => {
			db.transaction = null;
			db.transactionChanges = null;
			resolve();
		};
		const onError = (e) => {
			db.transaction = null;
			db.transactionChanges = null;
			reject(e);
		};
		
		db.transaction.addEventListener('abort', onAbort, { once: true });
		db.transaction.addEventListener('error', onError, { once: true });
		
		// Abort the transaction
		db.transaction.abort();
	});
};

IDB.intoTable = function (databaseid, tableid, value, columns, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	// const request = indexedDB.open(ixdbid);
	var db = alasql.databases[databaseid];
	var table = db.tables[tableid];

	// request.onupgradeneeded = evt => {
	// 	evt.target.transaction.abort();
	// 	const err = new Error(
	// 		`Cannot insert into table "${tableid}" because database "${databaseid}" does not exist`
	// 	);
	// 	if (cb) cb(null, err);
	// };

	const runOperation = () => {
		let tb;
		let tx = null;
		
		if (
			db.transaction &&
			db.transaction.objectStoreNames &&
			db.transaction.objectStoreNames.contains(tableid)
		) {
			tb = db.transaction.objectStore(tableid);
		} else {
			// Create a new transaction for this operation
			tx = db.idbdb.transaction([tableid], 'readwrite');
			tb = tx.objectStore(tableid);
		}

		for (var i = 0, ilen = value.length; i < ilen; i++) {
			tb.add(value[i]);
			
			// Track the insert for potential rollback
			if (db.transaction && db.transactionChanges) {
				db.transactionChanges.inserts.push({
					tableid: tableid,
					value: value[i]
				});
			}
		}

		if (!db.transaction) {
			// We created our own transaction, so we need to wait for it to complete
			tx.oncomplete = () => {
				triggerCallbacks();
				if (cb) cb(ilen);
			};
			tx.onerror = (event) => {
				if (cb) cb(null, event.target.error);
			};
		} else {
			// We're using the existing transaction, so we can call the callback immediately
			triggerCallbacks();
			if (cb) cb(ilen);
		}

		function triggerCallbacks() {
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
		}
	};

	if (db.idbdb) {
		runOperation();
	} else {
		const req = indexedDB.open(ixdbid);
		req.onsuccess = () => {
			db.idbdb = req.result;
			runOperation();
		};
	}
};

IDB.fromTable = function (databaseid, tableid, cb, idx, query) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const db = alasql.databases[databaseid];

	const runOperation = () => {
		const res = [];
		let store;
		
		// If we're in a transaction, use it for reads too
		if (
			db.transaction &&
			db.transaction.objectStoreNames &&
			db.transaction.objectStoreNames.contains(tableid)
		) {
			store = db.transaction.objectStore(tableid);
		} else {
			// Create a new transaction for this operation
			const tx = db.idbdb.transaction([tableid], 'readonly');
			store = tx.objectStore(tableid);
		}

		const cur = store.openCursor();

		cur.onsuccess = () => {
			const cursor = cur.result;
			if (cursor) {
				// if keyPath(columns) is not present then we take the key and value as object
				const cursorValue =
					typeof cursor === 'object' ? cursor.value : {[cursor.key]: cursor.value};
				res.push(cursorValue);
				cursor.continue();
			} else {
				if (!db.transaction) {
					db.idbdb.close();
				}
				if (cb) cb(res, idx, query);
			}
		};

		cur.onerror = () => {
			if (cb) cb(null, cur.error);
		};
	};

	if (db.idbdb) {
		runOperation();
	} else {
		const req = indexedDB.open(ixdbid);

		req.onupgradeneeded = evt => {
			evt.target.transaction.abort();
			const err = new Error(
				`Cannot select from table "${tableid}" because database "${databaseid}" does not exist`
			);
			if (cb) cb(null, err);
		};

		req.onsuccess = () => {
			db.idbdb = req.result;
			runOperation();
		};

		req.onerror = () => {
			if (cb) cb(null, req.error);
		};
	}
};

IDB.deleteFromTable = function (databaseid, tableid, wherefn, params, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const db = alasql.databases[databaseid];

	const runOperation = () => {
		let store;
		if (
			db.transaction &&
			db.transaction.objectStoreNames &&
			db.transaction.objectStoreNames.contains(tableid)
		) {
			store = db.transaction.objectStore(tableid);
		} else {
			// Create a new transaction for this operation
			const tx = db.idbdb.transaction([tableid], 'readwrite');
			store = tx.objectStore(tableid);
		}

		const cur = store.openCursor();

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
				if (!db.transaction) {
					db.idbdb.close();
				}
				if (cb) cb(num);
			}
		};

		cur.onerror = () => {
			if (cb) cb(null, cur.error);
		};
	};

	if (db.idbdb) {
		runOperation();
	} else {
		const req = indexedDB.open(ixdbid);
		req.onsuccess = () => {
			db.idbdb = req.result;
			runOperation();
		};
		req.onerror = () => {
			if (cb) cb(null, req.error);
		};
	}
};

IDB.updateTable = function (databaseid, tableid, assignfn, wherefn, params, cb) {
	const ixdbid = alasql.databases[databaseid].ixdbid;
	const db = alasql.databases[databaseid];

	const runOperation = () => {
		let store;
		if (
			db.transaction &&
			db.transaction.objectStoreNames &&
			db.transaction.objectStoreNames.contains(tableid)
		) {
			store = db.transaction.objectStore(tableid);
		} else {
			// Create a new transaction for this operation
			const tx = db.idbdb.transaction([tableid], 'readwrite');
			store = tx.objectStore(tableid);
		}

		const cur = store.openCursor();

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
				if (!db.transaction) {
					db.idbdb.close();
				}
				if (cb) cb(num);
			}
		};

		cur.onerror = () => {
			if (cb) cb(null, cur.error);
		};
	};

	if (db.idbdb) {
		runOperation();
	} else {
		const req = indexedDB.open(ixdbid);
		req.onsuccess = () => {
			db.idbdb = req.result;
			runOperation();
		};
		req.onerror = () => {
			if (cb) cb(null, req.error);
		};
	}
};
