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


IDB.begin = async function(databaseid) {
	    const db = alasql.databases[databaseid];
	    if(!db.idbdb) {
	        db.idbdb = await new Promise((resolve) => {
	            const req = indexedDB.open(db.ixdbid);
	            req.onsuccess = () => resolve(req.result);
	        });
	    }
	    db.transaction = db.idbdb.transaction(
	        Array.from(db.idbdb.objectStoreNames),
	        'readwrite'
	    );
	    return Promise.resolve();
	};
	
	IDB.commit = async function(databaseid) {
	    const db = alasql.databases[databaseid];
	    return new Promise((resolve, reject) => {
	        if(!db.transaction) return resolve();
	        db.transaction.oncomplete = () => {
	            db.transaction = null;
	            resolve();
	        };
	        db.transaction.onerror = (e) => {
	            db.transaction = null;
	            reject(e);
	        };
	        db.transaction.commit();
	    });
	};
	
	IDB.rollback = async function(databaseid) {
	    const db = alasql.databases[databaseid];
	    if(!db.transaction) return Promise.resolve();
	    db.transaction.abort();
	    db.transaction = null;
	    return Promise.resolve();
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
		const tb = db.transaction 
		    ? db.transaction.objectStore(tableid) 
		    : db.idbdb.transaction([tableid], 'readwrite').objectStore(tableid);


	// request.onsuccess = () => {
	// 	var ixdb = request.result;
	// 	var tx = ixdb.transaction([tableid], 'readwrite');
	// 	var tb = tx.objectStore(tableid);
		for (var i = 0, ilen = value.length; i < ilen; i++) {
			tb.add(value[i]);
		}
		// tx.oncomplete = function () {
		// 	ixdb.close();

			if(!db.transaction) {
			    tb.transaction.oncomplete = () => {
				    triggerCallbacks();
				    if (cb) cb(ilen);
				};
			} else {
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
		// 	if (cb) cb(ilen);
		// };
	}
};


    if(db.idbdb) {
	        runOperation();
	    } else {
	        const req = indexedDB.open(ixdbid);
	        req.onsuccess = () => {
	            db.idbdb = req.result;
	            runOperation();
	        };
	    }
	}



	IDB.fromTable = function (databaseid, tableid, cb, idx, query) {
		const ixdbid = alasql.databases[databaseid].ixdbid;
		const db = alasql.databases[databaseid];
	
		const runOperation = () => {
			
		};
	
		if(db.idbdb) {
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
	//    const request = indexedDB.open(ixdbid);
	   const db = alasql.databases[databaseid];
	
	   const runOperation = () => {
	    //    const ixdb = request.result;
	    //    const cur = ixdb.transaction([tableid], 'readwrite').objectStore(tableid).openCursor();
	       const store = db.transaction
	           ? db.transaction.objectStore(tableid)
	           : db.idbdb.transaction([tableid], 'readwrite').objectStore(tableid);
	       
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
	               ixdb.close();
					if (cb) cb(num);
				}
			};
	   };
	
	   if(db.idbdb) {
	       runOperation();
	   } else {
	       const req = indexedDB.open(ixdbid);
	       req.onsuccess = () => {
	           db.idbdb = req.result;
	           runOperation();
	       };
	  }
	};

	IDB.updateTable = function (databaseid, tableid, assignfn, wherefn, params, cb) {
		const ixdbid = alasql.databases[databaseid].ixdbid;
	   const request = indexedDB.open(ixdbid);
	   const db = alasql.databases[databaseid];
	
	   request.onsuccess = function () {
	       const ixdb = request.result;
	       const cur = ixdb.transaction([tableid], 'readwrite').objectStore(tableid).openCursor();
	   const runOperation = () => {
	       const store = db.transaction
	           ? db.transaction.objectStore(tableid)
	           : db.idbdb.transaction([tableid], 'readwrite').objectStore(tableid);
	       
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
	               ixdb.close();
					if (cb) cb(num);
				}
			};
	   };
	   
	
	   if(db.idbdb) {
	       runOperation();
	   } else {
	       const req = indexedDB.open(ixdbid);
	       req.onsuccess = () => {
	           db.idbdb = req.result;
	           runOperation();
	       };
	   }
	};
}
