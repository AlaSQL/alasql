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

if (utils.hasIndexedDB) {
	// For Chrome it work normally, for Firefox - simple shim
	if (typeof utils.global.indexedDB.webkitGetDatabaseNames == 'function') {
		IDB.getDatabaseNames = utils.global.indexedDB.webkitGetDatabaseNames.bind(
			utils.global.indexedDB
		);
	} else {
		IDB.getDatabaseNames = function () {
			var request = {};
			var result = {
				contains: function (name) {
					return true; // Always return true
				},
				notsupported: true,
			};
			setTimeout(function () {
				var event = {target: {result: result}};
				request.onsuccess(event);
			}, 0);
			return request;
		};
		IDB.getDatabaseNamesNotSupported = true;
	}
}

//
// SHOW DATABASES
// work only in chrome
//
IDB.showDatabases = function (like, cb) {
	// console.log('showDatabases',arguments);
	var request = IDB.getDatabaseNames();
	request.onsuccess = function (event) {
		var dblist = event.target.result;
		if (IDB.getDatabaseNamesNotSupported) {
			throw new Error('SHOW DATABASE is not supported in this browser');
		}
		var res = [];
		if (like) {
			var relike = new RegExp(like.value.replace(/\%/g, '.*'), 'g');
		}
		for (var i = 0; i < dblist.length; i++) {
			if (!like || dblist[i].match(relike)) {
				res.push({databaseid: dblist[i]});
			}
		}
		cb(res);
	};
};

IDB.createDatabase = function (ixdbid, args, ifnotexists, dbid, cb) {
	// console.log(arguments);
	var indexedDB = utils.global.indexedDB;
	if (ifnotexists) {
		var request2 = indexedDB.open(ixdbid, 1);
		request2.onsuccess = function (event) {
			event.target.result.close();
			if (cb) cb(1);
		};
	} else {
		var request1 = indexedDB.open(ixdbid, 1);
		request1.onupgradeneeded = function (e) {
			// console.log('abort');
			e.target.transaction.abort();
		};
		request1.onsuccess = function (e) {
			// console.log('success');
			if (ifnotexists) {
				if (cb) cb(0);
			} else {
				throw new Error(
					'IndexedDB: Cannot create new database "' + ixdbid + '" because it already exists'
				);
			}
		};
	}

	/*/*	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(dblist.contains(ixdbid)){
			if(ifnotexists) {
				cb(0);
				return;
			} else {
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
			}
		};

	};
	 }
*/
};

IDB.createDatabase = function (ixdbid, args, ifnotexists, dbid, cb) {
	var indexedDB = utils.global.indexedDB;
	if (IDB.getDatabaseNamesNotSupported) {
		// Hack for Firefox
		if (ifnotexists) {
			//			console.log('ifnotexists');
			var dbExists = true;
			var request2 = indexedDB.open(ixdbid);
			//			console.log(1);
			request2.onupgradeneeded = function (e) {
				//				console.log('abort');
				dbExists = false;
				//			    e.target.transaction.abort();
				//			    cb(0);
			};
			request2.onsuccess = function (event) {
				//				console.log('success');
				//console.log(event.target.result);
				event.target.result.close();
				if (dbExists) {
					if (cb) cb(0);
				} else {
					if (cb) cb(1);
				}
			};
		} else {
			//			console.log('without');
			var request1 = indexedDB.open(ixdbid);
			request1.onupgradeneeded = function (e) {
				e.target.transaction.abort();
			};
			request1.onabort = function (event) {
				if (cb) cb(1);
			};
			request1.onsuccess = function (event) {
				event.target.result.close();
				throw new Error(
					'IndexedDB: Cannot create new database "' + ixdbid + '" because it already exists'
				);
				//				cb(0);
			};
		}
	} else {
		var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function (event) {
			var dblist = event.target.result;
			if (dblist.contains(ixdbid)) {
				if (ifnotexists) {
					if (cb) cb(0);
					return;
				} else {
					throw new Error(
						'IndexedDB: Cannot create new database "' + ixdbid + '" because it already exists'
					);
				}
			}

			var request2 = indexedDB.open(ixdbid, 1);
			request2.onsuccess = function (event) {
				event.target.result.close();
				if (cb) cb(1);
			};
		};
	}
};

IDB.dropDatabase = function (ixdbid, ifexists, cb) {
	var indexedDB = utils.global.indexedDB;
	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function (event) {
		var dblist = event.target.result;
		if (!dblist.contains(ixdbid)) {
			if (ifexists) {
				if (cb) cb(0);
				return;
			} else {
				throw new Error(
					'IndexedDB: Cannot drop new database "' + ixdbid + '" because it does not exist'
				);
			}
		}
		var request2 = indexedDB.deleteDatabase(ixdbid);
		request2.onsuccess = function (event) {
			//			console.log('dropped');
			if (cb) cb(1);
		};
	};
};

IDB.attachDatabase = function (ixdbid, dbid, args, params, cb) {
	if (!utils.hasIndexedDB) {
		throw new Error('The current browser does not support IndexedDB');
	}
	var indexedDB = utils.global.indexedDB;
	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function (event) {
		var dblist = event.target.result;
		if (!dblist.contains(ixdbid)) {
			throw new Error(
				'IndexedDB: Cannot attach database "' + ixdbid + '" because it does not exist'
			);
		}
		var request2 = indexedDB.open(ixdbid);
		request2.onsuccess = function (event) {
			var ixdb = event.target.result;
			var db = new alasql.Database(dbid || ixdbid);
			db.engineid = 'INDEXEDDB';
			db.ixdbid = ixdbid;
			db.tables = [];
			var tblist = ixdb.objectStoreNames;
			for (var i = 0; i < tblist.length; i++) {
				db.tables[tblist[i]] = {};
			}
			/*/*
		// if(!alasql.options.autocommit) {
		// if(db.tables){
		// 	for(var tbid in db.tables) {
		// 		db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
		// 	}
		// 	}
		// }
*/
			event.target.result.close();
			if (cb) cb(1);
		};
	};
};

IDB.createTable = function (databaseid, tableid, ifnotexists, cb) {
	var indexedDB = utils.global.indexedDB;
	//	console.log(arguments);
	var ixdbid = alasql.databases[databaseid].ixdbid;
	//	console.log(ixdbid);
	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function (event__) {
		var dblist = event__.target.result;
		if (!dblist.contains(ixdbid)) {
			throw new Error(
				'IndexedDB: Cannot create table in database "' + ixdbid + '" because it does not exist'
			);
		}
		var request2 = indexedDB.open(ixdbid);
		request2.onversionchange = function (event_) {
			//			console.log('onversionchange');
			event_.target.result.close();
		};
		request2.onsuccess = function (event_) {
			var version = event_.target.result.version;
			event_.target.result.close();

			var request3 = indexedDB.open(ixdbid, version + 1);
			request3.onupgradeneeded = function (event) {
				var ixdb = event.target.result;
				//				console.log(ixdb);
				var store = ixdb.createObjectStore(tableid, {autoIncrement: true});
				//				console.log(store);
			};
			request3.onsuccess = function (event) {
				//				console.log('opened');
				event.target.result.close();
				if (cb) cb(1);
			};
			request3.onerror = function (event) {
				throw event;
				//				console.log('error');
			};
			request3.onblocked = function (event) {
				throw new Error(
					'Cannot create table "' + tableid + '" because database "' + databaseid + '"  is blocked'
				);
				//				console.log('blocked');
			};
		};
	};
};

IDB.dropTable = function (databaseid, tableid, ifexists, cb) {
	var indexedDB = utils.global.indexedDB;
	var ixdbid = alasql.databases[databaseid].ixdbid;

	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function (event) {
		var dblist = event.target.result;

		if (!dblist.contains(ixdbid)) {
			throw new Error(
				'IndexedDB: Cannot drop table in database "' + ixdbid + '" because it does not exist'
			);
		}

		var request2 = indexedDB.open(ixdbid);
		request2.onversionchange = function (event) {
			event.target.result.close();
		};

		request2.onsuccess = function (event) {
			var version = event.target.result.version;
			event.target.result.close();

			var request3 = indexedDB.open(ixdbid, version + 1);
			request3.onupgradeneeded = function (event) {
				var ixdb = event.target.result;
				if (ixdb.objectStoreNames.contains(tableid)) {
					ixdb.deleteObjectStore(tableid);
					delete alasql.databases[databaseid].tables[tableid];
				} else {
					if (!ifexists) {
						throw new Error(
							'IndexedDB: Cannot drop table "' + tableid + '" because it does not exist'
						);
					}
				}
				//				var store = ixdb.createObjectStore(tableid);
				// console.log('deleted');
			};
			request3.onsuccess = function (event) {
				//				 console.log('opened',typeof cb);
				event.target.result.close();
				if (cb) cb(1);
			};
			request3.onerror = function (event) {
				//				console.log('error',event);
				throw event;
			};
			request3.onblocked = function (event) {
				throw new Error(
					'Cannot drop table "' + tableid + '" because database "' + databaseid + '" is blocked'
				);
				//				console.log('blocked');
			};
		};
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
	// console.log(arguments);
	// console.trace();
	//	console.log('intoTable',databaseid, tableid, value, cb);
	var indexedDB = utils.global.indexedDB;
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request1 = indexedDB.open(ixdbid);
	request1.onsuccess = function (event) {
		var ixdb = event.target.result;
		var tx = ixdb.transaction([tableid], 'readwrite');
		var tb = tx.objectStore(tableid);
		// console.log(tb.keyPath);
		// console.log(tb.indexNames);
		// console.log(tb.autoIncrement);
		for (var i = 0, ilen = value.length; i < ilen; i++) {
			tb.add(value[i]);
		}
		tx.oncomplete = function () {
			ixdb.close();
			//			console.log('indexeddb',203,ilen);
			if (cb) cb(ilen);
		};
	};
	/*/*
	// var tb = LS.get(lsdbid+'.'+tableid);
	// if(!tb) tb = [];
	// tb = tb.concat(value);
	// LS.set(lsdbid+'.'+tableid, tb);
//	console.log(lsdbid+'.'+tableid, tb);
//	console.log(localStorage[lsdbid+'.'+tableid]);
	// if(cb) cb(res);
	// return res;
*/
};

IDB.fromTable = function (databaseid, tableid, cb, idx, query) {
	// console.log(arguments);
	// console.trace();
	var indexedDB = utils.global.indexedDB;
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = indexedDB.open(ixdbid);
	request.onsuccess = function (event) {
		var res = [];
		var ixdb = event.target.result;
		//		console.log(444,ixdb, tableid, ixdbid);
		var tx = ixdb.transaction([tableid]);
		var store = tx.objectStore(tableid);
		var cur = store.openCursor();
		//		console.log(cur);
		cur.onblocked = function (event) {
			//			console.log('blocked');
		};
		cur.onerror = function (event) {
			//			console.log('error');
		};
		cur.onsuccess = function (event) {
			//			console.log('success');
			var cursor = event.target.result;
			//				console.log(222,event);
			//				console.log(333,cursor);
			if (cursor) {
				res.push(cursor.value);
				cursor.continue();
			} else {
				//				console.log(555, res,idx,query);
				ixdb.close();
				if (cb) cb(res, idx, query);
			}
		};
	};
};

IDB.deleteFromTable = function (databaseid, tableid, wherefn, params, cb) {
	// console.log(arguments);
	// console.trace();
	var indexedDB = utils.global.indexedDB;
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = indexedDB.open(ixdbid);
	request.onsuccess = function (event) {
		var res = [];
		var ixdb = event.target.result;
		//		console.log(444,ixdb, tableid, ixdbid);
		var tx = ixdb.transaction([tableid], 'readwrite');
		var store = tx.objectStore(tableid);
		var cur = store.openCursor();
		var num = 0;
		//		console.log(cur);
		cur.onblocked = function (event) {
			//			console.log('blocked');
		};
		cur.onerror = function (event) {
			//			console.log('error');
		};
		cur.onsuccess = function (event) {
			//			console.log('success');
			var cursor = event.target.result;
			//				console.log(222,event);
			//				console.log(333,cursor);
			if (cursor) {
				if (!wherefn || wherefn(cursor.value, params)) {
					//				console.log(cursor);
					cursor.delete();
					num++;
				}
				cursor.continue();
			} else {
				//				console.log(555, res,idx,query);
				ixdb.close();
				if (cb) cb(num);
			}
		};
	};
};

IDB.updateTable = function (databaseid, tableid, assignfn, wherefn, params, cb) {
	// console.log(arguments);
	// console.trace();
	var indexedDB = utils.global.indexedDB;
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = indexedDB.open(ixdbid);
	request.onsuccess = function (event) {
		var res = [];
		var ixdb = event.target.result;
		//		console.log(444,ixdb, tableid, ixdbid);
		var tx = ixdb.transaction([tableid], 'readwrite');
		var store = tx.objectStore(tableid);
		var cur = store.openCursor();
		var num = 0;
		//		console.log(cur);
		cur.onblocked = function (event) {
			//			console.log('blocked');
		};
		cur.onerror = function (event) {
			//			console.log('error');
		};
		cur.onsuccess = function (event) {
			//			console.log('success');
			var cursor = event.target.result;
			//				console.log(222,event);
			//				console.log(333,cursor);
			if (cursor) {
				if (!wherefn || wherefn(cursor.value, params)) {
					//console.log(cursor);
					var r = cursor.value;
					assignfn(r, params);
					//	console.log('update 363',r);
					cursor.update(r);
					num++;
				}
				cursor.continue();
			} else {
				//				console.log(555, res,idx,query);
				ixdb.close();
				if (cb) cb(num);
			}
		};
	};
};
